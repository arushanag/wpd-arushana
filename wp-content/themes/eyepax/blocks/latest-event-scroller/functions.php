<?php 

/**
 * Enqueue scripts and styles.
 */
function block_scripts() {

wp_enqueue_style('slick-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
wp_enqueue_style('slick-theme-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');
wp_enqueue_script('slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', null, null, true);
wp_enqueue_script('slider-js',  get_template_directory_uri() .'/blocks/common-script/slider.js', null, null, true);

}
add_action( 'wp_enqueue_scripts', 'block_scripts' );
