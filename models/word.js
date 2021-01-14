"use strict";
//================================
//モデルの定義
// keyword1, keyword2, discription, url
//================================
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const {Schema} = mongoose;
const wordSchema = new Schema({
  keyword1: {
    type: String,
    required: true,
    unique: true
  },
  keyword2: {
    type: String
  },
  discription: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
}, { timestamps: true });
//仮想項目
wordSchema
  .virtual("keyword")
  .get ( function(){
    return `${this.keyword1} ${this.keyword2}`
  });
//モデルの公開
module.exports = mongoose.model('Word', wordSchema);
