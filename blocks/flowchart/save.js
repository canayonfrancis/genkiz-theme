import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save({ attributes }) {
    const { step = [] } = attributes; // Ensure `step` is defined as an array

    // Function to render content by breaking it into paragraphs
    const renderContent = (content) => {
        // Split content by line breaks, filter out empty lines, and map it to <p> tags
        const lines = content.split('\n').filter(line => line.trim() !== ''); 
        return lines.map((line, index) => (
            <p key={index} className="text-[#707070] text-lg">{line}</p>
        ));
    };

    return (
        <div {...useBlockProps.save()} className="flowchart-block">
            {step.map((singleStep, index) => {
                const isEvenSection = index % 2 !== 0; // Check if it's an even-numbered section

                // Conditionally swap items-start and items-end based on flex-row-reverse
                const itemsClass = isEvenSection ? 'items-start' : 'items-end'; // items-start for even sections, items-end for odd sections
                const linePositionClass = isEvenSection ? 'left-0' : 'right-0'; // Swap the line position (left or right)

                return (
                    <div
                        key={index}
                        className={`flowchart-step flex flex-nowrap w-full relative ${isEvenSection ? 'flex-row-reverse' : ''}`}
                    >
                        {/* Left Column - Image and Line */}
                        <div className={`w-1/2 ${itemsClass} justify-center  flex flex-col relative`}>
                            <div
                                className={`z-10 relative mt-10 mb-10 mx-[80px] flex justify-center items-center ${
                                    !singleStep.image ? 'border-[1px] border-black w-[329.73px] h-[329.73px] bg-white' : ''
                                }`}
                            >
                                {singleStep.image ? (
                                    <img
                                        src={singleStep.image}
                                        alt={__('Step illustration', 'blocks/flowchart')}
                                        width="329.73"
                                        height="329.73"
                                        className="rounded-md max-w-[329.73px] max-h-[329.73px] object-cover"
                                    />
                                ) : (
                                    // Display the section number when there's no image
                                    <p className="text-center text-3xl font-bold">
                                        {index + 1} {/* Adding 1 because index is 0-based */}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`h-[.5px] w-[80px] bg-black ${linePositionClass} absolute`}
                            ></div>
                        </div>

                        {/* Center Connecting Line */}
                        <div
                            className="absolute h-full bg-black w-[.5px] z-20"
                            style={{ position: 'absolute', left: '50%' }}
                        ></div>

                        {/* Right Column - Title and Content */}
                        <div className="w-1/2 flex content-center z-20">
                            <div className="mx-[80px] w-full m-auto font-['Open_Sans']">
                                <h2 className="text-xl font-bold">{singleStep.title}</h2>
                                <div className="text-[#707070] text-lg">
                                    {renderContent(singleStep.content)} {/* Render content as <p> tags */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
