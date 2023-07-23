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

if ( ! function_exists( 'devtask_scripts_styles' ) ) :

	/**
	 * Enqueue styles.
	 */
	function devtask_scripts_styles() {

		// Register theme stylesheet.
		// $theme_version = wp_get_theme()->get( 'Version' );
		// $version_string = is_string( $theme_version ) ? $theme_version : false;

		// Enqueue google font Roboto
		wp_enqueue_style("google-font", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");

		// Enqueue bootstrap stylesheet.
		wp_enqueue_style("bootstrap" , "//cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");

		// Enqueue fonts awesome stylesheet.
		wp_enqueue_style("font-awesome" , "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

		// Enqueue theme stylesheet.
		wp_enqueue_style("devtask", get_template_directory_uri() . "/style.css", [], filemtime(get_template_directory() . "/style.css"), "all");
	
		// // Enqueue bootstrap script.
		wp_enqueue_script("bootstrap", "//cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js", ['jquery'], false, true);

		// Enqueue app script.
		wp_enqueue_script('devtask', get_theme_file_uri('/assets/main.js'), [], filemtime(get_template_directory() . "/assets/main.js"), true);

	}

endif;

add_action( 'wp_enqueue_scripts', 'devtask_scripts_styles' );