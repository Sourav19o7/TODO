const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid.
 * @param {string} email - The recipient's email address.
 */
const sendMail = async (email, otp) => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>OTP Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td align="center" bgcolor="#4CAF50" style="padding: 20px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
              Your Verification Code
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 18px; color: #333333; margin: 0;">Hello,</p>
              <p style="font-size: 16px; color: #555555; margin: 15px 0 25px;">We received a request to verify your email address. Please use the following OTP to complete the verification process:</p>
              <p style="font-size: 24px; color: #4CAF50; text-align: center; font-weight: bold; margin: 20px 0;">${otp}</p>
              <p style="font-size: 16px; color: #555555; margin: 25px 0;">If you did not request this, you can safely ignore this email.</p>
              <p style="font-size: 16px; color: #555555; margin: 25px 0;">Thank you, <br> Second Brain</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f4f4f4" style="padding: 20px; text-align: center; font-size: 12px; color: #777777;">
              &copy; 2024 Second Brain. All rights reserved.
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    const msg = {
      to: email,
      from: 'sourav.dey0147@gmail.com',
      subject: 'Your OTP Code',
      html: htmlTemplate,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

module.exports = {
    sendMail,
};
