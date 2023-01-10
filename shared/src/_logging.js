import pino from "pino";

export const STDOUT = 1;
export const STDERR = 2;

export function createLogger(destination, mkdir = true, append = false) {
  const targets = [
    {
      target: "pino-pretty",
      options: {
        sync: true,
        colorize: true,
      },
    },
  ];
  if (![STDOUT, STDERR].includes(destination)) {
    targets.splice(0, 0, {
      target: "pino/file",
      options: { destination: destination, mkdir, append },
    });
  }
  return pino({
    transport: {
      targets,
    },
  });
}
