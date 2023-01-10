import * as logger from "../src/_logging.js";

test("create logger", async () => {
  const log = await logger.createLogger(logger.STDOUT);
  expect(log.constructor.name).toBe("Pino");
  log.info("It works!");
});
