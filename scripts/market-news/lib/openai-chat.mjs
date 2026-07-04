// OpenAI Chat Completions wrapper with model fallback. No SDK dependency.
// Used for the "review" step in the Claude → ChatGPT → Claude pipeline.

// Always try the newest first. The fallback chain handles the case where a model
// name is briefly unavailable (rate-limited region, model rename, etc).
const MODELS = [
  'gpt-5.5',
  'gpt-5.5-mini',
  'gpt-5',
  'gpt-5-mini',
  'gpt-5-turbo',
  'gpt-4.1',
  'gpt-4o',
];

// Models that don't support `temperature` or that require `max_completion_tokens`
// instead of `max_tokens`. We pass both safely.
export async function chatgpt(messages, { max_tokens = 4096, temperature, response_format, system } = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const msgs = system ? [{ role: 'system', content: system }, ...messages] : messages;

  let lastErr;
  for (const model of MODELS) {
    const body = {
      model,
      messages: msgs,
      // GPT-5 family (incl. 5.5) uses max_completion_tokens; older models accept max_tokens.
      // Sending both is rejected, so pick based on model name.
      ...(/^gpt-5/.test(model) ? { max_completion_tokens: max_tokens } : { max_tokens }),
    };
    // GPT-5 family (including 5.5) does not accept custom temperature.
    if (temperature !== undefined && !/^gpt-5/.test(model)) body.temperature = temperature;
    if (response_format) body.response_format = response_format;

    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
      // continue only on model-not-found / unsupported parameter errors
      if (!/not_found|model|invalid|unsupported|does not exist/i.test(txt)) throw lastErr;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export function chatgptText(res) {
  return (res.choices?.[0]?.message?.content ?? '').trim();
}

export function chatgptJson(res) {
  const text = chatgptText(res);
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fence ? fence[1] : text;
  const m = candidate.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!m) throw new Error('no JSON found in OpenAI response: ' + text.slice(0, 300));
  return JSON.parse(m[0]);
}
