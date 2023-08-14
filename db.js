const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "local";

// Create a new MongoClient
const client = new MongoClient(url, {
  directConnection: true,
  serverSelectionTimeoutMS: "2000",
  appName: "mongoCheck",
});

// Use connect method to connect to the Server
client.connect(function (err) {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Now you can perform operations on the database
  // For example, you can insert documents into a collection:
  const collection = db.collection("names");
  collection.insertOne({ key: "value" }, function (err, result) {
    if (err) {
      console.error("Error inserting document:", err);
    } else {
      console.log("Inserted document with _id:", result.insertedId);
    }

    // Close the connection
    client.close();
  });
});
