
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1, maximum-scale=0.8">
	<link rel="icon" href="favicon.png?d" type="image/png" />
	<link rel="stylesheet" type="text/css" href="/css/font-awesome.css?d" />
	<link rel="stylesheet" type="text/css" href="/css/fonts.css" />
	<link type="text/css" rel="stylesheet" media="all" href="/css/style.css?v=4.0.<?=rand(0,65535);?>" />
</head>
<body>
	<div class="oauth_page">
		<div class="oauth_aligner">
			<div class="oauth_container ">
				<?
				$code = isset($_GET['code']) ? $_GET['code'] : null;
				$error = isset($_GET['error']) ? $_GET['error'] : null;
				$error_reason = isset($_GET['error_reason']) ? $_GET['error_reason'] : null;
				$error_description = isset($_GET['error_description']) ? $_GET['error_description'] : null;
				?>
				<? if ($code) {?>					

					<?	$response = json_decode(file_get_contents("https://oauth.vk.com/access_token?client_id=5987644&redirect_uri=http://{$_SERVER['HTTP_HOST']}/engine/oauth.php&client_secret=Z71DsxoMF7PS9kayLuks&code=" . $code));

						$login_data = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids={$response->user_id}&fields=photo,has_photo&v=5.67&access_token={$response->access_token}"))->response;
						//print_r($response);
						//print_r($arrResponse);
						if ($response->error) {
						  die('Или какая-то другая обработка ошибки');
						}
					?>

					<? if (isset($login_data) && $login_data[0] && $login_data[0]->id) { 

						require 'settings.inc.php';

						$link 	= mysqli_connect($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);
						mysqli_set_charset($link,'utf8');
						
						$id 	= 'vk:'.mysqli_escape_string($link, $login_data[0]->id);
						$token 	= gen_sequence(64,'seq:psw');

						$query = mysqli_query($link,"SELECT * FROM `tokens` WHERE login='".$id."'");

						$first_name = $login_data[0]->first_name ? mysqli_escape_string($link, $login_data[0]->first_name) : '';
						$last_name 	= $login_data[0]->last_name ? mysqli_escape_string($link, $login_data[0]->last_name) : '';
						$photo 		= $login_data[0]->has_photo ? mysqli_escape_string($link, $login_data[0]->photo) : '';
						if(!$query->num_rows){

							// Пользователь не найден. Регистрируем.

							$user_data = [	'name' => implode(' ', [$first_name, $last_name]), 
											'photo' => $photo, 
											'ip' => mysqli_escape_string($link,$_SERVER['REMOTE_ADDR']), 
											'agent' => mysqli_escape_string($link,$_SERVER['HTTP_USER_AGENT']) ];

							mysqli_query($link,"INSERT INTO `tokens` VALUES (NULL,'$id','$token',".time().",'vk','".json_encode($user_data, JSON_UNESCAPED_UNICODE)."')");
							
						}else{

							// Пользователь найден. Обновляем данные.

							mysqli_query($link,"UPDATE `tokens` SET data='".json_encode(['name'=>implode(' ', [$first_name, $last_name]), 'photo' => $photo, 'ip' =>mysqli_escape_string($link,$_SERVER['REMOTE_ADDR']), 'agent' => mysqli_escape_string($link,$_SERVER['HTTP_USER_AGENT'])], JSON_UNESCAPED_UNICODE)."' WHERE login='".$id."'");

							$result = mysqli_fetch_assoc(mysqli_query($link,"SELECT * FROM `tokens` WHERE login='".$id."'"));
							
							$user_data = (array)json_decode($result['data']);
							$token 	= $result['token'];

						}
						//print_r($user_data);
						//exit;
					?>
						<center>
							<h2>Отлично!</h2>
							Сейчас мы впустим вас на сайт.
						</center>
						<script>window.opener.do_login({
									'id': '<?=$id;?>',
									'token': '<?=$token;?>',
									'name': '<?=$user_data['name'];?>',									
									'photo': '<?=$user_data['photo'];?>',	
								});</script>
					<? }else{ ?>
						<center>
							<h2>Кажется, произошла ошибка.</h2>							
						</center>
						<div class="single"></div>
						<div class="small gray" style="word-wrap: break-word;">
							<?=base64_encode(json_encode([$response,$login_data])); ?>
						</div>
					<? } ?>
				<? } elseif ($error) { ?>

					<? $error_text = "VK ERROR: ".$_GET['error']." / reason: ".$_GET['error_reason']." / description: ".$error_description;
						if($_GET['error_reason']=='user_denied'){ ?>
							<b>Вы отказались войти.</b>
							<div class="single"></div>

							<div class="small" style="word-wrap: break-word;">
								<p>Возможно, вы боитесь, что мы получим доступ к вашему аккаунту Вконтакте, но это не так. Всё, что мы получим от сервера в ответе: ваше имя, фамилию и фотографию.</p>
								<p class="gray">Мы никому их не покажем, а просто будем показывать вам в редакторе, чтобы было красиво.</p>								
							</div>
							<div class="single"></div>
							<div class="pull-right">						
								<a onclick="window.close();" class="button button-empty">Отмена</a>
								<a href="https://oauth.vk.com/authorize?client_id=5987644&scope=&redirect_uri=http://<?=$_SERVER['HTTP_HOST'];?>/engine/oauth.php&response_type=code" class="button button-primary "><i class="fa fa-vk"></i>&nbsp;|&nbsp;Попытаться ещё раз</a>
							</div>
							<div class="clr"></div>
						<? }else{ ?>
							Упс! Кажется, произошла ошибка.
							<div class="single"></div>

							<div class="small gray" style="word-wrap: break-word;">
								Информация для разработчика:<br>
								<? echo base64_encode($error_text); ?>
							</div>
							<div class="single"></div>
							<div class="pull-right">						
								<a onclick="window.close();" class="button button-empty">Отмена</a>
								<a href="https://oauth.vk.com/authorize?client_id=5987644&scope=&redirect_uri=<?=$_SERVER['HTTP_HOST'];?>&response_type=code" class="button button-primary "><i class="fa fa-vk"></i>&nbsp;|&nbsp;Попытаться ещё раз</a>
							</div>
							<div class="clr"></div>
						<? } ?>
					<?
					//file_put_contents('../logs/'.date('Y-m-d H:i:s.').'txt', $error_text");
					?>

				<? } else { ?>

				<? } ?>
			</div>
		</div>
	</div>
</body>
