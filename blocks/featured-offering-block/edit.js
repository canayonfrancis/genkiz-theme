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
import { useBlockProps } from '@wordpress/block-editor';

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

import { MediaUpload, RichText, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({attributes, setAttributes}) {
	const { title, subtitle, link, text, image } = attributes;
	
	const onImageSelect = (media) => setAttributes({ image: media.url });
	
	return (
		<div className="featured-offering-block">
			<InspectorControls>
				<PanelBody title="Link Settings">
					<URLInputButton
						label="Link"
						onChange={(value) => setAttributes({ link: value })}
						url={link}
					/>
				</PanelBody>
			</InspectorControls>

			<MediaUpload
				onSelect={onImageSelect}
				allowedTypes={['image']}
				render={({ open }) => (
					<Button onClick={open} className="image-button">
						{image ? (
							<img src={image} alt="Selected" />
						) : (
							'Upload Image'
						)}
					</Button>
				)}
			/>

			<RichText
				tagName="h2"
				value={title}
				onChange={(value) => setAttributes({ title: value })}
				placeholder="Enter title"
			/>
			<RichText
				tagName="h3"
				value={subtitle}
				onChange={(value) => setAttributes({ subtitle: value })}
				placeholder="Enter subtitle"
			/>
			<RichText
				tagName="p"
				value={text}
				onChange={(value) => setAttributes({ text: value })}
				placeholder="Enter content"
			/>
		</div>
	);
}
