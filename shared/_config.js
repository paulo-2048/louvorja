/**
 * Holds server configuration.
 */
export class ServerConfig {
  /**
   * Server port. Use 0 (zero) for random.
   * @type {number}.
   */
  port;

  constructor(port) {
    this.port = port;
  }
}

/**
 * Holds all aplication configuration.
 */
export default class Config {
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
