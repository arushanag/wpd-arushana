jQuery(document).ready(function($) {
        $('.latest-events-container').slick({
        	arrows: false,
        	dots: true,
        	responsive: [{
                breakpoint: 1023,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 1,
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