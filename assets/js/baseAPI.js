//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (options) {
    //拼接对应环境的服务器地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})