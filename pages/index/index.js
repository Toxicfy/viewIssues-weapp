//index.js
const app = getApp();
const request = require('../../utils/api');
const utils = require('../../utils/util');

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        userInfo: app.globalData.userInfo,
        articleInfo: "",
    },
    onLoad: function() {
        wx.showLoading({
                title: '数据加载中...',
            })
        // 获取 基本数据 and issues
        request.get('/repos/toxicfy/Combing-notes/issues', {
            per_page: 10,
            page: 1
        }).then(articleInfo => {
            articleInfo.forEach(ele => {
                ele.created_at = utils.formatTime(new Date(ele.created_at))
            });
            console.log(articleInfo);
            this.setData({
                articleInfo,
                userInfo: app.globalData.userInfo
            });
            wx.hideLoading();
        });
    },
    viewDetail(e) {
        console.log(e.currentTarget.dataset.number);
        wx.navigateTo({
            url: `../details/details?number=${e.currentTarget.dataset.number}`
        })
    }
});