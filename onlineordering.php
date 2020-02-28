<?php
require('vendor/autoload.php');

// Test for navigation after auth
/*
session_start();
$_SESSION['auth'] = true;
session_destroy();
*/

use aitSydney\Navigation;

//create twig loader
//$loader = new \Twig\Loader\FilesystemLoader('templates');
$loader = new Twig_Loader_Filesystem('templates');

//create twig environment
$twig = new Twig_Environment($loader);

//load a twig template
$template = $twig -> load('home.twig');

//pass values to twig
echo $template -> render([
    'title' => 'Hello shop'
]);
?>