// var common = require('./../../module/common');
import * as common from "./../../module/common";

//index.js
//获取应用实例
const app = getApp()
const now = getCurrentPages();

Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shag', lastName: 'YOur'},
    staffC: {firstName: 'Giden', lastName: 'Line'},
  },
  hello() {
    common.sayHello('Vunbo');
  },
  goodbye() {
    common.sayGoodBye('Yao');
  },
  bindViewTap(e) {
    console.log(e);
  }
})
