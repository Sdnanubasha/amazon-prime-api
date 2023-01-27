const React = require('express');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const OriginalModel = require('../models/original-model');
let db;

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
})
const GetMystuffOriginals = (req, res) => {
    let prime_id = Number(req.query.id);
    let query = {};
    if (prime_id) {
      query.a_o_id = prime_id;
    }
    db.collection("mystuff-originals")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }
  const DeleteOriginal = (req,res) =>{
    OriginalModel.deleteOne({a_o_id: req.params.id}).then(
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
    GetMystuffOriginals,DeleteOriginal
  }