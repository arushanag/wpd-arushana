jQuery(document).ready(function($) {
    if ($('.slider-content').length) {
        $('.slider-content').slick({
            arrows: true,
            asNavFor: '.slider-nav,.slider-image',
            nextArrow: '<button type="button" class="slick-next"><span class="material-icons text-black">arrow_forward</span></button>',
            prevArrow: '<button type="button" class="slick-prev"><span class="material-icons text-black">arrow_back</span></button>',
        });
    }
    $('.slider-image').slick({
        arrows: false,
        asNavFor: '.slider-content,.slider-nav',
    });
    $('.slider-nav').slick({
        arrows: false,
        asNavFor: '.slider-content,.slider-image',
        dots: false,
        focusOnSelect: true,
        slidesToShow: 5,
        nextArrow: '<button type="button" class="slick-next"><span class="material-icons text-black">arrow_forward</span></button>',
        prevArrow: '<button type="button" class="slick-prev"><span class="material-icons text-black">arrow_back</span></button>',
        responsive: [{
                breakpoint: 1023,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 1,
                }
            }
        ]
    });
});