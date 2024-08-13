const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./javascripts/movies.db");

app.get("/videos", (req, res) => {
  db.all("SELECT * FROM videos ORDER BY RANDOM() LIMIT 4", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render("home", { videos: rows });
  });
});
