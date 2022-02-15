<section class="latest-event-section sm:mb-0 pt-12 lg:mb-0" class="<?php echo @$attributes['className']; ?>">
	<div class="flex flex-wrap">
		<div class="latest-wrapper text-center w-full column-1 lg:px-36 lg:py-10 sm:px-24 sm:py-5">
			<h2 class="text-3xl leading-7 text-center lg:text-4xl font-extrabold pb-10"><?php echo @$attributes['title']; ?></h2>
				<hr class="pb-16 m-auto" />
				<div class="latest-events-container p-2">
					<?php echo $content ?>
				</div>			            
		</div>
	</div>
</section> 