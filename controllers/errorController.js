"use strict";
const httpStatus = require("http-status-codes");

module.exports = {
  //経路不明
  NotFound : (req, res) => {
    let errCD = httpStatus.NOT_FOUND
    console.log(`errCode: ${errCD}`);
    res.status = errCD;
    res.render("error", {errorCode: errCD});
  },
  //サーバ異常
  InternalError : (err, req, res, next) => {
    let errCD = httpStatus.InternalError
    console.log(`errCode: ${errCD}`);
    res.status = errCD;
    res.render("error", {errorCode: errCD});
  }
};
