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

const Save = ( { attributes } ) => {
	const {title, link_1, link_2, link_3, link_4, link_label_1, link_label_2, link_label_3, link_label_4, image} = attributes;

	return (
		<div { ...useBlockProps.save() } className=' m-0'>
			{ image && <div  className='flex flex-wrap justify-center content-center h-[500px]' style={{ backgroundImage: `url(${image})` }}>
				<div className="title w-full">
					<h1 className="leading-[55px] m-auto w-max text-center text-[55px] font-normal bg-[#002960] py-[10px] px-[5rem] my-[20px] text-white">
						{ title }
					</h1>
				</div>
				<div className="w-full flex flex-wrap justify-center gap-5 py-[15px]">
						<div className="w-max ">
							{link_1 && link_label_1 && (
								<a href={ link_1 } className="shadow-md rounded-sm font-regular text-lg w-full py-[15px] px-16 mx-auto text-[#002960] bg-white">{ link_label_1 }</a>
							)}
						</div>
						<div className="w-max">
							{link_2 && link_label_2 && (
								<a href={ link_2 } className="shadow-md rounded-sm font-regular text-lg w-full py-[15px] px-16 mx-auto text-[#002960] bg-white">{ link_label_2 }</a>
							)}
						</div>
						<div className="w-max ">
							{link_3 && link_label_3 && (
								<a href={ link_3 } className="shadow-md rounded-sm font-regular text-lg w-full py-[15px] px-16  mx-auto text-[#002960] bg-white">{ link_label_3 }</a>
							)}
						</div>
						<div className="w-max ">
							{link_4 && link_label_4 && (
								<a href={ link_4 } className="shadow-md rounded-sm font-regular text-lg w-full py-[15px] px-16  mx-auto text-[#002960] bg-white">{ link_label_4 }</a>
							)}
						</div>
					</div>
			</div> }
		</div>
	);
};

export default Save;
