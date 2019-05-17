const base64 = require('./utils/base64');
const request = require('./utils/api');
const Towxml = require('/towxml/main'); //引入towxml库

//app.js
App({
    towxml: new Towxml(),
    onLaunch: function() {
        this.getSystemInfo(); // 获取系统信息
        this.testLogin(); // 模拟登陆
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

    // 模拟登陆
    testLogin() {
        const username = '';
        const password = '';
        let authorization = "Basic " + base64.base64_encode(username + ":" + password);
        wx.setStorageSync('Authorization', authorization);
    },

    // 获取当前登陆用户的基本信息
    getUserInfo() {
        request.get('/user').then(res => {
            this.globalData.userInfo = res;
        });
    }
});