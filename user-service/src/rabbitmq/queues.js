const { getChannel } = require('./connection');

const setupQueue = async (queueName) => {
  const channel = getChannel();
  await channel.assertQueue(queueName, { durable: true });
};

const consumeQueue = async (queueName, handler) => {
  const channel = getChannel();
  await setupQueue(queueName);
  channel.consume(queueName, handler, { noAck: false });
};

const sendToQueue = async (queueName, message, options = {}) => {
  const channel = getChannel();
  await setupQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(message), options);
};

module.exports = { setupQueue, consumeQueue, sendToQueue };
