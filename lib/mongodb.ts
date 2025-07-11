console.log("📦 ENV TEST:", process.env.HELLO);




import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ MONGODB_URI is not defined");

const options = {};
const client = new MongoClient(uri, options);
const dbName = "blogs";


export async function saveFullText(url: string, fullText: string) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fulltexts");
    await collection.insertOne({ url, fullText, createdAt: new Date() });
    console.log("✅ MongoDB: Full blog saved!");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  } finally {
    await client.close();
  }
}
