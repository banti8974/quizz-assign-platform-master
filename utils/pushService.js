const admin = require('firebase-admin');
require('dotenv').config();

// let serviceAccount = require("./many-project-2e42a-firebase-adminsdk-f8254-3cc69f6b86.json");

let serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_SERVICE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_SERVICE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_SERVICE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_SERVICE_CLIENT_CERT_URL,
  "universe_domain": "googleapis.com"
};


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