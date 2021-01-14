"use strict";
//================================
//HTMLが読み込まれた後に実行
window.onload = () => {
  //1:G 2:C 3:P
  var rnd1 = Math.floor( Math.random() * 3 + 1);
  var rnd2 = Math.floor( Math.random() * 3 + 1);
  var myHand = convertJanken(rnd1);
  var enemyHand = convertJanken(rnd2);
  
  console.log("myHand: " + myHand);
  console.log("enemyHand: " + enemyHand);
  console.log("---> " + Janken(myHand, enemyHand));
};
//=====================================
var convertJanken = (num) => {
  return (num === 1 ? "G" : (num === 2 ? "C" : "P"));
};
//=====================================
var Janken = (hand1, hand2) => {
  if (hand1 === hand2){
    return "even";
  } else {
    if (hand1 === "G") {
      if (hand2 === "C" ) {
        return "win";
      } else {
        return "lose";
      }
    };
    if (hand1 === "C") {
      if (hand2 === "P" ) {
        return "win";
      } else {
        return "lose";
      }
    };
    if (hand1 === "P") {
      if (hand2 === "G" ) {
        return "win";
      } else {
        return "lose";
      }
    };
    return "???";
  };

  (hand1 === hand2 ? "even" : (hand1 === 2 ? "C" : "P"));
};