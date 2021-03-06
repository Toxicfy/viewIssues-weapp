// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    latest: {
      type: Boolean,
      value: false,
      observer: function() {}
    },
    first: {
      type: Boolean,
      value: false,
      observer: function() {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    highLeftSrc: 'images/triangle@left.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function() {
      if (!this.properties.first) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function() {
      if (!this.properties.latest) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
});