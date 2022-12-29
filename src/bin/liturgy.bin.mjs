import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { importIni } from "@/specs/liturgy";

function spec(name) {
  return path.join(specsdir, name);
}

const basepath = path.dirname(fileURLToPath(import.meta.url));
const specsdir = path.join(basepath, "../specs");

const iniStr = fs.readFileSync(spec("liturgia.ja"), { encoding: "latin1" });

console.log(importIni(iniStr));
