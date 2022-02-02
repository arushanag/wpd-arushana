jQuery(document).ready(function($) {

    $('#close-btn').click(function() {
        $('#search-overlay').fadeOut();
        $('#search-btn').show();
    });
    $('#search-btn').click(function() {
        $(this).hide();
        $('#search-overlay').fadeIn();
    });

    $('.ham-burguer').click(function() {
        $('.mobile-menu').slideDown();
    });

    $('.mobile-menu-close').click(function() {
        $('.mobile-menu').slideUp();
    });

    $(".contrast").on("click", function(event) {
        event.preventDefault();
        $("#contrast-cont").each(function() {
            var classes = [
                "contrast-invert",
                "contrast-grayscale",
                "contrast-normal",
            ];
            this.className =
                classes[($.inArray(this.className, classes) + 1) % classes.length];
            $.cookie("contrast", this.className, { path: "/", expires: 7 });
        });
    });
    //$("#contrast-cont").addClass($.cookie("contrast"));

    $(".font-changer").on("click", function(event) {
        event.preventDefault();
        $("#text-cont").each(function() {
            var classes = [
                "text-large",
                "text-larger",
                "text-normal",
            ];
            this.className =
                classes[($.inArray(this.className, classes) + 1) % classes.length];
            $.cookie("text", this.className, { path: "/", expires: 7 });
        });
    });
    //$("#text-cont").addClass($.cookie("text"));

});