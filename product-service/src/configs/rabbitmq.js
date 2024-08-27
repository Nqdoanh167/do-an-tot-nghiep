// user-service/rabbitmq.js
const amqp = require('amqplib');

async function sendMessage(queue, message) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent message: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error in sendMessage:', error);
  }
}

async function receiveMessage(queue) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in ${queue}`);
    
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(`Received message: ${messageContent}`);
        // Xử lý thông điệp ở đây
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in receiveMessage:', error);
  }
}

module.exports = { sendMessage, receiveMessage };
