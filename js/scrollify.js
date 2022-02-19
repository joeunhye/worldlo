let body;
const topBtn = document.querySelector('.top-btn');
window.onload = () => {
    size();
    body = document.querySelector('body');
    let panelEls = document.querySelectorAll('.panel')
    console.log(panelEls)
    body.classList.add('intro-section');
    $.scrollify({
        section: ".panel",
        scrollbars: false,
        interstitialSection: "#footer",
        scrollSpeed: 800,
        setHeights: false,
        touchScroll: false,
        before: (i, panels) => {
            var currentWrapper = $.scrollify.current();
            var ref = panels[i].attr("data-section-name");
            $('html').attr('data-scrollify-page-index', i);
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
            $('.panel').removeClass('active')
            current = $.scrollify.current();
            current.addClass('active')
            
            if(currentWrapper[0].classList.contains('intro')) { // intro 섹션 진입
                body.className = '';
                body.classList.add('intro-section');
                topBtn.classList.remove('white');
            }else if(currentWrapper[0].classList.contains('about')) { // about 섹션 진입
                body.className = '';
                body.classList.add('about-section');
                topBtn.classList.remove('white');
            }else if(currentWrapper[0].classList.contains('business')) { // business 섹션 진입
                body.className = '';
                body.classList.add('business-section')
                topBtn.classList.remove('white');
            }else if(currentWrapper[0].classList.contains('positions')) { // positions 섹션 진입
                body.className = '';
                body.classList.add('positions-section');
                topBtn.classList.add('white');
            }else if(currentWrapper[0].classList.contains('products')) { // products 섹션 진입
                body.className = '';
                body.classList.add('products-section');
                topBtn.classList.add('white');
            }else if(currentWrapper[0].classList.contains('location')) { // location 섹션 진입
                body.className = '';
                body.classList.add('location-section');
                topBtn.classList.remove('white');
            }
            if(currentWrapper[0].classList.contains('foot')) {
                topBtn.parentNode.classList.add('foot')
                $('.panel.location').addClass('active')
            }else {
                topBtn.parentNode.classList.remove('foot')
            }
             
        },
        afterRender: () => {
            var pagination = "<ul class=\"panel pagination\">";
            var activeClass = "";
            $(".panel").each(function (i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + ' item' + i + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + "<span class=\"hover-arrow\">" + "</span>" +  "<span class=\"panel-name\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></span></a></li>";
            });

            pagination += "</ul>";
            $("header").append(pagination);
            $(".pagination a").on("click", $.scrollify.move);
        }
    });
    viewSizeChk();
    $(topBtn).on("click", $.scrollify.move);
}

window.addEventListener('resize', () => {
    size();
    viewSizeChk();
})

window.addEventListener('scroll', () => {
    moveTop();
})
// window 너비에 따라 scrollify 활성화 제어
let viewSizeChk = () => {
    console.log(winW)
    if (winW <= 1200) {
        $.scrollify.disable();
        body.style.overflow = 'visible';
        console.log('disable')
    } else {
        $.scrollify.enable();
        body.style.overflow = 'hidden';
        console.log('enable')
    }
}

let moveTop = () => {
    if(scrollH > 100) {
        if(!topBtn.classList.contains('on')) {
            topBtn.classList.add('on')
        }
    }else if(topBtn.classList.contains('on')){
        topBtn.classList.remove('on')
    }
}