//VISUAL SLIDER
const pauseBtn = document.querySelector('.slider-pause');
const playBtn = document.querySelector('.slider-play');
const progressEl = document.querySelector('.progress');
const sliderText = document.querySelector('.text-cont');
const visualSwiper = new Swiper('.visual-slider .swiper', {
    effect: "fade",
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".visual-slider .swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: '.visual-slider .swiper-button-next',
        prevEl: '.visual-slider .swiper-button-prev',
    },
    on: {
        slideChangeTransitionStart: () => {
            progressEl.classList.remove('animate');
        },
        slideChangeTransitionEnd: () => {
            progressEl.classList.add('animate');
        }
    }
});

//PAUSE
pauseBtn.addEventListener('click', () => {
    visualSwiper.autoplay.stop();
    progressEl.classList.add('paused');
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
})

//PLAY
playBtn.addEventListener('click', () => {
    visualSwiper.autoplay.start();
    progressEl.classList.remove('paused');
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
})

//ABOUT SLIDER
const aboutSliderEl = document.querySelector('.about-slider');
const aboutTitle = document.querySelector('.sp-title');
const aboutSubT = document.querySelector('.sub-title');
const aboutSpT = document.querySelector('.sp-text');
let totalSlide = $('.about-slider .swiper-slide').length;
const aboutSwiper = new Swiper('.about-slider .swiper', {
    effect: 'fade',
    speed: 1000,
    loop: true,
    autoHeight: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    touchRatio: 1,
    slidesPerView: 1,
    pagination: {
        el: '.about-slider .swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: ".about-slider .swiper-button-next",
        prevEl: ".about-slider .swiper-button-prev",
    },
    on: {
        slideChangeTransitionStart: () => {
            aboutSliderEl.classList.remove('current')
            aboutSliderEl.classList.add('out')
        },
        slideChangeTransitionEnd: () => {
            aboutSliderEl.classList.add('current')
            aboutSliderEl.classList.remove('out')
        },
        slideChange: function(){
            var activeSlide = this.realIndex;
            console.log(activeSlide)
            $(".active-slide").html(activeSlide + 1);
            $(".total-slide").html('/' + totalSlide);
        }
    },
    breakpoints: {
        1024: {
            touchRatio: 0,
        }
    },
});

//POSITIONS SLIDER
const breakpoint = window.matchMedia('(max-width: 1024px)');
const mobisEl = document.querySelector('.mobis-slider');
const mipEl = document.querySelector('.mip-slider');
const mipEls = document.querySelectorAll('.mip-slider .swiper-slide')
let mobisSwiper = undefined;
let mipSwiper = undefined;

const breakpointChecker = function () {
    if (breakpoint.matches === true) { //1024 이하
        if (mipSwiper !== undefined) {
            mipSwiper.destroy(true, true);
            addDestroyClass();
        }
        enableSwiperMobis();
    } else if (breakpoint.matches === false) { //1024 이상
        if (mobisSwiper !== undefined) {
            mobisSwiper.destroy(true, true);
            addDestroyClass();
        }
        enableSwipermMip();
    }
};

let addDestroyClass = () => {
    if (winW < 1024) {
        mobisEl.classList.remove('destroy');
        mipEl.classList.add('destroy');
    } else {
        mobisEl.classList.add('destroy');
        mipEl.classList.remove('destroy');
    }
}

const enableSwiperMobis = function () {
    mobisSwiper = new Swiper(".mobis-slider .swiper", {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 16,
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });
}

const enableSwipermMip = function () {
    mipSwiper = new Swiper(".mip-slider .swiper", {
        slidesPerView: 3,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".mip-slider .swiper-button-next",
            prevEl: ".mip-slider .swiper-button-prev",
        }
    });
}

breakpoint.addEventListener('change', breakpointChecker);
window.addEventListener('load', addDestroyClass);
breakpointChecker();

mipEls.forEach((el, index) => {
    el.addEventListener('mouseenter', () => {
        addActive(index, mipEls);
    })
    el.addEventListener('mouseleave', () => {
        removeActive(index, mipEls);
    })
})