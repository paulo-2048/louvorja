import ini from "ini";

export interface Liturgy {
  weekday: number;
  name: string;
}

export function liturgyFromIni(iniStr: string) {
  const config = ini.parse(iniStr);
  const geral = config.Geral;
  const json: Array<Liturgy> = [];

  [...Array(7).keys()]
    .map((i) => i + 1)
    .forEach((i) => {
      json.push({
        weekday: i,
        name: geral[`${i}`],
      });
    });

  // Object.keys(config).forEach((el) => {
  //   console.log(el);
  // });
  return json;
}
