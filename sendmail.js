const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 587, // Use the port provided by Elastic Email
    secure: false, // Set this to true if using port 465
    auth: {
        user: 'raedbaffoun90@gmail.com',
        pass: 'AEF27A90EB6C895A8AFDEA3F023239A57F9A'
    }
});

// Define the email data
const mailOptions = {
    from: 'raedbaffoun90@gmail.com',
    to: 'jesterseeds@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Sails.js and Nodemailer.'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
