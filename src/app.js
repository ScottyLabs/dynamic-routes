import dotenv from 'dotenv';
import express from 'express';
import { setupRoutes, router } from './routes';
import { authorize } from './gauth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const redirect_uri = "urn:ietf:wg:oauth:2.0:oob";
const oAuth2Client = authorize(client_secret, client_id, redirect_uri);
if (oAuth2Client === null) {
  console.log("Refreshed token. Update new credentials from token.json and restart")
} else {
  setupRoutes(oAuth2Client, app);

  app.use((req, res, next) => {
    router(req, res, next);
  })
}

app.listen(port, () =>
    console.log(`App listening on port ${port}.`)
);