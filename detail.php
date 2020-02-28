<?php

require('vendor/autoload.php');

use aitSydney\Navigation;

$nav = new Navigation();
$nav_items = $nav -> getNavigation();

use aitSydney\ProductDetail;
// Get the product id from url parameter
if(isset($_GET['product_id']) == false){
    echo "no parameter set";
    exit();
}

// Create an instance of ProductDetail class
$pd = new ProductDetail();
$detail = $pd -> getProductDetail( $_GET['product_id']);

// Initialise twig
//$loader = new \Twig\Loader\FilesystemLoader('templates');
$loader = new Twig_Loader_Filesystem('templates');

//create twig environment
$twig = new Twig_Environment($loader);

//load a twig template
$template = $twig -> load('detail.twig');

//pass values to twig
echo $template -> render([
    'navigation' => $nav_items,
    'detail' => $detail,
    'title' => $detail['product']['name']
]);
?>