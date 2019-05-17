//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    article: "",
    articleNumber: "",
    articleReadTime: "",
    articleTitle: ""
  },
  onLoad: function(options) {
    // 数据请求
    const _ts = this;
    wx.request({
      url: "https://api.github.com/repos/toxicfy/Combing-notes/issues/" + options.number,
      success: (res) => {
        let data = app.towxml.toJson(res.data.body, 'markdown');
        data = app.towxml.initData(data, {
          base: "",
          app: _ts
        });
        console.log(res.data.body.length)
        _ts.setData({
          article: data,
          articleNumber: res.data.body.length,
          articleReadTime: ((res.data.body.length) / 60 / 5).toFixed(),
          articleTitle: res.data.title
        })
      }
    })
  },
})