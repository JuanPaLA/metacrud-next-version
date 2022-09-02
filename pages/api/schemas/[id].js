import client from "../../../lib/mongonpm";
const { ObjectId } = require('mongodb');

export default async (req, res) => {
    let method = req.method;
    let id = req.query.id;
    await client.connect();
    const db = client.db("metacrud");

    switch (method) {
        case "GET":
            try{
                if(ObjectId.isValid(id)){                    
                    const response = await db.collection('schemas').findOne({_id: ObjectId(id)});
                    res.send( response);
                }else{
                    const schema = await db.collection('schemas').find({ [`${id}`] : { $exists : true } }, {projection:{_id:0}}).toArray();
                    res.send(schema[0][id]);
                }
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;
        case "DELETE":
            try{
                const response = await db.collection('schemas').deleteOne({_id: ObjectId(id)});
                res.send(response);
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;
    }
}