<?
    header( 'Content-Type: image/jpeg' );
    $prefix='/var/www/map.vault48.org/cache/';
    if(file_exists($prefix.base64_encode($_GET['url']))){
		echo file_get_contents($prefix.base64_encode($_GET['url']));
    }else{
		$img=file_get_contents($_GET['url']);
		echo $img;
		file_put_contents($prefix.base64_encode($_GET['url']),$img);
    }
?>
