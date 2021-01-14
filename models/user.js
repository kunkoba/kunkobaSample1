"use strict";
//================================
//モデルの定義
//name, email, password
//================================
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const {Schema} = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });
//仮想項目
wordSchema
  .virtual("keyword")
  .get ( function(){
    return `${this.keyword1} ${this.keyword2}`
  });
//モデルの公開
module.exports = mongoose.model('User', userSchema);
