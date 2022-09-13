const { MongoClient } = require("mongodb");
const DB_NAME = "sampleAirbnb";
const COLL_NAME = "listingsAndReviews";

const docs = [
  {
    name: "Lovely Loft 1",
    summary: "A charming loft in Paris",
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    name: "Beautiful Beach House",
    summary: "A charming loft in Paris",
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    name: "House of Fire",
    summary: "A charming loft in Paris",
    bedrooms: 4,
    bathrooms: 2,
  },
];

async function main() {
  const uri =
    "mongodb+srv://root:root@cluster0.5am1e00.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.info("connected");
    // list databases
    // await listDatabases(client);

    // inserting one document
    // await createListing(client, docs[0]);

    // inserting multiple documents
    // await createMultipleListing(client, docs);

    // reading one value
    await findListingByName(client, "Beautiful Beach House");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

async function createListing(client, newListing) {
  const result = await client
    .db(DB_NAME)
    .collection(COLL_NAME)
    .insertOne(newListing);
  console.log(result);
}

async function createMultipleListing(client, newListings) {
  const results = await client
    .db(DB_NAME)
    .collection(COLL_NAME)
    .insertMany(newListings);

  console.log(
    `${results.insertedCount} new listings created with the following id(s):`
  );
  console.log(results.insertedIds);
}

async function findListingByName(client, listingName) {
  const result = await client
    .db(DB_NAME)
    .collection(COLL_NAME)
    .findOne({ name: listingName });

  if (result) {
    console.log(
      `found a listing in the collection with the name ${listingName}:`
    );
    console.log(result);
  } else {
    console.log(`No results found with the name ${listingName}`);
  }
}

main().catch(console.error);
