$(function() {
    // 注册
    // 点击注册，获取表单数据,非空验证，正则验证，发送查询请求，如果能拿到，提示错误。否则可以向数据库添加数据，根据请求回来的数据进行操作
    $('.reg').click(async function() {
        const uname = $('#username').val();
        const password = $('#password').val();
        const nkname = $('#nickname').val();
        if (!uname || !password || !nkname) return alert('用户名，密码,昵称不能为空！');
        if (!/^[a-z0-9]\w{4,11}$/i.test(uname) || !/^\w{5,12}$/.test(password)) return alert('用户名或密码不符合规范');
        const { code } = await $.post('../server/login.php', { uname, password }, null, 'json');
        if (code) {
            alert('该用户名已被注册');
        } else {
            // 没被注册
            const res = await $.post('../server/logon.php', { uname, password, nkname }, null, '');
            if (res) {
                alert('注册成功！');
                window.location.href = '../views/login.html';
            }
        }
    })
})