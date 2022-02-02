jQuery(document).ready(function($) {
    // -----------------------
    // Sticky header
    // -----------------------
    $(window).scroll(function() {
        var sticky = $('#site-header'),
            toggleClass = sticky.find('.header-top');
        scroll = $(window).scrollTop();
        if (scroll >= 10) {
            sticky.addClass('move-to-top');

        } else {
            sticky.removeClass('move-to-top');

        }

        if ($('body').find('.counter').length > 0) {

            var impact_element = '.our-impact .counter';

            var impact_top_of_element = $(impact_element).offset().top;
            var impact_bottom_of_element = $(impact_element).offset().top + $(impact_element).outerHeight();
            var impact_bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var impact_top_of_screen = $(window).scrollTop();

            if ((impact_bottom_of_screen > impact_top_of_element) && (impact_top_of_screen < impact_bottom_of_element)) {
                call_counter(impact_element);
            }

            var contribution_element = '.your-contribution .chart';
            var contribution_element_counter = '.your-contribution .counter';

            var contribution_top_of_element = $(contribution_element).offset().top;
            var contribution_bottom_of_element = $(contribution_element).offset().top + $(contribution_element).outerHeight();
            var contribution_bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var contribution_top_of_screen = $(window).scrollTop();

            if ((contribution_bottom_of_screen > contribution_top_of_element) && (contribution_top_of_screen < contribution_bottom_of_element)) {
                call_counter(contribution_element_counter);
                call_chart(contribution_element);
            }
        }

    });

    function call_counter(element) {
        if (!$(element).hasClass('counted')) {
            $(element).addClass('counted');
            $(element).each(function() {
                $(this).spincrement({
                    from: 0,
                    decimalPlaces: 0,
                    duration: 2000,
                });
            });
        }
    }

    function call_chart(element) {
        if (!$(element).hasClass('charted')) {

            $(element).each(function() {
                $(element).easyPieChart({
                    easing: 'easeOutQuad',
                    lineWidth: 4,
                    trackColor: false,
                    barColor: '#0079c1',
                    scaleLength: 0,
                    lineCap: 'butt',
                    size: 350,
                    animate: 5000,
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    }
                });
            });
        }
    }
});