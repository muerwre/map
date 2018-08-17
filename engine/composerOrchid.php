<?
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'settings.inc.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, origin");

if(!isset($_REQUEST['placement'])){
    oops('1198 Неверная область обзора');
}

$placement = json_decode($_REQUEST['placement']);

if(
  !is_numeric($placement->min_x) ||
  !is_numeric($placement->min_y) ||
  !is_numeric($placement->max_x) ||
  !is_numeric($placement->max_y) ||
  !is_numeric($placement->sh_x) ||
  !is_numeric($placement->sh_y) ||
  !is_numeric($placement->zoom) ||
  !is_numeric($placement->height) ||
  !is_numeric($placement->width)
){
  oops('1199 Неверная область обзора');
}

//$tiles=$_REQUEST['tiles'];
$size = [$placement->width, $placement->height];
if(!$size || $size[0] <= 0 || $size[1] <= 0) oops('Неверный размер отрисовываемой области');

/*
$x1=-1*$map_pan[0];
$y1=-1*$map_pan[1];
$x2=-1*($tile_pan[0]+$map_pan[0]);
$y2=-1*($tile_pan[1]+$map_pan[1]);
*/

$path = isset($_REQUEST['path']) ? $_REQUEST['path'] : null;
$points = isset($_REQUEST['points']) ? $_REQUEST['points'] : null;
$stickers = isset($_REQUEST['stickers']) ? $_REQUEST['stickers'] : null;

$im = new Imagick();
$im->newImage($size[0], $size[1], new ImagickPixel('#cccccc'));
$im->setImageFormat('png');

$tile_x = $tile_y = 0;

// Рисуем карту
for($x = $placement->min_x; $x <= $placement->max_x; $x++){
    $tile_y = 0;
    for($y = $placement->max_y; $y >= $placement->min_y; $y--){
        $file=prefetch($x, $y, $placement->zoom, $placement->provider);
        $wm = new Imagick();
	   $wm->readImage($file);
        $im->compositeImage(
          $wm,
          imagick::COMPOSITE_OVER,
          (($placement->sh_x) + ($tile_x * 256)),
          (($placement->sh_y) - ($tile_y * 256))
        );
        $tile_y++;
    }
    $tile_x++;
}

// Рисуем роут
if(false && isset($path['path']) && $path['path'] && sizeof($path['path'])>1 && $path['color'] && $path['width']){
    $dr = new ImagickDraw();
    $dr->setStrokeColor($path['color']);
    $dr->setFillColor('#ffffff00');
    $dr->setStrokeWidth($path['width']);
    $dr->polyline($path['path']);
    $im->drawImage($dr);
    $dr->destroy();

    $dr->setFillColor('#ff3344ff');
    $dr->setStrokeAntialias(true);
    $dr->setTextAntialias(true);
    $dr->circle($path['path'][0]['x'],$path['path'][0]['y'],$path['path'][0]['x']+8,$path['path'][0]['y']+8);
    $dr->setStrokeColor('#ffffff');
    $dr->setStrokeWidth(3);
    $dr->circle($path['path'][0]['x'],$path['path'][0]['y'],$path['path'][0]['x']+4,$path['path'][0]['y']+4);
    $im->drawImage($dr);
    $dr->destroy();
    for($i=1;$i<sizeof($path['path']);$i++){
        $x1 = $path['path'][$i-1]['x'];
        $x2 = $path['path'][$i]['x'];
        $y1 = $path['path'][$i-1]['y'];
        $y2 = $path['path'][$i]['y'];
        $len = sqrt( pow(($x2-$x1),2) + pow(($y2-$y1),2) );
        //$len = pow(($x2-$x1),2);
        $ang = rad2deg(atan2($y2 - $y1, $x2 - $x1));
        if($len>50){
            $wm = new Imagick();
            $wm->setBackgroundColor(new ImagickPixel('transparent'));
            $wm->readImage("../misc/arr.png");
            $wm->rotateImage(new ImagickPixel('transparent'),$ang);
            $im->compositeImage($wm, imagick::COMPOSITE_OVER,$x1+($x2-$x1)/2-13,$y1+($y2-$y1)/2-13);
            $wm->destroy();
        }
    }
}

if(false && $points && sizeof($points) > 0){
    foreach($points as $point){
        $dr = new ImagickDraw();
        $dr->setStrokeColor('#333333');
        $dr->setFillColor('#ffffff00');
        $dr->setStrokeWidth(3);
        $dr->polyline($point['latlngs']);
        $dr->setFont('RalewayBold.ttf');
        $dr->setFontSize(14);
        $dr->setStrokeColor('#ffffff00');
        $dr->setFillColor('#444444ff');
        $metrics = $im->queryFontMetrics($dr, $point['text']);
        if($point['latlngs'][1]['x']>$point['latlngs'][0]['x']){
            // Выноска справа
            $dr->roundRectangle(
                $point['latlngs'][1]['x']-8,
                $point['latlngs'][1]['y']-$metrics['textHeight']+1,
                $point['latlngs'][1]['x']+$metrics['textWidth']+30,
                $point['latlngs'][1]['y']+11, 1, 1);
            $dr->setFillColor('#ffffffff');
            $dr->annotation($point['latlngs'][1]['x']+4,$point['latlngs'][1]['y']+4, $point['text']);
        }else{
            $dr->roundRectangle(
                $point['latlngs'][1]['x']-$metrics['textWidth']-30,
                $point['latlngs'][1]['y']-$metrics['textHeight']+1,
                $point['latlngs'][1]['x']+8,
                $point['latlngs'][1]['y']+11, 1, 1);
            $dr->setFillColor('#ffffffff');
            $dr->annotation($point['latlngs'][1]['x']-$metrics['textWidth']-10,$point['latlngs'][1]['y']+4, $point['text']);
        }

        $im->drawImage($dr);
        $dr->destroy();
    }
}

if(false && $stickers && sizeof($stickers) > 0){
    foreach ($stickers as $sticker) {
        $svg = '<?xml version="1.0"?><svg width="120" height="120"><polygon  fill="#ff4433" points="60,60 70,22 98,22 98,50"></polygon></svg>';
        $wm = new Imagick();
        $wm->setBackgroundColor(new ImagickPixel('transparent'));
        $wm->readImageBlob($svg);
        //$wm->setImageFormat('png');
        $wm->setImageVirtualPixelMethod(Imagick::VIRTUALPIXELMETHOD_TRANSPARENT);
        $wm->distortImage(Imagick::DISTORTION_SCALEROTATETRANSLATE, array(60,60,1,rad2deg( (float) $sticker['ang'])+45), false);
        //$wm->rotateImage(new ImagickPixel('transparent'),45);
        $im->compositeImage($wm, imagick::COMPOSITE_OVER,$sticker['latlng']['x']-36-30+6,$sticker['latlng']['y']-36-30+6);
        $wm->destroy();
        $rad = 50;
        $x = cos((float) $sticker['ang'])*$rad-30+30;
        $y = sin((float) $sticker['ang'])*$rad-30+30;
        if(mb_strlen($sticker['text'])>0){
            $dr = new ImagickDraw();

            //echo '<b>'.$sticker['text'].'</b><br><pre>';print_r($metrics);echo '</pre>';
            $dr->setFont('RalewayBold.ttf');
            $dr->setFontSize(12);
            $dr->setStrokeColor('#ffffff00');
            $dr->setFillColor('#333333ff');
            $metrics = $im->queryFontMetrics($dr, $sticker['text']);

            if($x > -20){
                $dr->roundRectangle(
                        $sticker['latlng']['x']+$x-8,
                        $sticker['latlng']['y']+$y-$metrics['textHeight']/2-15,
                        $sticker['latlng']['x']+$x+$metrics['textWidth']+56,
                        $sticker['latlng']['y']+$y+$metrics['textHeight']/2+12, 2, 2);
                $dr->setFillColor('#ffffffff');
                $dr->annotation($sticker['latlng']['x']+$x+36,$sticker['latlng']['y']-$metrics['textHeight']/2+$y+3+8, $sticker['text']);
            } else {
                $dr->roundRectangle(
                        $sticker['latlng']['x']+$x-$metrics['textWidth']-66,
                        $sticker['latlng']['y']+$y-$metrics['textHeight']/2-15,
                        $sticker['latlng']['x']+$x-8,
                        $sticker['latlng']['y']+$y+$metrics['textHeight']/2+12, 2, 2);
                $dr->setFillColor('#ffffffff');
                $dr->annotation($sticker['latlng']['x']+$x-$metrics['textWidth']-46,$sticker['latlng']['y']-$metrics['textHeight']/2+$y+3+8, $sticker['text']);
            }
            $im->drawImage($dr);
            $dr->destroy();
        }
        $wm = new Imagick();
        $wm->setBackgroundColor(new ImagickPixel('transparent'));
        $wm->readImage("../misc/stickers/stickers.svg");
        $wm->cropImage(72,72,$sticker['x'],0);
        $im->compositeImage($wm, imagick::COMPOSITE_OVER,$sticker['latlng']['x']-36+$x,$sticker['latlng']['y']-36+$y);
        $wm->destroy();
    }
}

$raw = $im->getImageBlob();

if(isset($_REQUEST['mode']) && $_REQUEST['mode']=='test'){
	header('Content-type: image/png');
	echo $raw;
}else{
	$rand_pattern=time()+rand(0,65535);
	while(file_exists($result_prefix.urlencode($rand_pattern).".png")){
		$rand_pattern=time()+rand(65535);
	}
	if(!file_put_contents($result_prefix.urlencode($rand_pattern).".png", $raw)){
		oops('Ошибка сохранения готового изображения');
	}
	echo json_encode(array('success'=>true,'width'=>$size[0],'height'=>$size[1],'image'=>'/result/'.urlencode($rand_pattern).".png"));
}
?>
