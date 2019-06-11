var common = require('./../../module/common');

//index.js
//获取应用实例
const app = getApp()
const now = getCurrentPages();

Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shag', lastName: 'YOur'},
    staffC: {firstName: 'Giden', lastName: 'Line'},
    items: ['USA','CHINA','HK','BJ']
  },
  hello() {
    common.sayHello('Vunbo');
  },
  goodbye() {
    common.sayGoodBye('Yao');
  },
  bindViewTap(e) {
    console.log(e);
  },
  onDelete() {
    this.data.items.splice(2,1);
    this.setData({
      items: this.data.items
    })
  }
})
