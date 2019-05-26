// components/music/index.js

let bgMusic = wx.getBackgroundAudioManager();


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // img: {
    //   type: String,
    //   // observer: function(newVal, oldVal) {
    //   //   this.setData({
    //   //     bgSrc: newVal.split('@')[0]
    //   //   })
    //   // }
    // },
    song_info: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/pause.png',
    playSrc: 'images/playing.png',
    tagSrc: 'images/tag.png',
  },

  attached: function() {
    let song_id = this.data.song_info.song_id;

    wx.request({
      url: 'https://www.mxnzp.com/api/music/song/detail?songId=' + song_id,
      success(res) {
        console.log(res.data);
        if (res.statusCode === 200 && res.data.code === 1){
          console.log(res.data.data.songLink);
          bgMusic.src = res.data.data.songLink;
          bgMusic.title = res.data.data.songLink;
          console.log(bgMusic)
        }
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})