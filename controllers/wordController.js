"use strict";
const Word = require('../models/word');
//================================
//関数
const getInstance = (req) => {
  const instance = new Word({
    keyword1: req.body.keyword1,
    keyword2: req.body.keyword2,
    discription: req.body.discription,
    url: req.body.url
  });
  return instance;
};
//================================
//コントロールを公開
//  req.params.id; url/:id URLパラメータ
//  res.locals.redirect = "/search"
module.exports = {
  getAll : (req, res, next) => {
    console.log("getAll");
    Word.find({})
      .then( (words) => {
        res.locals.words = words;
        next();
      })
      .catch( (error) => {
        next(error);
      })
  },
  getAllView: (req, res) => {
    console.log("getAllView");
    res.render("word/getAll", {title: "一覧画面"});
  },
  getOne: (req, res, next) => {
    console.log("getOne");
    let id = req.params.id;
    Word.findById(id)
      .then( (words) => {
        res.locals.words = words;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },
  getOneView: (req, res) => {
    console.log("getOneView");
    res.render("word/search", {title: "詳細画面"});
  },
  createView: (req, res) => {
    console.log("createView");
    req.flash("createView", `作成画面を表示しました。`);
    res.render("word/create", {
      title: "作成画面",
      flashMessages: req.flash(),
      kunkoba: req.app.locals.kunkoba
    });
  },
  create: (req, res, next) => {
    console.log("create");
    const instance = getInstance(req);
    console.log(instance);
    Word.create(instance)
      .then( (words) => {
        req.flash("success", "正常に登録処理は完了しました。");
        res.locals.redirect = "/word/create";
        res.locals.words = words;
        next();
      })
      .catch( (err) => {
        req.flash("error", `エラー： ${err.message}`); //セッションを経由して表示
        next(err);
      })
  },
  updateView: (req, res) => {
    console.log("editView");
    res.render("word/search", {title: "編集画面"});
  },
  update: (req, res, next) => {
    console.log("update");
    let id = req.params.id;
    const instance = getInstance(req);
    Word.findByIdAndUpdate(id, {
      $set: instance
    })
      .then( (w) => {
        res.locals.redirect = "/search"
        res.locals.words = w;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },
  deleteView: (req, res) => {
    console.log("editView");
    res.render("word/search", {title: "編集画面"});
  },
  delete: (req, res, next) => {
    console.log("delete");
    let id = req.params.id;
    Word.findByIdAndRemove(id, {
      $set: instance
    })
      .then( () => {
        res.locals.redirect = "/search"
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },
  redirectView: (req, res, next) => {
    console.log("redirectViews");
    let redirectPath = res.locals.redirect;
    console.log(redirectPath);
    if (redirectPath){
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
};
