const util = {};

util.getParams = function (url, key) {
    url = url.slice(url.indexOf('?') + 1);

    const list = url.split('&');
    const params = {};

    list.map(function (item) {
        const tmp = item.split('=');
        params[tmp[0]] = tmp[1];
    });

    return key ? params[key] : params;
};

util.urlSetParams = function (url, data) {
    let anchor = '';

    if (url.indexOf('#') > -1) {
        anchor = url.slice(url.indexOf('#'));
        url = url.slice(0, url.indexOf('#'));
    }

    if (url.indexOf('?') > -1) {
        const path = url.slice(0, url.indexOf('?'));

        // 获取目标url的参数
        const params = util.getParams(url);

        // 删掉同名参数
        // let hasParams = false;
        Object.keys(params).map(function (key) {
            // hasParams = true;

            Object.keys(data).map(function (k) {
                if (key.toLowerCase() == k.toLowerCase()) {
                    delete params[key];
                }
            });
        });

        // 添加data
        Object.keys(data).map(function (k) {
            params[k] = data[k];
        });

        // if (hasParams) {
        const paramsList = [];

        Object.keys(params).map(function (key) {
            paramsList.push(key + '=' + params[key]);
        });

        return path + '?' + paramsList.join('&') + anchor;
    }
    const paramsList = [];

    Object.keys(data).map(function (k) {
        paramsList.push(k + '=' + data[k]);
    });
    return url + '?' + paramsList.join('&') + anchor;

};

module.exports = util;