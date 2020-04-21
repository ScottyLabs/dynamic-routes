import { google } from 'googleapis';

const routes = (oAuth2Client, app) => {
  const sheets = google.sheets({version: 'v4', auth: oAuth2Client});
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.spreadsheet_id,
    range: 'Routes!A2:B',
  }, (err, response) => {
    if (err) return console.log(err);
    let routePairs = response.data.values;
    if (routePairs != null && routePairs.length) {
      routePairs.map((entry) => {
        const route = entry[0];
        const location = entry[1];
        app.get(route, (req, res) => {
          res.redirect(location);
        });
      });
    }
    app.get('/refresh', (req, res) => {
      routes(oAuth2Client, app);
      res.json({ message: 'Success!' })
    });
  });
  
};

export default routes;