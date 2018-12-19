'use strict';

// Configurations
module.exports = {
  // Server
  port: process.env.PORT || 80,
  // Logs
  logs: {
    type: process.env.LOGS || 'DEBUG_NO_SYNC'
  },
  // SDK auth key and secret
  api: {
    key: '61f48dea3d1f9cbfaea9ca01ed8f8681-1525626679999',
    secret: 'b49c9b0d76308fcaf1c8d30e722474233855eb3a3ca468e414b9f0691225ab98'
  },
  // JWT Token
  jwt: {
    secret: '93f7db1df1f22a27c8b7cc609b9d5c9b7c1dba05e13f029a9e4612066c42775c86305e9d57c8c92cd30a789bc31ec011d135dc33508707c4e41512dc7502aeb8',
    expire: '2h'
  },
  // MongoDB
  mongodb: {
    port: process.env.DB_PORT || 27017,
    host: process.env.DB_HOST || '127.0.0.1',
    name: 'blockchain'
  }
};