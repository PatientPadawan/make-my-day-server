const { google } = require('googleapis');
const { EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_CLIENT_REFRESH_TOKEN } = require('../config');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground', // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: EMAIL_CLIENT_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

module.exports = accessToken;
