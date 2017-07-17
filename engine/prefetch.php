<?

error_reporting(0);

require 'settings.inc.php';

if(prefetch($_REQUEST['url']['x'],$_REQUEST['url']['y'],$_REQUEST['url']['z'],$_REQUEST['url']['provider'])){
    echo json_encode(['success' => true, 'index' => $_REQUEST['index']]);
}else{
    oops('Ошибка предзагрузки файла '+$string);
}
?>