<?php
/**
 * The footer for our theme
 *
 * @package PACE
 */
?>

    <footer>
        <div class="footer-content">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        </div>

        <?php wp_footer(); // This function is important to include necessary scripts before the closing body tag ?>
    </footer>
</body>
</html>
