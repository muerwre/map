<?
function oops($text){echo json_encode(array('success'=>false,'error'=>$text?$text:'Неизвестная ошибка'));exit;}

function plural_form($number, $after) {
  $cases = array (2, 0, 1, 1, 1, 2);
  echo $number.' '.$after[ ($number%100>4 && $number%100<20)? 2: $cases[min($number%10, 5)] ];
}

function monthy($mon){
	$arr = ['января','февраля','марта','апреля','мая','июня','июля','августа',
			'сентября','октября','ноября','декабря'];
	return $arr[$mon-1];
}

$logos=array(
  'nvs' => '../misc/lgo.png',
  'default' => null,
  'rider' => '../misc/rider.png',
  'rider_evening' => '../misc/rider_evening.png',
  'fas' => '../misc/fas.png',
  'pedals' => '../misc/pedals.png',
  'pinmix' => '../misc/pin-mix.png',
  'jolly' => '../misc/jw.png'
);
error_reporting(0);
$src=preg_replace('/^http:\/\/([^\/]+)/',null,$_GET['src']);
//print_r($_GET);exit;
if(!$src || !preg_match('/^\/result\/\d+\.png$/',$src)){oops('Изображение повреждено');}
$image=file_get_contents('..'.$src);
//$geo=$_GET['geometry'];
$geo=$_GET['geo'];
$logo=$_GET['logo'];
$geo['x']=(is_numeric($geo['x']))?ceil($geo['x']):0;
$geo['y']=(is_numeric($geo['y']))?ceil($geo['y']):0;
$geo['width']=(is_numeric($geo['width']))?ceil($geo['width']):0;
$geo['height']=(is_numeric($geo['height']))?ceil($geo['height']):0;

$im = new Imagick();
$im->readImageBlob($image);
$im->setImageFormat("png");
//echo $_GET['x'];exit;
$im->cropImage ( $geo['width'] , $geo['height'] , $geo['x'], $geo['y'] );
$wm = new Imagick();
if(!isset($logos[$logo[0]])){
	$logo[0]='default';
}
//print_r($logo);exit;
if(!in_array($logo[1],array('bottom-right','bottom-left','top-right','top-left'))){
	$logo[1]='bottom-right';
}
if($logos[$logo[0]]){
	$wm->readImage($logos[$logo[0]]);
	$thumb_size=$wm->getImageGeometry();

	if($logo[1]=='top-right'){
		$displace=array($geo['width']-$thumb_size['width'],0);
	}else{
		$displace=array($geo['width']-$thumb_size['width'],$geo['height']-$thumb_size['height']);
	}

	$im->compositeImage($wm, imagick::COMPOSITE_OVER,$displace[0],$displace[1]);
}


if (isset($_GET['name']) && strlen($_GET['name'])>0) {
	$name = substr($_GET['name'], 0, 64);
}else{
	$name = 'Маршрут-'.date('j').'-'.monthy(date('n')).date('-Y-H:i');
}
	
header('Content-Disposition:attachment; filename='.($name.'.png'));
header('Content-Type:image/png');

echo $im;
?>