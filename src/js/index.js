// 调用轮播图
var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        autoplay: true,
        disableOnInteraction: false,

    },
    effect: 'fade',
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,

    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})

//鼠标滑过pagination控制swiper切换
for (i = 0; i < mySwiper.pagination.bullets.length; i++) {
    mySwiper.pagination.bullets[i].onmouseover = function() {
        this.click();
    };
}

// 调用轮播图
var mySwiper2 = new Swiper('.flashsale-list', {
    effect: 'slide',
    // 每组多少个
    slidesPerView: 4,
    // 分为几组
    slidesPerGroup: 3,
    spaceBetween: 12,

    loop: true, // 循环模式选项

    // 切换速度
    speed: 2000,
    autoplay: {
        autoplay: true,
        delay: 5000,
        disableOnInteraction: false,

    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-flashsale-next',
        prevEl: '.swiper-flashsale-prev',
    },

})

// 倒计时
function diffTime(t1, t2) {
    var diffs = Math.ceil(Math.abs(t1.getTime() - t2.getTime()) / 1000);
    return {
        day: parseInt(diffs / (60 * 60 * 24)),
        hours: parseInt(diffs % (60 * 60 * 24) / (60 * 60)),
        minutes: parseInt(diffs % (60 * 60) / 60),
        seconds: diffs % 60
    }
}


$(function() {

    setInterval(function() {
        // 2. 获取两个时间节点之间的时间差
        var t1 = new Date();
        var t2 = new Date(2021, 1, 30, 0, 0, 0);
        var res = diffTime(t1, t2);

        // 3. 输出在页面上
        $('.countdown').siblings('.desc').find('span').html(res.day);
        $('.countdown>span').eq(0).html(res.hours);
        $('.countdown>span').eq(1).html(res.minutes);
        $('.countdown>span').eq(2).html(res.seconds);

        // 组装一个字符串
        // var str = res.day + ' 天 ' + res.hours + ' 小时 ' + res.minutes + ' 分钟 ' + res.seconds + ' 秒 '
        // // 直接填充到 div 内部
        // box.innerText = str
    }, 1000)



    // 选项卡切换
    $('.tab-list').on('mouseenter', 'li', function() {
        $(this).addClass('tab-active').siblings('li').removeClass('tab-active');
        // $(this).parents('.box-hd').siblings('.box-bd').find('.span16>div').eq($(this).index()).removeClass('hide').siblings('div').addClass('hide');

        // 数据渲染
        let goodsname = $(this).text();
        changeGoods(goodsname);

    })

    // 选项卡数据渲染
    changeGoods('热门')
    async function changeGoods(goodsname) {
        // let key = '热门';
        let key = goodsname;
        // 准备数据
        let obj = {
            '热门': '笔记本 显示器',
            '电视影音': '电视 盒子',
            '安防': '健康 儿童',
            '出行': '出行 穿戴',
            '耳机音响': '耳机 音箱',
            '充电器': '电源 配件',
        }
        let data = obj[key];
        const res = await $.get('./server/common.php', { data }, null, 'json');
        let res1 = res.splice(0, 7);
        let str = ``;
        res1.forEach(item => {
            str += `
            <div>
                <li class="brick-item brick-item-m brick-item-m-2">
                    <a href="">
                        <div class="figure figure-img">
                            <img src="${item.good_img1}" alt="" data-id="${item.id}">
                        </div>
                        <h3 class="title">${item.good_name} </h3>
                        <p class="desc">${item.name}</p>
                        <p class="price">
                            <span class="num">${item.price}</span>元
                            <del><span class="num">3499</span>元</del>
                        </p>
                    </a>
                </li>
            </div>
            `
        })
        str += `
        <div>
            <li class="brick-item brick-item-s">
                <a href="">
                    <div class="figure figure-img">
                        <img src="./images/test1.png" alt="">
                    </div>
                    <h3 class="title">米家互联网烟灶套装（天然气）</h3>
                    <p class="price">
                        <span class="num">2298</span>元
                    </p>
                </a>
            </li>
        </div>
        <li class="brick-item brick-item-s">
            <a href="">
                <div class="figure figure-more">
                    <i class="iconfont iconfont-circle-arrow-right"></i>
                </div>
                <div class="more">浏览更多 <small>${key}</small></div>
            </a>
        </li>
        `
        $('.goods').html(str);
    }

    // 数据渲染
    shangoufn()
    async function shangoufn() {
        let data = '手机 电话卡';
        const res = await $.get('./server/common.php', { data }, null, 'json');
        let res1 = res.splice(0, 8);
        let str = ``;
        // 渲染手机
        res1.forEach(item => {
            str += `
            <li class="brick-item brick-item-m brick-item-m-2">
            <a href="">
                <div class="figure figure-img">
                    <img src="${item.good_img1}" alt="" data-id="${item.id}">
                </div>
                <h3 class="title">${item.good_name}</h3>
                <p class="desc">${item.name}</p>
                <p class="price">
                    <span class="num">${item.price}</span>元<span>起</span>
                </p>
            </a>
            </li>
        `
        })
        $('.phone').html(str);

    }

    //点击商品到详情页
    // $('.brick-item>a>.figure').on('click', 'img', function() {
    //     // 拿到点击的商品的id,存到sessionStarage里
    //     window.sessionStorage.setItem('goods_id', this.dataset.id);
    //     window.location.href = './detail.html';
    // })
})