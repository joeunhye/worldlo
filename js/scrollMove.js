const boxs = document.querySelectorAll('section');
const btns = document.querySelectorAll('nav li a');
const aboutSection = document.querySelector('.panel.about');
const speed = 1000;
const base = window.innerHeight / 2;
let posArr;
let enableClick = true;

setPos();
bindingEvent();

btns[0].classList.add('on');

function bindingEvent() {
    [].forEach.call(btns, el => {
        el.addEventListener('click', e => {
            const isOn = e.currentTarget.classList.contains('on');
            const index = getElementIndex(btns, el);
            if (enableClick && !isOn) {
                enableClick = false;
                moveScroll(index);
            }
        });
    });
}

window.addEventListener('resize', () => {
    if (winW < 1200) {
        setPos();
        bindingEvent();
        detectBottom();
    }
})

window.addEventListener('scroll', () => {
    if (winW < 1200) {
        activeOn(scrollH);
    }
    detectBottom();
})

//SECTION OFFSET-TOP SETTING
function setPos() {
    posArr = [];
    boxs.forEach((boxEl) => {
        posArr.push(boxEl.offsetTop)
    })
}

//SECTION MOVE
function moveScroll(target) {
    $('html,body').stop().animate({
        scrollTop: posArr[target]
    }, speed, function () {
        enableClick = true;
    })
}

function activeOn(scroll) {
    btns.forEach((btnEl, idx) => {
        if (scroll >= posArr[idx] - base) {
            addActive(idx, btns);
        }
    })
}

function getElementIndex(element, range) {
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
}

function detectBottom() {
    if(winW < 1200) {
        if (scrollH + winH >= bodyH - base) {
            topBtn.classList.add('white')
        }else {
            topBtn.classList.remove('white')
        }
    }
}