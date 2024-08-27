const amqp = require('amqplib');

let channel, connection;

const connect = async () => {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

const getChannel = () => channel;

const closeConnection = async () => {
  if (channel) await channel.close();
  if (connection) await connection.close();
};

module.exports = { connect, getChannel, closeConnection };
