import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

const client = new MongoClient(uri, options);
const dbName = 'blogs';

export async function saveFullText(url: string, fullText: string) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('fulltexts');
  await collection.insertOne({ url, fullText, createdAt: new Date() });
}

