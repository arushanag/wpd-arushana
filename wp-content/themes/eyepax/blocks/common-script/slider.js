jQuery(document).ready(function($) {
  $('.js-slick').slick({
    dots: false,
    speed: 2000,
    slidesToShow: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
    infinite:true,
    responsive: [{
        breakpoint: 1024,
        settings: {
            arrows: false,
            centerMode: false,
            slidesToShow: 1,
            dots: true,
            infinite:true
        }
    }
    ]
});
});