import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { importIni } from "../specs/liturgy";

function spec(name) {
  return path.join(specsdir, name);
}

const basepath = path.dirname(fileURLToPath(import.meta.url));
const specsdir = path.join(basepath, "../specs");

const iniStr = fs.readFileSync(spec("liturgia.ja"), { encoding: "latin1" });

console.log(importIni(iniStr));
