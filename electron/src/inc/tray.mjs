import { app, BrowserWindow, Menu, Tray } from "electron";
import { modules, CONFIG } from "@louvorja/shared";
import { Windows, toogleWindowVisibility } from "./windows.mjs";
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
  let tray = new Tray(
    path.join(modules.parent(import.meta), "../resources/images/louvor-ja.png")
  );

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
        app.quit();
        app.on("before-quit", (event) => {
          event.preventDefault();
          process.exit(0);
        });
      },
    },
  ]);

  tray.setToolTip(CONFIG.app.name);
  tray.setContextMenu(contextMenu);

  tray.on("click", function (e) {
    tray.popUpContextMenu();
  });
  tray.on("double-click", function (e) {
    tray.popUpContextMenu();
  });
  tray.on("right-click", function (e) {
    tray.popUpContextMenu();
  });
  return tray;
}
