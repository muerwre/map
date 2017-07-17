<?
$prefix = '/var/www/share/map-cache/';
$result_prefix = '../result/';
$providers = [
    'default'=> 'https://tile{n}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1',
    'watercolor'=> 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    'darq'=> 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',    
    'osm'=> 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'hot'=> 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    'blank'=> 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    'sat'=> 'http://mt{n}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    'ymap'=> 'https://vec03.maps.yandex.net/tiles?l=map&v=17.04.16-0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU'
];

$mysql = [
    'host'  => 'localhost',
    'user'  =>  'new_map',
    'pass'  =>  'puzzword',
    'db'    =>  'neu_map'
];

$randoms = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


function monthy($mon){
    $arr = ['января','февраля','марта','апреля','мая','июня','июля','августа',
            'сентября','октября','ноября','декабря'];
    return $arr[$mon-1];
}

function gen_sequence($length=16,$prefix=''){
    global $randoms;
    $ret = '';
    for ($i=0; $i<=$length; $i++) {
        $rnd = rand(0,strlen($randoms));
        //echo ;
        $ret .= substr($randoms,$rnd,1);
    }
    return $prefix.$ret;
}

function oops($text){echo json_encode(array('success'=>false,'error'=>$text?$text:'Неизвестная ошибка'));exit;}

function cache_or_fetch($file,$url){
    global $prefix;
    //print_r(realpath($file));
    //mkdir($prefix.'wgis/13',0777,true);
    preg_match('/^(.+)\/([^\/]+)$/',$file,$dir);
    if($dir[0] && !is_dir($dir[1])){
        //echo 'creating '.$dir[1];
        mkdir($dir[1],0777,true);
    }
    if(file_exists($file)){
       return true; 
    }else{
        $tile = file_get_contents($url);
        if($tile){
            if(file_put_contents($file,$tile)){
                return true;
            }else{
                return false;
            }
        }else{
            //echo $url;
            return false;
        }
    }
}

function prefetch($x,$y,$z,$source){
    
    global $providers, $prefix;
    if(isset($source) && $providers[$source]){
        $provider = $providers[$source];
    }else{
        $provider = $providers['default'];
    }
    $string = $provider;
    $string_rand=rand(1,4);
    if( !is_numeric($x) || 
        !is_numeric($y) || 
        !is_numeric($z)){
        return false;
    }
    $string = str_replace('{x}',$x,$string);
    $string = str_replace('{y}',$y,$string);
    $string = str_replace('{z}',$z,$string);
    $string = str_replace('{s}',substr(' abcdef',$string_rand,1),$string);
    $string = str_replace('{n}',$string_rand,$string);

    preg_match('/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/',$string,$match);

    preg_match('/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/',$match[3],$domain);
    preg_match('/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)\/([\w\-]+)\//',$string,$match);
    $file=$prefix.$domain[0].($match[4]?'/'.$match[4]:'').'/'.$z.'/'.$x.'x'.$y.'.tile';

    if(cache_or_fetch($file,$string)){
        return $file;
    }else{
        return false;
    }
}
?>