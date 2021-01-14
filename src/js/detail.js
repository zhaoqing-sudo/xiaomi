$(function() {
    // 渲染下拉菜单
    $('.nav-list').on('mouseenter', '.nav-item', async function() {
        // 渲染下拉菜单
        let arr = ['手机 电话卡', '耳机 音箱', '电视 盒子', '笔记本 显示器', '健康 儿童', '家电 插线板', '智能 路由器'];
        let index = $(this).index();
        let data = arr[index - 1];
        const res = await $.get('../server/common.php', { data }, null, 'json');
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

    // 全部商品分类
    $('.link-category').css('visibility', 'visible');

    const goods_id = window.sessionStorage.getItem('goods_id');
    if (!goods_id) {
        alert('商品不存在，是否回到商品列表页');
        window.location.href = './list.html';
        return
    }

    // 渲染页面
    getGoods();
    async function getGoods() {
        const res = await $.get('../server/detail.php', { goods_id }, null, 'json');
        console.log(res);
        let str = `
        <!-- 放大镜 -->
        <div class="box">
            <div class="show">
                <img src="${res[0].good_img1}" alt="">
                <div class="mask"></div>
            </div>
            <div class="list">
                <p class="active">
                    <img src="${res[0].good_img1}" showSrc="${res[0].good_img1}" enlargeSrc="${res[0].good_img1}" alt="">
                </p>
                <p>
                    <img src="${res[0].good_img2}" showSrc="${res[0].good_img2}" enlargeSrc="${res[0].good_img2}" alt="">
                </p>
            </div>
            <div class="enlarge"></div>
        </div>
        <!-- 商品详情 -->
        <div class="goodsInfo">
            <p class="goodsName">${res[0].good_name}</p>
            <p class="desc">${res[0].name}</p>
            <div class="btn-size">
                <p>选择版本</p>
                <button type="button" class="btn btn-default">6G+128G</button>
                <button type="button" class="btn btn-default">8G+128G</button>
                <button type="button" class="btn btn-default">8G+256G</button>
                <p>选择颜色</p>
                <button type="button" class="btn btn-default">深海微光</button>
                <button type="button" class="btn btn-default">紫玉幻境</button>
                <button type="button" class="btn btn-default">时光独白</button>
            </div>
            <p class="price">
                ￥<span class="text-danger">${res[0].price}</span>
            </p>
            <div class="goShopping">
                <button class="add_cart btn btn-success">加入购物车</button>
                <button class="btn btn-warning">再看看吧</button>
            </div>
        </div>
        `;

        $('.site-header').next().html(str);
        console.log(res[0].good_img1);
        $('.box>.enlarge').css('backgroundImage', 'url(' + res[0].good_img1 + ')');
        enlarge();
    }


    // 放大镜
    function enlarge() {
        new Enlarge('.box');

    }

})