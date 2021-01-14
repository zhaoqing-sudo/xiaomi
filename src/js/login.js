$(function() {
    // 登录
    // 点击登录，获取表单数据,非空验证，正则验证，发送请求，根据请求回来的数据进行操作
    $('.dlbt').click(async function() {
        const uname = $('#username').val();
        const password = $('#password').val();
        if (!uname || !password) return alert('用户名，密码不能为空！');
        if (!/^[a-z0-9]\w{4,11}$/i.test(uname) || !/^\w{5,12}$/.test(password)) return alert('用户名或密码不符合规范');
        const { code, nickname } = await $.post('../server/login.php', { uname, password }, null, 'json');
        if (code) {
            localStorage.setItem('name', JSON.stringify(nickname));
            window.location.href = '../index.html';
        }
    })
})