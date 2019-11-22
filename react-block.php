<?php
/*
Plugin Name: React Block
Description: Block leveraging react to pull in posts
Version:     1.0.0
*/ 

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if(!class_exists('ReactBlock')) 
{
  class ReactBlock 
  {
    
    static $instance = false;

    private function __construct() {
      add_action('init', array($this, 'init_react_block'));
      add_action( 'rest_api_init', array($this, 'react_block_add_author_name_to_api' ));
      add_action( 'rest_api_init', array($this, 'react_block_add_featured_image_to_api' ));
    }
    
    public static function getInstance() {
      if ( !self::$instance )
        self::$instance = new self;
      return self::$instance;
    }
    
    public function init_react_block() {

      // Register our block script with WordPress
      wp_register_script(
        'react-block-script',
        plugins_url('/gutenberg-admin/assets/dist/blocks.build.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-api', 'wp-api-fetch')
      );
      
      // Register our block's base CSS  
      wp_register_style(
        'react-block-style',
        plugins_url('/gutenberg-admin/assets/dist/assets.style.build.css', __FILE__),
        array( 'wp-blocks' )
      );
        
      // Register our block's editor-specific CSS
      if( is_admin() ) :
        wp_register_style(
          'react-block-edit-style',
          plugins_url('/gutenberg-admin/assets/dist/assets.editor.build.css', __FILE__),
          array( 'wp-edit-blocks' )
        );
      endif;
        
      // Enqueue the script in the editor
      register_block_type('react-block/main', array(
        'editor_script' => 'react-block-script',
        'editor_style' => 'react-block-edit-style',
        'style' => 'react-block-style',
        'render_callback' => (array($this, 'render_posts_block'))  
      ));

      add_filter('post_list_render_filter', 'render_guten_post_list_filter', 10, 2);
    }

    public function react_block_add_author_name_to_api() {
      register_rest_field( 'post',
        'author_name',
        array(
          'get_callback' => array($this, 'react_block_get_author_name')
        )
      );
    }

    public function react_block_get_author_name( $post, $field_name, $request ) {
      return get_the_author_meta( 'display_name', (int) $post['author'] );
    }

    public function react_block_add_featured_image_to_api() {
      register_rest_field( 'post',
        'featured_image',
        array(
          'get_callback' => array($this, 'react_block_get_featured_image')
        )
      );
    }

    public function react_block_get_featured_image( $post, $field_name, $request, $size = 'full' ) {
      $id = get_the_ID();

      if ( has_post_thumbnail( $id ) ){
          $img_arr = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), $size );
          $url = $img_arr[0];
          return $url;
      } else {
          return false;
      }
    }

    public function render_posts_block($attributes) {
      
      $selectedPostCount    = isset( $attributes['selectedPostCount'] ) ? $attributes['selectedPostCount'] : 10;
     /* $currentPage = isset( $attributes['currentPage'] ) ? $attributes['currentPage'] : 1;

      $request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
      $request->set_query_params( [ 'per_page' => $selectedPostCount] );
      $response = rest_do_request( $request );
      $server = rest_get_server();
      $data = $server->response_to_data( $response, false );
      $json = wp_json_encode( $data ); */

      return apply_filters( 'post_list_render_filter', array ('selectedPostCount' => $attributes['selectedPostCount']), '' ); 

    }

  }

  function render_guten_post_list_filter( $attributes, $title ) {
    $ver = "1.0.0";
    wp_enqueue_style('display-react-block-css', plugin_dir_url(__FILE__) . 'gutenberg-admin/assets/dist/assets.style.build.css', array(), $ver, 'all' ); 
    wp_register_script( 'display-react-block-js', plugins_url('display-post-list/assets/dist/blocks.display.js', __FILE__),array(),  $ver, true );

    wp_localize_script( 'display-react-block-js', 'reactObj', $attributes );
    wp_enqueue_script( 'display-react-block-js' );
    
    ob_start();
    ?>
      <div id ="display-post-list"></div>
    <?php

    return ob_get_clean(); 
  }


    
  
}

$ReactBlock = ReactBlock::getInstance();