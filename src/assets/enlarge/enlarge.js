// 放大镜的实现
// 获取元素
// 调整比例
// 移入移出
// 点击切换
// 移动联动
class Enlarge {
    constructor(select) {
        this.ele = document.querySelector(select)
        this.show = this.ele.querySelector('.show')
        this.mask = this.ele.querySelector('.mask')
        this.list = this.ele.querySelector('.list')
        this.enlarge = this.ele.querySelector('.enlarge')

        this.showWidth = this.show.clientWidth
        this.showHeight = this.show.clientHeight
        this.enlargeWidth = parseInt(window.getComputedStyle(this.enlarge)['width'])
        this.enlargeHeight = parseInt(window.getComputedStyle(this.enlarge)['height'])
        this.bg = window.getComputedStyle(this.enlarge)['backgroundSize']
        this.bgWidth = parseInt(this.bg.split(' ')[0])
        this.bgHeight = parseInt(this.bg.split(' ')[1])



        this.inIt()
    }
    inIt() {
            this.setScale()
            this.overOut()
            this.eleChange()
            this.moveEle()
        }
        // 调整比例
        // show/mask=背景/enlarge
        // mask=show*enlarge/背景
    setScale() {
            this.maskWidth = this.showWidth * this.enlargeWidth / this.bgWidth
            this.maskHeight = this.showHeight * this.enlargeHeight / this.bgHeight
            this.mask.style.width = this.maskWidth + 'px'
            this.mask.style.height = this.maskHeight + 'px'
        }
        // 移入移出
    overOut() {
            this.show.addEventListener('mouseover', () => {
                this.mask.style.display = 'block'
                this.enlarge.style.display = 'block'
            })
            this.show.addEventListener('mouseout', () => {
                this.mask.style.display = ''
                this.enlarge.style.display = ''
            })
        }
        // 点击切换
    eleChange() {
        this.list.addEventListener('click', (e) => {
            e = e || window.Event
            let target = e.target || e.srcElement
            if (target.nodeName === 'IMG') {
                this.show.children[0].src = target.getAttribute('showSrc')
                this.enlarge.style.backgroundImage = 'url(' + target.getAttribute('enlargeSrc') + ')'
                for (let i = 0; i < this.list.children.length; i++) {
                    this.list.children[i].classList.remove('active')
                }
                target.parentNode.classList.add('active')
            }
        })
    }
    moveEle() {
        // 按比例移动
        // mask移动/mask大小=bg移动/enlarge大小
        //bg移动=mask移动*enlarge大小/mask大小
        this.show.addEventListener('mousemove', (e) => {
            e = e || window.Event
            let x = e.offsetX - this.maskWidth / 2
            let y = e.offsetY - this.maskHeight / 2
            if (x <= 0) x = 0
            if (y <= 0) y = 0
            if (x >= this.showWidth - this.maskWidth) x = this.showWidth - this.maskWidth
            if (y >= this.showHeight - this.maskHeight) y = this.showHeight - this.maskHeight
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'
            let moveX = x * this.enlargeWidth / this.maskWidth
            let moveY = y * this.enlargeHeight / this.maskHeight
            this.enlarge.style.backgroundPosition = `-${moveX}px -${moveY}px`
        })
    }
}