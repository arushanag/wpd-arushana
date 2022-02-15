<?php $options = isset($attributes['options']) ? $attributes['options'] : null; ?>
<section class="latest-event-slider sm:mb-0 pt-12 lg:mb-0" class="<?php echo @$attributes['className']; ?>">
	<div class="flex flex-wrap">
		<div class="latest-wrapper text-center w-full column-1 lg:px-36 lg:py-10 sm:px-24 sm:py-5">
			<?php if( $options['grid_title'] ): ?>
				<h2 class="text-3xl leading-7 text-center lg:text-4xl font-extrabold pb-10"><?php echo $options['grid_title']; ?></h2>
			<?php endif; ?>
			<hr class="pb-16 m-auto" />
			<div class="latest-slider-container p-2">
					<?php 				
						$args = array(
						'post_type' => $options['post_type'] ?? "post",
						'posts_per_page' => $options['posts_per_page'] ?? 10,
						'order' => $options['sorting_order'] ?? "ASC",
					);         

					$the_query = new WP_Query( $args );
					if($the_query->have_posts() ) : 
						while ( $the_query->have_posts() ) : 
						$the_query->the_post();  
					?>
						<div class="<?php echo @$attributes['className']; ?>" >
								<div class="events-wrap md:px-10 flex flex-wrap  lg:flex-no-wrap">
									<div class="events-slide-image w-full md:w-full lg:w-3/4 pr-10">
										<?php echo get_the_post_thumbnail(); ?>
									</div> 
									<div class="events-slide-post text-left  w-full md:w-full lg:w-1/4 pt-10">
										<?php 
											$media_date = get_field("media_date");
										 ?>
										<div class="post-title">
											<h3 class="font-extrabold text-2xl"><?php the_title(); ?></h3>
											<?php if( $media_date ): ?>
												<p class="event-date pb-2 text-2xl"><?php 	echo $media_date; ?>
												</p>
										<?php endif; ?>
										</div>
										<div class="event-description">
											<p><?php the_excerpt(); ?></p>
										</div>
										<div class="event-category object-none object-left-bottom">
											<p class="video"><i class="fa fa-play-circle"></i> Video</p>
										</div>
									</div> 
								</div>
						</div>
					<?php endwhile; endif; ?>                     
			</div>			            
		</div>
	</div>
</section> 