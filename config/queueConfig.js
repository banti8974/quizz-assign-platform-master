const { Queue, Worker } = require("bullmq");
const Redis = require("ioredis");
require('dotenv').config();

const redisConnection = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

module.exports = { Queue, Worker, redisConnection };
