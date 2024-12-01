// @/helpers/PluginManager.js
import AppData from './AppData';
import $dev from './Dev';

// import ExamplePlugin from '@/plugins/app/ExamplePlugin'
import CounterModulePlugin from '@/plugins/app/counter';

export default {
  plugins: new Map(),
  manifests: new Map(),

  register(pluginName, plugin) {
    if (!this.plugins.has(pluginName)) {
      this.plugins.set(pluginName, plugin);
      return true;
    }
    return false;
  },

  async installPlugin(plugin) {
    try {
      // Auto-configure plugin
      const manifest = plugin.manifest;

      // Register module in application's modules
      AppData.set(`modules.${manifest.id}`, {
        id: manifest.id,
        title: manifest.translationKey || `modules.${manifest.id}.title`,
        icon: manifest.icon || 'mdi-puzzle',
        component: manifest.componentName || manifest.id.charAt(0).toUpperCase() + manifest.id.slice(1),
        show: false,
        type: "plugin",
        ...(manifest.moduleOptions || {})
      });

      // Add to module groups
      const moduleGroups = AppData.get('module_group') || {};
      const category = manifest.category || 'utilities';

      // Create category if not exists
      if (!moduleGroups[category]) {
        moduleGroups[category] = {
          title: `module_group.${category}.title`,
          modules: []
        };
      }

      // Add module to category if not already present
      if (!moduleGroups[category].modules.includes(manifest.id)) {
        moduleGroups[category].modules.push(manifest.id);
      }

      // Save updated module groups
      AppData.set('module_group', moduleGroups);

      // Auto-load translations
      if (manifest.translations) {
        Object.entries(manifest.translations).forEach(([lang, translations]) => {
          this.i18n.global.mergeLocaleMessage(lang, translations);
        });
      }

      // Log installation
      $dev.write("plugin_install", manifest.id);

      return true;
    } catch (error) {
      console.error(`Failed to install plugin ${plugin.manifest.id}:`, error);
      return false;
    }
  },

  // Remote plugin installation method
  async installRemotePlugin(pluginId) {
    try {
      // Fetch plugin manifest from remote plugin store
      const manifest = await this.fetchPluginManifest(pluginId);

      // Download plugin module dynamically
      const PluginClass = await this.downloadPluginModule(manifest);

      // Create plugin instance
      const pluginInstance = new PluginClass();

      // Register and install plugin
      if (this.register(pluginId, pluginInstance)) {
        await this.installPlugin(pluginInstance);
        return pluginInstance;
      }

      return null;
    } catch (error) {
      console.error('Remote plugin installation failed:', error);
      throw error;
    }
  },

  async init(i18n) {
    this.i18n = i18n;

    // Auto-install local plugins
    const localPlugins = [
      CounterModulePlugin
      // Add other local plugins here
    ];

    for (const PluginClass of localPlugins) {
      const plugin = new PluginClass();
      await this.installPlugin(plugin);
    }

    // Optional: Remote plugin installation
    try {
      // Uncomment and modify as needed
      // await PluginManager.installRemotePlugin('some-plugin-id');
    } catch (error) {
      console.error('Failed to install remote plugin', error);
    }
  }
}