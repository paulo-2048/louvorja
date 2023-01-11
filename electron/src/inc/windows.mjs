import { BrowserWindow } from "electron";

export function toString() {
  return "module @louvorja/electron/inc/windows";
}

/**
 * Keep application windows references
 */
export class Windows {
  /**
   * @type {BrowserWindow}
   */
  control;
  /**
   * @type {BrowserWindow}
   */
  projection;
  /**
   * @type {BrowserWindow}
   */
  splash;
}

/**
 * @type {string} "in"
 */
export const IN = "in";

/**
 * @type {string} "out"
 */
export const OUT = "out";

/**
 *
 * @param browserWindow {BrowserWindow} Window to fade.
 * @param mode {string} {@link OUT} for fade out, {@link IN} for fade in.
 * @param doneCallback {function} Callback to be called when fade is done.
 * @returns {void}
 */
export function fadeWindow(browserWindow, mode, doneCallback = null) {
  let step = 0.05 * (mode === OUT ? -1 : 1);
  const duration = 1 * 0.95; // 0.95 is to compensate windo opacity change duration
  let opacity = browserWindow.getOpacity();

  let intervalHandler;
  const startTime = new Date().getTime();
  function updateOpacity() {
    opacity += step;
    browserWindow.setOpacity(opacity);
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
 * @type {BrowserWindowConstructorOptions}
 */
export const SPLASH = {
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
  toString: function () {
    return JSON.stringify(this);
  },
};

/**
 * @type {BrowserWindowConstructorOptions}
 */
export const CONTROL = {
  width: 800,
  height: 600,
  show: false,
  autoHideMenuBar: true,
  useContentSize: true,
  resizable: true,
  closable: false,
  // webPreferences: {
  //   preload: path.join(__dirname, "./preload.js"),
  // },
  toString: function () {
    return JSON.stringify(this);
  },
};

/**
 * @type {BrowserWindowConstructorOptions}
 */
export const PROJECTION = {
  width: 800,
  height: 600,
  show: false,
  transparent: true,
  autoHideMenuBar: true,
  useContentSize: true,
  resizable: false,
  minimizable: false,
  closable: false,
  fullscreenable: true,
  frame: false,
  // webPreferences: {
  //   preload: path.join(__dirname, "./preload.js"),
  // },
  toString: function () {
    return JSON.stringify(this);
  },
};

export class WindowInitialOptions {
  /**
   * @type {string}
   */
  file = null;
  /**
   * @type {string}
   */
  url = null;
  /**
   * @type {boolean}
   */
  maximize = false;
  /**
   *  @type {number} Initial opacity. Default 0 to allow fade in effect.
   */
  opacity = 0;

  constructor(options) {
    Object.assign(this, options);
  }

  /**
   *
   * @returns {boolean} True if file or url are defined on load.
   */
  hasLoad() {
    return !!(this.file || this.url);
  }
}

/**
 * @param windowOptions {BrowserWindowConstructorOptions}
 * @param initialOptions {WindowInitialOptions}
 * @returns {BrowserWindow}
 */
export function createWindow(windowOptions, initialOptions = {}) {
  initialOptions = new WindowInitialOptions(initialOptions);

  const browserWindow = new BrowserWindow(windowOptions);

  browserWindow.setOpacity(initialOptions.opacity);

  if (initialOptions.hasLoad()) {
    if (initialOptions.file) {
      browserWindow.loadFile(initialOptions.file);
    } else if (initialOptions.url) {
      browserWindow.loadURL(initialOptions.url);
    }
  }

  if (initialOptions.maximize) {
    browserWindow.maximize();
  }
  return browserWindow;
}

/**
 * Toogle window visibility with show/hide and restore/minimize.
 *
 * @param window {BrowserWindow}
 */
export function toogleWindowVisibility(window) {
  if (window.isVisible()) {
    window.minimize();
    window.hide();
  } else {
    window.restore();
    window.show();
  }
}

/**
 *
 * @param windows {Windows}
 */
export function closeSplashAndShowControl({ control, splash }) {
  control.show();
  splash.focus();
  fadeWindow(control, IN, () => {
    fadeWindow(splash, OUT, () => {
      splash.destroy();
      control.focus();
    });
  });
}
