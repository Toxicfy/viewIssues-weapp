// pages/login/login.js
const app = getApp();
const base64 = require("../../utils/base64");
const request = require("../../utils/api");

// config
const bgCoverUrl =
  "https://cdn.pixabay.com/photo/2016/04/15/10/23/grindelwald-1330662_1280.jpg";
const iconUrl =
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4250885442,2652050609&fm=26&gp=0.jpg";

Page({
  // 页面的初始数据
  data: {
    bgCoverUrl,
    iconUrl,
    repositoryList: [],
    repositoryIndex: 0
  },
  // 验证是否登录
  verifyLogin() {
    let isLogin = !!wx.getStorageInfoSync("Authorization").keys.length;
    if (isLogin) {
      wx.switchTab({
        url: "/pages/index/index"
      });
      request
        .get("/user")
        .then(res => {
          app.globalData.userInfo = res;
        })
        .catch(err => {
          this.handleErr(err);
        });
    }
  },
  // 点击登录
  login: function(e) {
    const { username, password } = e.detail.value;
    const { repositoryList, repositoryIndex } = this.data;
    // 设置当前用户以及选择的仓库
    wx.setStorageSync("username", username);
    wx.setStorageSync("selectedRepository", repositoryList[repositoryIndex]);

    if (!!username && !!password) {
      let authorization =
        "Basic " + base64.base64_encode(username + ":" + password);
      wx.setStorageSync("Authorization", authorization);
      //  进行验证
      this.getUserInfo();
    } else {
      wx.showToast({
        title: "请输入用户名和密码",
        icon: "none",
        duration: 2000
      });
    }
  },

  //获取 repository 列表
  getRepository: function(e) {
    const name = e.detail.value;
    if (name) {
      wx.request({
        url: `https://api.github.com/users/${name}/repos`,
        success: res => {
          if (res.statusCode !== 200) return;
          let temArr = [];
          res.data.forEach(ele => {
            temArr.push(ele.name);
          });
          this.setData({
            repositoryList: temArr
          });
        }
      });
    }
  },

  // 捕获 repository 变化
  repositoryChange: function(e) {
    this.setData({
      repositoryIndex: e.detail.value
    });
  },

  // 获取当前登陆用户的基本信息
  getUserInfo() {
    wx.showLoading();
    request
      .get("/user")
      .then(res => {
        wx.hideLoading();
        app.globalData.userInfo = res;
        wx.switchTab({
          url: "/pages/index/index"
        });
      })
      .catch(err => {
        this.handleErr(err);
      });
  },

  // 处理错误信息
  handleErr(err) {
    wx.hideLoading();
    wx.showToast({
      title: err,
      icon: "none",
      duration: 2000
    });
    wx.removeStorageSync("Authorization");
    wx.setStorageSync("username");
    wx.setStorageSync("selectedRepository");
  },

  // 生命周期函数--监听页面加载
  onLoad: function() {
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
});
