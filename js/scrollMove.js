const boxs = document.querySelectorAll('section');
const btns = document.querySelectorAll('nav li a');
const speed = 1000;
const base = -320;
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
            if(enableClick && !isOn) {
                enableClick = false;
                moveScroll(index);
            }
        });
    });
}

window.addEventListener('resize', () => {
    if(winW < 1200) {
        bindingEvent();
    }
})

window.addEventListener('scroll', () => {
    if(winW < 1200) {
        activeOn(scrollH);
    }
    if(scrollH < 100) {
        $('.panel').removeClass('on')
        console.log('scroll top')
    }
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