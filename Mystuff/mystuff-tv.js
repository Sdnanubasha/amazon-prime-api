let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mystuffModel = require('../models/tv-model');
let db;

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
})

const createMyStuff = async (array, res) => {
    try {
      console.log(array);
      let { t_id = 0,title = 'Example',image = '',description = '',ratings = 5,releaseYear = 2018} = array[0];
      const CREATE_MySTUFF = new mystuffModel({
        t_id: t_id,
        title: title,
        image: image,
        description: description,
        rating: ratings,
        releaseYear: releaseYear
      })
  
      CREATE_MySTUFF.save(async (error,result)=>{
        console.log(result);
        if(result){
          let responseOutput = {
            status : 200,
            result : 'success',
            response: result
          }
          res.status(200).send(responseOutput);
        }else{
          let responseOutput = {
            status : 404,
            result : 'not found',
            response: result
          }
          res.status(404).send(responseOutput);
        }
      })
    } catch (error) {
      res.status(500).send("Internal Server Error:" + error);
    }
  }

const MystuffTv = async (req,res)=>{
    try{
      let mystuff_id = Number(req.query.id);
      db.collection('tv').find({t_id: mystuff_id ? mystuff_id : "nE"})
      .toArray((err,ReturnData) => {
        ReturnData.length > 0 ? createMyStuff(ReturnData,res) : res.send("No Data Available.");
      })
    }catch(e){
      res.status(500).send("Internal Server Error:" + error);
    }
  }

  module.exports = {
    MystuffTv
  }