const mongoose = require('mongoose');
const MystuffSchema = new mongoose.Schema({
    a_o_id:{type:Number,unique:true},
    title:{type:String},
    image:{type:String},
    description:{type:String},
    rating:{type:Number},
    releaseYear:{type:Number}
},{timestamps: true})

module.exports = mongoose.model("mystuff-originals", MystuffSchema);