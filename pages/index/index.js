//index.js
const app = getApp();
const request = require("../../utils/api");
const utils = require("../../utils/util");

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: app.globalData.userInfo,
    articleInfo: ""
  },

  // 页面加载触发
  onLoad: function() {
    wx.showLoading({
      title: "数据加载中..."
    });
    this.getIssues();
  },

  // 获取 baseInfo and issues
  getIssues() {
    const username = wx.getStorageSync("username");
    const selectedRepository = wx.getStorageSync("selectedRepository");
    const issuesUrl = `/repos/${username}/${selectedRepository}/issues`;

    request.get(issuesUrl, { per_page: 30, page: 1 }).then(articleInfo => {
      articleInfo.forEach(ele => {
        ele.created_at = utils.formatTime(new Date(ele.created_at));
      });

      this.setData({
        articleInfo,
        userInfo: app.globalData.userInfo
      });

      wx.hideLoading();
    });
  },

  // 获取单个 issues 详情
  getViewDetail(e) {
    console.log(e.currentTarget.dataset.number);
    wx.navigateTo({
      url: `../details/details?number=${e.currentTarget.dataset.number}`
    });
  },

  // 下拉更新数据
  onPullDownRefresh() {
    wx.showLoading({
      title: "刷新中"
    });
    this.getIssues(); //再次获取 issues 数据
  }
});
