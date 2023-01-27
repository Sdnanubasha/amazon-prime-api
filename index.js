let express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("./config");
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
let RegisterRoute = require ('./routes/Register');
let LoginRoute = require('./routes/Login');
let AmazonPrimeRoute = require('./routes/Amazon-prime');
let AmazonOriginalRoute = require('./routes/Amzon-originals');
let AmazonMoviesRoute = require('./routes/Amazon-movies');
let AmazonTvRoute = require('./routes/Amazon-tv');
let AmazonKidsRoute = require('./routes/Amazon-kids');
let AmazonAnimesRoute = require('./routes/Amazon-anime');

let MystuffOriginalsRoute = require('./Mystuff/mystuff-originals');
let GetMystuffOriginalsRoute = require('./GetMystuff/get-originals');

let MystuffTvRoute = require('./Mystuff/mystuff-tv');
let GetMystuffTvRoute = require('./GetMystuff/get-tv');

let MystuffMoviesRoute = require('./Mystuff/mystuff-movies');
let GetMystuffMoviesRoute = require('./GetMystuff/get-movies');

let MystuffKidsRoute = require('./Mystuff/mystuff-kids');
let GetMystuffKidsRoute = require('./GetMystuff/get-kids');

let MystuffAnimesRoute = require('./Mystuff/mystuff-anime');
let GetMystuffAnimesRoute = require('./GetMystuff/get-anime');

let db;

//middle wares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.post('/register',RegisterRoute.Register);

app.post('/login',LoginRoute.Login);

app.get("/amazon-prime",AmazonPrimeRoute.AmazonPrime);

app.get("/amazon-originals",AmazonOriginalRoute.Amazonoriginals);

app.get("/amazon-movies",AmazonMoviesRoute.AmazonMovies);

app.get("/amazon-tv",AmazonTvRoute.AmazonTv);

app.get("/amazon-kids",AmazonKidsRoute.AmazonKids);

app.get("/amazon-anime",AmazonAnimesRoute.AmazonAnimes);

app.post("/mystuff-originals",MystuffOriginalsRoute.MystuffOriginals);
app.get("/mystuff-originals",GetMystuffOriginalsRoute.GetMystuffOriginals);
app.delete("/mystuff-originals/:id",GetMystuffOriginalsRoute.DeleteOriginal);

app.post("/mystuff-tvs",MystuffTvRoute.MystuffTv);
app.get("/mystuff-tvs",GetMystuffTvRoute.GetMystuffTv);
app.delete("/mystuff-tvs/:id",GetMystuffTvRoute.DeleteTv);

app.post("/mystuff-movies",MystuffMoviesRoute.MystuffMovies);
app.get("/mystuff-movies",GetMystuffMoviesRoute.GetMystuffMovies);
app.delete("/mystuff-movies/:id",GetMystuffMoviesRoute.DeleteMovie);

app.post("/mystuff-kids",MystuffKidsRoute.MystuffKids);
app.get("/mystuff-kids",GetMystuffKidsRoute.GetMystuffKids);
app.delete("/mystuff-kids/:id",GetMystuffKidsRoute.DeleteKid);

app.post("/mystuff-animes",MystuffAnimesRoute.MystuffAnimes);
app.get("/mystuff-animes",GetMystuffAnimesRoute.GetMystuffAnimes);
app.delete("/mystuff-animes/:id",GetMystuffAnimesRoute.DeleteAnime);


//port
const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://syed:syed@cluster0.qw2hfsi.mongodb.net/project?retryWrites=true&w=majority';
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
