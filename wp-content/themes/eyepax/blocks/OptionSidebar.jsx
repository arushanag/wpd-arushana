const { __ } = wp.i18n;
const { PanelBody, ToggleControl, TextControl, TextareaControl, Button, BaseControl, SelectControl, ColorPicker } = wp.components;
const { InspectorControls, URLInput, MediaUpload } = wp.blockEditor;
const { withState } = wp.compose;

/**
	* Validating JSON input
	*/
const JSONInput = withState({ error: '' })(({ error, setState, option, getter, setter }) => {
	const current = getter('')
	return <>
		<TextareaControl
			label={__(option.title)}
			help="Enter raw JSON here"
			value={current}
			onChange={(text) => {
				setter(text)
				if (text) {
					try {
						JSON.parse(text)
						setState({ error: '' })
					} catch (err) {
						setState({ error: `Invalid JSON: ${err}` })
					}
				}
			}}
		/>
		{error ? <div class="error">{error}</div> : <></>}
	</>
})

/**
	* All renderers made available go here
	*/
const Renderer = {
	Toggle: (option, getter, setter) => {
		const val = Boolean(getter(false))
		return <ToggleControl
			label={__(option.title)}
			checked={val}
			onChange={() => {
				setter(!val)
			}}
		/>
	},

	/** 
		* displays opposite of value
		*/
	ToggleInverted: (option, getter, setter) => {
		const val = Boolean(getter(false))
		return <ToggleControl
			label={__(option.title)}
			checked={!val}
			onChange={() => {
				setter(!val)
			}}
		/>
	},

	Text: (option, getter, setter) => {
		const current = getter('')
		return <>
			<TextControl
				label={__(option.title)}
				value={current}
				onChange={val => setter(val)}
			/>
		</>
	},

	Textarea: (option, getter, setter) => {
		const current = getter('')
		return <>
			<TextareaControl
				label={__(option.title)}
				value={current}
				onChange={val => setter(val)}
			/>
		</>
	},

	URL: (option, getter, setter) => {
		const current = getter('')
		return <>
			<URLInput
				label={__(option.title)}
				value={current}
				onChange={val => setter(val)}
			/>
		</>
	},

	Number: (option, getter, setter) => {
		const normalise = num => Math.abs(parseInt(num) || 1)
		const current = normalise(getter(1))
		return <>
			<TextControl
				label={__(option.title)}
				value={current}
				type="number"
				onChange={(val) => setter(normalise(val))}
			/>
		</>
	},

	Currency: (option, getter, setter) => {
		const normalise = num => Number(num).toFixed(2)
		const current = normalise(getter(0))
		return <>
			<TextControl
				label={__(option.title)}
				value={current}
				type="number"
				onChange={(val) => setter(normalise(val))}
			/>
		</>
	},

	Image: (option, getter, setter) => {
		const current = getter('')
		return <BaseControl label={__(option.title)}>
			<MediaUpload
				onSelect={(imageObject) => setter(imageObject.url)}
				type="image"
				value={current} // make sure you destructured backgroundImage from props.attributes!
				render={({ open }) => (
					<div className="option-sidebar-image-input">
						<Button className="input-control image-input" icon="image" onClick={open}
							style={{ backgroundImage: `url(${current})` }}
						>
							{!current ? <span>{__('Click to change image')}</span> :
								''}
						</Button>
					</div>
				)}
			/>
		</BaseControl>
	},

	Color: (option, getter, setter) => {
		const current = getter(option.default ? option.default : '');
		return (
		  <BaseControl label={__(option.title)}>
			<ColorPicker color={current} onChangeComplete={(val) => setter(val)} />
		  </BaseControl>
		);
	  },

	/**
		* Simple select dropdown
		* XXX: fix state on load from inconsistent value
		*/
	Select: (option, getter, setter) => {
		const current = getter(option.options[0])

		return <BaseControl label={__(option.title)}>
			<SelectControl
				value={current}
				onChange={val => setter(val)}
				options={option.options}
			/>
		</BaseControl>
	},

	/**
		* Raw JSON input
		*/
	JSON: (option, getter, setter) => <JSONInput option={option} getter={getter} setter={setter} />
}


/**
 * Render a single option, using 'control' to define the input
 * @param {typeof OptionSchema.options[0]} option 
 */
const RenderOption = (optionKey, option, attributes, setAttributes) => {
	const getter = (def) => {
		return attributes && attributes[optionKey] && attributes[optionKey][option.prop] || def
	}
	const setter = val => {
		let newSettings = attributes[optionKey] ? { ...attributes[optionKey] } : {}
		newSettings[option.prop] = val
		let newAttrs = {}
		newAttrs[optionKey] = newSettings
		setAttributes(newAttrs)
	}

	if (!option.control || !Renderer[option.control]) {
		return <>
			<h1>Unknown control {option.control}!</h1>
		</>
	}

	let sub = <></>
	if (attributes[optionKey] && attributes[optionKey][option.prop] && option.children) {
		let arr = []
		if (Array.isArray(option.children[attributes[optionKey][option.prop]])) {
			arr = option.children[attributes[optionKey][option.prop]]
		} else if (Array.isArray(option.children)) {
			arr = option.children
		}
		sub = arr.map(option => RenderOption(optionKey, option, attributes, setAttributes))
	}

	return <>
		{Renderer[option.control](option, getter, setter)}
		{sub}
	</>
}

/**
 * Sidebar controls for basic form settings
 * @param {object} props attributes / setAttributes from parent form
 */
export const OptionSidebar = ({ attributes, setAttributes, optionSchema, optionKey }) => {
	const key = String(optionKey || 'options')
	return <InspectorControls>
		{optionSchema.map(panel => <PanelBody title={__(panel.title)}>
			{panel.options.map(option => RenderOption(key, option, attributes, setAttributes))}
		</PanelBody>)}
	</InspectorControls>
}

