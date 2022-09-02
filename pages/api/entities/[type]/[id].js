import client from "../../../../lib/mongonpm";
const { ObjectId } = require('mongodb');

export default async (req, res) => {
    let method = req.method;
    let {id, type} = req.query;
    await client.connect();
    const db = client.db("metacrud");

    switch (method) {
        case "GET":
            try{                
                const entity = await db.collection(`${type}`).find({ _id: ObjectId(id) }, {projection:{_id:0}}).toArray();
                res.send(entity[0]);                
            }
            catch(e){
                res.status(500).send({error: e.message});
            }
            break;
        case "DELETE":
            try{
                const response = await db.collection(`${type}`).deleteOne({_id: ObjectId(id)});
                res.send(response);
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;
        case "PUT":
            try{
                const response = await db.collection(`${type}`).updateOne({_id: ObjectId(id)}, {$set: req.body});
                res.status(200).send(response);
            }catch(e){
                res.status(500).send({error: e.message});
            }
            break;
    }
}