const express = require("express");
const dotEnv = require("dotenv");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connection");
  })
  .catch((err) => {
    console.log("error connecting ", err);
  });

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
