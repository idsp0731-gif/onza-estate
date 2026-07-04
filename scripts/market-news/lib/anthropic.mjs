// Claude wrapper with model fallback. No SDK dependency.
// Always try the newest Opus first. The fallback chain handles brief unavailability.
const MODELS = [
  'claude-opus-4-7',
  'claude-opus-4-7-20251101',
  'claude-opus-4-5',
  'claude-opus-4-1-20250805',
  'claude-sonnet-4-6',
  'claude-3-5-sonnet-20241022',
];

export async function claude(messages, { max_tokens = 4096, system, temperature } = {}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');
  let lastErr;
  for (const model of MODELS) {
    const body = { model, max_tokens, messages };
    if (system) body.system = system;
    if (temperature !== undefined) body.temperature = temperature;
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (r.ok) {
        const j = await r.json();
        j._modelUsed = model;
        return j;
      }
      const txt = await r.text();
      lastErr = new Error(`${model} → ${r.status}: ${txt}`);
      if (!/not_found|model|invalid/i.test(txt)) throw lastErr;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export function textOf(res) {
  return res.content
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('')
    .trim();
}

export function jsonOf(res) {
  const text = textOf(res);
  // Strip code fences if present.
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fence ? fence[1] : text;
  const m = candidate.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!m) throw new Error('no JSON found in Claude response: ' + text.slice(0, 300));
  // Sanitize control characters (raw newlines, tabs, etc.) that Claude sometimes leaves inside JSON string literals.
  // Strategy: walk the string, when inside a string literal, escape \n \r \t and drop other ASCII control chars.
  const raw = m[0];
  let out = '';
  let inStr = false;
  let escaped = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const code = raw.charCodeAt(i);
    if (escaped) { out += ch; escaped = false; continue; }
    if (inStr) {
      if (ch === '\\') { out += ch; escaped = true; continue; }
      if (ch === '"') {
        // Distinguish a structural closing quote from an inner unescaped quote
        // (Claude often uses ASCII "…" for emphasis and forgets to escape it).
        // Look ahead past whitespace: a real close is followed by , } ] : or EOF.
        let j = i + 1;
        while (j < raw.length && (raw[j] === ' ' || raw[j] === '\n' || raw[j] === '\r' || raw[j] === '\t')) j++;
        const next = raw[j];
        if (j >= raw.length || next === ',' || next === '}' || next === ']' || next === ':') {
          out += ch; inStr = false; continue;   // structural close
        }
        out += '\\"'; continue;                  // inner emphasis quote → escape, stay in string
      }
      if (code === 0x0A) { out += '\\n'; continue; }       // raw LF
      if (code === 0x0D) { out += '\\r'; continue; }       // raw CR
      if (code === 0x09) { out += '\\t'; continue; }       // raw tab
      if (code < 0x20) continue;                            // drop other control chars
      out += ch;
    } else {
      if (ch === '"') { out += ch; inStr = true; continue; }
      out += ch;
    }
  }
  try {
    return JSON.parse(out);
  } catch (e) {
    throw new Error(`JSON parse failed after sanitize: ${e.message}\nFirst 500 chars: ${out.slice(0, 500)}`);
  }
}
