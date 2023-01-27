let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const MovieModel =  require('../models/movies-model');
let db;

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
})
const GetMystuffMovies = (req, res) => {
    const prime_id = Number(req.query.id);
    let query = {};
    if (prime_id) {
      query.m_id = prime_id;
    }
    db.collection("mystuff-movies")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }

  const DeleteMovie = (req,res) =>{
    MovieModel.deleteOne({m_id: req.params.id}).then(
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
    GetMystuffMovies,DeleteMovie
  }