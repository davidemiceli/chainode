'use strict';

// Export a nats server url for connection to the cluster
module.exports = (server_port, token) => {
  if (!server_port) throw Error('Missing NATS server port parameter.');
  if (!token) throw Error('Missing NATS token for authentication.');
  const NATS_SERVERS = [
    '172.25.255.10',
    '172.25.255.11',
    '172.25.255.12'
  ];
  const selected_server = NATS_SERVERS[Math.floor(Math.random()*NATS_SERVERS.length)];
  return `nats://${token}@${selected_server}:${server_port}`;
};
