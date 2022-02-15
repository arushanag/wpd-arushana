const { withState } = wp.compose;
const { Disabled, IconButton, Toolbar } = wp.components;
const { BlockControls } = wp.blockEditor;

const example = `<PreviewableEditor
	block="namespace/yourblock"
	editor={<EditorComponentOfChoice />}
	attributes={attributes}
/>

OR

<PreviewableEditor
	preview={<YourPreviewMarkup />}
	editor={<EditorComponentOfChoice />}
	attributes={attributes}
/>

Note: live previews do not handle javascript boolean values well,
and will turn true into "true", so code accordingly.
`

/**
 * A basic toggle-able component with live preview vs editor
 */
export const PreviewableEditor = withState({
	previewToggle: true
})(({setState, previewToggle, editor, block, preview, attributes}) => {
	if (!(block || preview) || !editor) {
		return <div>
			<p>
				Missing a block to render and/or an editor. Example:
				<pre>{example}</pre>
			</p>
		</div>
	}
	const preview_on = preview ? preview : <Disabled>
		<wp.serverSideRender block={block} attributes={attributes} />
	</Disabled>
	return (
			<>
				<BlockControls key="controls">
					<Toolbar>
						<IconButton icon={ previewToggle ? 'edit' : 'welcome-view-site'} title="Edit mode" onClick={() => setState( { previewToggle: !previewToggle } )}  />
					</Toolbar>
				</BlockControls>
				{
					!previewToggle ? editor : preview_on
				}
			</>
	)}
)

