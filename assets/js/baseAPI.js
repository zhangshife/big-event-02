//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (options) {
    //拼接对应环境的服务器地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 对需要权限的接口配置头信息
    //判断是否包含'/my/'
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 3拦截所有的响应,判断身份认证信息
    // 有这个是为了防止你在url输入index.html 页面会自动跳转到主页区域
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        //判断
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            //1清空本地token
            localStorage.removeItem('token')
            //跳转到登录区域
            location.href = '/login.html'
        }
    }
})