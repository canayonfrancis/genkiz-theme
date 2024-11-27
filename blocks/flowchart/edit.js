import { MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, IconButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { steps } = attributes;

	// Helper to update a specific field in a step
	const updateStep = (index, field, value) => {
		const newSteps = [...steps];
		newSteps[index] = { ...newSteps[index], [field]: value };
		setAttributes({ steps: newSteps });
	};

	// Add a new step
	const addStep = () => {
		setAttributes({
			steps: [
				...steps,
				{ title: '', content: '', image: '' } // Default values for a new step
			],
		});
	};

	// Remove a step
	const removeStep = (index) => {
		const newSteps = steps.filter((_, i) => i !== index);
		setAttributes({ steps: newSteps });
	};

	return (
		<div {...useBlockProps()} className="w-full relative my-20">
			{steps.map((step, index) => (
				<div key={index} className="flex w-full relative mb-20">
					{/* Image on the Left */}
					<div className="w-1/2 pr-10 flex justify-end items-center">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateStep(index, 'image', media.url)}
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
								onChange={(newTitle) => updateStep(index, 'title', newTitle)}
								placeholder={__('Enter step title...', 'blocks/flowchart')}
							/>
							<RichText
								tagName="ul"
								className="text-[#707070] text-xl"
								value={step.content}
								onChange={(newContent) => updateStep(index, 'content', newContent)}
								placeholder={__('Enter list items...', 'blocks/flowchart')}
								multiline="li" // Ensure this is multiline
							/>
						</div>
					</div>

					{/* Remove Step Button */}
					<div className="absolute top-0 right-0">
						<IconButton
							icon="trash"
							label={__('Remove step', 'blocks/flowchart')}
							onClick={() => removeStep(index)}
							className="remove-step-button"
						/>
					</div>
				</div>
			))}

			{/* Add Step Button */}
			<Button
				isPrimary
				onClick={addStep}
				className="add-step-button mt-5"
			>
				{__('Add Step', 'blocks/flowchart')}
			</Button>
		</div>
	);
}
