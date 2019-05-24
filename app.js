const request = require('./utils/api');
const Towxml = require('/towxml/main'); //引入towxml库

//app.js
App({
    towxml: new Towxml(), //markdown解析渲染

    onLaunch: function() {
        this.getSystemInfo(); // 获取系统信息
        this.getUserInfo(); // 获取当前登陆用户的基本信息
    },

    // 全局
    globalData: {
        userInfo: "",
    },

    // 获取系统信息
    getSystemInfo() {
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        });
    },

    // 获取当前登陆用户的基本信息
    getUserInfo() {
        request.get('/user').then(res => {
            this.globalData.userInfo = res;
        });
    }
});