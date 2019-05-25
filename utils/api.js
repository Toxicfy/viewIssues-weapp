const BASE_URL = 'https://api.github.com';

const request = {
  base(params, method = "GET") {
    let {
      url,
      data
    } = params;
    let contentType = params.contentType || "application/json";

    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data,
        header: {
          'content-type': contentType,
          'Authorization': wx.getStorageSync('Authorization')
        },
        success(res) {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.statusCode === 401) {
            reject('用户名或密码错误')
          } else if (res.statusCode === 403) {
            reject('没有对应权限')
          }
        },
        fail(err) {
          reject(err);
        }
      })
    });
  },
  get(url, data = '') {
    let options = {
      url,
      data
    };
    return this.base(options)
  }
};

module.exports = request;