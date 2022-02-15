/**
 * Donation form base block
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Tooltip, Button, Toolbar, PanelBody, IconButton, TextControl, BaseControl, MediaUpload } = wp.components;
const { InnerBlocks, RichText, InspectorControls, BlockControls} = wp.blockEditor;

registerBlockType('marlin/latest-event-scroller', {
	title: __('Latest Event'),
	icon: 'image-flip-horizontal',
	category: 'common',
	keywords: [
		__('Latest Event')
	],

  attributes: require("./attributes.json"),
	edit: ({ className, attributes, setAttributes }) => {
		return <div className={className}>
			<section class="latest-event-section sm:mb-0 pt-12 lg:mb-0">
			    <div class="flex flex-wrap">
			        <div class="latest-wrapper text-center w-full column-1 lg:px-36 lg:py-10 sm:px-24 sm:py-5">
			            <h2 class="text-3xl leading-7 text-center lg:text-4xl font-extrabold pb-10"><TextControl value={attributes.title} placeholder="Main Title"
			            				onChange={val => setAttributes({ title:val })}
			            /></h2>
			            <hr class="pb-16 m-auto" />    		

			            <div class="latest-events-container p-2">
			            	<InnerBlocks allowedBlocks={['marlin/latest-event-scroller-item']} />
			        	</div>			            
			        </div>
			    </div>
			</section> 
		</div>
	},

	save: () => <InnerBlocks.Content />

});
