/*
 * Card trick guessing using NodeJs and MongoDB
 *
 */

// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const {MongoClient} = require("mongodb");
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME || "local";

// Initialize body-parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Secret - GET
// Required data: none
// Optional data: none
app.get("/secret", (req, res) =>
  res.sendFile(path.join(__dirname, "public/secret.html"))
);

// Secret - POST
// Required data: name, card
// Optional data: none
app.post("/secret", (req, res) => {
  // Connect to the db
  MongoClient.connect(
    URI + DB_NAME,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        console.log(err);
      } else {
        // initilize collection
        const db = client.db(DB_NAME);
        const collection = db.collection("names");

        // Construct data required to process by using body-parser
        const entry = {
          name: req.body.name.trim().toLowerCase(),
          card: req.body.number + "_of_" + req.body.suit,
        };

        // Insert the data
        collection.insertOne(entry, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Insertd into database");
          }
        });

        // Close the db connection
        client.close();
      }
    }
  );
});

// Any - GET
// Required data: none
// Optional data: none
app.get(":param*", (req, res) => {
  // Get the request parameter from URL
  const nameParam = req.url.slice(1).toLowerCase();

  // Connect to the DB
  MongoClient.connect(URI, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      // Initialize collection
      const db = client.db(DB_NAME);
      const collection = db.collection("names");

      // If nameParam == "deleteall" perform database resetting
      if (nameParam === "deleteall") {
        collection.remove({});
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

          // Close the connection
          client.close();
        });
      }
    }
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
