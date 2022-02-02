<?php

/**
 * Fusion-website functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Fusion-website
 */

if (!defined('_S_VERSION')) {
    // Replace the version number of the theme on each release.
    define('_S_VERSION', '1.0.0');
}

if (!function_exists('piw_setup')) :
    /**
         * Sets up theme defaults and registers support for various WordPress features.
         *
         * Note that this function is hooked into the after_setup_theme hook, which
         * runs before the init hook. The init hook is too late for some features, such
         * as indicating support for post thumbnails.
         */
    function piw_setup()
    {
        /*
             * Make theme available for translation.
             * Translations can be filed in the /languages/ directory.
             * If you're building a theme based on Linking-Integrating-website, use a find and replace
             * to change 'piw' to the name of your theme in all the template files.
             */
        load_theme_textdomain('piw', get_template_directory() . '/languages');
    
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
    
        /*
             * Let WordPress manage the document title.
             * By adding theme support, we declare that this theme does not use a
             * hard-coded <title> tag in the document head, and expect WordPress to
             * provide it for us.
             */
        add_theme_support('title-tag');
    
        /*
             * Enable support for Post Thumbnails on posts and pages.
             *
             * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
             */
        add_theme_support('post-thumbnails');
    
        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(
            array(
                'top-menu' => esc_html__('Top Menu', 'piw'),
                'primary-menu' => esc_html__('Primary Menu', 'piw'),
                'mobile-menu' => esc_html__('Mobile Menu', 'piw'),
    
    
            )
        );
    
        /*
             * Switch default core markup for search form, comment form, and comments
             * to output valid HTML5.
             */
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            )
        );
    
        // Set up the WordPress core custom background feature.
        add_theme_support(
            'custom-background',
            apply_filters(
                'piw_custom_background_args',
                array(
                    'default-color' => 'ffffff',
                    'default-image' => '',
                )
            )
        );
    
        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');
    
        /**
             * Add support for core custom logo.
             *
             * @link https://codex.wordpress.org/Theme_Logo
             */
        add_theme_support(
            'custom-logo',
            array(
                'height'      => 250,
                'width'       => 250,
                'flex-width'  => true,
                'flex-height' => true,
            )
        );
    }
    endif;
    add_action('after_setup_theme', 'piw_setup');

/**
 * Load dynamic widgets.
 */
require get_template_directory() . '/inc/widgets.php';

/**
 * Register Theme Option through ACF.
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title'     => 'Theme Option',
        'menu_title'    => 'Theme Option',
        'menu_slug'     => 'theme-option',
        'capability'    => 'edit_posts',
        'parent_slug'     => '',
        'position'         => false,
        'icon_url'         => false,
        'redirect'        => false
    ));
}
add_image_size('thumb-790x478', 790, 478, true);
add_image_size('thumb-185x112', 185, 112, true);
add_image_size('thumb-460x460', 460, 460, true);
add_image_size('thumb-480x480', 480, 480, true);
add_image_size('thumb-1230x540', 1230, 540, true);

function piw_make_link($link, $class, $default, $label=null)
{
    $return_arr['title'] = '';
    $return_arr['url'] = '';
    $return_arr['target'] = '';
    $return_arr['html'] = '';
    if (is_array($link)) {
        if (array_key_exists('title', $link) && ! empty($link['title'])) {
            $return_arr['title'] = $link['title'];
        } else {
            $return_arr['title'] = $label;
        }
        if (array_key_exists('url', $link) && ! empty($link['url'])) {
            $return_arr['url'] = $link['url'];
        } else {
            $return_arr['url'] = '#';
        }
        if (array_key_exists('target', $link) && ! empty($link['target'])) {
            $return_arr['target'] = 'target="'.$link['target'].'"';
        } else {
            $return_arr['target'] = '';
        }

        $title = $return_arr['title'];

        $return_arr['html'] = '
		<a href="' . esc_url($return_arr['url']) . '" class="' . esc_attr($class) . '" ' . esc_attr($return_arr['target']) .' title="' . $label . '">
		' . html_entity_decode($title) . '
	</a>
	';
    }
    return $return_arr;
}

function content($my_content, $limit)
{
    $content = explode(' ', $my_content, $limit);
    if (count($content)>=$limit) {
        array_pop($content);
        $content = implode(" ", $content).'';
    } else {
        $content = implode(" ", $content);
    }
    $content = strip_tags($content);
    $content = preg_replace('/\[.+\]/', '', $content);
    $content = apply_filters('the_content', $content);
    $content = str_replace(']]>', ']]&gt;', $content);
    return $content;
}

/**
 * Enqueue scripts and styles.
 */
function fusion_scripts()
{
    wp_enqueue_style('piw-style', get_stylesheet_uri(), array(), _S_VERSION);
    wp_style_add_data('piw-style', 'rtl', 'replace');

    wp_enqueue_style('piw-material-icon-style', 'https://fonts.googleapis.com/icon?family=Material+Icons', array(), _S_VERSION);

    wp_enqueue_style('piw-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css', array(), _S_VERSION);

    wp_enqueue_style('piw-main-style', get_template_directory_uri() . '/assets/dist/css/style.css', array(), _S_VERSION);

    wp_enqueue_style('piw-inner-style', get_template_directory_uri() . '/assets/dist/css/global.css', array(), _S_VERSION);

    wp_enqueue_script('piw-js-bundle', get_template_directory_uri() . '/assets/dist/js/piw-bundle.js', array(), _S_VERSION, true);

    //wp_enqueue_script('piw-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);
       
}
add_action('wp_enqueue_scripts', 'fusion_scripts');