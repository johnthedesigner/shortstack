<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/javascript; charset=utf8');
//error_reporting(0);

// Config
$data = $_GET;
$json = json_encode($data);
$timestamp = date('Y.m.d-G:i:s');
$rollback_db = 'rollback/db_stg_'.$timestamp.'.json';
$stg_db = 'db_stg.json';
$prod_db = 'db_prod.json';
$schema = 'db_schema.json';

// Write json to supplied file path
function write_db( $path, $json ){
	$f = file_put_contents( $path, $json );
}

if ( isset($_GET['mode']) ) {
	
	if ( $_GET['mode'] === 'update' ){
		
		// Write rollback DB
		write_db( $rollback_db, $json );
		
		// Write staging DB
		write_db( $stg_db, $json );
		
		// Return GET data to ajax request
		echo json_encode($data);
		
	} elseif ( $_GET['mode'] === 'release' ) {
		
		// Get json from staging DB
		$release_json = file_get_contents( $stg_db );
		
		// Write new production DB
		write_db( $prod_db, $release_json );
		
		// Return GET data to ajax request
		$msg = array ("msg"=>"Released to production");
		echo json_encode($msg);
		
	} elseif ( $_GET['mode'] === 'schema' ) {
		
		// Get json from staging DB
		$schema_json = file_get_contents( $schema );
		
		// Return schema data to ajax request
		$json = json_decode( $schema_json );
		echo json_encode( $json );
		
	}
} else {
	$msg = array ("msg"=>"No mode specified");
	echo json_encode($msg);
};

?>