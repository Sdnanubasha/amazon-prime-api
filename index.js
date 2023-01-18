let express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//require("./config");
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
let User = require("./User");
let db;

//middle wares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.post('/register', async (req,res)=>{
    let user =new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
    console.log(result);
})
app.post('/login', async (req,res)=>{
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select('-password');
        if(user){
            res.send(user);
            console.log(user);
        }else{
            res.send({messege:"credentials are not match !!!"});
        }
    }
    else{
        res.send({messege:"credentials are not match !!!"});
    }

})

app.get("/amazon-prime", (req, res) => {
  const prime_id = Number(req.query.id);
  let query = {};
  if (prime_id) {
    query.category_id = prime_id;
  }
  db.collection("amazon_prime")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
//amazon_original/////////////////////////////////////////////////////////////////
app.get("/amazon-originals", (req, res) => {
  const originals_id = Number(req.query.id);
  let query = {};
  if (originals_id) {
    query.a_o_id = originals_id;
  }
  db.collection("amazon_originals")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//amazon movies//////////////////////////////////////////////////////////////////
app.get("/amazon-movies", (req, res) => {
  const movies_id = Number(req.query.id);
  let query = {};
  if (movies_id) {
    query.m_id = movies_id;
  }
  db.collection("movies")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//amazon tv/////////////////////////////////////////////////////////////////////
app.get("/amazon-tv", (req, res) => {
  const tv_id = Number(req.query.id);
  let query = {};
  if (tv_id) {
    query.t_id = tv_id;
  }
  db.collection("tv")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//amazon kids///////////////////////////////////////////////////////////////////
app.get("/amazon-kids", (req, res) => {
  const kids_id = Number(req.query.id);
  let query = {};
  if (kids_id) {
    query.k_id = kids_id;
  }
  db.collection("kids")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//amazon anime/////////////////////////////////////////////////////////////////
app.get("/amazon-anime", (req, res) => {
  const anime_id = Number(req.query.id);
  let query = {};
  if (anime_id) {
    query.a_id = anime_id;
  }
  db.collection("anime")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//port
const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.mongoUrl || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority'
// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
  if(err) console.log('Error while connecting');
  db = dc.db('project');
  app.listen(PORT,() => {
      console.log(`Server is running on port ${PORT}`)
  })
})
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });
