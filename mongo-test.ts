import { config } from "dotenv";
import { MongoClient } from "mongodb";

// 🔥 Load .env.local file manually
config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined. Check your .env.local path or variable.");
}

const client = new MongoClient(uri);
const dbName = "blogs";

async function testMongo() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fulltexts");
    const docs = await collection.find().toArray();
    console.log("✅ Retrieved documents:", docs);
  } catch (error) {
    console.error("❌ MongoDB Test Failed:", error);
  } finally {
    await client.close();
  }
}

testMongo();
