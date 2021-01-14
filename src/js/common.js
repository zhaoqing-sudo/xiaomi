$(function() {

    // 下载APP
    $('.topbar-download').on({
        mouseover: function() {
            $(this).children('.appcode').stop().animate({
                height: 145
            })
        },
        mouseout: function() {
            $(this).children('.appcode').stop().animate({
                height: 0
            })
        }
    })

    // 判断是否登录
    let uname = localStorage.getItem('name');
    if (!JSON.parse(uname)) {
        $('.user-login').removeClass('hide');
    } else {
        $('.user-login').addClass('hide');
    }
    // 购物车
    $('.topbar-cart').on({
        mouseover: function() {
            $(this).children('.cart-menu').stop().animate({
                height: 100
            })
            $(this).addClass('cart-menu-active');
        },
        mouseout: function() {
            $(this).children('.cart-menu').stop().animate({
                height: 0
            })
            $(this).removeClass('cart-menu-active');
        }
    })

    // 下拉菜单
    $('.nav-list').on('mouseover', '.nav-item', function() {
        $(this).addClass('nav-item-active');
        $(this).parents('.w').siblings('.header-nav-menu').stop().animate({
            height: 215
        })
    })
    $('.nav-list').on('mouseout', '.nav-item', function() {
        $(this).removeClass('nav-item-active');
        $(this).parents('.w').siblings('.header-nav-menu').stop().animate({
            height: 0
        })
    })

    // 渲染下拉菜单
    $('.xiala').on('mouseenter', '.nav-item', async function() {
        // 渲染下拉菜单
        let arr = ['手机 电话卡', '耳机 音箱', '电视 盒子', '笔记本 显示器', '健康 儿童', '家电 插线板', '智能 路由器'];
        let index = $(this).index();
        let data = arr[index - 1];
        const res = await $.get('./server/common.php', { data }, null, 'json');
        // 渲染
        let str = ``;
        res.forEach(item => {
            str += `
                    <li>
                        <a href="">
                            <div class="figure figure-thumb">
                                <img src="${item.good_img1}" alt="">
                            </div>
                            <div class="title">${item.good_name}</div>
                            <p class="price">${item.price}元起</p>
                        </a>
                    </li>
            `
        })
        $('.children-list').html(str);
    })

    // 搜索框
    $('.search-text').on('focus', function() {
        $(this).addClass('current').siblings('.search-btn').addClass('current');
    })
    $('.search-text').on('blur', function() {
        $(this).removeClass('current').siblings('.search-btn').removeClass('current');
        $('.search-res').css('display', 'none');
    })

    // 轮播图上的二级菜单
    $('.site-category-list').on('mouseenter', '.category-item', async function() {
        // 渲染轮播图上的二级菜单
        let data = $(this).find('.title').text().trim();
        const res = await $.get('./server/common.php', { data }, null, 'json');
        let res1 = res.splice(0, 9);
        // 渲染
        let str = ``;
        res1.forEach((item, index) => {
            str += `
            <li>
                <a href="" class="link">
                    <img src="${item.good_img1}" alt="" class="thumb">
                    <span class="text">${item.good_name}</span>
                </a>
            </li>
            `
            if (index > 5) {
                $('.children-list-col-2').html(str);
                if (index == 11) {
                    str = ``
                }
            } else {
                $('.children-list-col-1').html(str);
                if (index == 5) {
                    str = ``
                }
            }
        })

        // 划入显示
        $('.site-category-list .children').css('display', 'block');
    })
    $('.site-category-list').on('mouseleave', '.category-item', function() {
        // 划出隐藏
        $('.site-category-list .children').css('display', 'none');
    })

})

// 搜索引擎
const input = document.querySelector('.search-text');
const ul = document.querySelector('.search-res');
input.addEventListener('input', function() {
    let text = input.value.trim();
    let script = document.createElement('script');
    script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${text}&req=2&csor=6&pwd=aiqiy&cb=fn&_=1608780308327`;
    document.body.appendChild(script);
    script.remove();
})

function fn(res) {
    if (!res.g) {
        ul.style.display = 'none';
        return;
    }
    let str = '';
    res.g.forEach(function(item) {
        str += `<li>${item.q}<li/>`;
    })
    ul.innerHTML = str;
    ul.style.display = 'block';

}