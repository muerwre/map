<?
require 'settings.inc.php';
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;
// Соединяемся, выбираем базу данных
$link = mysqli_connect($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);
mysqli_set_charset($link,'utf8');

if($action == 'gen_guest_token'){
	//echo '<pre>';
	//print_r($_SERVER);
	//exit;
	$c=0;
	while($c<=3000){
		$c+=1;
		$id = gen_sequence(24,'guest:id');
		$token = gen_sequence(64,'seq:psw');
		//$result=;
		if(!mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `tokens` WHERE id='$id'"))){
			//echo 'not found!';
			mysqli_query($link,"INSERT INTO `tokens` VALUES (NULL,'$id','$token',".time().",'guest','".json_encode(['ip' =>mysqli_escape_string($link,$_SERVER['REMOTE_ADDR']), 'agent' => mysqli_escape_string($link,$_SERVER['HTTP_USER_AGENT'])])."')");

			$d=0;
			while($d<=3000){
				// генерируем заранее такое имя карты, чтобы его не было в базе
				$d+=1;
				$name = gen_sequence(12);
				if(!mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `routes` WHERE name='$name'"))){
					break;
				}
			}
			break;
		}
	}

	echo json_encode(['success'=>true,'id'=> $id, 'token' => $token, 'random_url' => $name, 'role' => 'guest']);

}elseif($action == 'check_token'){
	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$result=mysqli_query($link,"SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'");
	if($user = mysqli_fetch_assoc($result)){
		//print_r($user);
		// Грузим карты для данного пользователя
		
		$routes = array();
		$query = mysqli_query($link,"SELECT * FROM `routes` WHERE id='".$user['id']."' ORDER BY created DESC");
		//print_r(mysqli_fetch_assoc($query));
		//echo $query->num_rows;
		$i = 0;
		while($result = mysqli_fetch_assoc($query)){
			$routes[] = array('id' => $result['name'], 'created' => date('j',$result['created']).' '.monthy(date('n',$result['created'])).date(' Y в H:i',$result['created']));
			if($i>=19){ break; }
			$i++;
		}
		//print_r($routes);
		//echo "SELECT * FROM `routes` WHERE id='".$user['id']."' ORDER BY created DESC LIMIT 0,20";
		$c=0;
		while($c<=3000){
			// генерируем заранее такое имя карты, чтобы его не было в базе
			$c+=1;
			$name = gen_sequence(12);
			if(!mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `routes` WHERE name='$name'"))){
				break;
			}
		}
		//$name='bfga';
		echo json_encode(['success'=>true, 'random_url'=>$name, 'role' => 'primary', 'routes' => $routes, 'routes_count' => $query->num_rows]);
	}else{
		oops("query=SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'");
	}
}elseif($action=='load'){
	$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : null;
	if(!$name){
		oops('Карта не найдена');
	}
	//echo "SELECT * FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';";
	//print_r(mysqli_fetch_assoc(mysqli_query($link,"SELECT routes.*, login, token FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';")));
	if($row=mysqli_fetch_assoc(mysqli_query($link,"SELECT routes.*, login, token FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';"))){
		//print_r(json_decode(utf8_decode($row['data']), true,  JSON_UNESCAPED_UNICODE));
		//echo utf8_decode($row['data']);
		//echo json_last_error();
		echo json_encode(['success' => true, 'data' => json_decode(utf8_decode($row['data']))],  JSON_UNESCAPED_UNICODE);
		//
	}
}elseif($action == 'store'){
	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : null;
	$name = substr(preg_replace('/[^A-Za-z0-9А-Яа-яЁё\-\_\(\)]/ui','',$name),0,48);
	$force = isset($_REQUEST['force']) ? $_REQUEST['force'] : false;

	$route = isset($_REQUEST['route']) ? $_REQUEST['route'] : [];
	$stickers = isset($_REQUEST['stickers']) ? $_REQUEST['stickers'] : [];
	$points = isset($_REQUEST['points']) ? $_REQUEST['points'] : [];
	$logo = isset($_REQUEST['logo']) ? $_REQUEST['logo'] : "default";
	$map_style = isset($_REQUEST['map_style']) ? $_REQUEST['map_style'] : "default";
	// не сохраняй пустые карты!
	if(!is_array($route) || !is_array($stickers) || !is_array($points)) {
		echo json_encode(['success' => false, 'description' => 'Ошибка на стороне сервера #1222. Сообщиите нам о ней, пожалуйста.', 'mode' => 'error']);
		exit;
	}
	if(sizeof($route)<=0 && sizeof($stickers)<=0 && sizeof($points)<=0){
		echo json_encode(['success' => false, 'description' => 'Здесь нечего сохранять. Нарисуйте что-нибудь и возвращайтесь.', 'mode' => '']);
		exit;		
	}
	if(mb_strlen($name)<=0){
		$c=0;
		while($c<=3000){
			$c+=1;
			$name = gen_sequence(12);
			if(!mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `routes` WHERE name='$name'"))){
				break;
			}
		}
	}
	$user = mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'"));
	if(!$id || !$token || !$user){
		//echo "SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'";
		//print_r($user);
		//echo 'id:'.$_REQUEST['token'];
		//print_r($_REQUEST['route']);
		echo json_encode(['success' => false, 'data' => $_REQUEST, 'description' => 'У вас возникли проблемы с авторизацией. Попробуйте ещё раз.', 'mode' => 'recheck']);exit;
	}

	if($row=mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';"))){
		if($row['login'] == $id){
			if(!$force || $force == 'false'){
				echo json_encode(['success' => false, 'description' => 'У вас уже есть маршрут с таким именем. Можно перезаписать его или переименовать?', 'mode' => 'overwriting']);
				exit;
			}
		}else{
			echo json_encode(['success' => false, 'data' => $_REQUEST, 'description' => 'Кто-то уже занял это имя (не вы). Выберите другое имя.', 'mode' => 'rename']);exit;
		}
	}
	$store_string = json_encode(['logo' => $logo, 'route' => $route, 'points' => $points, 'stickers' => $stickers, 'map_style' => $map_style]);
	mysqli_query($link,"DELETE FROM `routes` WHERE name = '$name';");
	mysqli_query($link,"INSERT INTO `routes` values (null,'$name','".mysqli_escape_string($link,$store_string)."',".time().",".$user['id'].");");
	echo json_encode(['success' => true, 'name' => $name, 'force'=>$force, 'data' => $_REQUEST, 'description' => 'Отлично! Ваш маршрут сохранён. Поделитесь ссылкой с друзьями, приятной покатушки!']);
}elseif($action=='fetch_msgs'){

}elseif($action=='get_gpx'){
	$route = json_decode($_GET['route']);
	//print_r($route);
	if(!isset($route) or sizeof($route)<=0){
		oops('Слишком короткий трэк');
	}else{
		if (isset($_GET['name']) && strlen($_GET['name'])>0) {
			$name = substr($_GET['name'], 0, 64);
		}else{
			$name = 'Маршрут-'.date('j').'-'.monthy(date('n')).date('-Y-H:i');
		}
		header('Content-Description: File Transfer');
		header('Content-Type: application/gpx');
    	header('Content-Type: application/gpx+xml');
    	header('Content-Disposition: attachment; filename='.$name.'.gpx');
		echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<gpx>\n<rte>\n<name>HBC</name>\n";
		foreach($route as $key=>$var){
			//print_r($var);
			echo "<rtept lat=\"".$var->lat."\" lon=\"".$var->lng."\"><name>".$key."</name><sym>8198</sym></rtept>\n";
		}
		echo "</rte>\n</gpx>";
	}
}
mysqli_close($link);
?>