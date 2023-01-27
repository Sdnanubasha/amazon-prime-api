let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const KidModel = require('../models/kids-model')
let db;

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
})
const GetMystuffKids = (req, res) => {
    const prime_id = Number(req.query.id);
    let query = {};
    if (prime_id) {
      query.k_id = prime_id;
    }
    db.collection("mystuff-kids")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }

  const DeleteKid = (req,res) =>{
    KidModel.deleteOne({k_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

  module.exports = {
    GetMystuffKids,DeleteKid
  }