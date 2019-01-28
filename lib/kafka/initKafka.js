'use strict';
/*
  Initialize kafka consumer and producer
*/

// Requirements
const kafka = require('kafka-node');
const filterTopicsByRole = require('./filterTopicsByRole');
const {
  getTopicMetadata,
  KafkaClientIsReady,
  fetchTopicPartitions
} = require('./kafkaHelpers');


module.exports = async sdk => {
  try {
    // Get used configs
    const { role } = sdk.configs;
    const kafkaConfigs = sdk.configs.kafka;
    // Compose topics
    const topicList = filterTopicsByRole(role, kafkaConfigs.topics);
    sdk.logger.info(`Kafka topics to consume are ${topicList.join(', ')}.`);
    // Init kafka client
    const kafkaBrokers = kafkaConfigs.hosts.join(',');
    const KafkaClient = new kafka.KafkaClient({kafkaHost: kafkaBrokers});
    // Wait until kafka client is ready
    await KafkaClientIsReady(KafkaClient);
    sdk.logger.info('Kafka client is ready.');
    // Get metadata of topics
    const metadataTopics = await getTopicMetadata(KafkaClient, topicList);
    sdk.logger.info('Get metadata of the kafka topics.');
    const topics = fetchTopicPartitions(sdk.logger, metadataTopics);
    // Init kafka consumer
    const consumer = new kafka.Consumer(KafkaClient, topics, kafkaConfigs.consumer);
    // Consumer events
    consumer
      .on('message', async message => {
        sdk.logger.debug('Received message', message);
        try {
          return await sdk.onMessage(message.topic, message.value);
        } catch(err) {
          sdk.logger.error(err.stack);
        }
      })
      .on('error', err => {
        sdk.logger.error((err && err.stack) || err);
        if (err.name === 'TopicsNotExistError') {
          throw Error(err);
        }
      });
    sdk.logger.info(`Started consumer for kafka topics ${topicList.join(', ')}.`);
    // Init kafka producer
    const producer = new kafka.Producer(KafkaClient, kafkaConfigs.producer);
    return {consumer, producer};
  } catch(err) {
    throw err;
  }
}
