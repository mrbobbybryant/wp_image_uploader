<?php
/**
 * Plugin Name: WordPress Image Uploader
 * Plugin URI:  https://github.com/mrbobbybryant/
 * Description: Plugin provides a simple API for adding Image Uploader to WordPress.
 * Version:     0.1.0
 * Author:      Bobby Bryant
 * Author URI:  https://twitter.com/mrbobbybryant
 * License:     GPLv2+
 * Text Domain: mb_control
 * Domain Path: /languages
 */

namespace wp_image_uploader;

/**
 * Useful Global Constants
 */
define( 'WPIMGUP_VERSION', '0.1.0' );
define( 'WPIMGUP_URL',     plugin_dir_url( __FILE__ ) );
define( 'WPIMGUP_PATH',    dirname( __FILE__ ) . '/' );

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\register_admin_scripts' );

function register_admin_scripts() {
	wp_enqueue_script( 'wpimgup-main', WPIMGUP_URL . '/wp-image-uploader-main.js', array('jquery', 'media-upload'), WPIMGUP_VERSION, true );
}