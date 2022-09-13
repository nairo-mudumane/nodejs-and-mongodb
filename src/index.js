const { MongoClient } = require("mongodb");
const DB_NAME = "sampleAirbnb";
const COLL_NAME = "listingsAndReviews";

async function main() {
  const uri =
    "mongodb+srv://root:root@cluster0.5am1e00.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.info("connected");
    // await listDatabases(client);
    // await createListing(client, {
    //   name: "Lovely Loft 2",
    //   summary: "A charming loft in Paris",
    //   bedrooms: 4,
    //   bathrooms: 2,
    // });
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

main().catch(console.error);
