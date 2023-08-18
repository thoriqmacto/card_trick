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
app.get("/:param*", async (req, res) => {
  // Get the request parameter from URL
  const nameParam = req.url.slice(1).toLowerCase();

  try {
    await client.connect();

    if (nameParam === "deleteall") {
      const result = await collection.deleteMany({});
      res.send("Database Reset \n Total Data Deleted: " + result.deletedCount);
    } else {
      const query = { name: nameParam };

      try {
        const result = await collection.find(query).toArray();

        if (result.length) {
          // Construct card data
          const card = result[result.length - 1].card + ".png";
          res.sendFile(path.join(__dirname + "/public/cards/" + card));
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        console.error(err);
        res.send("Error retrieving data");
      }
    }
  } catch (err) {
    console.error(err);
    res.send("Error connect to db");
  } finally {
    client.close();
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
