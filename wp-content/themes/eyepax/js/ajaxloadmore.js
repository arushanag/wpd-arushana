jQuery(function($) {
    console.log('test');
    $(window).scroll(function() {
        if ($('body').find('.load-more').length > 0) {

            var top_of_element = $(".load-more").offset().top;
            var bottom_of_element = $(".load-more").offset().top + $(".load-more").outerHeight();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var top_of_screen = $(window).scrollTop();

            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
                // The element is visible, do something
                var page = $('.load-more').attr('data-current-page');
                var status = $('.load-more').attr('data-status');
                $('.load-more').attr('data-status', 0);
                if (status == 1) {
                    console.log('load more visible');
                    var pageVal = parseInt(page) + parseInt(1);
                    $('.load-more').attr('data-current-page', pageVal);

                    if ($('body').hasClass('blog') || $('body').hasClass('category')) {
                        var archive = $('.load-more').attr('data-archive');
                        var taxonomy = $('.load-more').attr('data-taxonomy');
                        var term = $('.load-more').attr('data-termID');
                        var post_type = $('.load-more').attr('data-post-type');

                        news_load_more(pageVal, 'load-more', archive, taxonomy, term, post_type);
                    }
                    /*
                    if( $('body').hasClass('page-template-page-project') || $('body').hasClass('tax-karma-project-category') ){
                    	var archive = $('.load-more').attr('data-archive');
                    	var taxonomy = $('.load-more').attr('data-taxonomy');
                    	var term = $('.load-more').attr('data-termID');
                    	project_load_more( pageVal, 'load-more', archive, taxonomy, term );
                    }
					
                    if( $('body').hasClass('post-type-archive-product') ){
                    	var archive = $('.load-more').attr('data-archive');
                    	var taxonomy = $('.load-more').attr('data-taxonomy');
                    	var term = $('.load-more').attr('data-termID');
                    	var exclude = $('.load-more').attr('data-exclude');
                    	product_load_more( pageVal, 'load-more', archive, taxonomy, term, exclude );
                    }
					
                    if( $('body').hasClass('search') ){
                    	var searchVal = $('.load-more').attr('data-search');
                    	search_load_more( pageVal, 'load-more', searchVal );
                    }*/
                }
            } else {
                // The element is not visible, do something else
            }
        }
    });



    /*var canBeLoaded = true, // this param allows to initiate the AJAX call only if necessary
        bottomOffset = 2500; // the distance (in px) from the page bottom when you want to load more posts

    $(window).scroll(function() {
        var data = {
            'action': 'loadmorebutton',
            'query': misha_loadmore_params.posts,
            'page': misha_loadmore_params.current_page
        };
        if ($(document).scrollTop() > ($(document).height() - bottomOffset) && canBeLoaded == true) {

            $.ajax({
                url: misha_loadmore_params.ajaxurl,
                data: data,
                type: 'POST',
                beforeSend: function(xhr) {
                    // you can also add your own preloader here
                    // you see, the AJAX call is in process, we shouldn't run it again until complete
                    canBeLoaded = false;
                },
                success: function(posts) {
                    if (posts) {
                        //$('#main').find('article:last-of-type').after( data ); // where to insert posts
                        $('#misha_posts_wrap').append(posts); // insert new posts
                        canBeLoaded = true; // the ajax is completed, now we can run it again
                        misha_loadmore_params.current_page++;

                    }
                }
            });
        }
    });*/

    $('#keyword-cat').on('change', function(e) {
        $.ajax({
            url: misha_loadmore_params.ajaxurl,
            data: $('#misha_filters').serialize(), // form data
            dataType: 'json', // this data type allows us to receive objects from the server
            type: 'POST',
            beforeSend: function(xhr) {
                $('#response').find('.loader').addClass('loading');
            },
            success: function(data) {

                // when filter applied:
                // set the current page to 1
                misha_loadmore_params.current_page = 1;

                // set the new query parameters
                misha_loadmore_params.posts = data.posts;

                // set the new max page parameter
                misha_loadmore_params.max_page = data.max_page;

                // change the button label back
                $('#response').find('.loader').removeClass('loading');

                // insert the posts to the container
                $('#misha_posts_wrap').html(data.content);

                // hide load more button, if there are not enough posts for the second page
                if (data.max_page < 2) {
                    $('#misha_loadmore').hide();
                } else {
                    $('#misha_loadmore').show();
                }
            }
        });

        // do not submit the form
        return false;
    });

    $(".filter").bind('keypress', function(e) {
        if (e.which == 13) {
            var filter = $('#filter');
            $.ajax({
                url: misha_loadmore_params.ajaxurl,
                data: $('#misha_filters').serialize(), // form data
                dataType: 'json', // this data type allows us to receive objects from the server
                type: 'POST',
                beforeSend: function(xhr) {
                    $('#response').find('.loader').addClass('loading');
                },
                success: function(data) {

                    // when filter applied:
                    // set the current page to 1
                    misha_loadmore_params.current_page = 1;

                    // set the new query parameters
                    misha_loadmore_params.posts = data.posts;

                    // set the new max page parameter
                    misha_loadmore_params.max_page = data.max_page;

                    // change the button label back
                    $('#response').find('.loader').removeClass('loading');

                    // insert the posts to the container
                    $('#misha_posts_wrap').html(data.content);

                    // hide load more button, if there are not enough posts for the second page
                    if (data.max_page < 2) {
                        $('#misha_loadmore').hide();
                    } else {
                        $('#misha_loadmore').show();
                    }
                }
            });
            return false;
        }
    });
});