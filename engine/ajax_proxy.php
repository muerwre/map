<?
	function oops($text){echo json_encode(array('success'=>false,'error'=>$text?$text:'Неизвестная ошибка'));exit;}
	// Проверку по домену запили здесь ёпт!
    //header( 'Content-Type: image/jpeg' );
	$status=null;
	error_reporting(1);
    $prefix='../cache/';
    $filename=urlencode(base64_encode($_GET['url']));

    // Проверка на хост
    $allowed_hosts=array(
    	'stamen-tiles-a.a.ssl.fastly.net',
    	'a.basemaps.cartocdn.com',
    	'tile1.maps.2gis.com',
    	'b.tile.openstreetmap.org',
    	'sat01.maps.yandex.net',
	'mt0.google.com'
    	);
    $url=$_GET['url'];
    preg_match('/^https?:\/\/([A-Za-z0-9\.\_\-]+)\//',$url,$matches);
    if(!$matches[1] || !in_array($matches[1],$allowed_hosts)){
    	oops('Forbidden host');
    }

    // Проверяем тайл в кэше
    if(file_exists($prefix.$filename)){
    	// если есть, дальше идём
    	$status='cached';
    }else{
    	// если нет, грузим и сохраняем
		$img=file_get_contents($url);
		if($img){
			if(!file_put_contents($prefix.$filename,$img)){
				oops($url+' not saved');
			}
		}else{
			oops($url+' not loaded');
		}
		$status='fetched';
    }
    echo json_encode(array('success'=>true,'status'=>$status,'hash'=>base64_encode($_GET['url']),'index'=>$_GET['index']));
?>
