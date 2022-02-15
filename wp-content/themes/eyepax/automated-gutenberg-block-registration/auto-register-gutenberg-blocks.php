<?php
return function ($options = []) {
	$block_namespace = $options['block_namespace'] ?? 'leafcutter';
	$base_path = $options['base_path'] ?? realpath( __DIR__ . '/' );
	$block_base_path = $options['block_path'] ?? realpath( "$base_path/blocks" );
	$base_url = $options['base_url'] ?? get_stylesheet_directory_uri() . '/blocks';
	$dist_suffix = $options['dist_suffix'] ?? '/dist';
	$dependency_var = $options['dependency_var'] ?? null;
	$logger = function ($str) use ($options) {
		if (@$options['debug']) {
			error_log($str);
		}
	};

	if (!is_dir($block_base_path)) {
		die ('Please set block base path to an existing folder with blocks');
	}

	$block_registry = [];
	// Leafcutter: adapted to find and load any php callbacks
	$js_data = [
		'pluginDirPath' => $base_path,
		'pluginDirUrl'  => $base_url,
		'blocks' => []
	];
	$dependencies = [];
	foreach (glob( $block_base_path . '/*',  GLOB_ONLYDIR) as $block_path) {
		$block_name = basename ($block_path);

		$logger("Autoregister set up for $block_name");

		if (!is_file("$block_path/index.jsx") && !is_file("$block_path/template.php")) {
			$logger("Missing either index.jsx or template.php $block_name");
			continue;
		}

		// Admin php context support
		$var_generator = "$block_path/variables.php";
		$js_data['blocks'][$block_name]['baseUrl'] = "$base_url/$block_name/";
		if (is_file($var_generator)) {
			$block_variables = require $var_generator;
			$js_data['blocks'][$block_name] = array_merge($js_data['blocks'][$block_name], $block_variables);

			$logger("Added $block_path/variables.php");
		}

		// Custom functions file support
		$functions = "$block_path/functions.php";
		if (is_file($functions)) {
			require_once $functions;

			$logger("Processed $block_path/functions.php");
		}

		/**
		 * Register Gutenberg block on server-side.
		 *
		 * Register the block on server-side to ensure that the block
		 * scripts and styles for both frontend and backend are
		 * enqueued when the editor loads.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
		 * @since 1.16.0
		 */
		$register_data = array(
			'style'         => "$block_namespace-block-css",
			'editor_script' => "$block_namespace-block-js",
			'editor_style'  => "$block_namespace-block-editor-css",
			// 'render_callback' => 'leafcutter_block_render', XXX Future work
		);

		// callback registration when available
		$callback_file = "$block_path/template.php";
		$attributes_file = "$block_path/attributes.json";
		if (is_file($callback_file)) {
			if (!is_file($attributes_file)) {
				die ('When adding server-side components, make sure you add an attributes.json file with all your attributes.');
			}
			$register_data['render_callback'] = function ($attributes, $content) use ($block_path) {
				ob_start();
				include "$block_path/template.php";
				$output = ob_get_contents();
				ob_end_clean();
				return $output;
			};
			$register_data['attributes'] = json_decode(file_get_contents($attributes_file), true);
		}

		$block_full_name = "$block_namespace/$block_name";
		$block_registry[$block_full_name] = $register_data;
		$dependencies[] = $block_full_name;
		if (is_file("$block_path/allowed_inner_blocks.json")) {
			$dependencies = array_merge($dependencies, json_decode(file_get_contents("$block_path/allowed_inner_blocks.json")));
			$logger("Dependencies loaded from $block_path/allowed_inner_blocks.json");
		}
	}

	if ($dependency_var) {
		define(strtoupper($dependency_var), $dependencies);
	}

	return function () use (
		$block_namespace, 
		$base_path, 
		$block_base_path, 
		$base_url, 
		$dist_suffix,
		$js_data,
		$block_registry,
		$logger
	) {
		// Register block styles for both frontend + backend.
		if (is_file("$base_path$dist_suffix/blocks.css")) {
			wp_register_style(
				"$block_namespace-block-css",
				"$base_url$dist_suffix/blocks.css",
				is_admin() ? array( 'wp-editor' ) : null,
				filemtime( "$base_path$dist_suffix/blocks.css" )
			);
		} else {
			$logger("Block CSS not added, missing file $base_path$dist_suffix/blocks.css");
		}

		if (is_file("$base_path$dist_suffix/blocks.js")) {
			// Register block editor script for backend.
			wp_register_script(
				"$block_namespace-block-js",
				"$base_url$dist_suffix/blocks.js",
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
				filemtime( "$base_path$dist_suffix/blocks.js" ),
				true // Enqueue the script in the footer.
			);
		} else {
			$logger("Block js not added, missing file $base_path$dist_suffix/blocks.js");
		}

		if (is_file("$base_path$dist_suffix/blocks-editor.css")) {
			// Register block editor styles for backend.
			wp_register_style(
				"$block_namespace-block-editor-css",
				"$base_url$dist_suffix/blocks-editor.css",
				array( 'wp-edit-blocks' ),
				filemtime( "$base_path$dist_suffix/blocks-editor.css" )
			);
		} else {
			$logger("Block editor css not added, missing file $base_path$dist_suffix/blocks-editor.css");
		}
		foreach ($block_registry as $block_full_name => $data) {
			register_block_type($block_full_name, $data);
			$logger("Registered $block_full_name with ".json_encode($data));
		}
		wp_localize_script(
			"$block_namespace-block-js",
			ucfirst($block_namespace) . 'Variables',
			$js_data
		);
	};
};
