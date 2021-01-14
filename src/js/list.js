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

    // 列表
    // 点击小按钮，显示与隐藏切换
    $('.phone').click(function() {
        $(this).next().toggle();
        let data = $(this).text().trim();
        console.log(data);
    })

    // 渲染列表


    let list_node = {
            current: 1,
            pagesize: 10
        }
        // 获取数据总数
    getCount();
    async function getCount() {
        const { count } = await $.get('../server/getCount.php', {}, null, 'json');
        // 分页器
        new Pagination('.pagination', {
            // 总数
            total: count,
            pagesize: 10,
            sizeList: [10, 15, 20, 25],
            change(current, pagesize) {
                // 分页时，重新赋值
                list_node.current = current;
                list_node.pagesize = pagesize;
                // 渲染商品列表
                allGoods();
            }
        })
    }

    // 渲染全部数据
    async function allGoods() {
        const { list } = await $.get('../server/allgoods.php', list_node, null, 'json');
        let str = ``;
        list.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.all').next().find('.goodsList').html(str);

    }


    // 渲染每一小类数据
    // 手机，电话卡
    getshouji();
    async function getshouji() {
        let data = '手机 电话卡';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.shouji').next().find('.goodsList').html(str);
    }

    // 电视，盒子
    getdianshi();
    async function getdianshi() {
        let data = '电视 盒子';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.dianshi').next().find('.goodsList').html(str);
    }

    // 笔记本，显示器
    getbijiben();
    async function getbijiben() {
        let data = '笔记本 显示器';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.bijiben').next().find('.goodsList').html(str);
    }

    // 家电，插线板
    getjiadian();
    async function getjiadian() {
        let data = '家电 插线板';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.jiadian').next().find('.goodsList').html(str);
    }

    // 出行，穿戴
    getchuxing();
    async function getchuxing() {
        let data = '出行 穿戴';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.chuxing').next().find('.goodsList').html(str);
    }

    // 智能,路由器
    getzhineng();
    async function getzhineng() {
        let data = '智能 路由器';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.zhineng').next().find('.goodsList').html(str);
    }

    // 电源,配件
    getdianyuan();
    async function getdianyuan() {
        let data = '电源 配件';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.dianyuan').next().find('.goodsList').html(str);
    }

    // 健康,儿童
    getjiankang();
    async function getjiankang() {
        let data = '健康 儿童';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.jiankang').next().find('.goodsList').html(str);
    }

    // 耳机,音箱
    geterji();
    async function geterji() {
        let data = '耳机 音箱';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.erji').next().find('.goodsList').html(str);
    }

    // 生活,箱包
    getshenghuo();
    async function getshenghuo() {
        let data = '生活 箱包';
        const res = await $.get('../server/common.php', { data }, null, 'json');
        let str = ``;
        res.forEach(item => {
            str += `
            <li> <img src="${item.good_img1}" alt="" data-id='${item.id}'> <span>${item.good_name}</span></li>
            `
        })
        $('.shenghuo').next().find('.goodsList').html(str);
    }


    //点击商品到详情页
    $('.goodsList').on('click', 'li>img', function() {
        // 拿到点击的商品的id,存到sessionStarage里
        window.sessionStorage.setItem('goods_id', this.dataset.id);
        window.location.href = './detail.html';
    })

})