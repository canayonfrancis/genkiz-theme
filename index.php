<?php
/**
 * The main template file
 *
 * @package PACE
 */

get_header(); ?>

<main id="main" class="site-main">
    <?php
    if (have_posts()):
        while (have_posts()):
            the_post();
            ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        <?php
                        the_title('<h2 class="entry-title">', '</h2>');


                        the_content();
                        ?>
                    </article>
                    <?php
        endwhile;
    else:
        get_template_part('template-parts/content', 'page');
    endif;
    ?>
</main>

<?php get_footer(); ?>
