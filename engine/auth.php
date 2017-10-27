<?
require 'settings.inc.php';

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

// Соединяемся, выбираем базу данных
$link = mysqli_connect($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);
mysqli_set_charset($link,'utf8');

$place_types = [
	'favs'		=> 'Избранное', 
	'building'	=> 'Сооружения', 
	'cult'		=> 'Культура', 
	'nature'	=> 'Природа', 	
	'shops'		=> 'Магазины', 
	'amuse'		=> 'Развлечения', 
	'food'		=> 'Еда',
	'chicken'	=> 'Курочка',
	'none'		=> 'Не указано'
];

function format_chat_msg($message, $highlight){
	global $link;
    $data = json_decode($message['data']);
    $name = $data->name ? strstr($data->name, ' ', true) : '#'.mb_substr(str_replace('guest:id','',$message['token']), 0,7);
    $photo = $data->photo ? $data->photo : '';
    $msg = str_replace('<','&lt;', str_replace('>','&gt;',$message['msg']));
    if($message['role'] == 'system' || $message['type'] == 'commit'){
        return '<div class="chat_msg chat_commit">+ '.$msg.'</div>'; 
    }elseif($message['type'] == 'place'){
    	$query = mysqli_query($link, "SELECT * FROM `places` WHERE id='".$message['target']."';");
    	$target = mysqli_fetch_assoc($query);
    	if(!$target){ return; }
        return '<div class="chat_msg pointer chat-place-'.$target['type'].($message['token']==$highlight ? ' chat_own_msg' : '').'" onclick="show_place('.$target['id'].');"><div class="chat_avatar" style="background-image: url(\''.$photo.'\');"></div><span class="gray">'.$name.'</span> <a class="chat_place_title">'.$target['title'].'</a>:<br>'.$msg.'</div>';
    }else{
        return '<div class="chat_msg'.($message['token']==$highlight ? ' chat_own_msg' : '').'"><div class="chat_avatar" style="background-image: url(\''.$photo.'\');"></div><span class="gray">'.$name.'</span>: '.$msg.'</div>';
    }
}

if($action == 'gen_guest_token'){
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

	$last_message = isset($_COOKIE['last_message']) && is_numeric($_COOKIE['last_message']) && $_COOKIE['last_message'] >  0 ? mysqli_escape_string($link, $_COOKIE['last_message']) : 0;

	$new_messages = 0;

	if($user = mysqli_fetch_assoc($result)){

		// Грузим карты для данного пользователя
		$role = $user['role'];
		$userdata = json_decode($user['data']);
		$routes = array();
		$query = mysqli_query($link,"SELECT * FROM `routes` WHERE id='".$user['id']."' ORDER BY created DESC");
		$i = 0;
		while($result = mysqli_fetch_assoc($query)){
			$routes[] = array('id' => $result['name'], 'created' => date('j',$result['created']).' '.monthy(date('n',$result['created'])).date(' Y в H:i',$result['created']));
			if($i>=199){ break; }
			$i++;
		}

		$c=0;

		while($c<=3000){
			// генерируем заранее такое имя карты, чтобы его не было в базе
			$c+=1;
			$name = gen_sequence(12);
			if(!mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `routes` WHERE name='$name'"))){
				break;
			}
		}
		if($last_message > 0){
			// Получаем количество новых сообщений
			$query_msg = mysqli_query($link,"SELECT * FROM `chat` WHERE id > '".$last_message."'");
			$new_messages = $query_msg->num_rows;
		}


		echo json_encode([
			'success'		=> true, 
			'random_url'	=> $name, 
			'role'			=> $user['role'],
			'routes'		=> $routes,
			'routes_count'	=> $query->num_rows,
			'userdata' 		=> $userdata,
			'new_messages'	=> $new_messages,
			'place_types'	=> $place_types
		]);
	}else{
		oops("query=SELECT * FROM `tokens` WHERE login='".$id."' AND token='".$token."'");
	}
}elseif($action=='load'){
	$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : null;
	if(!$name){
		oops('Карта не найдена');
	}
	if($row=mysqli_fetch_assoc(mysqli_query($link,"SELECT routes.*, login, token FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';"))){
		echo json_encode(['success' => true, 'data' => json_decode(utf8_decode($row['data']))],  JSON_UNESCAPED_UNICODE);
	}
	//echo "SELECT routes.*, login, token FROM routes LEFT JOIN tokens ON routes.id = tokens.id WHERE routes.name = '$name';";
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

}elseif($action=='drop_route'){

	$id = isset($_GET['id']) ? mysqli_escape_string($link, $_GET['id']) : null;
	$token = isset($_GET['token']) ? mysqli_escape_string($link, $_GET['token']) : null;
	$route_name = isset($_GET['route']) ? mysqli_escape_string($link, $_GET['route']) : null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id']) { oops("Токен не найден"); }

	$query = mysqli_query($link,"DELETE FROM `routes` WHERE id='{$result['id']}' AND name='{$route_name}'");

	echo json_encode(['success' => true, 'debug' => "DELETE FROM `routes` WHERE id='{$result['id']}' AND name='{$route_name}'"]);

}elseif($action=='chat_put'){
	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;

	$message = isset($_REQUEST['message']) ? mysqli_escape_string($link, $_REQUEST['message']) : null;
	$last_message = isset($_REQUEST['last_message']) && is_numeric($_REQUEST['last_message']) && $_REQUEST['last_message'] >  0 ? mysqli_escape_string($link, $_REQUEST['last_message']) : 0;

	$new_last_message = null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id']) { oops("Токен не найден"); }

	if($result['id'] && mb_strlen($message) > 1){

		$matches = array();

		if($id == 'vk:360004' && preg_match("/^((.|\n)*)@commit((.|\n)*)$/", $message,$matches)){
			if($matches[1]){
				mysqli_query($link, "INSERT INTO `chat` VALUES (null, '".$result['id']."', ".time().", '".$matches[1]."', '".$result['role']."', '".$result['data']."', '".$id."', 'chat', 'message')");
			}
			if($matches[3]){
				mysqli_query($link, "INSERT INTO `chat` VALUES (null, '".$result['id']."', ".time().", '".$matches[3]."', '".$result['role']."', '".$result['data']."', '".$id."', 'chat', 'commit')");
			}
		}else{
			mysqli_query($link, "INSERT INTO `chat` VALUES (null, '".$result['id']."', ".time().", '".$message."', '".$result['role']."', '".$result['data']."', '".$id."', 'chat', 'message')");
		}

		$query = mysqli_query($link, "SELECT * FROM `chat` WHERE id > ".$last_message." ORDER BY id DESC LIMIT 0,100");

		$output = array();

		while($result = mysqli_fetch_assoc($query)){
			array_unshift($output, format_chat_msg($result, $id));
			if(!$new_last_message){
				$new_last_message = $result['id'];
			}
		}

		echo json_encode(['success' => true, 'messages' => $output, 'last_message' => $new_last_message]);

	}else{
		echo 'hi';
	}

}elseif($action=='chat_get'){

	$id = isset($_GET['id']) ? mysqli_escape_string($link, $_GET['id']) : null;
	$last_message = isset($_REQUEST['last_message']) && is_numeric($_REQUEST['last_message']) && $_REQUEST['last_message'] >  0 ? mysqli_escape_string($link, $_REQUEST['last_message']) : 0;

	$query = mysqli_query($link, "SELECT * FROM `chat` WHERE id > ".$last_message." ORDER BY id DESC LIMIT 0,100");

	$output = array();

	while($result = mysqli_fetch_assoc($query)){
		array_unshift($output, format_chat_msg($result, $id));
		if(!$new_last_message){
			$new_last_message = $result['id'];
		}
	}

	echo json_encode(['success' => true, 'messages' => $output, 'last_message' => $new_last_message]);
}elseif($action=='places_get'){
	//echo 'm!';
	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$filter = isset($_REQUEST['filter']) ? $_REQUEST['filter'] : null;
	$places = [];

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id']) { oops("Токен не найден"); }

	// Проверяем, правильны ли места	
	foreach($filter as $key=>$var){
		if(!$place_types[$var]){
		 unset($filter[$key]);
		}else{
			$filter[$key] = "'" . $var . "'";
		}
	}

	// Если ничего не указано, просто указываем favs
	if(sizeof($filter) == 0){ $filter[] = "'completely_nothing'"; }

	$query = mysqli_query($link, "SELECT places.*, tokens.login FROM `places` LEFT JOIN tokens ON places.owner = tokens.id WHERE places.status > 0 AND places.type IN (" . implode(',', $filter) . ");");
	
	while($result = mysqli_fetch_assoc($query)){
		$places[$result['id']] = $result;
		$places[$result['id']]['owned'] = ($result['login'] == $id);
	}
	
	echo json_encode(['success' => true, 'places' => $places]);

}elseif($action=='load_single_place'){

	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$place = isset($_REQUEST['place']) && is_numeric($_REQUEST['place']) ? mysqli_escape_string($link, $_REQUEST['place']) : null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id'] || !$place) { oops("Токен не найден"); }

	$query = mysqli_query($link, "SELECT places.*, tokens.login FROM `places` LEFT JOIN tokens ON places.owner = tokens.id WHERE places.status > 0 AND places.id = '".$place."';");
	
	$result = mysqli_fetch_assoc($query);
	$places = $result;
	$places['owned'] = ($result['login'] == $id);
	
	echo json_encode(['success' => true, 'places' => $places]);

}elseif($action=='place_get_info'){


	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;

	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;

	$place = isset($_REQUEST['place']) && is_numeric($_REQUEST['place']) ? mysqli_escape_string($link, $_REQUEST['place']) : null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");

	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id'] || !$place) { oops("Токен не найден"); }

	$query = mysqli_query($link, "SELECT places.*, tokens.login, tokens.data as login_data FROM `places` LEFT JOIN tokens ON places.owner = tokens.id WHERE places.id = ".$place.";");

	$result = mysqli_fetch_assoc($query);

	$result['desc'] = htmlspecialchars_decode($result['desc']);
	$result['owned'] = ($result['login'] == $id);

	$login_data = json_decode($result['login_data']);

	$result['owner_name'] = ($login_data && $login_data->name) ? $login_data->name : $result['owner'];

	// Комментарии
	$query = mysqli_query($link, "SELECT * FROM chat WHERE type='place' AND target='".$place."'");
	$comments = [];
	while($com_result=mysqli_fetch_assoc($query)){
		$comments[] = format_chat_msg($com_result);
	}
	echo json_encode(['success' => true, 'place' => $result, 'comments' => $comments]);

}elseif($action=='place_set_info'){

	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$place = isset($_REQUEST['place']) && is_numeric($_REQUEST['place']) ? mysqli_escape_string($link, $_REQUEST['place']) : null;

	// Проверка токена
	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id'] || !$place) { oops("Токен не найден"); }

	// Принадлежит ли точка пользователю?
	$query = mysqli_query($link, "SELECT places.*, tokens.login, tokens.data as login_data FROM `places` LEFT JOIN tokens ON places.owner = tokens.id WHERE places.id = ".$place." AND tokens.login = '" .$id. "';");

	if(!mysqli_fetch_assoc($query)){
		oops("not yours!");
	}

	// Проверка введёных данных
	// Должно быть название > 2, обрезаем до 32 символов
	$title 	= isset($_REQUEST['title']) && mb_strlen(preg_replace('/[\s\n\r]/','',$_REQUEST['title'])) > 2 ? htmlspecialchars(mb_substr(trim(preg_replace('/[\n\r]/','',$_REQUEST['title'])), 0, 32)) : null;

	// Описание просто обрезаем до 256
	$desc 	= isset($_REQUEST['desc']) ? htmlspecialchars(trim(mb_substr($_REQUEST['desc'],0,400))) : null;

	//echo 'passed: '.$desc;
	//exit;
	// Если тип не содержится в списке типов, делаем его none
	// Тут, возможно, будет проверка прав на эксклюзивные типы, вроде избранного
	$type 	= isset($_REQUEST['type']) && $place_types[$_REQUEST['type']] ? $_REQUEST['type'] : 'none';
	// Lat и LNG должны соответствовать типу FLOAT
	$lat		= isset($_REQUEST['lat']) && is_float((float)$_REQUEST['lat']) ? (float)$_REQUEST['lat'] : null;
	$lng		= isset($_REQUEST['lng']) && is_float((float)$_REQUEST['lng']) ? (float)$_REQUEST['lng'] : null;

	// Если что-то не так, выкидываем ошибку
	if(!$title || !$lat || !$lng){
			oops("data is incomplete / ");
	}

	// Пишем в БД
	$query = mysqli_query($link, "UPDATE places SET `title` = '".$title."',	`desc` = '".$desc."',`type` = '".$type."',`lat` = '".$lat."',`lng` = '".$lng."', status = 1 WHERE id = '".$place."';");

	echo json_encode(['success' => true]);

}elseif($action=='place_add'){

	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;
	$lat		= isset($_REQUEST['lat']) && is_float((float)$_REQUEST['lat']) ? (float)$_REQUEST['lat'] : null;
	$lng		= isset($_REQUEST['lng']) && is_float((float)$_REQUEST['lng']) ? (float)$_REQUEST['lng'] : null;
	// Проверка токена
	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}' AND role != 'guest'");
	$result = mysqli_fetch_assoc($query);
	$owner  = $result['id'];

	if (!$id || !$token || !$query->num_rows || !$result['id'] || !$lat || !$lng) { oops("Токен не найден / Недостаточно прав"); }

	$query = mysqli_query($link, "INSERT INTO `places` (`owner`, `lat`, `lng`, `status`, `created`, `type`, `title`, `desc`) VALUES (".$owner.", '".$lat."', '".$lng."', 0, UNIX_TIMESTAMP(), 'none', '', '');");

	$place_id = mysqli_insert_id($link);

	if($place_id && $place_id>0){
		echo json_encode([ 'success' => true, 'place' => ['lat' => $lat, 'lng' => $lng, 'id' => $place_id] ]);
	}else{
		oops("db_error");
	}
}elseif($action=='place_comment'){
	$id = isset($_REQUEST['id']) ? mysqli_escape_string($link, $_REQUEST['id']) : null;
	$token = isset($_REQUEST['token']) ? mysqli_escape_string($link, $_REQUEST['token']) : null;

	$message = isset($_REQUEST['message']) ? mysqli_escape_string($link, $_REQUEST['message']) : null;

	$place = isset($_REQUEST['place']) && is_numeric($_REQUEST['place']) ? mysqli_escape_string($link, $_REQUEST['place']) : null;

	$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='{$id}' AND token='{$token}'");
	$result = mysqli_fetch_assoc($query);

	if (!$id || !$token || !$query->num_rows || !$result['id'] || $result['role'] == 'guest') { oops("Токен не найден"); }

	$query = mysqli_query($link, "SELECT * FROM `places` WHERE id = '".$place."'");

	if(!$result['id'] || mb_strlen($message) <= 0 || !mysqli_fetch_assoc($query)){ oops("auth error"); }

	mysqli_query($link, "INSERT INTO `chat` VALUES (null, '".$result['id']."', ".time().", '".$message."', '".$result['role']."', '".$result['data']."', '".$id."', 'place', '".$place."')");
	
	$msg_id = mysqli_insert_id($link);
	
	if( !$msg_id ){ oops("possibly db error at pos. 132"); }

	$query = mysqli_query( $link, "SELECT * FROM `chat` WHERE id = ".$msg_id );
	
	$result = mysqli_fetch_assoc($query);

	echo json_encode(['success' => true, 'message' => format_chat_msg($result, $id)]);

}

mysqli_close($link);
?>
