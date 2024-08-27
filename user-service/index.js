require('dotenv').config();
const {app:{port}}=require('./src/configs/config.mongodb');
const app = require("./src/app");
const { receiveMessage } = require('./src/configs/rabbitmq');
const { UserModel } = require('./src/models');
const { connect } = require('./src/rabbitmq/connection');
const { consumeQueue } = require('./src/rabbitmq/queues');



const startConsumer = async () => {
  await connect();
  await consumeQueue('user_get_all_queue');
};

startConsumer().catch(console.error);

const PORT=port || 3000;
const service=app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
})

process.on('SIGINT', () => {
  service.close(() => {
    console.log('Exit Service Express');
    // notify.send(ping...)
  });
})