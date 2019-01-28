'use strict';
/*
  Helpers for kafka consumer and producer
*/


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
  for (let [k, value] of Object.entries(tList)) {
    const topicPartitions = Object
      .keys(value)
      .map(p => parseInt(p))
      .map(p => ({topic: k, partition: p}));
    logger.info(`Topic ${k} seems to have ${topicPartitions.length} partitions.`);
    topics.push(...topicPartitions);
  }
  return topics;
}

module.exports = {
  getTopicMetadata,
  KafkaClientIsReady,
  fetchTopicPartitions
};
