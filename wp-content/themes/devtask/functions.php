<?php
/**
 * Dev Task functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Dev_Task
 * @since Dev Task 0.1
 */


if ( ! function_exists( 'devtask_scripts_styles' ) ) :

	/**
	 * Enqueue styles.
	 */
	function devtask_scripts_styles() {

		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );
		$version_string = is_string( $theme_version ) ? $theme_version : false;

		wp_register_script(
			'devtask-tailwind-script', "https://cdn.tailwindcss.com",
			array(),
			$version_string
		);

		wp_register_style(
			'devtask-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_script( 'devtask-tailwind-script' );

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'devtask-style' );
	}

endif;

add_action( 'wp_enqueue_scripts', 'devtask_scripts_styles' );