import clientPromise from "../../../lib/mongodb";

const dbHandler = async function() {
    const client = await clientPromise;
    await client.connect();
    const db = await client.db();
    const collection = await db.collection('recipes');
    return { client, collection };
}

export default async function handler(req, res) {
    let result;
    const { client, collection } = await dbHandler();

    if (req.method === 'POST') {
        try {
            result = await collection.insertOne(req.body);
        } finally {
            client.close();
        }
    } else {
        try {
            result = await collection.find({}).toArray();
        } finally {
            client.close();
        }
    }

    res.json(result);
}