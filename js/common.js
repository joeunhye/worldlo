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

function removeActive(index, lists){
    for(var el of lists){
        el.classList.remove("on");
    }
}

//TAB
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})