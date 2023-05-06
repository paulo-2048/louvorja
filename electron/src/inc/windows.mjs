import { BrowserWindow, dialog } from "electron";
import { CONFIG, modules } from "@louvorja/shared";
import { quitting } from './quit.mjs';

import path from 'node:path';
import { log } from "node:console";

export function toString() {
  return "module @louvorja/electron/inc/windows";
}

const LJA_WINDOW_SPLASH = 'SPLASH';
const LJA_WINDOW_CONTROL = 'CONTROL';
const LJA_WINDOW_PROJECTION = 'PROJECTION';

export const ICON_PATH = path.join(modules.parent(import.meta), "../resources/images/louvor-ja.png");

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


const BASE_WINDOW_OPTIONS = {
  ljaWindowType: null,
  icon: ICON_PATH,
  title: '',
  autoHideMenuBar: true,
  titleBarStyle: 'hidden',
  transparent: false,

  useContentSize: true,

  frame: false,
  show: false,
  alwaysOnTop: false,

  focusable: true,
  closable: false,
  minimizable: true,
  maximizable: true,
  resizable: true,
  fullscreenable: true,

  webPreferences: {
    nodeIntegration: false,
    contentIsolation: true
  },

  toString: function () {
    return JSON.stringify(this);
  },
}

/**
 * @type {BrowserWindowConstructorOptions}
 */
export const SPLASH = Object.assign({}, BASE_WINDOW_OPTIONS, {
  ljaWindowType: LJA_WINDOW_SPLASH,
  title: 'Splash',
  width: 300,
  height: 300,
  transparent: true,
  alwaysOnTop: true,
  transparent: true,
  focusable: true,
  minimizable: false,
  maximizable: false,
  resizable: false,
  fullscreenable: false
});

/**
 * @type {BrowserWindowConstructorOptions}
 */
export const CONTROL = Object.assign({}, BASE_WINDOW_OPTIONS, {
  ljaWindowType: LJA_WINDOW_CONTROL,
  title: 'Control',
  width: 800,
  height: 600,
  resizable: true
});

/**
 * @type {BrowserWindowConstructorOptions}
 */
export const PROJECTION = Object.assign({}, BASE_WINDOW_OPTIONS, {
  ljaWindowType: LJA_WINDOW_PROJECTION,
  title: 'Projection',
  width: 800,
  height: 600,
  transparent: true,
  resizable: true,
  minimizable: true,
  closable: false,
  fullscreenable: true
});

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
  windowOptions.title = CONFIG.application.name + (windowOptions.title ? ' - ' + windowOptions.title : '');

  initialOptions = new WindowInitialOptions(initialOptions);

  const browserWindow = new BrowserWindow(windowOptions);

  if (CONFIG.application.debug && windowOptions.ljaWindowType === LJA_WINDOW_CONTROL) {
    browserWindow.webContents.openDevTools();
  }

  if (!windowOptions.closable) {
    browserWindow.on('close', (event) => {
      if (!quitting()) {
        event.preventDefault();
      }
    });
  }

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

  browserWindow.setOpacity(initialOptions.opacity);

  return browserWindow;
}

/**
 * Toogle window visibility with show/hide and restore/minimize.
 *
 * @param window {BrowserWindow}
 */
export function toggleWindowVisibility(window) {
  setWindowVisibility(window, !window.isVisible());
}

export function setWindowVisibility(window, visible) {
  if (visible) {
    window.restore();
    window.show();
  } else {
    window.minimize();
    window.hide();
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
