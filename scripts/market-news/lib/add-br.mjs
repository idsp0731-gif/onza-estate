// Insert <br> after each 。 within a paragraph (except at line end and where <br> already follows).
// Skips headers / list items / blockquotes / horizontal rules / blank lines.

export function addBrAfterPeriods(body) {
  return body
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      // Skip headers, list items, blockquotes, horizontal rules, table rows.
      if (/^(\s*#{1,6}\s|\s*[-*]\s|\s*\d+\.\s|\s*>|---|\|)/.test(line)) return line;
      // Insert <br> after 。 only when the next chunk is NOT line-end and NOT already <br>.
      return line.replace(/。(?!\s*$)(?!<br\s*\/?>)/g, '。<br>');
    })
    .join('\n');
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1].replaceAll('\\', '/')}`) {
  // CLI mode: stdin → stdout
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  const input = Buffer.concat(chunks).toString('utf8');
  process.stdout.write(addBrAfterPeriods(input));
}
