const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection URL
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "mydatabase";

// Connect to MongoDB
MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB");
  const db = client.db(dbName);

  // Define a route to handle POST requests
  app.post("/data", async (req, res) => {
    try {
      const data = {
        key: req.body.key,
        value: req.body.value,
      };

      await db.collection("data").insertOne(data);
      res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving data" });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
