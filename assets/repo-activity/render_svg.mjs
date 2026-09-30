import fs from 'node:fs';
import { buildSvg } from './render.mjs';
const data = JSON.parse(fs.readFileSync('./assets/repo-activity/data.json', 'utf8'));
fs.writeFileSync('./assets/repo-activity.svg', buildSvg(data) + '\n');
