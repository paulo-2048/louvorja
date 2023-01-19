// main.js (index.js)

// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const {
  default: installExtension,
  VUEJS3_DEVTOOLS,
} = require("electron-devtools-installer");

function installVueJS3DevTools() {
  installExtension(VUEJS3_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("Error adding extension: ", err));
}

function startServer() {
  const app = new Koa();
  app.use(async (ctx) => {
    ctx.body =
      "<p style='background-color: #ff0000; position: fixed; bottom: 0'>Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World";
  });
  return app.listen(0);
}

function startMainWindow(port) {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  const url = `http://localhost:${port}/`;
  console.log(url);
  window.loadURL(url);
  window.focus();
  return window;
}

function startProjectionWindow(port) {
  return () => {
    window = new BrowserWindow({
      x: 0,
      y: 0,
      center: true,
      useContentSize: true,
      autoHideMenuBar: true,
      closable: true,
      alwaysOnTop: false,
      fullscreen: true,
      frame: false,
      show: true,
      hasShadow: false,
      thickFrame: false,
      transparent: true,
      titleBarStyle: "hidden",
      title: "Louvor JA :: Projection",
      ignoreMouseEvents: true,
      // icon:
      webPreferences: {
        preload: path.join(__dirname, "./preload.js"),
        defaultFontFamily: "sans-serif",
      },
    });
    const url = `http://localhost:${port}/projection`;
    console.log(url);
    // window.once("ready-to-show", () => {
    //   window.show();
    // });
    window.loadURL(url);
    return window;
  };
}

// BACKGROUND IMAGE OR COLOR WINDOW
// VIDEO GOES TO PROJECTION USING OpenGL video output on VLC AND MPLAYER
function startVideoWindow() {
  return () => {
    window = new BrowserWindow({
      x: 0,
      y: 0,
      center: true,
      useContentSize: true,
      autoHideMenuBar: true,
      closable: true,
      alwaysOnTop: false,
      fullscreen: true,
      frame: false,
      show: true,
      hasShadow: false,
      thickFrame: false,
      transparent: false,
      backgroundColor: "#000000",
      titleBarStyle: "hidden",
      title: "Louvor JA :: Video",
      ignoreMouseEvents: true,
      // icon:
      webPreferences: {
        preload: path.join(__dirname, "./preload.js"),
      },
    });
    // window.once("ready-to-show", () => {
    //   window.show();
    // });
    window.loadURL("about:blank");
    return window;
  };
}

app.whenReady().then(async () => {
  installVueJS3DevTools();
  const server = startServer();
  const port = server.address().port;
  startMainWindow(port);
  const projectionWindow = startProjectionWindow(port)();
  console.log("NWH_ID PROJECTION", projectionWindow.getNativeWindowHandle());
//    const videoWindow = startVideoWindow()();
//    console.log("NWH_ID VIDEO", videoWindow);


  const nativeWindow = projectionWindow;
  const nativeHandler = nativeWindow.getNativeWindowHandle();

  if (nativeHandler.constructor.name === "Buffer") {
    const hwid = nativeHandler.readBigInt64LE(0, nativeHandler.length);
    console.log(`[${hwid}]`);

    // we can use 2 windows: video an web
    // - web at top, transparent
    // - video ate bottom, black background
    // VLC ovewrites window contents if not --vout=opengl, mplayer does not
    // SHOULD RUN ALWAS IN OVERLAY MODE????
    // mplayer -vo gl -wid 656808 '.\Sede - 1.mp4'
    // mplayer -vo help
    // vlc --vout=opengl --no-embedded-video --qt-notification=0 --qt-auto-raise=0 --qt-start-minimized --no-qt-name-in-title --no-video-title-show --drawable-hwnd=787874 '.\Sede - 1.mp4'
  }

  /*let i = 1;
  setInterval(() => {
    i++;
    console.log(`${i}: ${projectionWindow.isDestroyed()}`);
  }, 1000);*/
  /*app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });*/
});

// FIXME quit when main window closed
// FIXME use try icon, so single monitor can be projection
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
