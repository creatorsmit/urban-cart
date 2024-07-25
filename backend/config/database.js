const mongoose = require("mongoose");
require("dotenv").config();
const { addDefaultAdmin } = require("../scripts/defaultUser");
const keys = require("../keys/keys");
mongoose.set("strictQuery", false);
MONGODB_URI = keys.MONGODB_URL;
console.log("MONGODB URL......", MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", async () => {
  console.log("Database Connection Established.");
  // add default user
  await addDefaultAdmin();
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb Connection failed! ", err);
  mongoose.disconnect();
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection Opened!");
});
mongoose.connection.on("reconnected", () => {
  console.log("MongoDB Reconnected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconected!");
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

module.export = mongoose;
