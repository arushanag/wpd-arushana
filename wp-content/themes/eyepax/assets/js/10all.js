jQuery(document).ready(function($) {
    sidebarToggle();
    $(window).resize(function() {
        sidebarToggle();
    });
    if ($('body').find('.slick-gallery').length > 0) {
        $('.slick-gallery').slick({
            slidesToScroll: 1,
            arrows: true,
            centerMode: true
        });
    }
    if ($('body').find('.form-container').length > 0) {
        $('.subscribe-btn-wrap').each(function() {
            $(this).on('click', this, function() {
                $('.form-container').slideToggle('slow').toggleClass('active');
                if ($('.form-container').hasClass('active')) {
                    $(this).find('.subscribe').hide();
                    $(this).find('.close').show();
                } else {
                    $(this).find('.close').hide();
                    $(this).find('.subscribe').show();
                }
            });
        });
    }

    function sidebarToggle() {
        if ($(window).width() < 1024) {
            $('.sidebar-content').hide();
            $('.sidebar-title').on('click', this, function() {
                $('.sidebar-content').slideToggle('slow');
                $(this).toggleClass('active');
            })
        } else {
            $('.sidebar-content').show();
            $('.sidebar-title').removeClass('active');
        }
    }

    if ($('.piw-campaign_form-wrapper').length) {
        $(document).on('blur', 'input', function() {
            if (jQuery(this).val() == "") {
                jQuery(this).parents('li').find('label').removeAttr('style');
            }
        });
        $(document).on('focus', 'input', function() {
            jQuery(this).parents('li').find('label').attr('style', 'top:-2px;');
        });
        /*jQuery('input').blur(function() {
            if (jQuery(this).val() == "") {
                console.log('empty');
                jQuery(this).parent().prev('label').removeAttr('style');
            }
        }).focus(function() {
            console.log(focus);
            jQuery(this).parent().prev('label').css('top', '-2px !important;');
        });*/
    }
});