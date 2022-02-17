let winW;
let scrollH;
const headEl = document.querySelector('#header');

window.addEventListener('scroll', () => {
    changeHeadColor();
    size();
})

//WINDOW SIZE CHECK
function size() {
    winW = window.innerWidth;
    scrollH = window.pageYOffset;
}

//HEADER COLOR CHANGE
let changeHeadColor = () => {
    if(scrollH > 100) {
        headEl.classList.add('on')
    }else{
        headEl.classList.remove('on')
    }
}

//POPUP
const moreBtn = document.querySelectorAll('.more-view');
const closeBtn = document.querySelectorAll('.popup-close');
const popupEls = document.querySelectorAll('.popup');
const popBodyEls = document.querySelectorAll('.popup-body');
moreBtn.forEach((btnEl, idx) => {
    btnEl.addEventListener('click', e => {
        popupEls[idx].classList.add('on');
    })
})
closeBtn.forEach((closeEl, idx) => {
    closeEl.addEventListener('click', e => {
        e.preventDefault();
        removeActive(idx, popupEls);
        $.scrollify.enable();
    })
})
popBodyEls.forEach((popBody, idx) => {
    popBody.addEventListener('mouseenter', () => {
        $.scrollify.disable();
        console.log('disable')
    })
    popBody.addEventListener('mouseleave', () => {
        $.scrollify.enable();
        console.log('enable')
    })
})

//TAB
function Tab(selector, option) {
    let defaultOtp = {
        btns: 'ul li',
        boxs: '.tab-contents .tab-content',
        activeClass : 'active'
    }

    //let resultOtp = $.extend({}, defaultOtp, option)
    let resultOtp = Object.assign({}, defaultOtp, option)
    this.frame = $(selector);
    this.btns = this.frame.find(resultOtp.btns);
    this.boxs = this.frame.find(resultOtp.boxs);
    this.activeClass = resultOtp.activeClass;
    this.bindingEvent();
}

$(document).ready(function() {
    new Tab('#hyundaiTab');
    new Tab('#kiaTab');
})

Tab.prototype.bindingEvent = function() {
    this.btns.on('click', function(e) {
        let isOn = $(e.currentTarget).hasClass(this.activeClass);
        if(isOn) return; 
        let i = $(e.currentTarget).index();
        this.activation(i);
    }.bind(this))
}

Tab.prototype.activation = function(index) {
    this.btns.removeClass(this.activeClass);
    this.btns.eq(index).addClass(this.activeClass);
    this.boxs.removeClass(this.activeClass);
    this.boxs.eq(index).addClass(this.activeClass);
}

//OUR PRODUCTS - Car Animation
const dotEls = document.querySelectorAll('.dot');
const carItemEls = document.querySelectorAll('.list-item');

carItemEls.forEach((carItemEl, idx) => {
    carItemEl.addEventListener('mouseover', () => {
        addActive(idx, dotEls);
        addActive(idx, carItemEls);
    })
})

carItemEls.forEach((carItemEl, idx) => {
    carItemEl.addEventListener('mouseleave', () => {
        removeActive(idx, dotEls);
        removeActive(idx, carItemEls);
    })
})

function addActive(index, lists){
    for(let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add('on')
}

function removeActive(index, lists){
    for(var el of lists){
        el.classList.remove("on");
    }
}
