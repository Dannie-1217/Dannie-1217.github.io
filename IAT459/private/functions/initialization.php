<?php
    require_once("db_credentials.php");

    $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if(mysqli_connect_error()){
        echo mysqli_connect_error();
    }

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Assign file paths to PHP constants
    // __FILE__ returns the current path to this file
    // dirname() returns the path to the parent directory
    define("PRIVATE_PATH", dirname(dirname(__FILE__)));
    define("PUBLIC_PATH", dirname(PRIVATE_PATH) . '/public');
    define("SHARED_PATH", PRIVATE_PATH . '/shared');

    $errors = [];
?>