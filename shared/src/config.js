/**
 * Holds app configuration.
 */
export class AppConfig {
  /**
   * App name.
   * @type {string}
   */
  name = "Louvor JA";

  /**
   * App description.
   * @type {string}
   */
  description = "Coletânea e Utilidades Louvor JA";

  /**
   * App start page
   * @type {string} home, liturgy or tools.
   */
  startPage = "home";
}

/**
 * Holds server configuration.
 */
export class ServerConfig {
  /**
   * Server port. Use 0 (zero) for random.
   * @type {number}.
   */
  port = 5174;
  /**
   * Address to bind to. "0.0.0.0" to all interfaces, "127.0.0.1" to localhost.
   * @type {string}
   */
  bind = "0.0.0.0";
  /**
   * Enable server debug/logger.
   * @type {boolean}
   */
  debug = true;

  constructor(port) {
    this.port = port;
  }
}

/**
 * Holds all aplication configuration.
 */
export class Config {
  /**
   * @type {AppConfig}
   */
  app;
  /**
   * @type {ServerConfig}
   */
  server;

  constructor() {
    this.app = new AppConfig();
    this.server = new ServerConfig(5174);
  }

  /**
   * @returns {Config}.
   */
  static load() {
    return new Config();
  }
}

/**
 * @type {Config}
 */
let config = null;

/**
 * Load or return already loaded {@link Config}.
 * @returns {Config}
 */
export const CONFIG = (function () {
  if (config === null) {
    config = Config.load();
  }
  return config;
})();

export default CONFIG;
