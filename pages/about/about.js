const request = require('../../utils/api');
const app = getApp();


const COVERIMAGE_URL = "https://cdn.magdeleine.co/wp-content/uploads/2018/09/action-adult-beach-614510-1400x937.jpg";

Page({
  data: {
    // 最活跃的关注信息
    attentionList: [],
    // 登陆人信息
    userInfo: "",
    // 图表信息
    chart: {
      url: 'https://ghchart.rshah.org/a5797a/' + 'toxicfy',
      year: new Date().getFullYear(),
    },
    coverImage: COVERIMAGE_URL,
  },

  onLoad() {
    
    //获取当前登陆用户的基本信息
    this.setData({
      userInfo: app.globalData.userInfo
    });

    //获取收到的Event并得到最近活跃的关注人
    request.get('/users/toxicfy/received_events', {
      per_page: 30,
      page: 1
    }).then(res => {
      let arr = [],
        obj = {},
        resultObj = {},
        attentionList = []
      res.forEach(item => {
        let {
          display_login,
          avatar_url,
          id
        } = item.actor;
        resultObj[id] = {
          avatar_url,
          display_login
        };
        arr.push(id);
      });

      arr.forEach(ele => {
        !obj[ele] ? obj[ele] = 1 : obj[ele] += 1;
      });
      for (let e in obj) {
        resultObj[e]["times"] = obj[e]
      }
      for (let i in resultObj) {
        attentionList.push(resultObj[i])
      }
      attentionList.sort((a, b) => {
        return b.times - a.times
      });
      this.setData({
        attentionList
      })
    });

  }

});