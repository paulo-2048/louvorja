import installExtension from "electron-devtools-installer";
import { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

export function installVueJS3DevTools(app) {
  if (app.commandLine.hasSwitch("install-dev-tools")) {
    installExtension(VUEJS3_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("Error adding extension: ", err));
  }
}
