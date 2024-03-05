import fs from 'fs';
import { yarg } from './plugins/yargs.plugin';

const { b, l, s } = yarg;

const numbers = Array.from({ length: l }, (_, i) => i + 1);
const base = b;
const outputPath = 'outputs';
const path = `${outputPath}/tabla-${base}.txt`;

let output: string = `
====================
TABLA DEL ${base}    
====================\n
`;

for (const n of numbers) {
    output += `${base} x ${n} = ${base * n}\n`;
}

if (s) console.log(output);

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(path, output);

console.log('File created!');
