import { app, BrowserWindow, Menu, Tray } from "electron";
import { modules, CONFIG } from "@louvorja/shared";
import { Windows, toogleWindowVisibility, ICON_PATH } from "./windows.mjs";
import { quit } from './quit.mjs';
import path from "node:path";

export function toString() {
  return "module @louvorja/electron/inc/tray";
}

/**
 *
 * @param windows {Windows}
 * @param projectorWindow {BrowserWindow}
 * @returns {Tray}
 */
export function createTray(windows) {
  let tray = new Tray(ICON_PATH);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show/Hide Control Window",
      type: "normal",
      click: (menuItem, browserWindow, event) => {
        toogleWindowVisibility(windows.control);
      },
    },
    {
      label: "Show/Hide Projection Window",
      type: "normal",
      click: (menuItem, browserWindow, event) => {
        toogleWindowVisibility(windows.projection);
      },
    },
    {
      label: "Quit",
      type: "normal",
      click: (menuItem, browserWindow, event) => {
        // app.on("before-quit", (event) => {
        //   process.exit(0);
        // });
        // app.quit();
        quit();
      },
    },
  ]);

  tray.setToolTip(CONFIG.application.name);
  tray.setContextMenu(contextMenu);

  return tray;
}
