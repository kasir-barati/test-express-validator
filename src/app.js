const express = require("express");

const cors = require("./middleware/cors");
const { appHost, appPort } = require("./config");

const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./router/auth"));
app.use(require("./middleware/404"));
app.use(require("./middleware/error"));
app.use(require("./middleware/500"));

// app.listen(appPort, appHost, () => console.log(`Server is up on ${appPort}`));
app.listen(appPort, () => console.log(`Server is up on ${appPort}`));
