"use strict";
const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
//controller
const homeController = require("./controllers/homeController");
const wordController = require("./controllers/wordController");
//================================
//初期設定
//　_method=PUTとすると、GET、POSTメソッドをPUTメソッドと解釈させることができる
router.use(
  methodOverride("_method", {
    methods: ["GET", "POST"]
  })
);
//================================
//ユーザ認証
//cookie-parserをミドルウェアとして設定
router.use(cookieParser("secret_passcode"));
//express-sessionをミドルウェアとして設定
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
//connect-flashをミドルウェアとして設定
router.use(connectFlash());
//フラッシュメッセージをresのローカル変数のflashMessagesに代入　※１
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
//================================
//ルーティング設定
router.get("/word/create", wordController.createView);
router.post("/word/create", wordController.create, wordController.redirectView);
router.get("/word/getAll", wordController.getAll, wordController.getAllView);
//================================
module.exports = router;
