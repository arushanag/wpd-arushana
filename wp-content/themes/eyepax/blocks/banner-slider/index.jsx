/**
 * Donation form base block
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Tooltip, Button, Toolbar, PanelBody, IconButton, TextControl, BaseControl, MediaUpload } = wp.components;
const { InnerBlocks, RichText, InspectorControls, BlockControls} = wp.blockEditor;

registerBlockType('marlin/banner-slider', {
	title: __('Banner Slider'),
	icon: 'image-flip-horizontal',
	category: 'common',
	keywords: [
		__('Banner Slider')
	],

  attributes: require("./attributes.json"),
	edit: ({ className, attributes, setAttributes }) => {
		return <div className={className}>
					<section class="banner-slider-section mb-12">
					    <div class="lg:flex lg:flex-wrap">
							<div class="slick-slider js-slick">
								<InnerBlocks allowedBlocks={['marlin/banner-slider-item']} />
							</div>
					    </div>
					</section>
		</div>
	},

	save: () => <InnerBlocks.Content />

});
