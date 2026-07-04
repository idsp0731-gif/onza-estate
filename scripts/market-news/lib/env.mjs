// Loads .env.local from the project root (or any parent that has one).
// No external dependency.
import fs from 'node:fs';
import path from 'node:path';

function findEnvFile(startDir) {
  let dir = path.resolve(startDir);
  for (let i = 0; i < 8; i++) {
    const p = path.join(dir, '.env.local');
    if (fs.existsSync(p)) return p;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // Hard fallback to known location.
  const fallback = 'C:\\Users\\idsp0\\onza-estate\\.env.local';
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

const file = findEnvFile(process.cwd());
if (file) {
  const raw = fs.readFileSync(file, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    // Overwrite if missing OR empty (parent shell may inject empty values).
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

export const ENV_FILE = file;
