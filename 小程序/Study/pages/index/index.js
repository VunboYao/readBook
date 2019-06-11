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
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
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
