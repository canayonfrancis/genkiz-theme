<?php


function pace_theme_setup()
{
    add_theme_support('wp-block-styles');
}
add_action('after_setup_theme', 'pace_theme_setup');

function pace_blocks()
{
    $blocks = [
        get_template_directory() . '/build/featured-offering-block/block.json',
        get_template_directory() . '/build/flowchart/block.json',
    ];

    foreach($blocks as $block_json_path) {
        
        if (file_exists($block_json_path)) {
            register_block_type_from_metadata($block_json_path);
        }
    }
}
add_action('init', 'pace_blocks');
