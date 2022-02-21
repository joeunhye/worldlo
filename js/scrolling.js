document.addEventListener("DOMContentLoaded", function(){
    new Scrolling('section', {
        btns: 'nav li',
        speed: 500,
        base: -200
    });
});

class Scrolling {
    constructor(selector, option) {
        const defaultOtp = {
            btns: '.btns li',
            speed: 1000,
            base: 0
        }
        const resultOtp = {...defaultOtp, ...option}
        this.init(selector, resultOtp);
        this.bindingEvent();
    }


    init(selector, option) {
        this.boxs = $(selector);
        this.btns = $(option.btns);
        this.speed = 1000;
        this.base = -200;
        this.posArr;
        this.enableClick = true;
    }

    bindingEvent() {
        this.setPos();
        this.btns.on('click', e => {
            const isOn = $(e.currentTarget).hasClass('on');
            const i = $(e.currentTarget).index();
            if(this.enableClick && !isOn) {
                this.enableClick = false;
                this.moveScroll(i);
            }
        })
        
        $(window).on('scroll', () => {
            let scroll = $(window).scrollTop();
            this.activation(scroll);
        })
        
        $(window).on('resize', () => {
            this.setPos();
            const activeIdx = this.btns.filter('.on').index();
            window.scroll(0, this.posArr[activeIdx]);
        })
    }
    setPos() {
        this.posArr = [];
        this.boxs.each(idx => {
            this.posArr.push(this.boxs.eq(idx).offset().top)
        })
    }
    
    moveScroll(target){
        $('html,body').stop().animate({scrollTop: this.posArr[target]}, this.speed, () => {
            this.enableClick = true;
        })
    }
    
    activation(scroll){
        this.btns.each(idx => {
            if(scroll >= this.posArr[idx] + this.base) {
                this.btns.removeClass('on');
                this.btns.eq(idx).addClass('on');
                this.boxs.removeClass('on');
                this.boxs.eq(idx).addClass('on');
            }
        })
    }
}







