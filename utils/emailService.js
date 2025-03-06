const nodemailer = require("nodemailer");

// OAuth2 configuration for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, //This is usually not needed with OAuth2, but keep it here for backward compatibility if you had previously configured it.
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: process.env.EMAIL_ACCESS_TOKEN //Optional: If you already have an access token, add it here for faster processing.
  }
});


/**
 * Sends an email notification.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email content
 */
const sendEmailNotification = async (toList, subject, mailText, mailHtml = "") => {
  try{
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: toList.join(', '), //Comma separated recipients
      subject: subject,
      text: mailText || 'Hi! There, You know I am using the NodeJS Code along with NodeMailer to send this email.', //Default text if none provided.
      html: mailHtml
    };

    //Only send html if provided, otherwise send text
    if(!mailText && !mailHtml){
      throw new Error("No text or HTML content provided for email.");
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId); //Success message with message ID for tracking
    return true; // Indicate success

  } catch (error) {
    console.error('Email sending failed:', error);
    //Consider more sophisticated error handling, like retry logic or specific error messages for different error codes.
    return false; // Indicate failure
  }
};

module.exports = { sendEmailNotification };
