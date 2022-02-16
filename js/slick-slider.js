const imageSlider = $('.slider');
const counter = $('.slide-count');

//slider pause & play
$('.slick-pause').click(() => {
    isPause = true;
    imageSlider.slick('slickPause');
    $('.progress-bar li.slick-active').addClass('paused')
});
$('.slick-play').click(() => {
    isPause = false;
    imageSlider.slick('slickPlay');
    $('.progress-bar li.slick-active').removeClass('paused')
});

imageSlider.on('beforeChange', (e, slick) => {

});
imageSlider.on('init reInit afterChange', (e, slick, currentSlide, nextSlide) => {
    //slider count
    let i = (currentSlide ? currentSlide : 0) + 1;
    counter.html(`<span class="slideCountItem">${i}</span> / <span class="slideCountAll">${slick.slideCount}</span>`);
});

//slider setting
imageSlider.slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    dots: true,
    arrows: true,
    adaptiveHeight: false,
    pauseOnHover: false,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
    appendDots: $('.progress-bar'),
    customPaging: function (slider, i) {
        return ``;
    },
    dotsClass: 'dot',
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