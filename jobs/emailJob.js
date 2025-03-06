const { Queue, redisConnection } = require("../config/queueConfig");
const { sendEmailNotification } = require("../utils/emailService");

const emailQueue = new Queue("emailQueue", { connection: redisConnection });

/**
 * Add a scheduled email job to the queue.
 * @param {string} email - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email content
 * @param {number} delay - Delay in milliseconds (e.g., 24 hours before the quiz)
 */
const scheduleEmail = async (email, subject, text, delay) => {
  await emailQueue.add("sendEmail", { email, subject, text }, { delay });
};

// Process email jobs
const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, text } = job.data;
    await sendEmailNotification([email], subject, text);
    console.log(`Scheduled Email Sent: ${email}`);
  },
  { connection: redisConnection }
);

emailWorker.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err);
});

module.exports = { scheduleEmail };
