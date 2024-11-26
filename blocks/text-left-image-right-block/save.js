/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
    const { title, description, image } = attributes;

    return (
        <div { ...useBlockProps.save() }>
            <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
                {/* Left Section: Title and Description */}
                <div className="md:w-1/2 text-left space-y-2">
                    { title && (
                        <h2 className="text-lg font-bold">
                            { title }
                        </h2>
                    )}
                    { description && (
                        <p className="text-base">
                            { description }
                        </p>
                    )}
                </div>

                {/* Right Section: Image */}
                { image && (
                    <div className="md:w-1/2">
                        <img
                            src={ image }
                            alt="Block Image"
                            className="w-full h-auto rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
