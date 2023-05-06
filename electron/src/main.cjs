const { app, ipcMain } = require("electron");
const { url } = require("node:inspector");
const path = require('node:path');

let logger = null;

import("@louvorja/shared")
  .then(async (shared) => {

    const { quit } = await import('./inc/quit.mjs');

    process.on("SIGINT", () => {
      quit();
    });

    ipcMain.handle('quit-app', (event, ...args) => {
      quit();
    });

    const { logging, modules } = shared;
    logger = logging.createLogger(logging.STDOUT);
    logger.info("Logger created");

    const { createTray } = await import("./inc/tray.mjs");
    const {
      createWindow,
      closeSplashAndShowControl,
      setWindowVisibility,
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

    console.log("DEV MODE", devMode)

      let serverUrl = devMode
        ? "http://localhost:5174"
        : await import("./inc/server.mjs");

      let controlUrl = devMode
        ?"http://localhost:5175/control.html"
        : `${serverUrl}/control`;

      let projectionUrl = devMode
        ? "http://localhost:5175/projection.html"
        : `${serverUrl}/projection`;

      logger.info(`Control URL  ${controlUrl}`);
      const CONTROL_MAIN = Object.assign(
        {},
        CONTROL,
        {
          webPreferences: {
            nodeIntegration: false,
            contentIsolation: true,
            preload: path.resolve(__dirname, "preload.mjs")
          }
        }
      );
      logger.info(`CONTROL: ${CONTROL_MAIN}`);
      windows.control = createWindow(CONTROL_MAIN, {
        url: controlUrl,
        maximize: true
      });

      // https://www.electronjs.org/docs/latest/api/window-open
      windows.control.webContents.setWindowOpenHandler((event) => {
        setWindowVisibility(windows.projection, true);
        windows.projection.loadURL(event.url);
        //windows.projection.maximize();
        //windows.projection.setFullScreen(true);
        return {
          action: 'deny'
        };
      });

      const controlReadey = new Promise((resolve, reject) => {
        windows.control.once("ready-to-show", () => {
          logger.info("Control window ready!");
          resolve(true);
        });

        ipcMain.handle('control-main-minimize', (event, ...args) => {
          windows.control.minimize();
        });
        ipcMain.handle('control-main-maximize', (event, ...args) => {
          windows.control.maximize();
          return windows.control.isMaximized();
        });
        ipcMain.handle('control-main-unmaximize', (event, ...args) => {
          windows.control.unmaximize();
          return !windows.control.isMaximized();
        });
        ipcMain.handle('control-main-isMaximized', (event, ...args) => {
          return windows.control.isMaximized();
        });
      });

      logger.info(`Projection URL ${projectionUrl}`);
      logger.info(`PROJECTION: ${PROJECTION}`);
      windows.projection = createWindow(PROJECTION, {
        url: projectionUrl,
        maximize: true,
        opacity: 1
      });

      const projectionReady = new Promise((resolve, reject) => {
        windows.projection.once("ready-to-show", () => {
          logger.info("Projection window ready!");
          setWindowVisibility(windows.projection, false);
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
