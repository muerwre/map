<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=0.8">
    <link rel="icon" href="favicon.png?d" type="image/png" />

    <title>Маршрут покатушки | Независимое Велосообщество</title>

    <script src="/js/jquery-3.1.1.min.js"></script>
    <!--script src="/js/jquery-3.1.1.min.js"></script-->
    <!--script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
    <!--script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script-->
    <!--script src="/js/leaflet.js"></script-->
    <script src="/js/leaflet-src.js"></script>
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-alpha2/html2canvas.min.js"></script-->
    <!--script src="js/easy-button.js"></script-->
    <script src="/js/Leaflet.Editable.js"></script>
    <script src="/js/leaflet.geometryutil.js"></script>
    <script src="/js/leaflet-routing-machine.js"></script>
    <!--script src="https://rawgithub.com/emikhalev/leaflet-2gis/master/dgis.js"></script-->
    <!--script src="http://maps.api.2gis.ru/1.0" type="text/javascript"></script-->
    <script src="/js/cropper.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/leaflet.markercluster.js"></script>
    <script src="/js/script.js?v=4.0.<?=rand(0,65535);?>"></script>
    <!--link type="text/css" rel="stylesheet" media="all" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" /-->
    <link type="text/css" rel="stylesheet" media="all" href="/css/style.css?v=4.0.<?=rand(0,65535);?>" />
    <link type="text/css" rel="stylesheet" media="all" href="/css/cropper.min.css" />

    <link rel="stylesheet" type="text/css" href="/css/font-awesome.css?d" />
    <link rel="stylesheet" type="text/css" href="/css/fonts.css" />
    <link rel="stylesheet" type="text/css" href="/css/leaflet-routing-machine.css" />
    <link rel="stylesheet" type="text/css" href="/css/MarkerCluster.Default.css" />
    <link rel="stylesheet" type="text/css" href="/css/MarkerCluster.css" />

    <link rel="shortcut icon" href="/favicon.png?wd" type="image/png">
    <meta property="og:image" content="/misc/vk_preview.png" />
    <meta content="/misc/vk_preview.png">
</head>
<body>
    <div id="store_helper">
      <b>Скопируйте адрес карты, чтобы поделиться ею.</b>
      <div class="single"></div>
      <small class="gray">Любой пользователь сможет посмотреть вашу карту, но редактировать можете только вы.</small>
      <div class="single"></div>
      <div class="button button-primary pull-right" onclick="$('#store_helper').hide();"><span class="fa fa-check"></span> Понятно</div>
    </div>
    <div id="image_cropper">
      <div class="shader">
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
          <div id="sk-status">ЗАГРУЖАЕМ</div>
        </div>
      </div>
      <div class="crop_canvas hidden">
        <div class="crop_pan">
          <div id="crop_image_canvas">
              <!--div id="crop_logo_selector"></div-->
            <!--img id="crop_image" src="http://alpha-map.vault48.org/cache/1487751413.png" style="max-width:100%;max-height:100%;" class="cropper-hidden"-->
          </div>
        </div>
      </div>
    </div>
    <div class="ctrl ctrl-panzoom"></div>
    <!--div class="ctrl ctrl-search">
      <span class="fa fa-search"></span>
    </div-->
    <div id="logo_composer"></div> <!-- Оверлэй с логотипом -->

    <div id="editor_left_slide"> <!-- Слайд с сохранёнными картами -->
      <div class="editor_left_slide_close" onclick="$('#editor_left_slide').removeClass('active');">✕</div>
      <div class="editor_left_slide_empty">
        <b>Здесь будет список сохранённых вами карт.</b><br><span class="gray">Пока что он пуст.</span>
      </div>
      <div id="user_route_list">
      </div>
    </div>

     <div id="chat_left_slide"> <!-- Слайд с сохранёнными картами -->
      <div class="editor_left_slide_close" onclick="close_chat();">✕</div>
      <div id="chat_input">
        <div id="chat_history">
          <div id="chat_history_buffer"></div>
        </div>
        <textarea id="chat_input_box" onkeyup="chat_watch_enter(event);" placeholder=""></textarea>
        <div class="button button-primary pull-right" onclick="chat_put();"><span class="fa fa-arrow-right"></span></div>
      </div>
    </div>

    <div id="place_left_slide"> <!-- Слайд с описанием интересного места -->

      <div id="place_owner_buttons">
        <div id="place_left_edit" onclick="place_toggle_editing();"> <span class="fa fa-pencil"></span> </div>
        <!--div id="place_left_delete"> <span class="fa fa-trash-o"></span> </div-->
      </div>
      <div class="place_left_slide_close" onclick="close_place();">✕</div>

      <div class="slide_inner">

        <!-- Иконка загрузки -->
        <div class="loader"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div></div>
        <!-- Общая информация -->
        <div id="place_info">

          <div id="place_thumb"> <span class="fa fa-camera"></span> </div>

          <div id="place_text">
            <div id="place_title"></div>
            <div id="place_owner"></div>
            <div id="place_description"></div>            
          </div>

          <div id="place_editor">
            <div class="place_input_container">
              <input type="text" name="place-title" id="place-input-title" placeholder="Название" onkeydown="input_title_enter(event);" onkeyup="check_input_title(event);"/>
              <div id="place_title_progress" class="input-progress">
                  <div class="bar"></div>
              </div>
            </div>
            <input type="hidden" id="place-input-lat" placeholder="lat" />
            <input type="hidden" id="place-input-lng" placeholder="lng" />
            <div class="place_type_select">
              <div id="place_type_options" onclick="$(this).toggleClass('expanded');"></div>
            </div>
            <input type="hidden" id="place-input-type" />
            <div class="place_input_container">
              <textarea name="place-desc" id="place-input-desc" rows="7" placeholder="Описание" onkeyup="check_input_desc(event);" onkeydown="input_desc_ctrlenter(event);"></textarea>
              <div id="place_desc_progress" class="input-progress">
                  <div class="bar"></div>
              </div>
            </div>
            <div id="place_error_container">
                <div class="place_error_title">Укажите название места</div>
            </div>
            <div class="button_group right">
              <div class="button" onclick="place_stop_editing();">
                ОТМЕНА
              </div>
              <div class="button button-success" onclick="save_place_data();">
                СОХРАНИТЬ
              </div>
            </div>
          </div>

        </div>
      </div>
   </div>

    <div id="editor_left_plank">

      <span id="user_login_unauthorized">
        <div class="bar" onclick="open_oauth_frame('<?=$_SERVER['HTTP_HOST'];?>');"><div class="btn btn-user btn-fa"><span>Войдите чере вконтакте, <br>чтобы ваши маршруты <br>всегда были с вами.</span></div><div class="bar_text"><span>Войдите чере вконтакте, <br>чтобы ваши маршруты <br>всегда были с вами.</span>ВОЙТИ</div></div>
        <div class="sep"></div>
      </span>

      <span id="user_login_logged" class="hidden">
        <div class="bar" onclick="show_user();">
          <div class="bar_user_avatar field_user_avatar"></div>
          <div class="bar_user_name">
            <div class="field_user_id"></div>
            <div class="field_user_name small gray"></div>
          </div>
        </div>
        <div class="sep"></div>
      </span>

      <div class="bar" onclick="open_route_list();"><div class="btn btn-fa"><span>Все сохранённые вами маршруты.</span><i class="fa fa-folder-o"></i><i id="menu_user_route_count"></i></div></div>
      <div class="sep"></div>
      <div class="bar" onclick="open_chat();"><div class="btn btn-fa"><span>Чат и ответы на вопросы.</span><i class="fa fa-comments"></i><i id="menu_user_chat_count"></i></div></div>
      <div class="sep"></div>
      <div class="bar" onclick="">
        <span class="places-view-tooltip">

          <div id="places-view-checkboxes"></div>
          
          <div class="double"></div>

          <div id="places-view-toggles">
            <label for="places-toggle-viewer"><input type="checkbox" class="checkbox-type-viewer" id="places-toggle-viewer" data-type="viewer" onchange="select_place_view(event);">В режиме просмотра</label>
            <label for="places-toggle-editor"><input type="checkbox" class="checkbox-type-editor" id="places-toggle-editor" data-type="editor" onchange="select_place_view(event);">В редакторе</label>
          </div>

        </span>
        <div class="btn btn-places-view"></div>
      </div>

      <div class="sub_plank" id="sub_plank_user">
        <div class="routing_tip" style="display:table;width:100%">
          <div class="routing_tip_text">
            <div><div class="button button-danger pull-right" onclick="do_logout();">Выход</div><span class="small gray">Вы авторизованы и ваши маршруты в безопасности.</span></div>
          </div>
        </div>
      </div>

    </div>
    <div id="left_plank" class="active">
      <div class="bar" onclick="enable_editor();"><div class="btn btn-router" ></div><div class="bar_text">Редактор</div></div>
      <div class="sep"></div>
      <div class="bar" onclick="get_gpx();"><div class="btn btn-import" ></div><div class="bar_text">GPX</div></div>
      <div class="sep"></div>
      <div class="bar" onclick="open_chat();"><div class="btn btn-fa"><span>Чат и ответы на вопросы.</span><i class="fa fa-comments"></i><i id="menu_user_chat_count"></i></div></div>
    </div>
    <div id="plank">
        <div class="sub_plank relative" id="plank_hello" onclick="toggle_none();">
            <div id="hero">
              <div id="elbow"><div id="palm"></div></div>
            </div>
            <h2>Ахой! Это - редактор карт!</h2>
            <p>Мы в Независимом Велосообществе создали его специально для велосипедистов.</p>
            <p>Он умеет сам прокладывать маршруты, делать скриншоты для написания поста и сохранять карту, а так же делиться ссылкой на неё.</p>
            <div style="padding-right: 20px;"><a class="button button-primary right">Вперёд!</a></div>
        </div>
      <div class="sub_plank" id="sub_plank_route">
        <div class="sub_plank_text" id="text_route_length">0 км</div>
        <div class="btn btn-poly-remove" onclick="toggle_route_drop();"><span>Очистить маршрут <b>Del</b></div>
        <div class="btn btn-poly-inverse" onclick="reverse_route();"><span>Развернуть маршрут</div>
          <div class="sub_plank_text sub_plank_regular_text"><b class="key">Z</b> - отмена&nbsp;&nbsp; <b class="key">X</b> - повтор</div>
        <!--div class="btn btn-poly-import"></div-->
      </div>
    <div class="sub_plank" id="sub_plank_route_drop">
        <div class="sub_plank_text">УДАЛИТЬ МАРШРУТ И ВСЕ ТОЧКИ?</div>
        <div class="sub_plank_buttons button_group">
          <a class="button button-danger" onclick="toggle_route();">ОТМЕНА</a><a class="button button" onclick="drop_route();">УДАЛИТЬ</a>
        </div>
    </div>
    <div class="sub_plank sub_plank_full" id="sub_plank_shot_size">
        <div class="routing_tip" style="display:table;width:100%">
          <div class="routing_tip_text">
            Выберите размер скриншота.
            <div class="gray small">Обычно хватает "Как на экране", но мало ли что?</div>
            <!--div class="small gray">Маршрут строится с учётом светофоров и знаков, запрещающих поворот.</div-->
          </div>
          <div class="routing_tip_btns button_group">
            <a class="button button-gray-1" onclick="make_bigger_shot(1200);">1200</a><a class="button button-gray-2" onclick="make_bigger_shot(1600);">1600</a><a class="button button-gray-3" onclick="make_bigger_shot(2000);">2000</a><a class="button button-primary" onclick="make_a_shot();">Как на экране</a>
          </div>
        </div>
    </div>
    <div class="sub_plank" id="sub_plank_remote_store">
        <div class="sub_plank_store_green">
          <center><h2>Сохраняем?</h2></center>
          <div class="store_address_input">
            <span>Название:</span>
            <input type="text" name="store_name" id="store_name" placeholder="Название маршрута">
          </div>
        </div>
        <div id="sub_plank_store_text">
          Адрес:
          <div><a id="store_address_url" target="_blank" href="http://map.vault48.org/#map:">http://map.vault48.org/#map:</a></div>
          <div class="single"></div>
          <div class="gray" id="store_status">
            Вы можете задать своё название маршрута, а значит и адрес, по которому он будет доступен.
          </div>

        </div>
          <div style="text-align:right;padding:5px 15px 5px;">
            <div class="store_spinner">Сохраняем...</div>
            <div class="store_error">Ошибка!</div>
            <span class="button_group store_status_none"><a class="button" onclick="toggle_none();">Отмена</a><a class="button button-primary" onclick="remote_store_data(false);">Сохранить</a></span>
            <span class="store_status_success"><a class="button button-success" onclick="cool_thanks();">Круто, спасибо</a></span>
            <span class="button_group store_status_overwriting"><a class="button" onclick="toggle_none();">Отмена</a><a class="button button-danger" onclick="remote_store_data(true);">Перезаписать</a></span>
          </div>
          <div class="single"></div>
    </div>
    <div class="sub_plank" id="sub_plank_routing_machine">
      <div id="sub_plank_routing_tip">
        <div class="routing_tip routing_tip_seta">
          <div class="routing_tip_text">
            Покажите на карте первую точку маршрута.
            <div class="small gray">Путь прокладывается с учётом светофоров и поворотов на перекрёстках.</div>
          </div>
          <div class="routing_tip_btns">
            <a class="button button-danger" onclick="clear_router();toggle_none();">Отмена</a>
          </div>
        </div>
        <div class="routing_tip routing_tip_setb">
          <div class="routing_tip_text">
            Продолжаем маршрут. Укажите следующую точку.
            <div class="small gray">Чтобы начать заново, сначала удалите маршрут.</div>
          </div>
          <div class="routing_tip_btns">
            <a class="button button-danger" onclick="clear_router();toggle_none();">Отмена</a>
          </div>
        </div>
        <div class="routing_tip routing_tip_routing">
          <div class="routing_tip_text">
            Щелчок добавляет следующую точку.
            <div class="gray small">Потяните за пунктирную линию, чтобы исправить участок.</div>
            <!--div class="small gray">Маршрут строится с учётом светофоров и знаков, запрещающих поворот.</div-->
          </div>
          <div class="routing_tip_btns button_group">
            <a class="button button" onclick="clear_router();toggle_none();">Отмена</a><a class="button button-primary" onclick="apply_route();">Применить</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sub_plank" id="sub_plank_stickers">
        <div class="sub_plank_stickers_helper">
          <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
          <div>6</div><div>7</div><div>8</div><div>9</div><div>0</div>
        </div>
        <div class="sub_plank_sticker_list">
            <div class="clr"></div>
        </div>
    </div>
      <div class="sub_plank" id="sub_plank_crop" style="width: 97%;">
        <!--div class="sub_plank_text">Итоговое изображение</div>
        <div class="sub_plank_buttons button_group">
          <a class="button button-primary" onclick="engage_cropper();">Скачать</a><a class="button button" onclick="toggle_none();">Отмена</a>
        </div-->
          <div class="routing_tip" style="display:block;">
            <div class="routing_tip_text" style="width: 100%;">
              Кажется, всё готово!
              <div class="small gray">Обрежьте изображение и выберите логотип.</div>
            </div>
            <div class="routing_tip_btns" style="padding-left: 10px;">
              <a class="button button-success" onclick=" $('#sub_plank_select_logo').toggleClass('active');">Выбрать логотип</a>&nbsp;&nbsp;<span class="button_group"><a class="button button-primary" onclick="engage_cropper();">Скачать</a> <a class="button button" onclick="toggle_none();">Отмена</a></span>
            </div>
          </div>
      </div>
      <div class="sub_plank" id="sub_plank_select_logo">
        <div class="logo_select_list">
        </div>
      </div>
      <div class="sub_plank sub_plank_with_bar" id="sub_plank_shot">
        <div class="sub_plank_bar_text" id="shot_status_text">Подготовка...</div>
        <div class="sub_plank_bar" id="shot_status_bar"><span></span></div>
      </div>
      <div class="sub_plank sub_plank_full" id="sub_plank_map">
        <div class="map_type_option">
          <a onclick="change_map('default');"></a>
          <div class="map_type_thumb"><img src="https://tile1.maps.2gis.com/tiles?x=5983&y=2590&z=13&v=1"></div>
          <div class="map_type_name">2GIS</div>
          <div class="map_type_desc">Подробная городская карта с сочной расцветкой</div>
        </div>
        <div class="map_type_option">
          <a onclick="change_map('watercolor');"></a>
          <div class="map_type_thumb"><img src="http://stamen-tiles-a.a.ssl.fastly.net/watercolor/13/5983/2590.jpg"></div>
          <div class="map_type_name">AQUA</div>
          <div class="map_type_desc">Красивая карта, но совершенно неинформативная.</div>
        </div>
        <div class="map_type_option">
          <a onclick="change_map('darq');"></a>
          <div class="map_type_thumb"><img src="http://a.basemaps.cartocdn.com/dark_all/13/5983/2590.png"></div>
          <div class="map_type_name">DARQ</div>
          <div class="map_type_desc">Чёрная карта для самых готичных покатушек.</div>
        </div>
        <div class="map_type_option">
          <a onclick="change_map('osm');"></a>
          <div class="map_type_thumb"><img src="http://b.tile.openstreetmap.org/13/5983/2590.png"></div>
          <div class="map_type_name">OSM</div>
          <div class="map_type_desc">Очень подробная карта от проекта openstreetmap.</div>
        </div>
        <div class="map_type_option">
          <a onclick="change_map('hot');"></a>
          <div class="map_type_thumb"><img src="http://b.tile.openstreetmap.fr/hot/13/5983/2590.png"></div>
          <div class="map_type_name">CAMO</div>
          <div class="map_type_desc">Камуфляжные тона на карте от openstreetmap.</div>
        </div>
        <div class="map_type_option">
          <a onclick="change_map('ysat');"></a>
          <div class="map_type_thumb"><img src="https://sat02.maps.yandex.net/tiles?l=sat&v=3.330.0&x=5983&y=2590&z=13&lang=ru_RU"></div>
          <div class="map_type_name">YSAT</div>
          <div class="map_type_desc">Спутниковый яндекс</div>
        </div>
        <!--div class="map_type_option">
          <a onclick="change_map('sat');"></a>
          <div class="map_type_thumb"><img src="https://sat01.maps.yandex.net/tiles?l=sat&x=5983&y=2590&z=13"></div>
          <div class="map_type_name">YSAT</div>
          <div class="map_type_desc">Спутниковая карта от Яндекс.</div>
        </div-->
      </div>
      <div id="bar-1" class="bar">
        <!--div class="editor-title grid-30">РЕДАКТОР</div-->
          <div class="btn btn-router" onclick="toggle_routing();"><span>Автоматическое построение маршрута <b>Q</b></span></div>
          <div class="btn btn-poly"><span>Ручное редактирование маршрута <b>W</b></span></div>
        <div class="btn btn-point"><span>Пояснительные выноски <b>E</b></span></div>
        <div class="btn btn-sticker"><span>Стикеры <b>R</b>&nbsp;&nbsp;&nbsp;</span></div>
        <div class="btn btn-places"><span>Добавить место<i>ВОЙДИТЕ, ЧТОБЫ ИСПОЛЬЗОВАТЬ</i></span></div>
      </div>
      <div class="sep"></div>
      <div id="bar-2" class="bar">
        <div class="btn btn-map"><span>Стиль карты <b>T</b></span></div>
        <div class="btn btn-logo"><span>Логотип <b>Y</b></span></div>
        <div class="btn btn-publish"><span>Сделать скриншот <b>U</b></span></div>
        <button onclick="toggle_store();">СХОРОНИТЬ</button>
      </div>
    </div>
    <div id="shader">
      <div class="valign">
        <div class="content">
          Подготовка карты
          <div class="progress"></div>
        </div>
      </div>
    </div>
    <div id="map"></div>
    <script>
    // move this to script.js
      $('.btn-poly').on('click',function(){ toggle_route(); });
      $('.btn-point').on('click',function(){ toggle_point(); });
      $('.btn-sticker').on('click',function(){ toggle_stickers(); });
      $('.btn-places').on('click',function(){ toggle_places(); });
      $('.btn-publish').on('click',function(){ toggle_shot(); });
      $('.btn-map').on('click',function(){ toggle_map(); });
      $('.btn-places-view').on('click', function(){ toggle_places(); })
      $('.btn-logo').on('click',function(){
        $('#sub_plank_select_logo').toggleClass('active');
      });
      $('.ctrl-panzoom').on('click',function(){ pan_zoom(); });
      $('.point_colors').on('click','div.point_colors > div',function(e){ console.log(e.target); })
      $('#store_name').on('keyup', function(e){
        update_store_url(e);
      });
      if(parseInt($(window).width()) < 600){
        $('#logo_composer').hide();
      }
    </script>
</body>
