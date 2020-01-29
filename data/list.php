<?php

header('Content-Type: text/plain; charset=utf-8');

echo "{ \"hosts\" : [";

$list = scandir(".");
$didPrint = false;
foreach( $list as $filename ) {
    if( !is_file($filename) || pathinfo($filename)["extension"] != "json" )
        continue;
    if( $didPrint ) echo ", ";
    $json = file_get_contents($filename,true);
    echo $json;
    $didPrint = true;
}

echo "] }";
