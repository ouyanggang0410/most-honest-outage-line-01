import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trim();

// The gate requires /output/entry.txt to be UTF-8 text of 1 to 160
// characters, not only white space. Refuse to emit a line that breaks
// the gate instead of submitting a bad one.
if (line.length === 0 || line.length > 160) {
  console.error(`entry line must be 1-160 characters, got ${line.length}`);
  process.exit(1);
}

// The grader reads the entry from the output directory, so write it there
// (byte-for-byte the same line, no trailing newline) as well as to stdout.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");

console.log(line);
