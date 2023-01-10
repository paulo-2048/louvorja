const { app } = require("electron");

let logger = null;

import("@louvorja/shared")
  .then(async (shared) => {
    const { logging } = shared;
    logger = logging.createLogger(logging.STDOUT);
    logger.info("Logger created");

    const { createTray } = await import("./inc/tray.mjs");
    const {
      createWindow,
      closeSplashAndShowControl,
      fadeWindow,
      IN,
      Windows,
      CONTROL,
      SPLASH,
      PROJECTION,
    } = await import("./inc/windows.mjs");

    const windows = new Windows();

    let tray = createTray(windows);

    logger.info(`SPLASH: ${SPLASH}`);
    windows.splash = createWindow(SPLASH, {
      opacity: 1,
      file: "./splash.html",
    });
    const splash = windows.splash;

    splash.once("ready-to-show", async () => {
      splash.show();
      fadeWindow(splash, IN);

      const devtools = await import("./inc/devtools.mjs");
      devtools.installVueJS3DevTools(app);

      const system = await import("./inc/system.mjs");
      system.assureSingleInstance();

      const devMode = app.commandLine.hasSwitch("dev-mode");

      let serverUrl = devMode
        ? "http://localhost:5174"
        : await import("./inc/server.mjs");

      let controlUrl = devMode
        ? `${serverUrl}/control`
        : "http://localhost:5175";

      let projectionUrl = devMode
        ? `${serverUrl}/projection`
        : "http://localhost:5176";

      logger.info(`Control URL  ${controlUrl}`);
      logger.info(`CONTROL: ${CONTROL}`);
      windows.control = createWindow(CONTROL, {
        url: controlUrl,
        maximize: true,
      });

      const controlReadey = new Promise((resolve, reject) => {
        windows.control.once("ready-to-show", () => {
          logger.info("Control window ready!");
          resolve(true);
        });
      });

      logger.info(`Projection URL ${projectionUrl}`);
      logger.info(`PROJECTION: ${PROJECTION}`);
      windows.projection = createWindow(PROJECTION, {
        url: projectionUrl,
        maximize: true,
        opacity: 1,
      });

      const projectionReady = new Promise((resolve, reject) => {
        windows.projection.once("ready-to-show", () => {
          logger.info("Projection window ready!");
          resolve(true);
        });
      });

      Promise.all([controlReadey, projectionReady])
        .then(() => closeSplashAndShowControl(windows))
        .catch((error) => logger.error(error));
    });
  })
  .catch((error) => {
    (logger || console).error(error);
    app.quit();
  });
