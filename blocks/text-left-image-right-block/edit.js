/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Import necessary components for the media upload.
 */
import { Button, PanelBody, PanelRow } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, description, image } = attributes;

	const onChangeTitle = ( event ) => {
		setAttributes( { title: event.target.value } );
	};

	const onChangeDescription = ( event ) => {
		setAttributes( { description: event.target.value } );
	};

	// Handle image selection from the media library
	const onSelectImage = ( newImage ) => {
		setAttributes( { image: newImage.url } );
	};

	return (
		<div { ...useBlockProps() }>
			<div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
				{/* Left Section: Title and Description */}
				<div className="md:w-1/2 text-left space-y-2">
					<input
						type="text"
						value={ title }
						onChange={ onChangeTitle }
						className="w-full border border-gray-300 rounded px-4 py-2"
						placeholder={ __( 'Enter title...', 'blocks/text-left-image-right-block' ) }
					/>
					<textarea
						value={ description }
						onChange={ onChangeDescription }
						className="w-full border border-gray-300 rounded px-4 py-2"
						placeholder={ __( 'Enter description...', 'blocks/text-left-image-right-block' ) }
					/>
				</div>

				{/* Right Section: Image Selector */}
				<div className="md:w-1/2">
					<PanelBody title={__('Image Selector', 'blocks/text-left-image-right-block')} initialOpen={true}>
						<PanelRow>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={image}
									render={({ open }) => (
										<Button 
											onClick={open} 
											isSecondary
											className="image-upload-button"
										>
											{image ? __('Replace Image') : __('Select Image')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</PanelRow>
					</PanelBody>

					{/* Image Preview */}
					{ image && <img src={ image } alt={ __( 'Block Image', 'blocks/text-left-image-right-block' ) } className="w-full h-auto rounded" /> }
				</div>
			</div>
		</div>
	);
}
