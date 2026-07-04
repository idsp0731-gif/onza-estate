// Gemini API wrapper for research tasks.
// Uses Google Search Grounding to fetch up-to-date info with sources.
// No SDK dependency.
//
// Models tried in order (newest first). Falls back if model is unavailable.
const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash-exp',
  'gemini-2.0-flash',
];

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Call Gemini with Google Search Grounding enabled.
 *
 * @param {string|Array} input - Plain string prompt, or full contents array.
 * @param {object} opts
 * @param {number} [opts.maxOutputTokens=8192]
 * @param {number} [opts.temperature]
 * @param {boolean} [opts.search=true]  Whether to enable Google Search Grounding.
 * @param {string}  [opts.systemInstruction]
 * @returns {Promise<{text: string, sources: Array<{title, uri}>, raw: object, _modelUsed: string}>}
 */
export async function gemini(input, {
  maxOutputTokens = 8192,
  temperature,
  search = true,
  systemInstruction,
} = {}) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY (or GOOGLE_API_KEY) not set in .env.local');

  const contents = typeof input === 'string'
    ? [{ role: 'user', parts: [{ text: input }] }]
    : input;

  let lastErr;
  for (const model of MODELS) {
    const body = {
      contents,
      generationConfig: { maxOutputTokens },
    };
    if (temperature !== undefined) body.generationConfig.temperature = temperature;
    if (systemInstruction) body.systemInstruction = { parts: [{ text: systemInstruction }] };
    if (search) body.tools = [{ google_search: {} }];

    try {
      const url = `${API_BASE}/models/${model}:generateContent?key=${apiKey}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (r.ok) {
        const j = await r.json();
        const candidate = j.candidates?.[0];
        const text = (candidate?.content?.parts ?? [])
          .filter((p) => p.text)
          .map((p) => p.text)
          .join('')
          .trim();

        // Extract sources from groundingMetadata (Gemini Search Grounding)
        const groundingChunks = candidate?.groundingMetadata?.groundingChunks ?? [];
        const sources = groundingChunks
          .map((c) => c.web)
          .filter((w) => w && w.uri)
          .map((w) => ({ title: w.title ?? '', uri: w.uri }));

        return { text, sources, raw: j, _modelUsed: model };
      }

      const txt = await r.text();
      lastErr = new Error(`${model} → ${r.status}: ${txt}`);
      // If model not found / unauthorized / unsupported, try next model.
      // For other errors, fall through to next as well (Gemini APIs vary).
      if (!/not_found|model|invalid|unauthor|permission|unsupported|400|404/i.test(txt)) {
        throw lastErr;
      }
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

/**
 * Tries to extract a JSON block from Gemini's response text.
 * Useful when prompting Gemini to return structured research data.
 */
export function jsonOfGemini(res) {
  const text = typeof res === 'string' ? res : res.text;
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fence ? fence[1] : text;
  const m = candidate.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!m) throw new Error('no JSON found in Gemini response: ' + text.slice(0, 300));
  return JSON.parse(m[0]);
}
