"use strict";
const Word = require('../models/word');
//================================
//コントロールを公開
module.exports = {
  index : (req, res, next) => {
    console.log("index");
    Word.find()
      .then( (data) => {
        res.locals.words = data;
        next();
      })
      .catch( (error) => {
        next(error);
      })
  },
  indexView: (req, res) => {
    console.log("indexView");
    res.render("wordlist");
  },
  createIndexes: (req, res) => {
    console.log("createIndexes");
    res.render("search", {title: "ここがメイン画面だ"});
  },
  create: (req, res, next) => {
    console.log("create");
    const instance = new Word({
      keyword1: req.body.keyword1,
      keyword2: req.body.keyword2,
      discription: req.body.discription,
      url: req.body.url
    });
    Word.create(instance)
      .then( (w) => {
        res.locals.redirect = "/search"
        res.locals.words = w;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },
  redirectViews: (req, res, next) => {
    console.log("redirectViews");
    let redirectPath = res.locals.redirect;
    if (redirectPath){
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
  show: (req, res, next) => {
    console.log("show");
    let id = req.params.id;
    Word.findById(id)
      .then( (w) => {
        res.locals.words = w;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },
  showView: (req, res) => {
    console.log("showView");
    res.render("word/showView");
  },
  edit: (req, res, next) => {
    console.log("edit");
    let id = req.params.id;
    Word.findById(id)
      .then( (w) => {
        res.render("word/edit", {
          words: w
        });
      })
      .catch( (err) => {
        next(err);
      })
  },
  update: (req, res, next) => {
    console.log("update");
    let id = req.params.id;
    const instance = new Word({
      keyword1: req.body.keyword1,
      keyword2: req.body.keyword2,
      discription: req.body.discription,
      url: req.body.url
    });
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
  }
};
