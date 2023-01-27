let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const TvModel = require('../models/tv-model');
let db;

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
})
const GetMystuffTv = (req, res) => {
    const prime_id = Number(req.query.id);
    let query = {};
    if (prime_id) {
      query.t_id = prime_id;
    }
    db.collection("mystuff-tvs")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }

  const DeleteTv = (req,res) =>{
    TvModel.deleteOne({t_id: req.params.id}).then(
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
    GetMystuffTv,DeleteTv
  }