<?php

/**
 * PHP Server-Side Example for Fine Uploader (traditional endpoint handler).
 * Maintained by Widen Enterprises.
 *
 * This example:
 *  - handles chunked and non-chunked requests
 *  - supports the concurrent chunking feature
 *  - assumes all upload requests are multipart encoded
 *  - supports the delete file feature
 *
 * Follow these steps to get up and running with Fine Uploader in a PHP environment:
 *
 * 1. Setup your client-side code, as documented on http://docs.fineuploader.com.
 *
 * 2. Copy this file and handler.php to your server.
 *
 * 3. Ensure your php.ini file contains appropriate values for
 *    max_input_time, upload_max_filesize and post_max_size.
 *
 * 4. Ensure your "chunks" and "files" folders exist and are writable.
 *    "chunks" is only needed if you have enabled the chunking feature client-side.
 *
 * 5. If you have chunking enabled in Fine Uploader, you MUST set a value for the `chunking.success.endpoint` option.
 *    This will be called by Fine Uploader when all chunks for a file have been successfully uploaded, triggering the
 *    PHP server to combine all parts into one file. This is particularly useful for the concurrent chunking feature,
 *    but is now required in all cases if you are making use of this PHP example.
 */

// Include the upload handler class
require_once "handler.php";
require_once "../engine/settings.inc.php";

$uploader = new UploadHandler();

// Specify the list of valid extensions, ex. array("jpeg", "xml", "bmp")
$uploader->allowedExtensions = array(); // all files types allowed by default

// Specify max file size in bytes.
$uploader->sizeLimit = null;

// Specify the input name set in the javascript.
$uploader->inputName = "qqfile"; // matches Fine Uploader's default inputName value by default

// If you want to use the chunking/resume feature, specify the folder to temporarily save parts.
$uploader->chunksFolder = "chunks";

$method = get_request_method();

// This will retrieve the "intended" request method.  Normally, this is the
// actual method of the request.  Sometimes, though, the intended request method
// must be hidden in the parameters of the request.  For example, when attempting to
// delete a file using a POST request. In that case, "DELETE" will be sent along with
// the request in a "_method" parameter.
function get_request_method() {
    global $HTTP_RAW_POST_DATA;

    if(isset($HTTP_RAW_POST_DATA)) {
    	parse_str($HTTP_RAW_POST_DATA, $_POST);
    }

    if (isset($_POST["_method"]) && $_POST["_method"] != null) {
        return $_POST["_method"];
    }

    return $_SERVER["REQUEST_METHOD"];
}

if ($method == "POST") {
    header("Content-Type: text/plain");

    // Assumes you have a chunking.success.endpoint set to point here with a query parameter of "done".
    // For example: /myserver/handlers/endpoint.php?done
    if (isset($_GET["done"])) {
        $result = $uploader->combineChunks("../misc/thumbs");
        //echo 'a';
    }
    // Handles upload requests
    else {
        // Call handleUpload() with the name of the folder, relative to PHP's getcwd()
        $result = $uploader->handleUpload("../misc/thumbs");

        // Перемещает файл в папку с результатами
        $result["uploadName"] = $uploader->getUploadName();

        // Коннектимся к базе данных
        $link = mysqli_connect($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);        
        mysqli_set_charset($link,'utf8');

        // Первичная обработка поступивших в запросе параметров
        $id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
        $token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;  
        $place = isset($_REQUEST['place']) && is_numeric($_REQUEST['place']) ? mysqli_escape_string($link, $_REQUEST['place']) : null;
        
        // Проверка токена пользователя
        $query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}' AND role != 'guest'");
        $owner = mysqli_fetch_assoc($query);

        if (!$id || !$token || !$query->num_rows || !$owner['id'] || $owner['role'] == 'guest') { oops("401 Токен не найден / Недостаточно прав"); }

        // Проверка, принадлежит ли место пользователю
        $query = mysqli_query($link, "SELECT * FROM `places` WHERE `id` = '".$place."' AND `owner` = ".$owner['id']);
        $place_row = mysqli_fetch_assoc($query);

        if (!$place_row){ oops('not owned by you'."SELECT * FROM `places` WHERE `id` = '".$place."' AND `owner` = ".$owner['id']); }

        // Добавляем файл в базу
        mysqli_query($link, "INSERT INTO `files` VALUES (null, '".$result['uuid']."','".mysqli_real_escape_string($link, urldecode($result['uploadName']))."','".$owner['id']."', UNIX_TIMESTAMP(), 1);");
        $file_id = mysqli_insert_id($link);
        if(!$file_id){ oops(mysqli_error($link)); }

        // Обновляем место
        mysqli_query($link, "UPDATE `places` SET `thumb` = '".$file_id."' WHERE `id` = ".$place);
        
        // Закрываем соединение
        mysqli_close($link);

    }

    echo json_encode($result);
}
// for delete file requests
else if ($method == "DELETE") {
    //$result = $uploader->handleDelete("../misc/thumbs");
    //echo json_encode($result);
}
else {
    header("HTTP/1.0 405 Method Not Allowed");
}

?>
