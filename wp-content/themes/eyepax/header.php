<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Fusion-website
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta
		charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div id="contrast-cont"></div>
	<div id="text-cont"></div>
	<div class="site-wrapper">
		<header id="site-header" class="site-header">
			<div class="block lg:hidden">
				<div class="mobile-header-top bg-white">
					<div class="container xxl:max-w-screen-xxl mx-auto flex items-center justify-between">
						<div class="logo">
							<a href="<?php echo esc_url(home_url('/')); ?>"
								title="<?php bloginfo('name'); ?>">
								<?php
                            $get_site_logo = get_field('logo_thop', 'option');
                            if (is_array($get_site_logo) && !empty($get_site_logo['url'])) {
                                ?>
								<img src="<?php echo $get_site_logo['url']; ?>"
									alt="<?php bloginfo('name'); ?>">
								<?php
                            } else {
                                ?>
								<img src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg"
									alt="<?php bloginfo('name'); ?>">
								<?php
                            }
                            ?>
							</a>
						</div>
						<ul class="mobile-header-actions flex items-center">
							<li class="ham-burguer">
								<svg width="28" height="24" viewBox="0 0 28 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<rect width="28" height="4" fill="#0079C1" />
									<path fill-rule="evenodd" clip-rule="evenodd" d="M6 10H28V14H6V10Z"
										fill="#0079C1" />
									<rect y="20" width="28" height="4" fill="#0079C1" />
								</svg>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="mobile-menu hidden">

				<div class="mobile-search-form flex flex-wrap">
					<form role="search" method="get" class="search-form"
						action="<?php echo esc_url(home_url('/')); ?>">
						<input id='search-text' class="font-text" name='s' placeholder='Search' type='text' />
						<button id='search-button' class="search-btn-icon" type='submit'>
							<span class="material-icons">search</span>
						</button>
					</form>
					<div class="mobile-menu-close">
						<span class="material-icons">
							close
						</span>
					</div>
				</div>
				<div class="mobile-main-nav">
					<?php
                        wp_nav_menu(array(
                            'theme_location' => 'primary-menu',
                        ));
                    ?>
				</div>
			</div>
			
				<!-- Hader Top End -->
				<div class="header-main">
					<div class="container xxl:max-w-screen-xxl mx-auto">
						<div class="header-main-content flex items-center justify-between">
							<div class="logo">
								<a href="<?php echo esc_url(home_url('/')); ?>"
									title="<?php bloginfo('name'); ?>">
									<?php
                            $get_site_logo = get_field('logo_thop', 'option');
                            if (is_array($get_site_logo) && !empty($get_site_logo['url'])) {
                                ?>
									<img src="<?php echo $get_site_logo['url']; ?>"
										alt="<?php bloginfo('name'); ?>">
									<?php
                            } else {
                                ?>
									<img src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg"
										alt="<?php bloginfo('name'); ?>">
									<?php
                            }
                            ?>
								</a>
							</div>
							<div class="menu">
								<?php
                                wp_nav_menu(array(
                                    'theme_location' => 'primary-menu',
                                ));
                                ?>
							</div>
						</div>
					</div>
				</div>
				<!-- header main End -->
			</div>
			<!-- desktop header end -->
		</header>

		