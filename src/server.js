process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

connectDB();

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
