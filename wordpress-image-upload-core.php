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
add_action( 'save_post', __NAMESPACE__ . '\save_wp_image_uploads' );

function register_admin_scripts() {
	wp_enqueue_script( 'wpimgup-main', WPIMGUP_URL . '/src/wordpress-image-upload.js', array('jquery', 'media-upload'), WPIMGUP_VERSION, true );
	wp_localize_script( 'wpimgup-main', 'wpImageUploader', array(
		'security' => wp_nonce_field( basename( __FILE__ ), 'wp_image_uploads' ),
		'uploadKeys' => fetch_custom_load_metadata()
	));
}

function save_wp_image_uploads( $post_id ) {
	$is_autosave = wp_is_post_autosave( $post_id );
	$is_revision = wp_is_post_revision( $post_id );
	$is_valid_nonce = ( isset( $_POST[ 'wp_image_uploads' ] ) && wp_verify_nonce( $_POST[ 'wp_image_uploads' ], basename( __FILE__ ) ) );

	// Exits script depending on save status
	if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
		return;
	}
	$data = custom_uploader_exists( $_POST );
	process_custom_upload_data( $data, $post_id );
	update_option( 'custom_upload_fields', $data );
}

function custom_uploader_exists( $save_post ) {
	$post_keys = array_keys( $save_post );
	$temp_keys = [];
	foreach ( $post_keys as $key ) {
		$str_match = strpos( $key, '-hidden-field' );

		if ( $str_match ) {
			$temp_keys[] = $key;
		}
	}

	return $temp_keys;
}

function process_custom_upload_data( $keys, $post_id ) {
	foreach ( $keys as $data ) {
		$image_data = json_decode( stripslashes( $_POST[ $data ] ) );

		if ( is_object( $image_data[0] ) ) {
			$image_data = array( 'id' => intval( $image_data[0]->id ), 'src' => esc_url_raw( $image_data[0]->src
			) );
		} else {
			$image_data = [];
		}
		update_post_meta( $post_id, esc_attr( $data ), $image_data );
	}
}

function fetch_custom_load_metadata() {
	$upload_keys = get_option( 'custom_upload_fields' );

	if ( ! $upload_keys ) {
		return false;
	}
	return array_map( function( $data ) {
		$post_data = get_post_meta( get_the_ID(), $data, true );
		if ( empty( $post_data ) ) {
			$post_data['src'] = false;
		}
		$post_data['key'] = $data;
		return $post_data;
	}, $upload_keys );

}
