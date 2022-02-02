jQuery(document).ready(function($) {
    $slider = $('.half-content-half-image .slider-wrapper');
    if ($slider.length) {
        $slider.slick({
            arrows: false,
            slidesToShow: 1,
            infinite: true,
            autoplay: true,
            nextArrow: '<button type="button" class="slick-next"><span class="material-icons">arrow_forward</span></button>',
            prevArrow: '<button type="button" class="slick-prev"><span class="material-icons">arrow_back</span></button>',
            responsive: [

                {
                    breakpoint: 767,
                    settings: {
                        arrows: true,
                    }
                }
            ]
        });
    }

});