/**
 * Retrieves the translation of text.
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 */
import { 
    useBlockProps, 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck 
} from '@wordpress/block-editor';

/**
 * Import WordPress UI components.
 */
import { 
    TextControl, 
    Button, 
    PanelBody, 
    PanelRow 
} from '@wordpress/components';

/**
 * Import styles.
 */
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const {title, link_1, link_2, link_3, link_4, link_label_1, link_label_2, link_label_3, link_label_4, image} = attributes;

    // Handle image selection from MediaUpload
    const onSelectImage = (newImage) => {
        setAttributes({ image: newImage.url });
    };

    // Apply selected image as background style
    const blockStyle = {
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '300px',
    };

    return (
        <>
            {/* InspectorControls for the Block Settings Panel */}
            <InspectorControls>
                <PanelBody title={__('Background Image')} initialOpen={true}>
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

                {/* Link Settings */}
                <PanelBody title={__('Link Options')} initialOpen={false}>
						<div className='mb-5'>
							<h1>Button 1test</h1>
							<TextControl
								className='mb-0'
								label="Link"
								value={link_1}
								onChange={(newValue) => setAttributes({ link_1: newValue })}
							/>
							<TextControl
								label="Label"
								value={link_label_1}
								onChange={(newValue) => setAttributes({ link_label_1: newValue })}
							/>
						</div>
						<div className='mb-5'>
							<h1>Button 2</h1>
							<TextControl
								label="Link"
								value={link_2}
								onChange={(newValue) => setAttributes({ link_2: newValue })}
							/>
							<TextControl
								label="Label"
								value={link_label_2}
								onChange={(newValue) => setAttributes({ link_label_2: newValue })}
							/>
						</div>
						<div>
							<h1>Button 3</h1>
							<TextControl
								label="Link"
								value={link_3}
								onChange={(newValue) => setAttributes({ link_3: newValue })}
							/>
							<TextControl
								label="Label"
								value={link_label_3}
								onChange={(newValue) => setAttributes({ link_label_3: newValue })}
							/>
						</div>
                        <div>
							<h1>Button 4</h1>
							<TextControl
								label="Link"
								value={link_4}
								onChange={(newValue) => setAttributes({ link_4: newValue })}
							/>
							<TextControl
								label="Label"
								value={link_label_4}
								onChange={(newValue) => setAttributes({ link_label_4: newValue })}
							/>
						</div>
                </PanelBody>
            </InspectorControls>

            {/* Block Content */}
            <div {...useBlockProps()} style={blockStyle} className="box flex flex-wrap justify-between max-w-[840px] m-auto">
                <TextControl
                    className="w-1/2 m-auto"
                    label="Title"
                    value={title}
                    onChange={(newValue) => setAttributes({ title: newValue })}
                />
                <div className="w-full flex flex-wrap justify-center gap-5">
					<div className="w-max">
						{ link_label_1 && <button  className="font-regular text-lg w-full border-[1px] py-2 px-16  mx-auto border-[#002960] text-[#002960] bg-white">{ link_label_1 }</button> }
					</div>
					<div className="w-max">
						{ link_label_2 && <button  className="font-regular text-lg w-full border-[1px] py-2 px-16  mx-auto border-[#002960] text-[#002960] bg-white">{ link_label_2 }</button> }
					</div>
					<div className="w-max">
						{ link_label_3 && <button  className=" font-regular text-lg w-full border-[1px] py-2 px-16  mx-auto border-[#002960] text-[#002960] bg-white">{ link_label_3 }</button> }
					</div>
                    <div className="w-max">
						{ link_label_4 && <button  className=" font-regular text-lg w-full border-[1px] py-2 px-16  mx-auto border-[#002960] text-[#002960] bg-white">{ link_label_4 }</button> }
					</div>
                </div>
            </div>
        </>
    );
};

export default Edit;
