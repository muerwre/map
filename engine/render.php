<?
//echo '#hi!';

//$marx=base64_decode(str_replace('data:image/png;base64,','',$_POST['markers']));

//$path='M316 414L677 384L886 460L982 207L306 272L380 181M958 181L971 183L1060 271L1028 388L846 555M814 555L776 501';
//$path='M455 148L489 129L548 63L564 55L823 154L627 390L605 399M336 399L233 222L429 -2L947 -8L925 194L791 399';

//echo json_encode(array('data'=>base64_encode($data),'path'=>$path,'pan'=>$pan));exit;
if(isset($_GET['mode']) && $_GET['mode']=='test'){

	$data=base64_decode(str_replace('data:image/png;base64,','',file_get_contents('test_image.txt')));
	$paths=array(array(
	            'path' => 'M594 324L493 248L596 85L873 267M121 224L992 1122',
	            'color' => '#ff3333',
	            'width' => 5,
	        ),
	    array(
	            'path' => 'M110 139L30 98',
	            'color' => '#44ff55',
	            'width' => '3',
	        )
	);
	preg_match_all('/(\-?\d+)/','matrix(1, 0, 0, 1, 7, -212)',$matches);
	$pan=array($matches[1][4],$matches[1][5]);	
}else{
	//error_reporting(0);
	$data=base64_decode(str_replace('data:image/png;base64,','',$_POST['image']));
	$paths=$_POST['path'];
	$markers=$_POST['markers'];
	//print_r($markers);exit;
	preg_match_all('/(\-?\d+)/',$_POST['pan'],$matches);
	$pan=array($matches[1][4],$matches[1][5]);
}
    $im = new Imagick();
    $im->readImageBlob($data);
	$im->setImageFormat("png");


	$x1=-1*$pan[0];
	$y1=-1*$pan[1];

	
	$polylines=array();
	$cur_poly=0;
	foreach($paths as $path){
		$polylines[$cur_poly]=array('color'=>$path['color'],'width'=>$path['width'],'path'=>array());
		$matches=array();
		preg_match_all('/\w[\-\d]+\s[\-\d]+/',$path['path'],$matches);
		$i=0;$text='';
		foreach($matches[0] as $var){

			$op=substr($var,0,1);
			$xy=explode(' ',substr($var,1));
			
			if($op=='M'){
				if(sizeof($polylines[$cur_poly]['path'])>0){
					array_push($polylines[$cur_poly]['path'][sizeof($polylines[$cur_poly]['path'])-1],array('x'=>$xy[0]-$x1,'y'=>$xy[1]-$y1));
				}
				
				$polylines[$cur_poly]['path'][]=array(array('x'=>$xy[0]-$x1,'y'=>$xy[1]-$y1));
			}elseif($op=='L'){
				array_push($polylines[$cur_poly]['path'][sizeof($polylines[$cur_poly]['path'])-1],array('x'=>$xy[0]-$x1,'y'=>$xy[1]-$y1));
			}

			$i++;
		}
		$cur_poly++;
	}
	//echo '<pre>';
	//print_r($polylines);exit;
    $dr = new ImagickDraw();
    foreach($polylines as $poly){
    	$dr->setStrokeColor($poly['color']);
    	$dr->setFillColor('#ffffff00');
    	$dr->setStrokeWidth($poly['width']);
    	foreach($poly['path'] as $var){
			$dr->polyline($var);
		}
	}
	$dr->setStrokeColor('#ffffff00');
	$dr->setStrokeWidth(0);
    $dr->setFont('RalewayBold.ttf');
    $dr->setFontSize(14);
    $dr->setFillColor('#ffffff');
    //$dr->setStrokeAntialias(true);
	//$dr->setTextAntialias(true);
    //$dr->circle($polylines[0][0]['x'],$polylines[0][0]['y'],$polylines[0][0]['x']+5,$polylines[0][0]['y']+5);
    
    //$text='Hello, Smitty!';
    foreach($markers as $marker){
	    $metrics = $im->queryFontMetrics($dr, $marker['text']);
	    //echo '<pre>';print_r($metrics);exit;
	    $dr->setFillColor($marker['color']);
	    $dr->roundRectangle(
	    	$marker['pos'][0]-$x1-8,
	    	$marker['pos'][1]-$y1-$metrics['textHeight'],
	    	$marker['pos'][0]-$x1+$metrics['textWidth']+16,
	    	$marker['pos'][1]-$y1+12, 2, 2);
	    $dr->setFillColor('#ffffff');
	    $dr->annotation($marker['pos'][0]-$x1+4,$marker['pos'][1]-$y1+4, $marker['text']);
	}
    $im->drawImage($dr);
	//$wm = new Imagick();
	//$wm-> readImage("../css/arr.png");
	
	//$im->compositeImage($wm, imagick::COMPOSITE_OVER,0,0);
	if(isset($_GET['mode']) && $_GET['mode']=='test'){
    	header("Content-Type: image/png");
   		echo $im;
   	}else{
    	echo json_encode(array('image'=>'data:image/png;base64,'.base64_encode($im)));
    }
exit;













$im = imagecreatefromstring($data);
	imageAlphaBlending($im, true);
	imageSaveAlpha($im, true);
	//imageantialias($im, true); 
//$mx = imagecreatefromstring($marx);
 	//imagecolortransparent($mx, imagecolorallocatealpha($mx, 0, 0, 0, 255));
	//imageAlphaBlending($mx, true);
	//imageSaveAlpha($mx, true);
$x1=-1*$pan[0];
$y1=-1*$pan[1];
$max_x=imagesx($im);
$max_y=imagesy($im);

imagesetthickness($im,5);
//print_r($pan);exit;
/*
$viewbox=explode(' ','85 12 1561 539');
$path='M512 207L546 188L605 122L621 114L880 213L684 449';
$data=base64_decode(str_replace('data:image/png;base64,','',$image));
$im = imagecreatefromstring($data);

$x1=44.5;
$y1=58;
*/
$matches=array();
preg_match_all('/\w[\-\d]+\s[\-\d]+/',$path,$matches);
//print_r($matches);
$i=0;$text='';
foreach($matches[0] as $var){
	//echo $var;
	$op=substr($var,0,1);
	$xy=explode(' ',substr($var,1));
	/*
	if($i>5){
		// The text to draw
		$text = "a\nb";
		// Replace path by your own font path
		$font = '/var/www/vault48/leaflet/arial.ttf';

		// Add some shadow to the text
		imagettftext($im, 14, 0, 11, 21, imagecolorallocate($im, 0, 0, 0), '/var/www/vault48/leaflet/arial.ttf', $text);
		imageline($im,$x0,$y0,$xy[0]-$x1,$xy[1]-$y1,imagecolorallocate($im, 0, 255, 0));
		//imageline($im,663,339,320,339,imagecolorallocate($im, 0, 0, 0));
		break;
		echo $var."\n";
		echo $x0.' '.$y0."\n";
		//echo $xy[0].'-'.$x1."\n";
		//echo $xy[1].'-'.$y1."\n";
		//echo 'sizes are '..'x'.imagesy($im)."\n";
		//echo 'next is '.$matches[0][$i+1]."\n";exit;
		break;
	}
	*/
	
	if($op=='M'){
		$x0=$xy[0]-$x1;
		$y0=$xy[1]-$y1;
		$text.="\n".'M '.$x0.'/'.$y0;
	}elseif($op=='L'){
		imageline($im,$x0,$y0,$xy[0]-$x1,$xy[1]-$y1,imagecolorallocate($im, 255, 50, 75));
		$x0=$xy[0]-$x1;
		$y0=$xy[1]-$y1;
	}
	/*
	if($x0>$max_x or $y0>$max_y){
		imageline($im,677,360,579+64,324+50,imagecolorallocate($im, 0, 0, 0));
		imageline($im,325,324,0,0,imagecolorallocate($im, 0, 0, 0));
		break;
		//break;
		$dx=$x0-$max_x;
		$dy=$y0-$max_y;
		echo $x0.'x'.$y0."\n";
		echo $matches[0][$i+1]."\n";
		echo $matches[0][$i+2]."\n";
		echo $x1.' '.$y1;
		//echo $dx.'/'.$dy;
		exit;
	}
	*/
	$i++;
}
$text=print_r($matches[0],true);
//$text=$_POST['path'];
imagettftext($im, 14, 0, 11, 21, imagecolorallocate($im, 0, 0, 0), '/var/www/vault48/leaflet/arial.ttf', $text);
/*
imagelinethick($im,512-$x1,207-$y1,546-$x1,188-$y1,imagecolorallocate($im, 0, 50, 255),2);
imagelinethick($im,546-$x1,188-$y1,605-$x1,122-$y1,imagecolorallocate($im, 0, 50, 255),2);
*/
if ($im !== false) {
    header('Content-Type: image/png');
    //imagepng($im);
    ob_start();
    //imagecolortransparent($mx, imagecolorallocate($mx, 0, 0, 0));
    //imagecopymerge($im, $mx, 0, 0, 0, 0, $max_x, $max_y, 50);
    //imagecopy($im, $mx, 0,0,0,0, $max_x, $max_y);
	imagepng($im);
	$stringdata = ob_get_contents(); // read from buffer
	ob_end_clean(); // delete buffer
	//$zdata = gzdeflate($stringdata);
	//echo $stringdata;
    //echo json_encode(array('image'=>'data:image/png;base64,'.base64_encode($stringdata)));
    echo $stringdata;
    imagedestroy($im);
}
else {
    echo 'Произошла ошибка.';
}

?>