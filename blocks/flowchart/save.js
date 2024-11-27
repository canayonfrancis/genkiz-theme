import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { steps } = attributes;

	return (
		<div {...useBlockProps.save()} className="w-full">
			{steps.map((step, index) => (
				<div key={index} className="flex w-full relative mb-20">
					{/* Image on the Left */}
					<div className="w-1/2 pr-10 flex justify-end items-center">
						{step.image && (
							<img
								src={step.image}
								alt={__('Step image', 'blocks/flowchart')}
								width="329.73"
								className="rounded-md"
							/>
						)}
					</div>

					{/* Text on the Right */}
					<div className="w-1/2 flex justify-start items-center pl-10">
						<div>
							<RichText.Content
								tagName="h2"
								className="text-lg font-bold mb-2"
								value={step.title}
							/>
							<RichText.Content
								tagName="ul"
								className="text-[#707070] text-xl"
								value={step.content}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
