import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import { authorize } from './gauth';

dotenv.config();
const app = express();
const port = process.env.port || 3000;

const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const redirect_uri = "urn:ietf:wg:oauth:2.0:oob";
// const oAuth2Client = authorize(client_secret, client_id, redirect_uri);

// routes(oAuth2Client, app);

app.route('/').get((req, res) => {
  res.send('ScottyLabs Dynamic Routes API');
});

app.listen(port, () =>
    console.log(`App listening on port ${port}.`)
);