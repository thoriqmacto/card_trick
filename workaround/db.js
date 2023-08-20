const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "local";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  client.close();

  // Now you can perform operations on the database
  // For example, you can insert documents into a collection:
  // const collection = db.collection("names");
  // collection.insertOne({ key: "value" }, function (err, result) {
  //   if (err) {
  //     console.error("Error inserting document:", err);
  //   } else {
  //     console.log("Inserted document with _id:", result.insertedId);
  //   }

  //   // Close the connection
  //   client.close();
  // });
});
