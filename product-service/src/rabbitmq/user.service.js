const amqp = require('amqplib');
const { connect } = require('./connection');
const uuid = require('uuid');

class UserService {
  static async getAll() {
    const channel = await connect();
    const queue = 'user_get_all_queue';
    const correlationId = uuid.v4();
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    return new Promise((resolve, reject) => {
        channel.consume(replyQueue.queue, (msg) => {
            if (msg.properties.correlationId === correlationId) {
                resolve(JSON.parse(msg.content.toString()));
                channel.close();
            }
        }, { noAck: true });

        channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify({})),
            { correlationId, replyTo: replyQueue.queue }
        );
    });
}
}

module.exports = UserService;