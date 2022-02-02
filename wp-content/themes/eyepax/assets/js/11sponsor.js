jQuery(document).ready(function($) {
    $('select.region').on('change', this, function(e) {
        var region_val = $(this).find('option:selected').attr('value');
        var region_img = $(this).find('option:selected').attr('data-img');
        var region_desc = $(this).find('option:selected').attr('data-desc');

        $('.step-1.details .detail-img-wrap img').attr('src', region_img);
        $('.step-1.details .detail-desc-wrap p').html('').html(region_desc);
        if (region_val != '') {
            $(this).parent('.region-wrap').addClass('active');
        }
        $('select.location option').each(function() {
            var option_region = $(this).attr('data-region');
            if (option_region != '' && option_region != region_val) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

    });

    $('select.location').on('change', this, function(e) {
        var location_val = $(this).find('option:selected').attr('value');
        var location_img = $(this).find('option:selected').attr('data-img');
        var location_desc = $(this).find('option:selected').attr('data-desc');

        $('.step-1.details .detail-img-wrap img').attr('src', location_img);
        $('.step-1.details .detail-desc-wrap p').html('').html(location_desc);

        if (location_val != '') {
            $(this).parent('.location-wrap').addClass('active');
        }
    });
    $('.step-wrap.step-1 .continue ').on('click', this, function(e) {
        if ($('.sponsor-form').valid() == true) {
            $('.step-wrap.step-1').hide();
            $('.step-wrap.step-2').show();

        }
    });

    $('.age-input-wrap input').on('click', this, function() {
        $('.age-input-wrap').removeClass('active');
        if ($(this).is(":checked")) {
            $(this).parent('.age-input-wrap').addClass('active');
        }
    })
    $('.step-wrap.step-2 .back ').on('click', this, function(e) {
        $('.step-wrap.step-2').hide();
        $('.step-wrap.step-1').show();
    });
    $('.step-wrap.step-2 .continue ').on('click', this, function(e) {
        if ($('.sponsor-form').valid() == true) {
            $('.step-wrap.step-2').hide();
            $('.step-wrap.step-3').show();

        }
    });


    $('.step-wrap.step-3 .back ').on('click', this, function(e) {
        $('.step-wrap.step-3').hide();
        $('.step-wrap.step-2').show();
    });
    $('.step-wrap.step-3 .continue ').on('click', this, function(e) {
        if ($('.sponsor-form').valid() == true) {
            $('.step-wrap.step-3').hide();
            $('.step-wrap.result').show();

        }
    });

});