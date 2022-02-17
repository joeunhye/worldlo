let body;
const topBtn = document.querySelector('.top-btn');
window.onload = () => {
    size();
    body = document.querySelector('body');
    $.scrollify({
        section: ".panel",
        scrollbars: false,
        interstitialSection: "#footer",
        scrollSpeed: 800,
        before: (i, panels) => {
            var ref = panels[i].attr("data-section-name");
            $('html').attr('data-scrollify-page-index', i);
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
            $('.panel').removeClass('active')
            current = $.scrollify.current();
            current.addClass('active')
            var currentWrapper = $.scrollify.current();
            //console.log(currentWrapper)
            if(currentWrapper[0].classList.contains('positions') || currentWrapper[0].classList.contains('products')) {
                topBtn.classList.add('white')
            }else {
                topBtn.classList.remove('white')
            }
            if(currentWrapper[0].classList.contains('foot')) {
                topBtn.classList.add('foot')
            }else {
                topBtn.classList.remove('foot')
            }
             
        },
        afterRender: () => {
            var pagination = "<ul class=\"pagination\">";
            var activeClass = "";
            $(".panel").each(function (i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + ' item' + i + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + "<span class=\"hover-arrow\">" + "</span>" +  "<span class=\"panel-name\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></span></a></li>";
            });

            pagination += "</ul>";
            $(".intro").append(pagination);
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
    if (winW < 1024) {
        $.scrollify.disable();
        body.style.overflow = 'visible';
    } else {
        $.scrollify.enable();
        body.style.overflow = 'hidden';
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

/*
https://codepen.io/xamyr/pen/oNvyJbO
https://codepen.io/jonddon/pen/BqdGRZ
https://codepen.io/willemdaan/pen/yMOLEW
https://codepen.io/ljubica_b/pen/aqZeWP/
https://codepen.io/kimyangsun/pen/rNNEgGj
https://codepen.io/sonamtsu/pen/OapxOd
https://codepen.io/kimyangsun/pen/eYmrbqL
https://codepen.io/Priyamaheshwari/pen/RwVRaxQ
*/