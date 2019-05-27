// components/music/index.js

let bgMusic = wx.getBackgroundAudioManager();


Component({
  // 组件的属性列表 
  properties: {

    song_info: {
      type: Object,
      observer: function(newVal, oldVal) {
        
        bgMusic.pause(); //切换后先立刻停止播放，获取到新地址后播放

        this.getMusic(newVal.song_id, url => {
          if (this.data.isPlay) {
            bgMusic.src = url;
            bgMusic.title = url;
          }
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
    pauseSrc: 'images/pause.png',
    playSrc: 'images/playing.png',
    tagSrc: 'images/tag.png',
    musicSrc: ''
  },

  //组件完成挂载后执行 
  attached: function() {

    bgMusic.onEnded(() => {
      this.triggerEvent('right', {}, {})
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击暂停和播放
    play: function() {
      this.setData({
        isPlay: !this.data.isPlay
      }, () => {
        console.log(this.data.isPlay);
        if (this.data.isPlay) {
          bgMusic.src = this.data.musicSrc;
          bgMusic.title = this.data.musicSrc;
        } else {
          bgMusic.pause();
        }
      })
    },

    // 根据 🆔 获取 musicURL
    getMusic: function(song_id, callback) {

      // 获取到musicSrc
      wx.request({
        url: 'https://www.mxnzp.com/api/music/song/detail?songId=' + song_id,
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 1) {
            this.setData({
              musicSrc: res.data.data.songLink
            });
            callback(res.data.data.songLink)
          }
        }
      });

    },
  }
})