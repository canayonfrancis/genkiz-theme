import { MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { step } = attributes;

    // Helper to update a specific field of the step
    const updateStep = (field, value) => {
        setAttributes({ step: { ...step, [field]: value } });
    };

    return (
        <div {...useBlockProps()} className="w-full relative my-20">
            <div className="flex w-full relative mb-20">
                {/* Image on the Left */}
                <div className="w-1/2 pr-10 flex justify-end items-center">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => updateStep('image', media.url)}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} className="button">
                                    {step.image ? (
                                        <img
                                            src={step.image}
                                            alt={__('Uploaded step image', 'blocks/flowchart')}
                                            width="329.73"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        __('Upload Image', 'blocks/flowchart')
                                    )}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>

                {/* Text on the Right */}
                <div className="w-1/2 flex justify-start items-center pl-10">
                    <div>
                        <RichText
                            tagName="h2"
                            className="text-lg font-bold mb-2"
                            value={step.title}
                            onChange={(newTitle) => updateStep('title', newTitle)}
                            placeholder={__('Enter step title...', 'blocks/flowchart')}
                        />
                        <RichText
							tagName="ul"
							className="text-[#707070] text-xl"
							value={step.content}
							onChange={(newContent) => updateStep('content', newContent)}
							placeholder={__('Enter list items...')}
							multiline="li" // Ensure this is multiline
						/>

                    </div>
                </div>
            </div>
        </div>
    );
}
