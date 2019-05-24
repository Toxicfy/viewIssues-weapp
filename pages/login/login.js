// pages/login/login.js
const app = getApp();
const base64 = require('../../utils/base64');

// config
const bgCoverUrl = 'https://cdn.pixabay.com/photo/2016/04/15/10/23/grindelwald-1330662_1280.jpg';
const iconUrl = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4250885442,2652050609&fm=26&gp=0.jpg';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgCoverUrl,
    iconUrl,
  },
  // 验证是否登录 
  verifyLogin() {
    let isLogin = !!wx.getStorageInfoSync("Authorization").keys.length
    if (isLogin) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  // 点击登录
  login: function(e) {
    const {
      username,
      password
    } = e.detail.value;

    if (!!username && !!password) {
      let authorization = "Basic " + base64.base64_encode(username + ":" + password);
      wx.setStorageSync('Authorization', authorization);
    }
    this.verifyLogin();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.verifyLogin();
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {},
  // 生命周期函数--监听页面显示
  onShow: function() {},
  // 生命周期函数--监听页面隐藏
  onHide: function() {},
  // 生命周期函数--监听页面卸载
  onUnload: function() {},
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {},
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {},
  // 用户点击右上角分享
  onShareAppMessage: function() {}
})