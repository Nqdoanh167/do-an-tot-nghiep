require('dotenv').config();
const {app:{port}}=require('./src/configs/config.mongodb');
const app = require("./src/app");



const PORT=port || 3000;
const service=app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
})

process.on('SIGINT', () => {
  service.close(() => {
    console.log('Exit Service Express');
    // notify.send(ping...)
  });
})