import { app } from "electron";
import { Windows } from "./windows.mjs";

export function toString() {
  return "module @louvorja/electron/inc/system";
}

export function assureSingleInstance() {
  const gotTheLock = app.requestSingleInstanceLock(process.argv);
  if (!gotTheLock) {
    logger.warn("Another instance is already running. Exiting now!");
    app.quit();
  }
}
/**
 *
 * @param app
 * @param windows {Windows}
 */
export function installEventListenners(app, windows) {
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
}
