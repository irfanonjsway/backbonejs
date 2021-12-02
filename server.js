const express = require("express");
const env = require("dotenv");
const dbConnection = require("./src/config/dbconnection");
const corsOptions = require("./src/config/corsOption");
const { invalidEndpoint } = require("./src/constants/error.message");

env.config();
const app = express();
const port = process.env.PORT;
app.use(corsOptions);
app.use(express.json());
dbConnection();

/* -------------- */
app.use(express.static(__dirname + "/public"));

/* routes */
const blogsRoute = require("./src/routes/blog.route");
app.use("/api", blogsRoute);

app.use("/*", (req, res) => {
  return res.status(400).json({
    message: invalidEndpoint,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
