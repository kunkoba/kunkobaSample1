"use strict";
//================================
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
//
const router = require("./router");
const errorController = require("./controllers/errorController")
//
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample_db1',{
  useNewUrlParser: true
});
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once("open", () => {
  console.log("mongooseを使って、mongoDBに接続しました");
});
//================================
//初期設定
app.set("port", process.env.port || 3000);
app.set("view engine", "ejs");
app.use(layouts);
//================================
//静的ビューの供給
app.use(express.static("public"));
//================================
//本文の解析でURLエンコーディングとJSONパラメータの処理を行う
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//================================
//ルーティング設定
app.use("/", router);
//================================
//エラー処理
app.use(errorController.NotFound);
app.use(errorController.InternalError);
//================================
//サーバ起動、ポート監視
app.listen(app.get("port"), () => {
  console.log(`サーバを起動しました＞ http://localhost:${app.get("port")}`)
});


app.locals.kunkoba = "kunkobakunkoba";
