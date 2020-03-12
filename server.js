// load .env data into process.env
require("dotenv").config({ silent: true });

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

//cookie

const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);

app.use(express.static("public"));

//cookie
app.use(
  cookieSession({
    name: "session",
    keys: ["12345A"]
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizzesRoutes = require("./routes/quizzes");
const correctAnswersRoutes = require("./routes/correctAnswers");
const scoresRoutes = require("./routes/scores");
const questionsRoutes = require("./routes/questions");
const optionsRoutes = require("./routes/options");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/quizzes", quizzesRoutes());
app.use("/api/correctAnswers", correctAnswersRoutes());
app.use("/api/scores", scoresRoutes());
app.use("/api/questions", questionsRoutes());
app.use("/api/options", optionsRoutes());
app.use("/api/login", loginRoutes());
app.use("/api/logout", logoutRoutes());

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.send('./public/index.html');
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
