/**
 * Donation form base block
 */
import { OptionSidebar } from "../OptionSidebar";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Tooltip, Button, Toolbar, PanelBody, IconButton, TextControl, TextareaControl } = wp.components;
const { InnerBlocks, RichText, InspectorControls, BlockControls, MediaUpload } = wp.blockEditor;

registerBlockType('marlin/banner-slider-item', {
	title: __('Banner slider item'),
	icon: 'image-flip-horizontal',
	category: 'common',
	keywords: [
		__('Banner slider item')
	],

	attributes: require('./attributes.json'),

	parent: [
		'marlin/banner-slider'
	],


	edit: ({ className, attributes, setAttributes }) => {
		const optionSchema = require("./options.json");
		function selectImage(value) {
			setAttributes({
				banner_img: value.sizes.full.url,
			})
		}
		return <div className={className}>
			<div class="banner-slide-post text-left  w-full md:w-full lg:w-3/4 pt-10">
				<h3 class="lg:text-4xl font-extrabold lg:leading-10 md:ml-16 md:text-2xl md:leading-7 "><TextControl value={attributes.banner_title} placeholder="Banner Title" onChange={val => setAttributes({ banner_title: val })} /></h3>
				<span>
					<TextControl value={attributes.banner_title_width} placeholder="Banner Title Width" onChange={val => setAttributes({ banner_title_width: val })} />
				</span>
				<span>
					<TextControl value={attributes.banner_title_mobile_colour} placeholder="Banner Title Mobile colour" onChange={val => setAttributes({ banner_title_mobile_colour: val })} />
				</span>
				<span><TextControl value={attributes.banner_btn_text} placeholder="Button Text" onChange={val => setAttributes({ banner_btn_text: val })} /></span>
				<span><TextControl value={attributes.banner_btn_link} placeholder="Button Link" onChange={val => setAttributes({ banner_btn_link: val })} /></span>
			</div>
			<div class="banner-slide-image w-full md:w-full lg:w-1/4 pr-10">

				<MediaUpload
					onSelect={selectImage}
					render={({ open }) => {
						return (
							<button onClick={open}>
								<img
									src={attributes.banner_img}
								/>
							</button>
						);
					}}
				/>
			</div>
		</div>
	},

	save: ({ attributes, className }) => null
});
