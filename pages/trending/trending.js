// pages/trending/trending.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    musicData: [],
    ipInfo: '',
    currentMusicIndex: 4,
    isFirst: false,
    isLast: false,
  },

  // 切换上一曲
  onPrevious: function() {
    if (this.data.currentMusicIndex > 0) {
      this.setData({
        currentMusicIndex: this.data.currentMusicIndex - 1,
        isLast: false
      }, () => {
        if (this.data.currentMusicIndex === 0) {
          this.setData({
            isFirst: true
          })
        }
      })

    }
  },

  // 切换下一曲
  onNext: function() {

    if (this.data.currentMusicIndex < (this.data.musicData.length - 1)) {
      this.setData({
        currentMusicIndex: this.data.currentMusicIndex + 1,
        isFirst: false
      }, () => {
        if (this.data.currentMusicIndex === (this.data.musicData.length - 1)){
          this.setData({
            isLast: true
          })
        }
      })
    }
  },

  //  页面加载
  onLoad: function(options) {
    this.getMusicList();
    this.getIp();
  },

  // 获取音乐列表
  getMusicList: function() {
    wx.request({
      url: 'https://www.mxnzp.com/api/music/recommend/list',
      success: res => {
        if (res.data.code === 1) {
          this.setData({
            musicData: res.data.data
          })
        }
      }
    });
  },

  // 获取IP相关信息
  getIp: function() {
    wx.request({
      url: 'https://www.mxnzp.com/api/ip/self',
      success: (res) => {
        if (res.data.code === 1) {
          this.setData({
            ipInfo: res.data.data
          })
        }
      }
    })
  },

  // 监听页面初次渲染完成
  onReady: function() {},
  // 监听页面显示
  onShow: function() {},
  // 监听页面隐藏
  onHide: function() {},
  // 监听页面卸载
  onUnload: function() {},
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {},
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {},
  // 用户点击右上角分享
  onShareAppMessage: function() {}
})