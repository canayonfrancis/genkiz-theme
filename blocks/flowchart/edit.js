import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { step } = attributes;

    // Add a new empty step to the array
    const addStep = () => {
        setAttributes({
            step: [
                ...step,
                { id: Date.now(), title: '', content: '', image: '' },  // Adding a unique id using Date.now()
            ],
        });
    };

    // Update a specific field of a specific step
    const updateStep = (index, field, value) => {
        const newSteps = [...step]; // Create a shallow copy of the array
        const updatedStep = { ...newSteps[index] }; // Create a deep copy of the step at the given index
        updatedStep[field] = value; // Update the specific field

        newSteps[index] = updatedStep; // Replace the updated step in the new array

        setAttributes({ step: newSteps }); // Update the attributes with the new array
    };

    // Delete a step
    const deleteStep = (index) => {
        const newSteps = [...step];
        newSteps.splice(index, 1);
        setAttributes({ step: newSteps });
    };

    return (
        <div {...useBlockProps()} className="w-full relative my-20">
            {step.map((singleStep, index) => (
                <div key={singleStep.id || index} className="flex w-full relative mb-20">
                    {/* Image on the Left */}
                    <div className="w-1/2 pr-10 flex justify-end items-center">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => updateStep(index, 'image', media.url)}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open} className="button">
                                        {singleStep.image ? (
                                            <img
                                                src={singleStep.image}
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
                            {/* Title input with input field */}
                            <input
                                type="text"
                                className="text-lg font-bold mb-2 w-full p-2 border border-gray-300 rounded-md"
                                value={singleStep.title}
                                onChange={(e) => updateStep(index, 'title', e.target.value)} // Updating title
                                placeholder={__('Enter step title...', 'blocks/flowchart')}
                            />
                            {/* Content input with textarea */}
                            <textarea
                                className="text-[#707070] text-xl w-full p-2 border border-gray-300 rounded-md"
                                value={singleStep.content}
                                onChange={(e) => updateStep(index, 'content', e.target.value)} // Updating content
                                placeholder={__('Enter list items...', 'blocks/flowchart')}
                            />
                            <Button
                                onClick={() => deleteStep(index)}
                                isDestructive
                                variant="secondary"
                                className="mt-4"
                            >
                                {__('Remove Step', 'blocks/flowchart')}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add new step */}
            <div className="flex justify-center mt-10">
                <Button
                    onClick={addStep}
                    variant="primary"
                    className="text-white bg-blue-500 px-4 py-2 rounded-md"
                >
                    {__('+ Add Step', 'blocks/flowchart')}
                </Button>
            </div>
        </div>
    );
}
