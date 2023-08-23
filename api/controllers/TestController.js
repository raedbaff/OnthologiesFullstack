const nodemailer = require("nodemailer");
module.exports={
    async sendMail() {
      console.log("sending mail now ...")
        // Replace these with your actual Mailtrap credentials
        const SMTP_HOST = "sandbox.smtp.mailtrap.io";
        const SMTP_PORT = 587;
        const SMTP_USERNAME = "f2bfa53293821e";
        const SMTP_PASSWORD = "8f1f274808ed1b";
      
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          auth: {
            user: SMTP_USERNAME,
            pass: SMTP_PASSWORD,
          },
        });
        const confirmationLink = "http://localhost:1337/confirm/";
        const mailOptions = {
          from: "raedbaffoun90@gmail.com",
          to: "to@example.com", // Replace with your Mailtrap email address
          subject: "Hello World",
          html: `Click the following link to confirm your account: <a href="${confirmationLink}">Confirm account</a>`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }

}



