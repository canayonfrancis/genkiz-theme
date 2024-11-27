<?php


function genkiz_theme_setup()
{
    add_theme_support('wp-block-styles');
}
add_action('after_setup_theme', 'genkiz_theme_setup');

function genkiz_blocks()
{
    $blocks = [
        get_template_directory() . '/build/featured-offering-block/block.json',
        get_template_directory() . '/build/test-block/block.json',
        get_template_directory() . '/build/hero/block.json',
        get_template_directory() . '/build/text-left-image-right-block/block.json',
        get_template_directory() . '/build/flowchart/block.json',
        // get_template_directory() . '/build/custom-map-block/block.json',
    ];

    foreach($blocks as $block_json_path) {
        
        if (file_exists($block_json_path)) {
            register_block_type_from_metadata($block_json_path);
        }
    }
}
add_action('init', 'genkiz_blocks');
