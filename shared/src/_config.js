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
   * @type {ServerConfig}
   */
  server;

  constructor() {
    this.server = new ServerConfig(5174);
  }

  /**
   * @returns {Config}.
   */
  static load() {
    return new Config();
  }
}

export default Config;
