/*
 * Card trick guessing using NodeJs and MongoDB
 *
 */

// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient, Db } = require("mongodb");
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || "cards";

// Initialize body-parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define MongoDB connection
const client = new MongoClient(URI, { useUnifiedTopology: true });
const db = client.db(DB_NAME);
const collection = db.collection("names");

// Secret - GET
// Required data: none
// Optional data: none
app.get("/secret", (req, res) =>
  res.sendFile(path.join(__dirname, "public/secret.html"))
);

// Secret - POST
// Required data: name, card
// Optional data: none
app.post("/secret", async (req, res) => {
  try {
    await client.connect();

    const entry = {
      name: req.body.name.toLowerCase().trim().replace(/\s+/g, "_"),
      card: req.body.number + "_of_" + req.body.suit,
    };

    await collection.insertOne(entry);
    // res.status(201).json({ message: "Data saved successfully" });
    res.send("Data saved successfully");
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Error saving data" });
    res.send("Error saving data");
  } finally {
    // Ensures that the client will close when you finish/error
    client.close();
  }
});

// Any - GET
// Required data: none
// Optional data: none
app.get(":param*", async (req, res) => {
  // Get the request parameter from URL
  const nameParam = req.url.slice(1).toLowerCase();

  // Connect to the DB
  try {
    await client.connect();

    // If nameParam == "deleteall" perform database resetting
    if (nameParam === "deleteall") {
      await collection.remove({});
      res.send("Database Reset");
    } else {
      // Search the nameParam to the db
      collection.find({ name: nameParam }).toArray((err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length) {
          // Get card data from db
          const card = result[result.length - 1].card + ".png";
          res.sendFile(path.join(__dirname + "/public/cards/" + card));
        } else {
          res.sendStatus(404);
        }
      });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Error retreiving data" });
    res.send("Error retreiving data");
  } finally {
    client.close();
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
