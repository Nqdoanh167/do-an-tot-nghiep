const amqp = require('amqplib');

let channel, connection;

const connect = async () => {
  if (!connection || !channel) {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
  }
  return channel;
};

module.exports = { connect };
