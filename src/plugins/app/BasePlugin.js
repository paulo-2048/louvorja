export default class BasePlugin {
  constructor(manifest) {
    this.manifest = {
      active: manifest.active,
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
      description: manifest.description,
      author: manifest.author,
      category: manifest.category,
      icon: manifest.icon,
      language: manifest.language || null,
      minAppVersion: manifest.minAppVersion,
      dependencies: manifest.dependencies || [],
      permissions: manifest.permissions || [],
      translations: manifest.translations || {},
    };
  }

  onInstall() {
    console.log(`${this.manifest.name} installed successfully`);
  }

  getManifest() {
    return this.manifest;
  }

  getTranslations() {
    return this.manifest.translations;
  }

  getComponents() {
    return this.manifest.components;
  }

  getEntryComponent() {
    return this.manifest.componentsEntry;
  }

  getDependencies() {
    return this.manifest.dependencies;
  }

  getPermissions() {
    return this.manifest.permissions;
  }
}
