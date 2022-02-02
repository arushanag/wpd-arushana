jQuery(document).ready(function($) {
    $slider = $('.image-box-wrapper');
    if ($slider.length) {
        $slider.slick({
            arrows: false,
            centerMode: true,
            slidesToShow: 3,
            responsive: [{
                breakpoint: 768,
                settings: {

                    slidesToShow: 1
                }
            }]
        });
    }
});