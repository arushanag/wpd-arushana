jQuery(document).ready(function($) {
    $slider_img_selector = '.three-col-slider-box-sync .image-box-wrapper';
    $slider_img = $('.three-col-slider-box-sync .image-box-wrapper');

    $slider_desc_selector = '.three-col-slider-box-sync .desc-wrapper';
    $slider_desc = $('.three-col-slider-box-sync .desc-wrapper');

    if ($slider_desc.length) {
        $slider_desc.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: $slider_img_selector,
            nextArrow: '<button type="button" class="slick-next"><span class="material-icons text-black">arrow_forward</span></button>',
            prevArrow: '<button type="button" class="slick-prev"><span class="material-icons text-black">arrow_back</span></button>',
            responsive: [{
                breakpoint: 768,
                settings: {

                    slidesToShow: 1
                }
            }]
        });
    }

    if ($slider_img.length) {
        $slider_img.slick({
            centerMode: true,
            slidesToShow: 3,
            asNavFor: $slider_desc_selector,
            responsive: [{
                breakpoint: 768,
                settings: {

                    slidesToShow: 1
                }
            }]
        });
    }



    /*$('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });*/
});