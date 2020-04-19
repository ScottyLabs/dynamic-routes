import { google } from 'googleapis';
import readline from 'readline';
import fs from 'fs';

export const authorize = (client_secret, client_id, redirect_uri) => {
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uri);
  const token = {
    access_token: process.env.access_token,
    refresh_token: process.env.refresh_token,
    token_type: "Bearer",
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
  }
  oAuth2Client.setCredentials(token);
  // getNewToken(oAuth2Client);
  return oAuth2Client;
}

const TOKEN_PATH = "token.json";

export const getNewToken = (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      return;
    });
  });
}