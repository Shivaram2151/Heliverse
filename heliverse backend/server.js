const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./Routes/UserRoutes");
const teamRoutes = require("./Routes/TeamRoutes");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/heliverse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("Error connection", err));

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require("./Models/Users");
