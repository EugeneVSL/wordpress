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
		wp_enqueue_style("devtask-google-font-roboto", "//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");

		// Enqueue bootstrap stylesheet.
		wp_enqueue_style("devtask-bootstrap-style" , "//cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");

		// Enqueue fonts awesome stylesheet.
		wp_enqueue_style("devtask-font-awesome-style" , "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

		// Enqueue bootstrap script.
		wp_enqueue_script("devtask-bootstrap-script", "//cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js");

		// Enqueue app script.
		// wp_enqueue_script('devtask-script', get_theme_file_uri('/src/index.js'), [], true);

		// Enqueue theme stylesheet.
		wp_enqueue_style("devtask-style-main", get_template_directory_uri() . "/style.css", [], filemtime(get_template_directory() . "/style.css"), "all");
	}

endif;

add_action( 'wp_enqueue_scripts', 'devtask_scripts_styles' );