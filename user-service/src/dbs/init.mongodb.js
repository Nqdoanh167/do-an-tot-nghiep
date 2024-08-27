/** @format */

'use strict';

const mongoose = require('mongoose');
const {countConnect}=require('../helpers/check.connect');
const {db:{host,port,name}}=require('../configs/config.mongodb');
const connectString = `mongodb://${host}:${port}/${name}`;


class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    mongoose
      .connect(connectString,{
        maxPoolSize:50
      })
      .then(() => {
        console.log('Connected to MongoDB Success');
        // countConnect();
      })
      .catch((err) => {
        console.log('Error connecting to MongoDB', err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
