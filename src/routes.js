import { google } from 'googleapis';

const routes = (oAuth2Client, app) => {
  const sheets = google.sheets({version: 'v4', auth: oAuth2Client});
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.spreadsheet_id,
    range: 'Routes!A2:B',
  }, (err, routePairs) => {
    if (err) return console.log(err);
    if (routePairs != null && routePairs.length) {
      routePairs.map((entry) => {
        const route = entry[0];
        const location = entry[1];
        app.route(route).get((req, res) => {
          res.redirect(location);
        });
      });
    }
    app.route('/refresh', (req, res) => {
      routes(oAuth2Client, app);
    });
  });
  
};

export default routes;