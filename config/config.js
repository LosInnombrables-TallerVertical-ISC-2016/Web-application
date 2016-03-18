var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'parking-lot-dev'
    },
    port: 3000,
    db: 'mongodb://localhost/parking-lot-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'parking-lot-test'
    },
    port: 3000,
    db: 'mongodb://localhost/parking-lot-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'parking-lot-test'
    },
    port: 3000,
    db: 'mongodb://localhost/parking-lot-production'
  }
};

module.exports = config[env];
