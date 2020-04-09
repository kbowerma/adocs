/* Express middleware with OAuth to server static site generated from mkdocs
 * Kyle Bowerman
 * 3/26/2020
*/

const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const port = 8000;

var path = require('path');

app.use(morgan("dev"));
app.use(helmet());

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

//app.use(express.static(join(__dirname, "site")));
//app.use('/site', express.static('site'))

app.use('/site', express.static(path.join(__dirname, 'site')))


app.get("/hello", (_, res) => {
  res.send('hello world')
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
})

app.get('/logout', function (req, res) {
  res.sendFile(path.join(__dirname, 'logout.html'))
})




process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;

app.listen(port, () => console.log(`Server running on port ${port}`));
