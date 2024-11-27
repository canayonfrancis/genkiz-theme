import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save({ attributes }) {
    const { step } = attributes;

    // Convert content into proper HTML (ul/li)
    const renderContent = (content) => {
        // Split the content by newlines and map to <li> tags
        const listItems = content
            .split('\n')
            .filter(line => line.trim() !== '') // Remove empty lines
            .map(line => `<li>${line}</li>`).join('');

        return `<ul>${listItems}</ul>`; // Wrap the list items with <ul>
    };

    return (
        <div {...useBlockProps.save()} className="flowchart-block">
            <div className="flex flex-nowrap w-full relative">
                {/* Left Column - Image and Line */}
                <div className="w-1/2 items-end justify-center flex flex-col relative">
                    <div className="z-10 relative mt-10 mb-10 mx-[80px]">
                        {step.image && (
                            <img
                                src={step.image}
                                alt={__('Step illustration', 'blocks/flowchart')}
                                width="329.73px"
                                className=""
                            />
                        )}
                    </div>
                    <div className="h-[.5px] w-1/2 bg-black right-0 absolute"></div>
                </div>

                {/* Center Connecting Line */}
                <div className="absolute h-full bg-black w-[.5px] z-20" style={{ position: 'absolute', left: '50%' }}></div>

                {/* Right Column - Title and Content */}
                <div className="w-1/2 flex content-center z-20">
                    <div className="mx-[80px] w-full m-auto font-['Open_Sans']">
                        <h2 className="text-[20px] font-bold">{step.title}</h2>
                        {/* Use dangerouslySetInnerHTML to inject the raw HTML content */}
                        <div
                            className="text-[#707070] text-xl"
                            dangerouslySetInnerHTML={{ __html: renderContent(step.content) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
