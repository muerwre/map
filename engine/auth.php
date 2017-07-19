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
	$result= mysqli_query($link,"SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'");
	if($user = mysqli_fetch_assoc($result)){
		//print_r($user);
		// Грузим карты для данного пользователя
		$role = $user['role'];
		$userdata = json_decode($user['data']);
		$routes = array();
		$query = mysqli_query($link,"SELECT * FROM `routes` WHERE id='".$user['id']."' ORDER BY created DESC");
		//print_r(mysqli_fetch_assoc($query));
		//echo $query->num_rows;
		$i = 0;
		while($result = mysqli_fetch_assoc($query)){
			$routes[] = array('id' => $result['name'], 'created' => date('j',$result['created']).' '.monthy(date('n',$result['created'])).date(' Y в H:i',$result['created']));
			if($i>=199){ break; }
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
		echo json_encode(['success'=>true, 'random_url'=>$name, 'role' => $user['role'], 'routes' => $routes, 'routes_count' => $query->num_rows, 'userdata' => $userdata]);
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
		echo json_encode(['success' => false, 'data' => $_REQUEST, 'description' => 'У вас возникли проблемы с авторизацией. Попробуйте ещё раз.'.$id.'/'.$token.'/'.$user, 'mode' => 'recheck']);exit;
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

}elseif($action=='put_gpx'){
	$route = $_REQUEST['route'];
	//print_r($route);
	if(!isset($route) or sizeof($route)<=0){
		oops('Слишком короткий трэк');
	}else{
		$raw = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<gpx>\n\t<rte>\n\t\t<name>HBC</name>\n";
		foreach($route as $key=>$var){
			//print_r($var);
			$raw.= "\t\t\t<rtept lat=\"".$var['lat']."\" lon=\"".$var['lng']."\"><name>".$key."</name><sym>8198</sym></rtept>\n";
		}
		$raw.= "\t</rte>\n</gpx>";
		$rand_pattern=time()+rand(0,65535);
		while(file_exists($result_prefix.urlencode($rand_pattern).".gpx")){
			$rand_pattern=time()+rand(65535);
		}	
		if(!file_put_contents($result_prefix.urlencode($rand_pattern).".gpx", $raw)){
			oops('Ошибка сохранения готового изображения');
		}
		echo json_encode(array('success'=>true,'result_id'=>urlencode($rand_pattern)));
	}
}elseif($action=='get_gpx'){
	if (isset($_REQUEST['name']) && strlen($_REQUEST['name'])>0) {
		$name = substr($_REQUEST['name'], 0, 64);
	}else{
		$name = 'Маршрут-'.date('j').'-'.monthy(date('n')).date('-Y-H:i');
	}
	if(!is_numeric($_REQUEST['result_id'])){
		oops('Possibly hack attempt');
	}
	header('Content-Description: File Transfer');
	header('Content-Type: application/gpx');
	header('Content-Type: application/gpx+xml');
	header('Content-Disposition: attachment; filename='.$name.'.gpx');
	echo file_get_contents($result_prefix.$_REQUEST['result_id'].".gpx");
}elseif($action=='move_data'){
	// При логине двигает имеющиеся маршруты пользователя в авторизованный аккаунт

	$old_id = isset($_GET['old_id']) ? mysqli_escape_string($link, $_GET['old_id']) : null;
	$old_token = isset($_GET['old_token']) ? mysqli_escape_string($link, $_GET['old_token']) : null;
	
	$new_id = isset($_GET['new_id']) ? mysqli_escape_string($link, $_GET['new_id']) : null;
	$new_token = isset($_GET['new_token']) ? mysqli_escape_string($link, $_GET['new_token']) : null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$old_id}' AND token='{$old_token}'");
	if (!$query->num_rows) { oops('Гостевой токен не найден'); }
	$result = mysqli_fetch_assoc($query);
	$old_user_id = $result['id'];

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$new_id}' AND token='{$new_token}'");
	if (!$query->num_rows) { oops('Авторизованный токен не найден'); }
	$result = mysqli_fetch_assoc($query);
	$new_user_id = $result['id'];

	mysqli_query($link,"UPDATE `routes` SET id = '{$new_user_id}' WHERE id='{$old_user_id}'");
	
	echo json_encode(['success'=>true, 'message'=>"Freed {$old_user_id} to {$new_user_id}", 'debug'=>"UPDATE `routes` SET id = '{$new_user_id}' WHERE id='{$old_user_id}'"]);

}
mysqli_close($link);
?>