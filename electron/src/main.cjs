const { app, BrowserWindow } = require("electron");
const path = require("path");
const {
  default: installExtension,
  VUEJS3_DEVTOOLS,
} = require("electron-devtools-installer");

/**
 *
 * @param error {object}
 */
function errorHandler(error) {
  console.log(error);
  process.exit(1);
}

function installVueJS3DevTools() {
  installExtension(VUEJS3_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("Error adding extension: ", err));
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
function splashWindow() {
  window = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
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

app
  .whenReady()
  .then(async () => {
    installVueJS3DevTools();
    const splash = splashWindow();

    splash.once("ready-to-show", async () => {
      splash.show();
      fadeWindow(window, IN);
      const server = await import("@louvorja/server");
      const addresses = [...(await server.start())];
      console.log(addresses);
      const address = addresses
        .filter((a) => a.family === "IPv4")
        .filter((a) =>
          ["localhost", "127.0.0.1", "0.0.0.0"].includes(a.address)
        )[0];
      address.address = address.address.replace("0.0.0.0", "127.0.0.1");
      const windowUrl = `http://${address.address}:${address.port}/server/version`;
      const main = mainWindow(windowUrl);

      main.once("ready-to-show", () => {
        main.show();
        splash.focus();
        fadeWindow(main, IN, () => {
          fadeWindow(splash, OUT, () => {
            splash.destroy();
            main.focus();
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
