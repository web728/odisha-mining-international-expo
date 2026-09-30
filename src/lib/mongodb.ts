import {
  MongoClient,
} from "mongodb";

declare global {
  var _mongoClientPromise:
    Promise<MongoClient> |
    undefined;
}

export default async function getMongoClient() {
  const uri =
    process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing"
    );
  }

  if (
    !global
      ._mongoClientPromise
  ) {
    const client =
      new MongoClient(uri, {
        maxPoolSize: 40,
        minPoolSize: 2,
        maxIdleTimeMS:
          30_000,
        serverSelectionTimeoutMS:
          5_000,
        connectTimeoutMS:
          10_000,
      });

    global._mongoClientPromise =
      client.connect();
  }

  return global
    ._mongoClientPromise;
}