'use strict';
/*
  Initialize kafka consumer and producer
*/

// Requirements
const kafka = require('kafka-node');


// Get topic metadata
const getTopicMetadata = (KafkaClient, listTopics) => {
  return new Promise((resolve, reject) => {
    return KafkaClient.loadMetadataForTopics(listTopics, function(error, infoTopics) {
      if (error) return reject(error);
      return resolve(infoTopics);
      // console.log('%j', _.get(results, '1.metadata'));
    });
  });
}

// Check if kafka client is ready
const KafkaClientIsReady = KafkaClient => {
  return new Promise((resolve, reject) => {
    try {
      return KafkaClient.on('ready', () => resolve(true));
    } catch(err) {
      return reject(err);
    }
  });
}

// Get number of partition
const fetchTopicPartitions = (logger, topicMetadata) => {
  const tList = topicMetadata[1].metadata;
  const topics = [];
  for (let [key, value] of Object.entries(tList)) {
    const topicPartitions = Object
      .keys(value)
      .map(parseInt)
      .map(p => ({topic: key, partition: p}));
    logger.info(`Topic ${key} seems to have ${topicPartitions.length} partitions.`);
    topics.push(...topicPartitions);
  }
  return topics;
}


module.exports = async sdk => {
  try {
    // Kafka configs
    const kafkaConfigs = sdk.configs.kafka;
    // Compose topics
    const topicList = Object.values(sdk.configs.kafka.topics);
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
    sdk.logger.info(`Started consumer for topics ${topicList.join(', ')}.`);
    // Init kafka producer
    const producer = new kafka.Producer(KafkaClient, kafkaConfigs.producer);
    return {consumer, producer};
  } catch(err) {
    throw err;
  }
}
