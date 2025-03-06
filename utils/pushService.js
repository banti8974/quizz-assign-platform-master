const admin = require('firebase-admin');
require('dotenv').config();

let serviceAccount = require("./many-project-2e42a-firebase-adminsdk-f8254-3cc69f6b86.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized successfully!');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  //Handle error appropriately.
  process.exit(1);
}


// interface NotificationPayload {
//   title: string;
//   body: string;
//   data?: { [key: string]: string }; // Add data payload
// }

const sendPushNotification = async (deviceToken, payload) => {
  try {
    const message = {
      token: deviceToken,
      notification: payload.notification,
      data: payload.data, // Include optional data payload
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error("Error sending message:", error);
    if (error.response) {
      // Handle specific error codes here (e.g., device not registered)
      console.error("HTTP Error Response:", error.response.data);
    }
    throw new Error(`Push notification failed: ${error.message}`);
  }
};

module.exports = { sendPushNotification };