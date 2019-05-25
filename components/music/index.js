// components/music/index.js
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

  /**
   * 组件的方法列表
   */
  methods: {

  }
})