import { google } from "googleapis";
import express from "express";

var router = express.Router();
const reserved_routes = ["/", "/refresh"];

const getRoutes = async (oAuth2Client) => {
  try {
    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.spreadsheet_id,
      range: "Routes!A2:B",
    });
    const routePairs = response.data.values;
    return routePairs;
  } catch (e) {
    res.status(500).send(err);
  }
};

const setupRoutes = async (oAuth2Client, app) => {
  const newRouter = express.Router();
  let routePairs = await getRoutes(oAuth2Client);
  if (routePairs !== null && routePairs.length) {
    newRouter.get("/refresh", (req, res) => {
      setupRoutes(oAuth2Client, app);
      res.json({ message: "Success!" });
    });
    newRouter.get("/", (req, res) => {
      res.status(200).send('ScottyLabs Dynamic Routes API');
    })
    newRouter.get("/*", (req, res) => {
      const path = req.originalUrl;
      try {
        const found = routePairs.some((entry) => {
          const route = entry[0];
          const location = entry[1];
          if (reserved_routes.includes(route)) return false;
          if (path === route) {
            res.redirect(location);
            return true;
          }
          return false;
        });
        if (!found) {
          return res.status(404).send("Page not found!" );
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("An internal server error occured");
      }
    });
  }
  router = newRouter;
};

export { setupRoutes, router };
