let winW;
let scrollH;
let vh;
let lastScrollY = 0;
const headEl = document.querySelector('#header');
window.addEventListener('scroll', () => {
    changeHeadColor();
    size();
})
document.addEventListener("DOMContentLoaded", function(){
    size();
    changeHeadColor();
    setScreenSize();
    new Tab('#hyundaiTab');
    new Tab('#kiaTab');
});

window.addEventListener('resize', () => {
    size();
    mbMenuChk();
    setScreenSize();
})

//WINDOW SIZE, SCROLL HEIGHT CHECK
function size() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    scrollH = window.pageYOffset;
    bodyH = document.body.scrollHeight;
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
        if(winW > 1024) {
            $.scrollify.enable();
        }else {
            $.scrollify.disable();
        }
    })
})
popBodyEls.forEach((popBody, idx) => {
    popBody.addEventListener('mouseenter', () => {
        $.scrollify.disable();
    })
    popBody.addEventListener('mouseleave', () => {
        $.scrollify.enable();
    })
})

$('.popup-body').on('touchmove', function(e) {
    $.scrollify.disable();
})

//TAB
class Tab {
    constructor(selector, option) {
        const defaultOtp = {
            btns: 'ul li',
            boxs: '.tab-contents .tab-content',
            activeClass : 'active'
        }

        let resultOtp = Object.assign({}, defaultOtp, option)
        this.frame = $(selector);
        this.btns = this.frame.find(resultOtp.btns);
        this.boxs = this.frame.find(resultOtp.boxs);
        this.activeClass = resultOtp.activeClass;
        this.bindingEvent();
    }

    bindingEvent() {
        this.btns.on('click', e => {
            let isOn = $(e.currentTarget).hasClass(this.activeClass);
            if(isOn) return; 
            let i = $(e.currentTarget).index();
            this.activation(i);
            $.scrollify.disable();
        })
    }

    activation(index){
        this.btns.removeClass(this.activeClass);
        this.btns.eq(index).addClass(this.activeClass);
        this.boxs.removeClass(this.activeClass);
        this.boxs.eq(index).addClass(this.activeClass);
    }
    
}

//OUR PRODUCTS - Car Animation
const dotEls = document.querySelectorAll('.dot');
const carItemEls = document.querySelectorAll('.list-item');

carItemEls.forEach((carItemEl, idx) => {
    carItemEl.addEventListener('mouseenter', () => {
        addActive(idx, dotEls);
        addActive(idx, carItemEls);
    })

    carItemEl.addEventListener('mouseleave', () => {
        removeActive(idx, dotEls);
        removeActive(idx, carItemEls);
    })

    carItemEl.addEventListener('click', () => {
        addActive(idx, dotEls);
        addActive(idx, carItemEls);
    })
})

function addActive(index, lists){
    for(let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add('on')
}

function addAllActive(index, lists){
    lists[index].classList.add('on')
}

function removeActive(index, lists){
    for(let el of lists){
        el.classList.remove("on");
        el.classList.remove("active");
    }
}

//MOBILE MENU
const mbMenuBtn = document.querySelector('.triggerBtn');
let isOpen = false;
mbMenuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if(isOpen) {
        headEl.classList.add('open')
    }else {
        headEl.classList.remove('open')
    }
})

function mbMenuChk() {
    if(winW > 1024) {
        headEl.classList.remove('open')
        isOpen = false;
    }
}

//MOBILE 100VH SETTING
function setScreenSize() {
	vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}