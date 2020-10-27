$(function () {
    //1点击去注册 注册区显示,登录区隐藏
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //1.1点击去登录 注册区隐藏 登录区显示
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd: function (value) {
            //value代表确认密码的值
            //获取注册表单密码框的值
            var pwd = $('.reg-box input[name=password]').val()
            // console.log(pwd);
            //判断
            if (value !== pwd) {
                return "两次密码输入不一致,请重新输入"
            }

        }
    })
    //3监听注册表单的提交事件
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function (res) {
                //判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交成功后代码
                layer.msg("注册成功,请登录!")
                //提示完切换a链接到登录区
                $('#link-login').click()
                //重置form-reg表单
                $('#form-reg')[0].reset()

            }
        })
    })

    // 4登录功能(给form标签绑定事件,button按钮触发提交事件)
    $('#form-login').submit(function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),//获取表单的数据(用户名和密码)
            success: function (res) {
                console.log(res);
                //判断返回状态  不成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功的话 出现提示信息  保存token,跳转页面
                layer.msg('恭喜你,登录成功')
                // 保存token  未来的接口要用
                localStorage.setItem('token', res.token)
                //跳转到新页面
                location.href = "/index.html"

            }
        })
    })

})