import client from "../../../lib/mongonpm";
const { ObjectId } = require('mongodb');

async function checkSchema(db, schema){
    const collections = await client.db().listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    if(collectionNames.includes(schema)){
        return true;
    }else{
        return false;
    }
}

export default async (req, res) => {
    const {
        query: { type },
        method
    } = req;
    
    await client.connect();
    const db = client.db("metacrud");

    switch (method) {
        case "GET":
            try{                
                const response = await db.collection('schemas').find({}).toArray();
                res.send( response);
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;    
        case "POST":
            try{                                            
                const response = await db.collection('schemas').insertOne(req.body.data);
                res.send(response);                
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;
    }
}