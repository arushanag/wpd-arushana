/**
 * Donation form base block
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Tooltip, Button, Toolbar, PanelBody, IconButton, TextControl, BaseControl, MediaUpload } = wp.components;
const { InnerBlocks, RichText, InspectorControls, BlockControls } = wp.blockEditor;

import { OptionSidebar } from '../OptionSidebar'
let optionSchema = require('./options.json');

registerBlockType('marlin/post-grid', {
	title: __('Post Grid'),
	icon: 'image-flip-horizontal',
	category: 'common',
	keywords: [
		__('Post Grid')
	],

	attributes: require('./attributes.json'),

	edit: ({ className, attributes, setAttributes }) => {
		return <>
			< OptionSidebar attributes={attributes} setAttributes={setAttributes} optionSchema={optionSchema} />
			<wp.serverSideRender block={'marlin/post-grid'} attributes={attributes} />
		</>
	},

	save: ({ attributes, className }) => null

});
