// components/music/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        img:{
          type: String,
          observer:function (newVal,oldVal){
            this.setData({
              bgSrc: newVal.split('@')[0]
            })
          }
        },
        album_title: String,
        author: String
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc: 'images/pause.png',
        playSrc: 'images/playing.png',
        tagSrc: 'images/tag.png',
       bgSrc:'',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})