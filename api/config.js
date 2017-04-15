module.exports = {
  /**
   * The running environment that the app is running on.
   * Can be one of `development`, `testing`, and `production`.
   *
   * @type {'development' | 'testing' | 'production}
   */
  environment: process.env.NODE_ENV,
  /**
   * Whether or not the app is running in production environment.
   * A shorthand for `config.environment === 'production'`.
   *
   * @type {boolean}
   */
  production: process.env.NODE_ENV === 'production',
  express: {
    /**
     * A port number that the API server is listening to.
     *
     * @type {number | string}
     */
    port: process.env.EXPRESS_PORT || 3000,
    /**
     * An IP address that the API server is listening to.
     *
     * @type {string}
     */
    ip: process.env.EXPRESS_IP || '127.0.0.1',
  },
  mongodb: {
    /**
     * A port number that the MongoDB server is running on.
     *
     * @type {number | string}
     */
    port: process.env.MONGODB_PORT || 27017,
    /**
     * An host address that the MongoDB server is running on.
     *
     * @type {string}
     */
    host: process.env.MONGODB_HOST || 'mongodb://db_ww',
    dbName: process.env.MONGODB_DBNAME || 'wongwan-dev'
  },
};
