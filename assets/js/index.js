//入口函数
$(function () {
    //1获取用户信息
    getUserInfo()

    // 2给a退出绑定点击事件
    $('#btnLogOut').on('click', function () {
        //点击退出出现提示框  由layui提供confirm询问框
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            //页面跳转到登录区域
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})

/* - 我们请求的时候就需要设置请求头信息，把我们获取到的 token 传递给后台
- 数据获取失败提示用户
 */
function getUserInfo() {
    //发送ajax请求
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        //请求头配置对象
        /* headers: {
            Authorization: localStorage.getItem('token') || ""
        }, */
        success: function (res) {
            // console.log(res);
            //判断
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功
            renderAvatar(res.data)
        }
    })
}
//封装用户头像渲染函数
function renderAvatar(user) {
    //1用户名(昵称优先  没有的用username)
    var name = user.nickname || user.username
    //得到的内容与welcome里的内容拼接
    $('.welcome').html("欢迎&nbsp;&nbsp;" + name)
    // 2 用户头像  判断是否有头像
    if (user.user_pic !== null) {
        //有头像 头像的属性改为user.user_pic并且显示,文字头像隐藏
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()

    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avatar').html(text).show()
    }

}