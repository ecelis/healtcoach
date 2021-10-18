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

    switch(req.method) {
        case 'POST':
            try {
                result = await collection.insertOne(req.body);
            } finally {
                client.close();
            }
            break;
        case 'GET':
            const { uid } = req.query
            try {
                result = await collection.find({ userId: uid }).toArray();
            } finally {
                client.close();
            }
            break;
        default:
            client.close();
            result = { error: "Unsupported method" }
    }   

    res.json(result);
}