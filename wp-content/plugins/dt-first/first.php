<?php
/**
 * Plugin Name: DT First
 * Description: Testing the plugin development
 * Version: 0.0.1
 * Author: The Development Task
 * Author URI: https://eugenevsl.github.io
 * Requires at least: 6.0
 */


add_filter('the_content', 'addToEndOfPost');

function addToEndOfPost($content) {
    
    if (is_single() && is_main_query()) {
        return $content . '<p>Here we go!</p>';
    }

    return $content;
}

?>