const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("node:path");

import("@louvorja/shared")
  .then(({ logging }) => logging.createLogger(logging.STDOUT))
  .then((logger) => {
    logger.info("Logger created");
    // ASSURES SINGLE INSTANCE
    const gotTheLock = app.requestSingleInstanceLock(process.argv);
    if (!gotTheLock) {
      app.quit();
    }
    ///

    const {
      default: installExtension,
      VUEJS3_DEVTOOLS,
    } = require("electron-devtools-installer");
    const { promisify } = require("node:util");

    /**
     *
     * @param error {object}
     */
    function errorHandler(error) {
      console.log(error);
      app.quit();
    }

    function installVueJS3DevTools() {
      if (app.commandLine.hasSwitch("install-dev-tools")) {
        installExtension(VUEJS3_DEVTOOLS)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log("Error adding extension: ", err));
      }
    }

    const IN = false;
    const OUT = true;

    /**
     *
     * @param window {BrowserWindow} Window to fade.
     * @param out {boolean} True for fade out, false for fade in.
     * @param doneCallback {function} Callback to be called when fade is done.
     * @returns {void}
     */
    function fadeWindow(window, out, doneCallback = null) {
      let step = 0.05 * (out ? -1 : 1);
      const duration = 1 * 0.95; // 0.95 is to compensate windo opacity change duration
      let opacity = window.getOpacity();

      let intervalHandler;
      const startTime = new Date().getTime();
      function updateOpacity() {
        opacity += step;
        window.setOpacity(opacity);
        if (opacity >= 1 || opacity <= 0) {
          console.log(
            `Fade effective duration ${new Date().getTime() - startTime}`
          );
          clearInterval(intervalHandler);
          setTimeout(() => {
            doneCallback && doneCallback();
          }, interval);
        }
      }

      const totalSteps = 1 / Math.abs(step);
      const stepsBySeconds = totalSteps / duration;
      const interval = 1000 / stepsBySeconds;
      intervalHandler = setInterval(updateOpacity, interval);
      return intervalHandler;
    }

    /**
     *
     * @returns {BrowserWindow}
     */
    function splashWindow(parent) {
      window = new BrowserWindow({
        width: 300,
        height: 300,
        transparent: true,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
        frame: false,
        show: false,
        transparent: true,
        focusable: true,
        closable: true,
        minimizable: false,
        maximizable: false,
        resizable: false,
        fullscreenable: false,
      });
      window.setOpacity(0);
      window.loadFile("loading.html");
      return window;
    }

    /**
     *
     * @param url {string}
     * @returns {BrowserWindow}
     */
    function mainWindow(url) {
      window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
        // webPreferences: {
        //   preload: path.join(__dirname, "./preload.js"),
        // },
      });
      window.setOpacity(0);
      window.maximize();
      window.loadURL(url);

      return window;
    }

    /**
     * @returns {string} Server url.
     */
    async function startServer() {
      const serverUrl = app.commandLine.getSwitchValue("server-url");
      if (serverUrl !== "") {
        return serverUrl;
      }
      const server = await import("@louvorja/server");
      const addresses = [...(await server.start())];
      console.log(addresses);
      const address = addresses
        .filter((a) => a.family === "IPv4")
        .filter((a) => {
          console.log("ADDR", a.address, a);
          return ["localhost", "127.0.0.1", "0.0.0.0"].includes(a.address);
        })[0];
      address.address = address.address.replace("0.0.0.0", "127.0.0.1");
      return `http://${address.address}:${address.port}/`;
    }

    /**
     *
     * @param mainWindow {{splash: BrowserWindow, control: BrowserWindow, projection: BrowserWindow}}
     * @param projectorWindow {BrowserWindow}
     * @returns {Tray}
     */
    function createTray(windows) {
      let tray = new Tray(path.join(__dirname, "./louvor-ja.png"));

      /**
       *
       * @param window {BrowserWindow}
       */
      function toogleWindowVisibility(window) {
        if (window.isVisible()) {
          window.minimize();
          window.hide();
        } else {
          window.restore();
          window.show();
        }
      }

      const contextMenu = Menu.buildFromTemplate([
        {
          label: "Show/Hide Control Window",
          type: "normal",
          click: (menuItem, browserWindow, event) => {
            toogleWindowVisibility(windows.control);
          },
        },
        {
          label: "Quit",
          type: "normal",
          click: (menuItem, browserWindow, event) => {
            app.quit();
          },
        },
      ]);
      //FIXME app name
      tray.setToolTip("This is my application.");
      tray.setContextMenu(contextMenu);

      tray.on("click", function (e) {
        tray.popUpContextMenu();
      });
      return tray;
    }

    const windows = {
      splash: null,
      control: null,
      projection: null,
    };

    app
      .whenReady()
      .then(async () => {
        logger.info("App ready!");
        installVueJS3DevTools();
        let tray = createTray(windows);
        const splash = splashWindow();
        windows.splash = splash;

        splash.once("ready-to-show", async () => {
          splash.show();
          fadeWindow(window, IN);

          const url = await startServer();
          console.log("SERVER URL", url);
          const control = mainWindow(url);
          windows.control = control;

          control.once("ready-to-show", () => {
            control.show();
            splash.focus();
            fadeWindow(control, IN, () => {
              fadeWindow(splash, OUT, () => {
                splash.destroy();
                control.focus();
              });
            });
          });
        });
      })
      .catch(errorHandler);

    // FIXME quit when main window closed
    // FIXME use try icon, so single monitor can be projection
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on(
      "second-instance",
      (event, commandLine, workingDirectory, additionalData) => {
        // Print out data received from the second instance.
        console.log(additionalData);

        // Someone tried to run a second instance, we should focus our window.
        if (windows.control) {
          if (!windows.control.isVisible()) {
            windows.control.show();
          }
          if (windows.control.isMinimized()) {
            windows.control.restore();
          }
          windows.control.focus();
        }
      }
    );
  });
