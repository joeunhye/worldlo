document.addEventListener("DOMContentLoaded", function(){
    new Scrolling('section', {
        btns: '#navi li',
        speed: 500,
        base: -200
    });
});

function Scrolling() {
    this.init();
    this.bindingEvent();
}

Scrolling.prototype.init = function() {
    this.boxs = $('section');
    this.btns = $('nav li a');
    this.speed = 1000;
    this.base = -200;
    this.posArr;
    this.enableClick = true;
}

Scrolling.prototype.bindingEvent = function() {
    this.setPos();
    this.btns.on('click', function(e) {
        const isOn = $(e.currentTarget).parent().hasClass('on');
        const i = $(e.currentTarget).parent().index();
        if(this.enableClick && !isOn) {
            this.enableClick = false;
            this.moveScroll(i);
        }
    }.bind(this))
    
    $(window).on('scroll', function() {
        let scroll = $(window).scrollTop();
        this.activation(scroll);
    }.bind(this))

    $(window).on('resize', function() {
        this.setPos();
        const activeIdx = this.btns.filter('.on').index();
        window.scroll(0, this.posArr[activeIdx]);
    }.bind(this))
}


Scrolling.prototype.setPos = function() {
    this.posArr = [];
    this.btns.each(function(idx) {
        this.posArr.push(this.boxs.eq(idx).offset().top)
    }.bind(this))
}

Scrolling.prototype.moveScroll = function(target) {
    $('html,body').stop().animate({scrollTop: this.posArr[target]}, this.speed, function() {
        this.enableClick = true;
    }.bind(this))
}

Scrolling.prototype.activation = function(scroll) {
    this.btns.each(function(idx) {
        if(scroll >= this.posArr[idx] + this.base) {
            this.btns.parent().removeClass('on');
            this.btns.parent().eq(idx).addClass('on');
            this.boxs.removeClass('on');
            this.boxs.eq(idx).addClass('on');
        }
    }.bind(this))
}