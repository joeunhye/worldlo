const boxs = $('section');
const btns = $('nav li a');
const speed = 1000;
const base = -200;
let posArr;
let enableClick = true;

setPos();

btns.on('click', function(e) {
    const isOn = $(e.currentTarget).parent().hasClass('on');
    const i = $(e.currentTarget).parent().index();
    if(enableClick && !isOn) {
        enableClick = false;
        moveScroll(i);
    }
})

// $(window).on('scroll', function() {
//     let scroll = $(window).scrollTop();
//     activation(scroll);
// })

function setPos() {
    posArr = [];
    btns.each(function(idx) {
        posArr.push(boxs.eq(idx).offset().top)
    })
}

function moveScroll(target) {
    $('html,body').stop().animate({scrollTop: posArr[target]}, speed, function() {
        enableClick = true;
    })
}

// function activation(scroll) {
//     btns.each(function(idx) {
//         if(scroll >= posArr[idx] + base) {
//             btns.parent().removeClass('on');
//             btns.parent().eq(idx).addClass('on');
//             boxs.removeClass('on');
//             boxs.eq(idx).addClass('on');
//         }
//     })
// }