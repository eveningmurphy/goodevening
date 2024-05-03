<?php

function getImages($directory) {
    $imageUrls = [];

    $files = scandir($directory);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $path = $directory . '/' . $file;
            if (is_dir($path)) {
                // Recursively call getImages for subdirectories
                $imageUrls = array_merge($imageUrls, getImages($path));
            } else if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
                // Add image URL to array
                $imageUrls[] = $path;
            }
        }
    }

    return $imageUrls;
}

// Directory to start traversal from
$directory = '../../img';

// Get all image URLs
$imageUrls = getImages($directory);

// Output image URLs as JSON
echo json_encode($imageUrls);

