const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const url = require('url');
const http = require('http');

const clientId = '208338261650-sd6nb4g95gmltpalbmu2ceki3kb7j66i.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'http://localhost:1337/oauth2callback'; // Should match the redirect URL you used

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

const server = http.createServer(async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const query = urlParts.query;
  const authorizationCode = query.code; // Extract the authorization code from the URL parameters

  try {
    const { tokens } = await oAuth2Client.getToken(authorizationCode);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'raedbaffoun90@gmail.com',
        clientId,
        clientSecret,
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token,
        expires: tokens.expiry_date,
      },
    });

    const mailOptions = {
      from: 'raedbaffoun90@gmail.com',
      to: 'raedbaffoun90@gmail.com',
      subject: 'Test Email with OAuth2',
      text: 'This is a test email sent from Nodemailer using OAuth2 authentication.',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Send a response to the client indicating that the process is complete
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Authorization complete. You can close this window.');
  } catch (error) {
    console.error('Error:', error);
    // Send an error response to the client
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('Error occurred during authorization. Please try again.');
  }
});

const port = 1337;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
