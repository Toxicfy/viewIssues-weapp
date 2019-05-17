const BASE_URL = 'https://api.github.com';

const request = {
    base(params, method = "GET") {
        let {url, data} = params;
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
                    }
                }
            })
        });
    },
    get(url, data = '') {
        let options = {url, data};
        return this.base(options)
    }
};

module.exports = request;
