'use strict';
/*
  Initialize Kafka consumer and producer
*/

// Requirements
const kafka = require('kafka-node');


module.exports = sdk => {
  return new Promise((resolve, reject) => {
    try {
      // Kafka configs
      const kafkaConfigs = sdk.configs.kafka;
      // Compose topics
      const partitionsPerTopic = sdk.configs.kafka.partitionsPerTopic;
      const topics = [];
      for (const t of Object.values(sdk.configs.kafka.topics)) {
        sdk.logger.info(`Starting consumer for the topic ${t} on ${partitionsPerTopic} partitions.`);
        for (let i=0; i<partitionsPerTopic; i++) {
          topics.push({topic: t, partition: i});
        }
      }
      // Init Kafka client
      const kafkaBrokers = kafkaConfigs.hosts.join(',');
      const KafkaClient = new kafka.KafkaClient({kafkaHost: kafkaBrokers});
      KafkaClient.on('ready', function() {
        sdk.logger.info('Kafka client is ready.');
        // Init Kafka consumer
        const consumer = new kafka.Consumer(KafkaClient, topics, kafkaConfigs.consumer);
        // Consumer events
        consumer
          .on('message', async function(message) {
            sdk.logger.debug('Received message', message);
            try {
              return await sdk.onMessage(message.topic, message.value);
            } catch(err) {
              sdk.logger.error(err.stack);
            }
          })
          .on('error', function(err) {
            sdk.logger.error((err && err.stack) || err);
          });
        // Init Kafka producer
        const producer = new kafka.Producer(KafkaClient, kafkaConfigs.producer);
        return resolve({consumer, producer});
      });
    } catch(err) {
      return reject(err);
    }
  });
}
