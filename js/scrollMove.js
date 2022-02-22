const boxs = document.querySelectorAll('section');
const btns = document.querySelectorAll('nav li a');
const speed = 1000;
const base = -200;
let posArr;
let enableClick = true;

setPos();

[].forEach.call(btns, el => {
    el.addEventListener('click', e => {
        const isOn = e.currentTarget.classList.contains('on');
        const i = getElementIndex(btns, el);
        if(enableClick && !isOn) {
            enableClick = false;
            moveScroll(i);
        }
    });
});

window.addEventListener('scroll', () => {
    activeOn(scrollH);
})

function setPos() {
    posArr = [];
    boxs.forEach((boxEl) => {
        posArr.push(boxEl.offsetTop)
    })
}

function moveScroll(target) {
    $('html,body').stop().animate({
        scrollTop: posArr[target]
    }, speed, function () {
        enableClick = true;
    })
}

function activeOn(scroll) {
    btns.forEach((btnEl, idx) => {
        if (scroll >= posArr[idx] + base) {
            addActive(idx, btns);
            addActive(idx, boxs);
        }
    })
}

function getElementIndex(element, range) {
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
}