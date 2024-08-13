const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const fs = require("node:fs");
const path = require("path");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();

//creation database :
const {
  sequelize,
  Users,
  ProfileUser,
  ProfileIcon,
  Movies,
  videos,
} = require("./models");

// Synchroniser la base de données (fonction ITFE)
(async () => {
  try {
    await sequelize.sync({ force: true }); // force true  = reset db a chaque lancement
    const userTemporaire = require("./JSONData/userTemp.json");
    for (const object of userTemporaire) {
      await Users.create(object);
    }

    const iconTemporaire = require("./JSONData/iconTemp.json");
    for (const object of iconTemporaire) {
      await ProfileIcon.create(object);
    }

    const userProfileTemp = require("./JSONData/userProfileTemp.json");
    for (const object of userProfileTemp) {
      await ProfileUser.create(object);
    }

    const moviesTemp = require("./JSONData/moviesTemp.json");
    for (const object of moviesTemp) {
      await Movies.create(object);
    }
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

//debut de l'APP

const app = express();
app.use(
  session({
    secret: "iciChaineCharacteresCryptage", // a changer régulierement
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
      secure: false, //http vs https
      maxAge: 60 * 60 * 1000, //ici a modifier par ça , la durée de la session est de 1 H
    },
  })
);

//app.use((req, res, next) => {
//console.log(req.session);
//}); // voir session creation

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cookieParser());
app.use(express.static("public")); // pour les images , fichiers static

app.set("view engine", "pug");
app.set('views', './views');

//les pages dans le dossier routes

const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);

const routes = require("./routes/index");
app.use(routes);

const backend = require("./routes/backend");
app.use(backend);

const testing = require("./routes/test");
app.use(testing);

const check = require("./routes/check");
app.use(check);



const profile = require("./routes/profile");
const { isUtf8 } = require("node:buffer");
app.use(profile);
// //error traitement

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

app.listen(3000, () => {
  console.log("server on");
});
