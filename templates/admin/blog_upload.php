<?php

$htmlContent = $_POST['htmlContent'];

// Path to the blog HTML file
$blogFile = '../blog.html';

// Open the HTML file in write mode, truncate its contents, write the new content, and close it
$fileHandle = fopen($blogFile, 'w');
fwrite($fileHandle, $htmlContent);
fclose($fileHandle);