<?php
/**
 * 
 */

 if ( ! function_exists( 'website_features' ) ) :

	function website_features() {

		// add title to the current page
		add_theme_support('title-tag');
	}

endif;

add_action('after_setup_theme', 'website_features');