const imageSlider = $('.slider');
const bar = $('.slider-progress .progress');

{/* <div class="progress-wrap">
    <div class="slider-progress">
        <div class="progress"></div>
    </div>
</div> */}
const counter = $('.slide-count');
let time = 0.5;
let isPause,
    tick,
    percentTime;

//slider progressbar 
function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 30);
}

//slider progressbar render
function interval() {
    if (isPause === false) {
        percentTime += 1 / (time + 0.5);
        bar.css({width: percentTime + "%"});
        if (percentTime >= 100) {
            imageSlider.slick('slickNext');
            startProgressbar();
        }
    }
}

//slider progressbar reset
function resetProgressbar() {
    bar.css({width: 0 + '%'});
    clearTimeout(tick);
}
startProgressbar();

$('.prev-arrow, .next-arrow').click(() => {
    startProgressbar();
});

//slider pause & play
$('.slick-pause').click(() => {
    isPause = true;
    imageSlider.slick('slickPause');
    $('.slider-wrapper .slick-dots li.slick-active').addClass('paused')
});
$('.slick-play').click(() => {
    isPause = false;
    imageSlider.slick('slickPlay');
    $('.slider-wrapper .slick-dots li.slick-active').removeClass('paused')
});

imageSlider.on('beforeChange', (e, slick) => {
    startProgressbar();
});
imageSlider.on('init reInit afterChange', (e, slick, currentSlide, nextSlide) => {
    //slider count
    let i = (currentSlide ? currentSlide : 0) + 1;
    counter.html(`<span class="slideCountItem">${i}</span> / <span class="slideCountAll">${slick.slideCount}</span>`);
});

//slider setting
imageSlider.slick({
    fade: true,
    speed: 600,
    dots: true,
    arrows: true,
    adaptiveHeight: false,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
});



$('.your-class').slick({
    fade: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    preventClicks: true,
    speed: 1000,
    dots: true,
});

$(".your-class").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
        $(".your-class").removeClass('left');
        $(".your-class").addClass('right');
    } else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0)) {
        $(".your-class").removeClass('right');
        $(".your-class").addClass('left');
    } else {
        $(".your-class").removeClass('left');
        $(".your-class").addClass('right');
    }
});
/**
 * https://codepen.io/young/pen/MWYzOgO
 * https://codepen.io/alexandrebuffet/pen/zNpmpx
 * https://codepen.io/ankithingarajiya/pen/JjPmRJv
 */