import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { step } = attributes;

    // Ensure there is at least one step when the block is added
    if (step.length === 0) {
        setAttributes({
            step: [{ id: Date.now(), title: '', content: '', image: '' }], // Add a default step
        });
    }

    // Add a new empty step to the array
    const addStep = () => {
        setAttributes({
            step: [
                ...step,
                { id: Date.now(), title: '', content: '', image: '' }, // Add a new step with a unique id
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
        <div {...useBlockProps()} className="w-full relative">
            {step.map((singleStep, index) => {
                const isEvenSection = index % 2 !== 0; // Check if it's an even-numbered section
                return (
                    <div
                        key={singleStep.id || index}
                        className={`flex w-full relative ${
                            isEvenSection ? 'flex-row-reverse' : ''
                        }`}
                    >
                        {/* Image on the Left */}
                        <div
                            className={`w-1/2 px-10 h-[329.73px] flex ${isEvenSection ? 'justify-start' : 'justify-end'} items-center`}
                        >
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
                                                    height="329.73"
                                                    className="rounded-md max-w-[329.73px] max-h-[329.73px] object-cover"
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
                        <div
                            className={`w-1/2 flex px-10 ${isEvenSection ? 'justify-end' : 'justify-start'} items-center `}
                        >
                            <div>
                                {/* Title input */}
                                <input
                                    type="text"
                                    className="text-lg font-bold mb-2 w-full p-2 border border-gray-300 rounded-md"
                                    value={singleStep.title}
                                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                                    placeholder={__('Enter step title...', 'blocks/flowchart')}
                                />
                                {/* Content input */}
                                <textarea
                                    className="text-[#707070] text-xl w-full p-2 border border-gray-300 rounded-md"
                                    value={singleStep.content}
                                    onChange={(e) => updateStep(index, 'content', e.target.value)}
                                    placeholder={__('Enter content...', 'blocks/flowchart')}
                                />
                                {/* Remove Button - Only show if more than one step */}
                                {step.length > 1 && (
                                    <Button
                                        onClick={() => deleteStep(index)}
                                        isDestructive
                                        variant="secondary"
                                        className="mt-4"
                                    >
                                        {__('Remove Step', 'blocks/flowchart')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

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
