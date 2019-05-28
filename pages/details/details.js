//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    article: "",
    articleNumber: "",
    articleReadTime: "",
    articleTitle: "",
    hasRender: false
  },
  onLoad: function(options) {
    wx.showLoading({
      title: "加载中"
    });

    // 数据请求
    const _ts = this;
    const { number } = options;
    const username = wx.getStorageSync("username");
    const selectedRepository = wx.getStorageSync("selectedRepository");
    const url = `https://api.github.com/repos/${username}/${selectedRepository}/issues/${number}`;

    wx.request({
      url,
      success: res => {
        let data = app.towxml.toJson(res.data.body, "markdown");
        data = app.towxml.initData(data, {
          base: "",
          app: _ts
        });
        _ts.setData(
          {
            article: data,
            articleNumber: res.data.body.length,
            articleReadTime: (res.data.body.length / 60 / 5).toFixed(),
            articleTitle: res.data.title
          },
          () => {
            wx.hideLoading();
            _ts.setData({
              hasRender: true
            });
          }
        );
      }
    });
  }
});
