<?php 

/**
 * Template part for banner
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package marlin
 */
$ref = "slider-item-" . uniqid();

$textColorMobile = "#0071a1";
$textWidth = "50";
$options = isset($attributes['options']) ? $attributes['options'] : null;

if($options){
	$textColorMobile = isset($attributes['options']['text-color-mobile']) ? $options['text-color-mobile']['hex'] : $textColorMobile;
	$textWidth = isset($options['text-width']) ? $options['text-width'] : $textWidth;
}
?>

<div id="<?php echo $ref ?>" class="slider-wrapper relative inline-block h-auto">
	<img src="<?php echo @$attributes['banner_img'] ?>">
		<div style="<?php echo "width: " . @$attributes['banner_title_width'] . "%"; ?>" 
		class="inner-wrap hidden lg:flex flex-col items-start justify-center px-24 absolute">
	      <h3 class="xl:leading-10 lg:leading-8 md:leading-7 text-white"><?php echo @$attributes['banner_title'] ?></h3> 
	      <?php if( $attributes['banner_btn_link'] ): ?> 
	      	<a href="<?php echo @$attributes['banner_btn_link'] ?>" class="banner-btn text-white p-2"><?php echo @$attributes['banner_btn_text'] ?></a> 
	      <?php endif; ?>     		
		</div>
		<div class="mobile-inner-wrap flex flex-col items-start justify-center pt-8 lg:hidden px-6">
			<h3 style="<?php echo "color: " . $textColorMobile; ?>" 
				class="mobile-title-color"><?php echo @$attributes['banner_title'] ?></h3>
			<?php if( $attributes['banner_btn_link'] ): ?> 
	      		<a href="<?php echo @$attributes['banner_btn_link'] ?>" class="bg-blue-450 text-white p-4"><?php echo @$attributes['banner_btn_text'] ?></a> 
	      	<?php endif; ?>
		</div>	
</div>                   