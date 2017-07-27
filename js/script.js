/* hey, ho, let's go!

    Доки редактора:
    http://leaflet.github.io/Leaflet.Editable/doc/api.html

    Событие по завершению перетягивания ручки:
    map.editTools.addEventListener('editable:vertex:dragend', function () { console.log('drageeeeeeed!'); });

*/


/*jslint browser: true */

/*global L, $, jQuery, alert, middle_latlng, findDistance,console */

var map, poly, point_btn, map_layer, mode, map_layer, is_dragged, 
    dgis, current_logo, current_zoom, can_i_store = false, 
    can_i_edit = false, can_i_load=true, previous_store_name, engaged_by_shift = false,
// В этой штуке мы храним точки и выноски, их связки и всё такое
    point_array = {
        points: L.layerGroup(),
        vectors: L.layerGroup(),
        handles: L.layerGroup(),
        //vector_array: {},
        //points_array: {},
        pairs: {},
        point_to_id: {},
        id_to_point: {},
        savedata: {}
    },
    logos = {
        'default': ['Без логотипа', '/misc/nologo.png?ww', 'bottom-right'],
        'nvs': ['НВС', '/misc/lgo.png', 'bottom-right'],  
        'pinmix': ['Пин-Микс', '/misc/pin-mix.png', 'top-right'],
        'jolly': ['Пин-Микс + JW', '/misc/jw.png', 'top-right'],
        'pedals' : ['Усталые Педальки', '/misc/pedals.png',  'bottom-right'], 
        'rider': ['Райдер', '/misc/rider.png', 'bottom-right'],
        'rider_evening': ['Вечерние городские', '/misc/rider_evening.png', 'top-right'],
        'fas': ['Алкоспорт', '/misc/fas.png', 'bottom-right'],
    },
    points = L.layerGroup(),
    km_marks = L.layerGroup(),
    pnt_id = 0,
    store = false,
    force_stop = false,
    mode = "none",
    current_map_style = 'default',
    // эти нужны для отмены
    Z = 90, redo_latlng, redoBuffer = [],
    // Это для загрузки тайлов
    tiles = {'raw': [], 'loaded': []}, 
    tile_max_iterations = 400, 
    tile_max_flows = 12, 
    tile_iteration = 0, 
    tile_iterator, 
    original_bounds, 
    original_shift,

    // Стили карт
    map_list = {
        'watercolor': 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        'darq': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'default': 'https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1',
        'osm': 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'hot': 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        'blank': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'sat': 'http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        'ymap': 'https://vec03.maps.yandex.net/tiles?l=map&v=17.04.16-0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
        'ysat': 'https://sat02.maps.yandex.net/tiles?l=sat&v=3.330.0&x={x}&y={y}&z={z}&lang=ru_RU'
    },

    // Стикеры
    stickers = {
        'objects': {},
        'layers': L.layerGroup(),
        'savedata': {},
        'layer_to_object': {},
        'src': [
            {off: 5, title: 'Александр 3', title_long: 'Парк Городское Начало', latlng: [55.01275, 82.92368]},
            {off: 9, title: 'пл.Калинина', title_long: "пл.Калинина", latlng: [55.06019, 82.91316]},
            {off: 4, title: 'Мост', title_long: 'Мост', latlng: [55.00511, 82.93073]},
            {off: 7, title: 'Икея', title_long: "Парковка ТЦ Мега", latlng: [54.96494, 82.93138]},
            {off: 8, title: 'Бугринка', title_long: "Та самая коса\n(культовое место Усталых Педалек)", latlng: [54.97626, 82.95703]},
            {off: 10, title: 'ГПНТБ', title_long: "ГПНТБ", latlng: [55.01665, 82.94629]}, // второй ряд
            {off: 18, title: 'Оперный', title_long: "Оперный театр", latlng: [55.03027, 82.92292]},
            {off: 1, title: 'Лес', title_long: 'Берёзовая роща', latlng: [55.04572, 82.95]}, // первый ряд
            {off: 19, title: 'Пусто', title_long: "Пока что пусто 1"},
            {off: 20, title: 'Пусто', title_long: "Пока что пусто 2"}, // третий ряд
            
            {off: 2, title: 'Трасса', title_long: 'Дорога'},
            {off: 3, title: 'Курочка', title_long: 'Курочка'},
            {off: 6, title: 'Палатка', title_long: 'Палаточный лагерь'},
            {off: 11, title: 'Фастфуд', title_long: "Двухколёсное ожирение"},
            {off: 12, title: 'Пивко', title_long: "В Питере - пить!"},
            {off: 13, title: 'Шаварма', title_long: "Вкусная шаурма"},
            {off: 14, title: 'Камни', title_long: "Кааааммммуушшшки"},
            {off: 15, title: 'Болото', title_long: "Пошла ты,\nтрясина грёбаная!"},
            {off: 16, title: 'Роджер', title_long: "Может не надо?"},
            {off: 17, title: 'Какашка', title_long: "Нехорошее место"},
            
            {off: 21, title: 'Старт', title_long: "Старт здесь"},
            {off: 22, title: '1', title_long: "Первая точка"},
            {off: 23, title: '2', title_long: "Вторая точка"},
            {off: 24, title: '3', title_long: "Третья точка"},
            {off: 25, title: '4', title_long: "Четвёртая точка"},
            {off: 26, title: '5', title_long: "Пятая точка"},
            {off: 27, title: '7', title_long: "Шестая точка"},
            {off: 28, title: 'Финиш', title_long: "Финиш здесь"},
            {off: 29, title: 'Осторожно!', title_long: "Осторожно!"},
            {off: 30, title: 'Вопрос', title_long: "Что тут?"}
        ]
    },
    sticker_style,
    active_sticker,
    sticker_id = 0,

    // Роутер 
    router = {A: null, B:null, object: null, coordinates: null},

    // Сохранение
    phrases = [ 'Карта! Твоё время пришло!','Она живая! Живаааяяя!','Я сотворил монстра!','Время явить тебя миру!',
                'Май карта из рэди!', 'Это было легко!', 'Вот она, только руку протяни', 'Ого! Время публиковать!',
                'Это должны видеть все!', 'Итак, вот оно. Публикация.', 'Поздравляем. Вот и оно.','Эта карта прекрасна!',
                'Вперёд, Могучие Рэйнджеры!'],

    // Всё, что нужно для oauth
    oauth_window,

    // для чата
    last_message, chat_hold = false, chat_timer;

function test_get_tiles(){
    var w  = $('#map').width(),h = $('#map').height(),
        sw = latlng_to_tile(map.getBounds()._southWest),
        ne = latlng_to_tile(map.getBounds()._northEast)
        zsw= tile_to_latlng(sw),
        zne= tile_to_latlng(ne),
        rsw=map.latLngToContainerPoint(zsw);
        msw=map.latLngToContainerPoint(map.getBounds()._southWest);
        //console.log({x: rsw.x-msw.x, y: h+rsw.y-msw.y, orig_x: sw.x, orig_y: sw.y})
        //console.log('going from '+sw.x+','+sw.y+' to '+ne.x+','+ne.y+' shift '+(rsw.x-msw.x)+','+(h+rsw.y-msw.y));
        //console.log('original shift: '+map.latLngToContainerPoint(original_shift))
        test_fetch_tiles({
            min_x:  sw.x,
            min_y:  ne.y,
            max_x:  ne.x,
            max_y:  sw.y,
            sh_x: (rsw.x-msw.x),
            sh_y: (h+rsw.y-msw.y),
            size:   256,
            width:  w,
            height: h,
            zoom: map.getZoom()
        });
}

function test_fetch_tiles(inp){
    $.get("fetcher.php",
         inp,
         function(data){
            window.open(data.image);
            },
          'json');
}
function latlng_to_tile(latlng) {
    var zoom = map.getZoom(),
        xtile = parseInt(Math.floor( (latlng.lng + 180) / 360 * (1<<zoom) ));
        ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(latlng.lat * Math.PI / 180) + 1 / Math.cos(latlng.lat * Math.PI / 180)) / Math.PI) / 2 * (1<<zoom) ));
    return {x: xtile, y: ytile, z: zoom};
}

function tile_to_latlng(point){
    var z   = map.getZoom();
        lon = (point.x/Math.pow(2,z)*360-180),
        n   = Math.PI-2*Math.PI*point.y/Math.pow(2,z),
        lat = (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
    return {lat: lat, lng: lon};
}
// dev area

function set_sticker(obj) {
    'use strict';
    
    //var current_sticker = stickers.src[obj.data('sticker')];
    var current_sticker = stickers.src[obj.data('sticker')];
    sticker_style = obj.data('sticker');
    
    if (typeof (current_sticker.latlng) === 'undefined' || typeof (current_sticker.active) !== 'undefined') {
        toggle_none();
        mode = 'sticker';   
        $('#map').addClass('cross');
    } else {
        add_sticker(current_sticker.latlng);
        current_sticker.active = true;
        //map.setView(current_sticker.latlng,15);
        map.setView(current_sticker.latlng, map.getZoom(), {"animate": true,"pan": {"duration": 0.5}});
    }
    //console.log(sticker_style);
}

function prepare_stickers() {
    'use strict';
    var obj = $('#sub_plank_stickers').find('.sub_plank_sticker_list'),i;
    
    for (i=stickers.src.length-1;i>=0;i=i-1) {
        obj.prepend('<div class="sticker_thumb" data-sticker="' + i + '"><div style="background-position: -' + parseInt(stickers.src[i].off * 48) + 'px 0px;"></div></div>');
    };
    $('.sticker_thumb').on('click', function () { set_sticker($(this)) })
}

$(document).on('ready', function () {
    //bridge_layer();
    'use strict';
    //map.on('click', function (e) {
        //e.cancel();
        //console.log(e.latlng);
    //});

    //test_sticker();
});

function sticker_label_update(id){
    // Иногда мы вызываем функцию по event, а иногда -- по ид стикера.
    if (typeof (id) !== 'number' ){
        id = $(id.target).parent().parent().data('sticker');
    }
    
    // Обновляет текст в баллуне стикера
    
    var text = $('#sticker_' + id).find('.sticker_text'),
        label = text.find('.sticker_label'),
        input = text.find('textarea');
        
    /*
    if( typeof(e) !== 'undefined' && e.type === 'keyup' && e.keyCode === 27 ){
        // Блюрим по эскейпу
        input.blur();
    }  
    */
    label.text( input.val() + '--' );
    // И ещё выравниваем по высоте
    text.css('top', -1 * parseInt( text.height())/2 );
    if (typeof(stickers.savedata[id]) !== 'undefined') {
        stickers.savedata[id].text = input.val();
    }
    local_store_data();
}

function sticker_drag_label(e) {
    'use strict';
    //L.DomEvent.stop(e);
    var rad = 50, // Радиус вращения?
        posx = e.pageX-active_sticker.pos.x,    // <-- Позиции курсора относительно
        posy = e.pageY-active_sticker.pos.y,    // нулевой точки маркера,
        ang = Math.atan2(posy, posx),           // <-- наклон этой линии
        x=Math.cos(ang)*rad-30,                 // <-- Новые позиции всего контейнера
        y=Math.sin(ang)*rad-30;                 // относительно самого marker
        
    $(active_sticker.container).css('left',6+x-parseInt(active_sticker.ctrl.css('left'))).css('top',6+y-parseInt(active_sticker.ctrl.css('top')));
    // Поворачиваем язычок стикера
    active_sticker.gap.css('transform','rotate(' + (parseFloat(ang) + 2.35619) + 'rad)');  
    active_sticker.ang=ang;
    
    if (x < -50 && !active_sticker.container.hasClass('invert')) {
        active_sticker.container.addClass('invert');
    }else if (x > -10 && active_sticker.container.hasClass('invert')){
        active_sticker.container.removeClass('invert');
    }
}

function drop_sticker(obj){
    if(can_i_edit){
        var sticker_id = obj.parent().parent().data('sticker'),
            styled_in = obj.parent().parent().data('style');
        stickers.objects[sticker_id].remove();
        delete stickers.savedata[sticker_id];
        local_store_data();
        if (typeof(stickers.src[styled_in].active) !== 'undefined') {
            delete stickers.src[styled_in].active;
        }
    }
}

function add_sticker(latlng,text_over,angle_over){
    //console.log('style ->'+(stickers.src[sticker_style].off * 72));
    // Добавляет точку
    //latlng = {lat: 54.96943602216546, lng: 82.95441627502443};
    //text = "Ох ёпт, Боря\nне этого ли мы ждали?";
    var text = text_over || stickers.src[sticker_style].title_long;
        over =  '<div class="sticker_labeled' + (can_i_edit ? ' sticker_editable' : '') + '" id="sticker_' + sticker_id + '" data-sticker="'
                + sticker_id + '" data-style="' + sticker_style + '">' +
                '<div class="sticker_pos"></div>' +
                '<div class="sticker_image" style="background-position: -' + (stickers.src[sticker_style].off * 72) + 'px 0px;"></div><div class="sticker_gap"></div>' +
                '<div class="sticker_text"><div class="sticker_del"></div><div class="sticker_label"></div>' +
                '<textarea>' + text + '</textarea>' +
                '</div></div>',
        myIcon = L.divIcon({ html: over, className: 'sticker' }),
        m = L.marker(latlng, { icon: myIcon });
    stickers.layers.addLayer(m);
    if(can_i_edit){
        m.enableEdit();
    }
    if(angle_over){
        //console.log('over'+angle_over);
        var rad = 50,
        x = Math.cos(angle_over)*rad-30,                 // <-- Новые позиции всего контейнера
        y = Math.sin(angle_over)*rad-30,
        ctrl = $('#sticker_' + sticker_id).find('.sticker_pos');
        //console.log(x,y);
        //.css('left',x).css('top',-y);
        $('#sticker_' + sticker_id).css('left',6+x-parseInt(ctrl.css('left'))).css('top',6+y-parseInt(ctrl.css('top')));
        $('#sticker_' + sticker_id).find('.sticker_gap').css('transform','rotate('+(parseFloat(angle_over) + 2.35619)+'rad)');
        if (x < -50 && !$('#sticker_' + sticker_id).hasClass('invert')) {
            $('#sticker_' + sticker_id).addClass('invert');
        }else if (x > -10 && $('#sticker_' + sticker_id).hasClass('invert')){
            $('#sticker_' + sticker_id).removeClass('invert');
        }
    }
    // Биндим обновление label по обновлению textarea для автоматического изменения размера баллуна по изменению textarea
    //var input = ;
    $('#sticker_' + sticker_id).find('textarea').on('keydown keyup',function (e){
        sticker_label_update(e);
    })
    $('#sticker_' + sticker_id).find('.sticker_del').on('click',function(){
        drop_sticker($(this));
    })
    sticker_label_update(sticker_id);
    stickers.objects[sticker_id] = m;
    
    stickers.layer_to_object[m._leaflet_id] = sticker_id;
    
    //map.setView(latlng, 16);
    m.on('editable:drag',function(e){
        /*  Этот забавный хак для того, чтобы при вращении стикера он сам не перетаскивался
            По странному стечению обстоятельств, выключение драга на карте и маркере с
            последнующим включением заставляют нас сразу тащить маркер. А этот метод -- нет
        */
        if(active_sticker && active_sticker.object && active_sticker.latlng){
            active_sticker.object.setLatLng(active_sticker.latlng); 
            stickers.savedata[stickers.layer_to_object[e.layer._leaflet_id]].latlng = active_sticker.latlng;
        } else {
            stickers.savedata[stickers.layer_to_object[e.layer._leaflet_id]].latlng = e.latlng;
        }
        // Кароч, при драге стикера мы не можем узнать его id
        // нужно вводить layer_id к object_id, ну и всё такое. Или брать из ивента layer_id, получать обьект, искать его в stickers.objects, что чуточку разумнее
        //stickers.savedata[active_sticker.id].latlng = active_sticker.latlng;
        
    });
    m.on('editable:dragend', function (e) {
        local_store_data();
    });
    
    $('.sticker_pos').on('mousedown',function(e){
        active_sticker = {};
        active_sticker.id = $(e.target).parent().data('sticker'),
        active_sticker.object = stickers.objects[active_sticker.id],                
        active_sticker.latlng = active_sticker.object.getLatLng(),
        active_sticker.pos = map.latLngToContainerPoint(active_sticker.latlng);
        active_sticker.container = $('#sticker_' + active_sticker.id);
        active_sticker.ctrl = active_sticker.container.find('.sticker_pos'),
        active_sticker.gap = active_sticker.container.find('.sticker_gap'),
        active_sticker.ang;
        //console.log(active_sticker);
    });
    stickers.savedata[sticker_id]={'latlng': latlng, 'text': text, 'style': sticker_style, ang: (angle_over || -1.037952439175508), 'x': stickers.src[sticker_style].off*(72) };
    local_store_data();
    sticker_id += 1;
    if( typeof(stickers.src[sticker_style].latlng) !== 'undefined' ){
        sticker_style = null;
    }
    if(can_i_store && !engaged_by_shift){
        toggle_none();
        toggle_stickers();
    }
    engaged_by_shift = false;
}

$(document).on('mousemove', function (e) {
    'use strict';
    if (active_sticker && can_i_edit) {
        sticker_drag_label(e)
    }
});

$(document).on('mouseup', function (e) {
    'use strict';
    if (active_sticker) {
        stickers.savedata[active_sticker.id].ang = active_sticker.ang;
        active_sticker = null;
        local_store_data();
    }
});

function bridge_layer(){
    //var latlng = {lat: 54.972632943832994, lng: 82.95600414276124};
    //map.setView({lat: 54.96943602216546, lng: 82.95441627502443},16);
    zzz=L.imageOverlay('/misc/stickers/bridge_layer.svg', [{lat: 54.97308784358926, lng: 82.95710921287538},{lat: 54.976259054848086, lng: 82.96591758728029}]).addTo(map);
}

if (typeof (localStorage) !== "undefined") { store = true; } // проверим, есть ли локальное хранилище

function get_route_array() {
    'use strict';
    return poly.toGeoJSON().geometry.coordinates;
}
function update_overlays() {
    'use strict';
    km_marks.clearLayers();
    var route = get_route_array(),
        latlngs = poly.getLatLngs(),
        start_latlng,
        end_latlng,
        segs,
        i,
        rotation,
        middle,
        distance;
    if (route.length > 0) {
        start_latlng    = route[0];
        end_latlng      = route[route.length - 1];
        km_marks.addLayer(L.marker([start_latlng[1], start_latlng[0]], { icon: L.divIcon({ html: '<div style="transform: scale(' + (map.getZoom() / 13) + ');"><div class="arr_start"></div></div>', className: 'arr_mark' }) }));
        if (route.length > 1) {
            //console.log('youre here');
            segs = L.GeometryUtil.accumulatedLengths(poly);
            // end mark
            km_marks.addLayer(L.marker([end_latlng[1], end_latlng[0]], { icon: L.divIcon({ html: Math.round(segs[segs.length - 1] / 1000) + '&nbsp;км', className: 'end_mark' }) }));
            //and also length to panel:
            $('#text_route_length').text(Math.round(segs[segs.length - 1] / 1000) + 'км');
            //console.log('get set go');
            // arrows
            //console.log(segs);
            for (i = 1; i < latlngs.length; i += 1) {
                rotation = L.GeometryUtil.bearing(latlngs[i - 1], latlngs[i]);
                middle = middle_latlng(latlngs[i], latlngs[i - 1]);
                distance = findDistance(latlngs[i - 1].lat, latlngs[i - 1].lng, latlngs[i].lat, latlngs[i].lng);

                if (distance > 1) {
                    km_marks.addLayer(L.marker([middle.lat, middle.lng], { icon: L.divIcon({ html: '<div style="transform: scale(' + (map.getZoom() / 13) + ');"><img src="/misc/arr.png" style="transform: translateX(-4px) translateY(-4px) rotate(' + (270 + rotation) + 'deg);"></div>', className: 'arr_mark' }) }));
                }
                
            }
        } else {
            $('#text_route_length').text('0 км');
        }
    }
    local_store_data();
}

function local_store_data(){
    if (store && can_i_store) {
        var latlngs = poly.getLatLngs(),
            route = [],
            points_to_save = [],
            stickers_to_save = [];
        $.each(latlngs, function (a,b) { route.push({lat: b.lat, lng: b.lng}); }); 
        $.each(point_array.savedata, function (a,b) { points_to_save.push(b); });
        $.each(stickers.savedata, function (a,b) { stickers_to_save.push(b); });
        //console.log(JSON.stringify(route))
        localStorage.setItem("route", JSON.stringify(route));
        localStorage.setItem("points", JSON.stringify(points_to_save) ); 
        localStorage.setItem("stickers", JSON.stringify(stickers_to_save) );  
        localStorage.setItem("map_style", current_map_style);
        localStorage.setItem("logo", current_logo);
    }
}

function remote_store_data(force){
    if (true) {
        $('#sub_plank_remote_store').removeClass('success error renaming overwriting').addClass('storing');
        var userdata = get_token(),
            latlngs = poly.getLatLngs(),
            route = [],
            points_to_save = [],
            stickers_to_save = [];
        $.each(latlngs, function (a,b) { route.push({lat: b.lat, lng: b.lng}); }); 
        $.each(point_array.savedata, function (a,b) { points_to_save.push(b); });
        //$.each(stickers.savedata, function (a,b) {  });
        $.each(stickers.savedata, function (a,b) { 

            var c = {ang: b.ang, latlng: {}, style: b.style, text: b.text, x: b.x};
            stickers_to_save.push(c);
            if(Array.isArray(b.latlng)){
                c.latlng = {lat: b.latlng[0], lng: b.latlng[1]};
            }else{
                c.latlng = {lat: b.latlng.lat, lng: b.latlng.lng};
            }
            //console.log('--', );
        });
        //console.log('stickerzzz');
        //console.log(stickers_to_save);
        //return;
        $.post('/engine/auth.php',
            {   'action': 'store', 
                'logo': current_logo,
                'route': route, 
                'points': points_to_save, 
                'stickers': stickers_to_save, 
                'id': userdata.id,
                'token': userdata.token,
                'name': $('#store_name').val(),
                'force': force,
                'map_style': current_map_style},
            function(data){
                //console.log(data);
                if(data.success){
                    if(typeof(data.description) !== 'undefined' && data.description){
                        $('#store_status').text(data.description);
                    }
                    $('#sub_plank_remote_store').removeClass('error recheck storing renaming overwriting').addClass('success');
                    $('#store_name').val(data.name);
                    update_store_url();
                    check_token();
                }else{
                    //console.log('panic!');
                    $('#sub_plank_remote_store').removeClass('error recheck success storing renaming overwriting');
                    if(typeof(data.description) !== 'undefined' && data.description){
                        $('#store_status').text(data.description);
                    }
                    if(typeof(data.mode) !== 'undefined' && data.mode){
                        $('#sub_plank_remote_store').addClass('error '+data.mode);
                        if(data.mode === 'recheck'){
                            check_token();
                        }
                        $('#store_name').focus();
                    }
                }
            },'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'remote_store_data');
                    $('#store_status').text('Произошла ошибка, и мы записали её в журнал. Пожалуйста, свяжитесь с нами для её исправления.');
                    $('#sub_plank_remote_store').removeClass('storing success renaming overwriting').addClass('error');
                }
            );
    }
}

function report_xhr_error(a,b){
    $.get('/engine/report_error.php',
    {   'readyState': a.readyState,
        'responseText': a.responseText,
        'status': a.status,
        'statusText': a.statusText,
        'url': '/engine/auth.php',
        'function': b
    },
    'json');
}
function gen_guest_token(){
    $.get('/engine/auth.php',{action:'gen_guest_token'},
        function(data){
            set_token(data.id,data.token,data.role);
            //console.log('puuz: ',data)
            if($('#store_name').val().length === 0 && typeof(data.random_url) !== 'undefined'){
                $('#store_name').val(data.random_url);
                update_store_url();                
            }
            check_token();
            //console.log(data.random_url);
        }, 'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'gen_guest_token');
                }
            );
}

function check_token(){

    //console.log('checking token');
    var userdata = get_token(),
        shown_routes;
    //$.get('engine/auth.php',{action:'check_token', 'id': userdata.id, 'token': userdata.token},'json');   
    if( typeof(userdata.id) === 'undefined' || !userdata.id || typeof(userdata.token) === 'undefined' || !userdata.token){
        gen_guest_token();
    }else{
        $.get('/engine/auth.php',{action:'check_token', 'id': userdata.id, 'token': userdata.token, 'last_message': get_cookie('last_message')},
            function(data){
                //console.log(data);
                if(!data.success){
                    gen_guest_token();
                }else{

                    if($('#store_name').val().length===0 && typeof(data.random_url) !== 'undefined'){
                        $('#store_name').val(data.random_url);
                        update_store_url();
                    }
                    if(data.role == 'guest'){
                        $('#user_login_logged').hide();
                        $('#user_login_unauthorized').show();
                    }else{
                        if(data.userdata.photo){
                            $('.field_user_avatar').css('background-image', 'url(\'' + data.userdata.photo + '\')');
                        }
                        $('.field_user_id').html('<span class="fa fa-vk"></span> <b>' + userdata.id.replace('vk:','') + '</b>');
                        $('.field_user_name').text(data.userdata.name);
                        $('#user_login_unauthorized').hide();
                        $('#user_login_logged').show();
                        
                    }
                    
                    
                    // Заполняем менюшку со списком роутов
                    $('#user_route_list').html('');
                    $('#menu_user_route_count').hide();
                    //console.log();
                    if(data.routes_count > 0){

                        $('#menu_user_routes_item').addClass('not_empty');

                        $('#menu_user_route_count').show().text(data.routes_count);
                        
                        $('#editor_left_slide').addClass('not_empty');

                        $.each(data.routes,function(a,b){
                            $('#user_route_list').append('<div class="menu-item route_item" data-route="'+b.id+'"><a></a><div class="fa fa-trash-o route_list_delete"></div><i class="fa fa-file"></i><b>'+b.id+'</b><br><small class="gray">'+b.created+'</small></div>');
                        });

                        $('.route_list_delete').bind('click', function(e){

                            var parent = $(e.target).parent();

                            if(!parent.hasClass('confirm')){
                                parent.addClass('confirm');
                            }else{
                                remote_drop_route(parent.data('route'));
                                parent.remove();
                                //console.log(parent.data('route'));
                            }
                            
                        });
                        $('.route_item a').bind('click', function(e){
                            var parent = $(e.target).parent();                            
                            editor_load(parent.data('route'));
                        })

                        if(shown_routes < $('#user_route_list .menu-item').length || data.routes.length < data.routes_count){
                            $('#user_route_more').show();
                        }
                    }else{
                        $('#menu_user_route_count').text('');
                        $('#editor_left_slide').removeClass('not_empty');
                    }

                    if(data.new_messages>0){
                        $('#menu_user_chat_count').text(data.new_messages).addClass('active');
                    }
                    //console.log('token ok');
                }
            }, 'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'check_token');
                }
            );
    }
}

function set_token(id,token,role){
    if(store){
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_token", token );
        localStorage.setItem("user_role", role );
    }else{
        var expire = new Date(new Date().getTime() + 38600 * 365000);
        document.cookie = 'user_id='+id+'; path=/; expires='+expire.toUTCString();
        document.cookie = 'user_token='+token+'; path=/; expires='+expire.toUTCString();
        document.cookie = 'user_role='+role+'; path=/; expires='+expire.toUTCString();
    }
    //prepare_user_menu();
}

function get_token(){
    var id, token;
    if(store){
        id = localStorage.getItem("user_id");
        token = localStorage.getItem("user_token");
        role = localStorage.getItem("user_role");
    }else{
        id = get_cookie("user_id");
        token = get_cookie("user_token");
        role = get_cookie("user_role");
    }
    return ({'id': id, 'token': token, 'role': role});
}

function get_cookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/ig, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function set_cookie(name,value){
    var expire = new Date(new Date().getTime() + 38600 * 365000);
    document.cookie = name+'='+value+'; path=/; expires='+expire.toUTCString();
}

function redraw_map() {
    'use strict';
  // Обновляет карту. Нужно при печати карты, т.к. при этом не всей тайлы перерисовываются
    var originalBounds = {'center': map.getCenter(), 'zoom': map.getZoom(), 'poly': poly.getLatLngs(), 'km_marks': km_marks};
    map.setZoom(originalBounds.zoom).panTo(originalBounds.center);

    map_layer.remove();
    map_layer = L.tileLayer(map_list[current_map_style], {
        attribution: 'Независимое Велосообщество',
        maxNativeZoom: 18,
        maxZoom: 18
    }).addTo(map).redraw();
}

function set_logo(preset) {
    'use strict';
    if (!logos[preset]) { preset = 'default'; }
    $('.logo_select_list').html(null);
    $.each(logos, function (a, b) {
        $('.logo_select_list').append('<div' + (a === preset ? ' class="active"' : '') + ' onclick="set_logo(\'' + a + '\')">' + b[0] + '</div>');
    });
    current_logo = preset;
    $('#logo_container').html('<img src="' + logos[preset][1] + '">');
    $('#logo_composer').removeClass('top-right top-left bottom-right bottom-left active').addClass(logos[preset][2]).css('background-image','url('+logos[preset][1]+')');
    ///$('#logo_composer').removeClass('active');
    if(mode=='select_logo'){

    }else{

    }
    //$('.logo_select_preview').css('background-image','url('+logos[preset][1]+')');
    $('#sub_plank_select_logo').removeClass('active');
    //$('#sub_plank_select_logo').addClass('active');
    set_crop_logo(preset);
    update_overlays();
}

function toggle_route_drop(state) {
    'use strict';
    // показывает диалог с подтверждением удаления маршрута
    $('.sub_plank').removeClass('active');
    $('#sub_plank_route_drop').addClass('active');
    mode = 'route_drop_dialog';
    $('#map').removeClass('cross');
}

function toggle_shot(){
    if (mode !== 'shot_dialog') {
        toggle_none();
        $('#sub_plank_shot_size').addClass('active');
        btn_toggle('.btn-publish');
        mode = 'shot_dialog';
    } else {
        make_a_shot();
    }
}
function reverse_route() {
    'use strict';
  // Тупо переворачивает маршрут
    if (typeof (poly) !== 'undefined' && poly) {
        var lats = poly.getLatLngs();
        lats.reverse();
        poly.setLatLngs(lats);
        update_overlays();
    }
}

function btn_toggle(id) {
    'use strict';
    $('#plank .btn').removeClass('active');
    if (typeof (id) !== 'undefined') {
        $(id).addClass('active');
    }
}

function route_state(state) {
    'use strict';

    // Жёстко включает или выключает режим прокладывания маршрута
    if (state === 'active') {
        //console.log('poly activated');
        clear_router();
        btn_toggle('.btn-poly');
        $('.sub_plank').removeClass('active');
        $('#sub_plank_route').addClass('active');
        if (!poly) {
            // Если на холсте нет полилинии
            poly = map.editTools.startPolyline(); // Сразу рисуем полилинию.
            poly.setStyle({color: '#ff3333', weight: '5'});
        }
        poly.editor.enable();
        poly.editor.continueForward();
        force_stop = false;
        mode = 'route';
    } else {
        $('.sub_plank').removeClass('active');
        force_stop = true;
        poly.editor.endDrawing();
        poly.editor.disable();
        force_stop = false;
        btn_toggle();
        mode = 'none';
    }
}

function toggle_route(state) {
    'use strict';
    // Переключатель рисования маршрута
    if (mode !== 'route') {
        route_state('active');
    } else {
        route_state('off');
    }
}

function drop_route() {
    'use strict';
    clear_router();
  // удаляет маршрут
    if (poly) {
        poly.remove();
        poly = map.editTools.startPolyline(); // начинаем новую полилинию
        poly.setStyle({color: '#ff3333', weight: '5'});
        poly.editor.disable();
        
        if(mode==='route'){
            toggle_none();
            toggle_route();
        }else{
            toggle_none();
        }
        //mode = 'none';
        toggle_none();
        $('#text_route_length').text('0 км');
        update_overlays();
    }
}

function drop_stickers(){
    $.each(stickers.objects, function(a,b){ 
        //console.log(b._leaflet_id);
        delete stickers.layer_to_object[b._leaflet_id];
        delete stickers.objects[a];
        delete stickers.savedata[a]
        map.removeLayer(b); 
    });
}

function drop_points(){
    point_array.points.clearLayers();
    point_array.vectors.clearLayers();
    $.each(point_array.pairs, function(a,b){ delete point_array.pairs[a]; });
    $.each(point_array.point_to_id, function(a,b){ delete point_array.point_to_id[a]; });
    $.each(point_array.savedata, function(a,b){ delete point_array.savedata[a]; });
}

function point_state(state) {
    'use strict';
    if (state === 'active') {
        route_state('off');
        btn_toggle('.btn-point');
        mode = 'point';
        $('#map').addClass('cross');
    } else {
        btn_toggle();
        mode = 'none';
    }
}

function toggle_stickers(){
    'use strict';
    //clear_router();
    $('.sub_plank').removeClass('active');
    if (mode === 'sticker') {
        $('#sub_plank_stickers').addClass('active');
        route_state('off');
        btn_toggle('.btn-sticker');
        //sticker_state('off');
    } else {
        //point_state('active');
        if (mode !== 'sticker_dialog'){
            mode = 'sticker_dialog';
            btn_toggle('.btn-sticker');
            $('#sub_plank_stickers').addClass('active');
        } else {
            toggle_none();
        }
    }
}

function toggle_store(){
    $('.sub_plank').removeClass('active');
    if (mode !== 'store_dialog') {
        toggle_none();
        mode = 'store_dialog';
        $('#sub_plank_remote_store').removeClass('success recheck storing renaming overwriting');
        $('#sub_plank_remote_store h2').text(phrases[Math.floor(Math.random() * phrases.length) ])
        $('#sub_plank_remote_store').addClass('active');
        $('#store_name').focus();
        $('#store_status').text('Вы можете задать своё название маршрута, а значит и адрес, по которому он будет доступен.');
    }else{
        toggle_none();
        console.log(mode);
    }
}


function toggle_point() {
    'use strict';
    if (mode !== 'point') {
        point_state('active');
    } else {
        point_state('off');
    }
}

function toggle_none() {
    'use strict';
  // Выключить все режимы рисования
    clearTimeout(tile_iterator); // остановить подгрузку тайлов, если есть
    mode = "none";
    point_state('off');
    route_state('off');
    //clear_router();
    $('.sub_plank').removeClass('active');
    $('#crop_image').cropper('destroy');
    $('.crop_canvas').removeClass('active');
    $('#image_cropper').hide();
    $('#logo_composer').removeClass('active');
    $('#map').removeClass('cross');
}

function toggle_map() {
    'use strict';
    // Показывает диалог с выбором типа карты
    if (mode === 'map') {
        $('.btn').removeClass('active');
        toggle_none();
    } else {
        //console.log(mode);
        point_state('off');
        route_state('off');
        $('.sub_plank').removeClass('active');
        $('#sub_plank_map').addClass('active');
        $('.btn').removeClass('active');
        $('.btn-map').addClass('active');
        mode = 'map';

    }
}
function toggle_crop() {
    'use strict';
    // Показывает диалог с выбором типа карты
    if (mode === 'crop') {
        toggle_none();
    } else {
        $('.sub_plank').removeClass('active');
        $('#sub_plank_crop').addClass('active');
        mode = 'crop';
    }
}

function key_up(e){
    //console.log('up!',e);
    if($('#sub_plank_stickers').hasClass('preview')){
        $('#sub_plank_stickers').removeClass('preview active');
    }else{
        //console.log('wut!');
    }
}

function key_down(e) {
    'use strict';
        var fix;
        //console.log(e.keyCode);
    if(can_i_edit){
        if (( $(e.target).is('input') || $(e.target).is('textarea') ) && (e.keyCode !== 27 && e.keyCode !== 13)) { return; }
        if(e.shiftKey && mode == 'none'){
            $('#sub_plank_stickers').addClass('preview active');
        }
        if (e.keyCode === 88) {
            // X делает redo
            if (map.editTools._drawingEditor === false) {
                return;
            }
            if (redoBuffer.length) { map.editTools._drawingEditor.push(redoBuffer.pop()); }
            update_overlays(e);
        } else if (e.keyCode === 27 || e.keyCode === 13) {
            // esc или enter либо блюрят инпут, либо выходят из всех режимов
            if ($(e.target).is('input') || $(e.target).is('textarea') ) {
                if(e.keyCode!==13 || !$(e.target).is('textarea')){
                    $(e.target).blur();
                }
            } else {
                if(mode=='routing' && router.A && router.B && e.keyCode === 13){
                    apply_route();
                }else{
                    $('#editor_left_slide').removeClass('active');
                    $('#chat_left_slide').removeClass('active');
                    $('#store_helper').hide();
                    clear_router();
                    toggle_none();   // esc
                }
            }
        } else if (e.keyCode === 46 && !( $(e.target).is('input') || $(e.target).is('textarea') )) {
        // del спрашивает удалять ли маршрут. Второе нажатие удаляет.
            if (mode === 'route_drop_dialog') {
                drop_route();
                drop_stickers();
                drop_points();
                clear_router();
                update_overlays();
            } else {
                toggle_route_drop();
            }
        } else if (e.keyCode === 90) {
        // Z делает отмену
            if (!map.editTools._drawingEditor) { return; }
            redo_latlng = map.editTools._drawingEditor.pop();
            if (redo_latlng){ redoBuffer.push(redo_latlng); }
            update_overlays(e);
        } else if (e.keyCode === 81) {
        // Q режим рисования маршрута
        toggle_routing();
        } else if (e.keyCode === 87) {
            // W
            route_state('active');
            
        } else if (e.keyCode === 69) {
            // E рисование точек
        point_state('active');
        } else if (e.keyCode === 82) {
        // R стикеры
        toggle_stickers();

        } else if (e.keyCode === 84) {
        // T выбор карты
        toggle_map();
        } else if (e.keyCode === 89){
            // Y - выбор лого
            $('#sub_plank_select_logo').toggleClass('active');
        } else if (e.keyCode === 85){
            // U - скриншот
            make_a_shot();
        } else if((e.keyCode <= 57 && e.keyCode >=49 || e.keyCode===48) && e.shiftKey) {
            //console.log(e.keyCode);
            if(e.keyCode===48){
                fix=39;
                //console.log(parseInt(e.keyCode)-fix);
            }else{
                //console.log(parseInt(e.keyCode)-fix);
                fix=49;
            }
            sticker_style = parseInt(e.keyCode)-fix;
            if(stickers.src[sticker_style].latlng){
                engaged_by_shift = true;
                map.setView(stickers.src[sticker_style].latlng, map.getZoom(), {"animate": true,"pan": {"duration": 0.5}});
                add_sticker(stickers.src[sticker_style].latlng);
                //map.setView(stickers.src[sticker_style].latlng);
                
            }
        } else {
        //console.log(e.keyCode);
        }
    }else{
        if (e.keyCode === 27) {
            $('#store_helper').hide();
        }
    }
}
function pan_zoom() {
  // Зуммирует карту до размера видимой области
  if (map && poly && typeof(poly.getBounds())!=='undefined') {
    map.fitBounds(poly.getBounds(), {padding: [10,10]})
  }  
}

function get_tile_placement(){
    var w  = $('#map').width(),h = $('#map').height(),
        sw = latlng_to_tile(map.getBounds()._southWest),
        ne = latlng_to_tile(map.getBounds()._northEast)
        zsw= tile_to_latlng(sw),
        zne= tile_to_latlng(ne),
        rsw=map.latLngToContainerPoint(zsw);
        msw=map.latLngToContainerPoint(map.getBounds()._southWest);
        //console.log({x: rsw.x-msw.x, y: h+rsw.y-msw.y, orig_x: sw.x, orig_y: sw.y})
        //console.log('going from '+sw.x+','+sw.y+' to '+ne.x+','+ne.y+' shift '+(rsw.x-msw.x)+','+(h+rsw.y-msw.y));
        //console.log('original shift: '+map.latLngToContainerPoint(original_shift))
        return {
            min_x:  sw.x,
            min_y:  ne.y,
            max_x:  ne.x,
            max_y:  sw.y,
            sh_x: (rsw.x-msw.x),
            sh_y: (h+rsw.y-msw.y),
            size:   256,
            width:  w,
            height: h,
            zoom: map.getZoom(),
            provider: current_map_style
        };
}

function test_it(){
    /*
    current_logo='nvs';
    $('#image_cropper').show(); 
    $('.crop_canvas').show();
    $('#crop_image').fadeIn();
    $('#crop_image').cropper({
      viewMode:3,zoomable:false,scalable:false,rotatable:false,
      ready:function () {

        $('#crop_image').cropper('setData',{"x":0,"y":0,"width":2000,"height":2000});
        $('#crop_image_canvas .cropper-crop-box').prepend('<div id="crop_image_logo"'+(typeof(logos[current_logo][2])!=='undefined'?' class="'+logos[current_logo][2]+'"':'')+'></div>');
        
        $('#crop_image_logo').after('<div id="logo_select_btn" onclick="$(this).toggleClass(\'active\');"><div id="logo_select_list"></div></div>');
        set_crop_logo(current_logo);
        toggle_crop(); 
          
      }});
    */
}

function set_crop_logo(preset){
    if (!logos[preset]) { preset = 'default'; }
    current_logo = preset;
    //console.log('set current logo '+current_log+' / '+preset)
    if(store){
        localStorage.setItem('logo',preset);
    }
    $('#logo_select_list').html(null);
    $.each(logos, function (a, b) {
        $('#logo_select_list').append('<div' + (a === current_logo ? ' class="active"' : '') + ' onclick="set_crop_logo(\'' + a + '\')">' + b[0] + '</div>');
    });
    //$('#crop_image_logo').css('background-image', 'url('+logos[current_logo][1]+')').css('transform', 'scale('+parseFloat(parseInt($('#crop_image_canvas').width())/1366)+')');
    $('#crop_image_logo').html('<img src="'+logos[current_logo][1]+'">');
    $('#crop_image_logo img').addClass(logos[current_logo][2]).css('transform', 'scale('+parseFloat(parseInt($('#crop_image_canvas').width())/$(window).width())+')')
}

function make_a_shot(callback) {
  // Делает скриншот страницы
  mode = 'prefetching';
  $('#sk-status').text('ЗАГРУЗКА');
  $('.sub_plank').removeClass('active');
  $('#sub_plank_shot').addClass('active');

  // Блокируем экран
  $('#image_cropper').show(); 
  // Обнуляем массив с тайлами.
  tiles = {'raw':[], 'loaded':0}
  // Заполняем raw списком тайлов. Загруженные будем помещать в loaded
  /*
  $.each($('.leaflet-tile-container img'), function (a,b) {
    if ($(b).attr('src')) tiles.raw.push({'src': $(b).attr('src'), 'transform':$(b).css('transform'), 'charged':null, 'loaded':false});
  });
  tile_iteration = 0;
  // Запуск переборщика
  image_iterator();
  */
  var tile_placement = get_tile_placement(),i,v;
    for(i=tile_placement.min_x;i<=tile_placement.max_x;i++){
        for(v=tile_placement.min_y;v<=tile_placement.max_y;v++){
            tiles.raw.push({ x: i, y: v, provider: tile_placement.provider, z: tile_placement.zoom, 'charged':null, 'loaded':false})
        }
    }
    //console.log(tiles.raw);
    //console.log('callaback is ', callback)
    image_prefetcher(callback);
}

function image_prefetcher(callback) {
    //console.log('prefetcher');
  // Подгружает все слайды из tiles, пока они не подгрузятся или число попыток не превысит tile_max_iterations

  $('#shot_status_text').html('Подгружаем тайлы ('+tiles.loaded+'/'+tiles.raw.length+')');
  
  $('#shot_status_bar span').stop().animate({'width':(tiles.loaded/tiles.raw.length)*85+'%'},150)
  current_flows = 0;
  for(i = 0;i<tiles.raw.length;i++) {
    // Перебираем все тайлы
    b = tiles.raw[i];
    if (current_flows < tile_max_flows && b.loaded === false) {
      // (1) если итак грузится много файлов, просто скипаем
      // (2) если файл уже загружен, скипаем
      if ((Date.now()-b.charged)>10000) {
        // Заново грузим файлы, которые висят дольше 10 секунд
        b.charged = Date.now();
        // Грузим!
        $.get('/engine/prefetch.php',
          {'url':b, 'index':i},
          function (data) {
            if (data.success) {
              c = tiles.raw[data.index];
              c.loaded = true;
              // Помещаем тайл в список загруженных
                //console.log('check!');
              tiles.loaded += 1;
            } else {
              // Скрипт предзагрузки вернул ошибку
              console.log(data.error);
            }
          }, 'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'image_prefetcher');
                }
            );;
      }
      current_flows++;
    }
  }
  // Ещё один проход. Надо проверить, не многовато ли их?
  tile_iteration++;

  // Все тайлы загружены или количество попыток превышено
  // Ничего страшного, если загружены не все. Скрипт склейки попробует сам их подгрузить
  // Так же у тайлов есть кэш. Уже загружавшиеся тайлы лежат в файловой системе

  if (tiles.raw.length <= tiles.loaded || tile_iteration >= tile_max_iterations) {
    image_composer(tiles.raw, callback);
    // Всё, делаем запрос к скрипту
    clearTimeout(tile_iterator);
  } else {
    tile_iterator = setTimeout(image_prefetcher,100);
  }
}

function image_composer(tiles, callback){
    $('#sk-status').text('ОТРИСОВКА');
    //tile_placement = get_tile_placement();
    mode = 'composing'; // Меняем режим

    $('#shot_status_text').html('Обработка на сервере'); 

    // Обработка длится менее 3 секунд, поэтому двигаем прогрессбар к финишу
    $('#shot_status_bar span').css('width', '85%').animate({'width':'97%'},3000);

    // Leaflet создаёт несколько tile-панелей с разным scale() между подгрузками тайлов. Нам нужна та, что со scale(1)
    active_tile_pan = null;
    // Ищем её перебором
    $.each($('.leaflet-tile-container'), function (x,y) {
      trans = $(y).css('transform');
      if (trans.match(/^matrix\(1\,/)) active_tile_pan = trans;
    });
    $.post('/engine/composer.php',
          { 'tiles':tiles.raw, // массив с плитками
            'path'  : new_prepare_route(), // массив с ломаными. ПОПРОБУЙ ПЕРЕДЕЛАТЬ С ПОМОЩЬЮ map.latLngToLayerPoint
            'points': new_prepare_dots(), // массив с точками и выносками. ПОПРОБУЙ ПЕРЕДЕЛАТЬ С ПОМОЩЬЮ map.latLngToLayerPoint
            'stickers': new_prepare_stickers(),
           'placement': get_tile_placement(),
            //'map_pan'   : $('.leaflet-map-pane').css('transform'), // смещение карты. На это смещение надо сдвигать ломаные
            //'tile_pan'   : active_tile_pan, // смещение панели с тайлами. На это смещение надо сдвигать тайлы
            'size' : [parseInt($('#map').width()),parseInt($('#map').height())], // размер экрана
          },
          function (data) {
            if (data.success && mode === 'composing') {
              //Отлично, работаем. Показываем панель обрезки
              $('#image_cropper .crop_canvas').addClass('active');
              $('#shot_status_text').html('Готово!');
              $('#shot_status_bar span').stop().css('width', '100%');
              $('#crop_image_canvas').css('height',$('.crop_pan').height());
              $('#crop_image_canvas').html('<img id="crop_image" src="" style="max-width:100%;max-height:100%;">');
              $('#crop_image').one('load', function () { 
                //console.log('loaded');
                

                // Почему-то в firefox скриншотилка работает только вот так
                setTimeout(function(){
                   $('#crop_image').show().css('opacity',1);
                   $('#crop_image').cropper({
                      viewMode:3,zoomable:false,scalable:false,rotatable:false,
                      ready:function () {

                        $('#crop_image').cropper('setData',{"x":0,"y":0,"width":2000,"height":2000});
                        //$('#crop_image_canvas .cropper-crop-box').prepend('<div onclick="$(\'#logo_select_btn\').toggleClass(\'active\');" id="crop_image_logo"'+(typeof(logos[current_logo][2])!=='undefined'?' class="'+logos[current_logo][2]+'"':'')+'></div>');
                        $('#crop_image_canvas .cropper-crop-box').prepend('<div onclick="$(\'#logo_select_btn\').toggleClass(\'active\');" id="crop_image_logo"'+(typeof(logos[current_logo][2])!=='undefined'?' class="'+logos[current_logo][2]+'"':'')+'></div>');
                        //$('#crop_image_logo').after('<div id="logo_select_btn" onclick="$(this).toggleClass(\'active\');"><div id="logo_select_list"></div></div>');
                        set_crop_logo(current_logo);
                        toggle_crop(); 
                  }});
                },300);
      
              }).each(function () {
                if (this.complete) $(this).load();
              });
              $('#crop_image').attr('src',data.image)
              $('#sub_plank_shot').removeClass('active');
                $('#map').css('width','100%').css('height','100%');
                setTimeout(function(){ 
                    map.invalidateSize();
                    map.panTo(map.getCenter());
                },400);
            }
          }, 'json'
          ).fail(
                function(a,b,c){
                    report_xhr_error(a,'image_composer');
                }
            );
}

function engage_cropper() {
    // Отправляет параметры обрезки изображения скрипту, который отправляет в ответ скачиваемую картинку.
  geo = $('#crop_image').cropper('getData');
  window.open('/engine/cropper.php?name='+$('#store_name').val()+'&src='+$('#crop_image').attr('src')+'&'+$.param({'geo':geo, 'logo':[current_logo,logos[current_logo][2]]})+'&');
  toggle_none();
}

function insert_vertex(e) {
  // Добавляет редактирующую ручку по щелчку
  // если щелчок по кривой, а не по ручке И если ломаная в режиме редактирования. Иначе - перейти к редактированию
  if ($(e.originalEvent.target).is('path') && poly.editor._enabled) { 
    //console.log('aaa');
    // если щелкнуть по кривой во время редактирования, editable не должно рисовать новую точку
    if (e.type === 'editable:drawing:click') {
      e.cancel(); 
    }
    latlngs=poly.getLatLngs(); // набор точек ломанной
    best=10000;pos=[]; // переменные для определения принадлежности точки отрезку на ломанной
    for(i=0;i<latlngs.length-1;i++) {
      // Дальше определяем, лежит ли точка на отрезке ломаной перебором этих отрезков
      x=e.latlng['lat'];
      x1 = latlngs[i]['lat'];
      x2 = latlngs[i+1]['lat'];
      y = e.latlng['lng'];
      y1 = latlngs[i]['lng'];
      y2 = latlngs[i+1]['lng'];
      
      // эта странная конструкция определяет, лежит ли вообще точка между двумя соседями на отрезке
      if ((
          (x1<x2 && (x>x1 && x<x2))
            ||
            (x1>x2 && (x<x1 && x>x2))
            ||
            (x1 === x2 && Math.abs(x-x1)>0.001)
          ) && (
            (y1<y2 && (y>y1 && y<y2))
            ||
            (y1>y2 && (y<y1 && y>y2))
            ||
            (y1 === y2 && Math.abs(y-y1)>0.001)
          )
        ) {
          // если да, то проверяем, далеко ли точка от самого отрезка между двумя точками
          dx1 = x2 - x1;  dy1 = y2 - y1;
          dx = x - x1;    dy = y - y1;
          result = Math.abs(dx1 * dy - dx * dy1);
          if (result<best) {
            // это - не очень-то точная функция. Но по клику она определяет, по какому отрезку мы кликнули
            best = result;
            pos = [i,i+1];
           }       
        }
    }
    // если точка найдена, добавляем её в отрезок
    if (pos.length>1) {
      poly.editor.disable();
      latlngs.splice(pos[1],0,e.latlng);
      poly.setLatLngs(latlngs);
      poly.editor.initVertexMarkers();
      poly.editor.enable();
    }
  } else {
    // Рисование! Очистим буфер отмен :-)
    redoBuffer = [];
    // если ломаная не в режиме редактирования или если мы, всё-таки, кликнули по ручке, просто активируем редактор
    route_state('active');
  }
}

function point(latlng,text) {
    // Добавляет точку
    // console.log(typeof(latlng),latlng);return;
    if (typeof(latlng) !== 'undefined' && !Array.isArray(latlng)) {
        //console.log('dmg');
        zoom = map.getZoom();
        lat = parseFloat(latlng.lat); lng = parseFloat(latlng.lng); //координаты клика
        new_lat = lat+0.002*16/zoom;
        new_lng = lng+0.002*16/zoom;
    } else if (Array.isArray(latlng)) {
        //console.log('zmg');
        lat = parseFloat(latlng[0].lat); lng = parseFloat(latlng[0].lng); //координаты клика
        new_lat = parseFloat(latlng[1].lat); new_lng = parseFloat(latlng[1].lng);
        //console.log(lat,lng);
    } else {
        return;
    }
    pnt_id++;
    text     = typeof text === undefined ? 'Точка '+pnt_id : text;
    over    = '<div class="point_live" id="point_'+pnt_id+'"><div class="point_drop" onclick="point_drop(event, '+pnt_id+');"></div><div class="point_label" id="point_label_'+pnt_id+'">'+text+'--</div><input onkeyup="update_point_text('+pnt_id+');" type="text" value="'+text+'" id="point_input_'+pnt_id+'" class="point_input"></div>'
    var myIcon = L.divIcon({ html: over, className: 'mark' });
    m = L.marker([new_lat,new_lng], { icon: myIcon });
    l = L.polyline([L.latLng(lat,lng),L.latLng(new_lat,new_lng)], { color: '#444444' });

    //console.log([L.latLng(lat,lng),L.latLng(parseInt(lat)+0.000001,parseInt(lng)+0.000001)]);
    point_array.points.addLayer(m);
    point_array.vectors.addLayer(l);
    if(can_i_edit){
        l.enableEdit();
        // Убираем средний маркер
        l.editor.disable();
        l.editor.options.skipMiddleMarkers = true;
        l.editor.enable();
        l.editor.skipMiddleMarkers = true;
    }
    // В pairs хранятся соответствующие выноскам точки
    point_array.pairs[l._leaflet_id]=m;
    //point_array.pairs[m._leaflet_id]=l;
    point_array.savedata[l._leaflet_id]={'latlngs': [{'lat': lat, 'lng': lng},{'lat': new_lat, 'lng': new_lng}], 'text': text};
    // В point_to_id хранятся соответствие точек и pnt_id
    point_array.point_to_id[pnt_id]=l._leaflet_id;
    point_array.id_to_point[l._leaflet_id]=pnt_id;

    //m.enableEdit();
    local_store_data();
    m.on('click', function () {
        return false;
    });
}

function point_drop(e,pnt_id) {
    //console.log(e);
    //L.DomEvent.preventDefault(e);
    //e.preventDefault();
    obj = point_array.point_to_id[pnt_id];
    console.log(obj);
    if (typeof(obj)!=='undefined' && obj>0) {
        point_array.pairs[obj].remove();
        delete point_array.pairs[obj];
        point_array.vectors.getLayer(obj).remove();
        delete point_array.savedata[obj];
        local_store_data();
    }
}

function on_vertex_drag(e) {
//console.log('Up!');
  obj = e.layer;
  //console.log();
  m = point_array.pairs[obj._leaflet_id];
  if (typeof(m)!=='undefined') {
    latlngs = obj.getLatLngs();
    m.setLatLng(latlngs[1]);
    //console.log(latlngs[0].lng-latlngs[1].lng);
    if(latlngs[0].lng<latlngs[1].lng){
        $('#point_'+point_array.id_to_point[obj._leaflet_id]).removeClass('inverse');
    }else{
        $('#point_'+point_array.id_to_point[obj._leaflet_id]).addClass('inverse');
    }
    point_array.savedata[obj._leaflet_id].latlngs=[{lat: latlngs[0].lat, lng: latlngs[0].lng}, {lat: latlngs[1].lat, lng: latlngs[1].lng}];
    local_store_data();
  }
}
function update_point_text(id) {
  //$(\'#point_'+pnt_id+' point_label\').text(this.val());
    $('#point_label_'+id).html($('#point_input_'+id).val().replace(/\s/ig, '&nbsp;')+'-');
    point_array.savedata[point_array.point_to_id[id]].text = $('#point_input_'+id).val();
    local_store_data();
}

function change_map(url) {
    //map_layer.setUrl('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
    /*if (url === '2gis') {
      map_layer.setOpacity(0)
      map.addLayer(dgis);
    } else {
      if (map.hasLayer(dgis)) {
        map_layer.setOpacity(1)
        map.removeLayer(dgis);
      }*/
      current_map_style = url;
      map_layer.setUrl(map_list[url]);
      toggle_none();
      update_overlays();
      /*
    }
    map.addLayer(dgis);
    map_layer.setUrl('');
    */
}
function publish_map() {
  $('#shader').fadeIn();
  var editor_enabled = poly.editor.enabled()?true:false;
  if (editor_enabled) poly.editor.disable();
  redraw_map();
  $('.leaflet-control-container').attr('data-html2canvas-ignore', 'true');
  setTimeout(function () {
    new_publish_map(function () {
      $('#shader').fadeOut();
      if (editor_enabled) { poly.editor.enable(); }
    });
  },500)
}

function prepare_paths() {
  paths = [];
  $('path').each(function (a,b) {
    paths.push({path: $(b).attr('d'), color: $(b).attr('stroke'), width: $(b).attr('stroke-width')});
  });
  return paths;
}

function new_prepare_route(){
    //console.log('route');
    var ret = [];
    $.each(poly.getLatLngs(), function(a,b){
        var xy = map.latLngToContainerPoint(b);
        ret.push({x: xy.x, y: xy.y});
    });
    return {path: ret, color: '#ff4433', width: 5};    
}

function new_prepare_dots(){
    //console.log('dots');
    var ret = [];
    $.each(point_array.savedata, function(a,b){
        var xy1 = map.latLngToContainerPoint(b.latlngs[0]),
            xy2 = map.latLngToContainerPoint(b.latlngs[1])
        ret.push({latlngs: [{x: xy1.x, y: xy1.y},{x: xy2.x, y: xy2.y}], text: b.text});
    });
    return ret;
}

function new_prepare_stickers(){
    //console.log('stickers');
    var ret = [];
    $.each(stickers.savedata, function(a,b){
        //console.log(b.latlng);
        var xy = map.latLngToContainerPoint(b.latlng);
        ret.push({latlng: {x: xy.x, y: xy.y}, ang: b.ang, style: b.style, text: b.text, x: b.x});
    });
    return ret;
}

function prepare_dots() {
  markers = [];
  $('.mark').each(function (a,b) {
    val = $(b).find('.point_input').val();
    val = typeof(val)!=='undefined'?val:null;
    col = $(b).find('.point_live').css('backgroundColor');
    col = typeof(col)!=='undefined'?col:null;
    matrix = $(b).css('transform').match(/(\s?\d+)\,(\s?\d+)\)$/);
    if (typeof(matrix)!=='undefined' && matrix &&  matrix.length>=2) {
        markers.push({pos: [matrix[1],matrix[2]], text: val, color:col});
    }
  });
  return markers;
}
/*
function publish_overlay() {

      html2canvas(document.getElementById("markers"), {
          //useCORS: true,
          //debug:true,
          //logging: true,
          proxy: '/engine/proxy_test.php',
          onrendered: function (canvas) {
              //document.body.appendChild(canvas);
              //render_script = 'ender.php?canvas = '+canvas.toDataURL()+'&viewbox = '+encodeURIComponent(linesLayer.getAttribute('viewBox'))+'&path = '+encodeURIComponent($('path.leaflet-interactive').attr('d'));
              //console.log();
              window.open(canvas.toDataURL());
              //callback();
          }
      });

}
*/

function prepare_map() {
    'use strict';
    check_token();
    // Эта функция создаёт саму карту и наносит на неё маршруты в самом начале работы
    $('#map').css('width', '100%').css('height', '100%');
    // создаём объект с картой
	map = L.map('map', {
        editable: true,
        layers: [ points, km_marks, point_array.points, point_array.vectors, stickers.layers ]
    }).setView([55.0153275, 82.9071235], 13);
    map.doubleClickZoom.disable();
 
  // Слой с картой. 
    
	map_layer = L.tileLayer(map_list[current_map_style], {
	    attribution: 'Независимое Велосообщество',
	    maxNativeZoom: 18,
	    maxZoom: 18,
        //minZoom: 11
	}).addTo(map);
    
    poly = map.editTools.startPolyline(); // начинаем новую полилинию
    poly.setStyle({color: '#ff3333', weight: '5'});
    poly.editor.options.skipMiddleMarkers = true;
    poly.editor.disable();

    //return;
    
  //$(".leaflet-control-attribution")[0].style.font = "11px RalewayMedium";
	


  // по-моему, эта функция отслеживает перетаскивания, чтобы не путать их с кликами
    /*
    map.on('dragstart', function (e) {
        is_dragged = true;
    });
    */
    //map.on('dragend', function (e) { });
    // добавление точек по щелчку
    map.on('click', function (e) {
        //!is_dragged && 
        //console.log('--> '+e.latlng)
        if (e.type == 'click' && can_i_edit) {
            L.DomEvent.preventDefault(e);
            if ($(e.originalEvent.target).attr('id') === 'map') {
                if(mode === 'point'){
                    point(e.latlng, 'Точка');
                } else if (mode === 'sticker' || ( mode === 'sticker_dialog' && sticker_style)) {
                    add_sticker(e.latlng);
                } else if (mode === 'routing') {
                    update_router(e);
                }else{
                    //console.log(sticker_style,mode);
                }
            }
        }
    });
    
    // Если на карте что-то меняется, пересчитать километражи
    map.editTools.addEventListener('editable:drawing:mouseup', function (e) { update_overlays(e); });
    map.editTools.addEventListener('editable:vertex:dragend', function (e) { update_overlays(e); });
    // Добавлять точек в полилинию по щелчку
    map.editTools.addEventListener('editable:drawing:click', function (e) { insert_vertex(e, 'editable'); });
    map.editTools.addEventListener('editable:drawing:clicked', function (e) { update_overlays(e); });
    poly.on('click', function (e) {
        if(can_i_edit){
            route_state('active'); 
        }
    });
    // Это для точек. При перетаскивании конца указателя тащим точку
    map.editTools.addEventListener('editable:vertex:drag', function (e) { on_vertex_drag(e); });
    // this is a hack to continue drawing on dblclick
    // BTW ON CHANGING MODES ADD HERE CHECK FOR MODE
    // хз, что это, возможно, можно удалить
    map.editTools.addEventListener('editable:drawing:end', function (e) {
        if (!force_stop) {
            //setTimeout(function () { poly.editor.continueForward(); }, 100);
        }
    });
    // при перетаскивании ручек убирать все отметки километров
    map.editTools.addEventListener('editable:vertex:dragstart', function (e) { km_marks.clearLayers(); });
    // при масштабировании карты масштабировать стрелки
    map.on('zoom', function (e) {
        $('.arr_mark >div').css('transform', 'scale(' + (map.getZoom()/13) + ')');       
    });
    map.on('zoomanim', function (e) {   
        var current_zoom = map.getZoom(),
            new_zoom = e.zoom;
        //console.log(new_zoom);
        $('.sticker').removeClass('sticker_zoom_' + current_zoom).addClass('sticker_zoom_' + new_zoom);
        $('.sticker').css('transform','scale(' + parseFloat(map.getZoomScale(new_zoom,15)) + ')');  
    })
    map.on('zoomend', function (e) {
        //console.log(e.target._zoom);
        current_zoom = map.getZoom();
    });
    // добавление точки для теста
    //point('55.00184125785578', '82.91845321655275', 'Точка!');
    L.DomEvent.addListener(document, 'keydown', key_down, map);
    L.DomEvent.addListener(document, 'keyup', key_up, map);
    //set_logo(current_logo);
    
    //var imageUrl = 'http://www.debscrossstitch.co.uk/ekmps/shops/debscrossstitch/images/bright-red-square-aperture-card-envelope-6-x-8-a5-2185-p.jpg',
    //imageBounds = [{lat: 54.827194631440356, lng: 83.56819152832033}, {lat: 54.82759016780595, lng: 83.56887817382814}];
    //L.imageOverlay(imageUrl, imageBounds).addTo(map);
//	zzz=L.imageOverlay('/misc/stickers/bugrinsky_bridge.png', [{lat: 54.97281073556246, lng: 82.9563045501709},{lat: 54.97608664591642, lng: 82.96566009521486}]).addTo(map);
    original_bounds = map.getBounds()._southWest;
    original_shift = tile_to_latlng(latlng_to_tile(original_bounds));
    //enable_editor();
    //console.log('original shift: ',{lat: shift_value.lat, lng: shift_value.lng})
}

function enable_editor(){
    $('body').addClass('is_editing');// Чтобы сдвигать в редакторе логотип выше

    if(location.hash !== '#editor'){ location.hash = 'editor'; return true; }

    $('#left_plank').removeClass('active');
    if(poly.getLatLngs().length<=0 && Object.keys(stickers.objects).length<=0 && Object.keys(point_array.point_to_id).length<=0){
        local_recover_data();
        //console.log('poop!');
    }else{
        //console.log('not recovering data!');
    }
    $.each(stickers.objects, function(a,b){
        b.enableEdit();
        $('#sticker_'+stickers.layer_to_object[b._leaflet_id]).addClass('sticker_editable');
    });
    $.each(point_array.vectors.getLayers(), function(a,b){
        //console.log('pnt '+b._leaflet_id);
        // Убираем средний маркер
        l = point_array.vectors.getLayer(b._leaflet_id);
        l.enableEdit();
        l.editor.disable();
        l.editor.options.skipMiddleMarkers = true;
        l.editor.enable();
        l.editor.skipMiddleMarkers = true;
    })
    if(parseInt($(window).width()) >= 600){
        $('#plank').addClass('active');
    }
    $('#editor_left_plank').addClass('active');
    check_token();
    //can_i_store = true;
    update_overlays();
    can_i_edit = true;
    can_i_store=true;
    if(store && !localStorage.getItem('hello')){
        $('#plank_hello').addClass('active');
        localStorage.setItem('hello',1);
    }
    //$('#sub_plank_chat').addClass('active');
    // everythings here for a devel period
    //toggle_store();
}

function disable_editor(){
    $('body').removeClass('is_editing'); // Чтобы сдвигать в редакторе логотип выше
    $('#left_plank').addClass('active');
    toggle_none();
    update_overlays();
    poly.editor.disable();
    $('#plank').removeClass('active');
    $('#editor_left_plank').removeClass('active');
    can_i_edit = false;
    $.each(stickers.objects, function(a,b){
        b.disableEdit();
        $('#sticker_'+stickers.layer_to_object[b._leaflet_id]).removeClass('sticker_editable');
    });
    $.each(point_array.vectors.getLayers(), function(a,b){
        point_array.vectors.getLayer(b._leaflet_id).disableEdit();
    });
}

function createButton(label, container, cls) {
    var btn = L.DomUtil.create('button', cls, container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}
function update_store_url(e){
    var val = translit($('#store_name').val().replace(/[^A-Za-z0-9А-Яа-яЁё\-\_\(\)]/ig,'_').substr(0,48)),
        tag = '<span class="gray">http://map.vault48.org/#map?</span>'+val,
        url = 'http://map.vault48.org/#map?'+val;

    if($('#store_name').val() != previous_store_name){
        $('#store_name').val(val);
        $('a#store_address_url').attr('href',url).html(tag);
        $('#sub_plank_remote_store').removeClass('error recheck storing renaming')
        previous_store_name  = val;
    }
}

function cool_thanks(){
    if (typeof(get_cookie('hide_store_helper')) === 'undefined') {
        $('#store_helper').show();
        expire = new Date(new Date().getTime() + 38600 * 365000);
        document.cookie = 'hide_store_helper=1; path=/; expires='+expire.toUTCString();
    }
    location.hash='map?'+previous_store_name;
    toggle_none();
}

function toggle_routing(){
    /* look 4 this!

    https://github.com/perliedman/leaflet-routing-machine/issues/104

    */
    if(mode == 'routing'){
        toggle_none();
    } else {
        toggle_none();
        $('#map').addClass('cross');
        mode='routing';
        //router.A = router.B = null;
        update_router();
        $('#sub_plank_routing_machine').addClass('active');
    }
}

//map.project(poly.getLatLngs()[0],0);
function simplify(latlngs){
    var points=[], simplified, target_latlngs=[],zl=12;
    for(i=0;i<latlngs.length;i += 1){
        //console.log({ lat: latlngs[i].lat, lng: latlngs[i].lng});
        points.push( map.project({ lat: latlngs[i].lat, lng: latlngs[i].lng}, zl) );
    }
    //L.LineUtil.simplify(points,0.7);
    simplified=L.LineUtil.simplify(points,0.7);
    for(i=0;i<simplified.length;i += 1){
        //console.log({ lat: latlngs[i].lat, lng: latlngs[i].lng});
        target_latlngs.push( map.unproject(simplified[i],zl) );
    }
    //poly.setLatLngs(target_latlngs);
    return target_latlngs;
}
/* good, but not cool 
function another_simplify(latlngs){
    var points=[], simplified, target_latlngs=[];
    for(i=0;i<latlngs.length;i += 1){
        //console.log({ lat: latlngs[i].lat, lng: latlngs[i].lng});
        points.push( map.latLngToContainerPoint({ lat: latlngs[i].lat, lng: latlngs[i].lng}) );
    }
    //L.LineUtil.simplify(points,0.7);
    simplified=L.LineUtil.simplify(points,0.7);
    for(i=0;i<simplified.length;i += 1){
        //console.log({ lat: latlngs[i].lat, lng: latlngs[i].lng});
        target_latlngs.push( map.containerPointToLatLng(simplified[i]) );
    }
    //poly.setLatLngs(target_latlngs);
    return target_latlngs;

}
*/
function update_router(e){
    //console.log('update router');
    if(typeof(poly) !== 'undefined' && poly && poly.getLatLngs().length > 0){
        //console.log('pos1');
        // Если маршрут нарисован, продолжаем его.
        latlngs = poly.getLatLngs();
        //console.log('Продолжаем полигон');
        if(router.A){
            //console.log('A only');
            // Если мы уже задали первую точку
            // проверка на router.B? Да, стоит
            if(typeof(e) !== 'undefined' && typeof(e.latlng) !== 'undefined'){
                $('#sub_plank_routing_tip').attr('class','routing');
                //console.log('Устанавливаем конечную точку');
                //router.B = e.latlng;
                if(!router.B){
                    router.B = e.latlng;
                    create_router();
                }else{
                    //console.log('gotcha');
                    waypoints = router.object.getWaypoints();
                    waypoints.push(new L.Routing.Waypoint(e.latlng));
                    router.object.setWaypoints(waypoints);
                }
                
            }   /*
            else if(typeof(e) !== 'undefined' && typeof(e.latlng) !== 'undefined'){
                router.B = e.latlng;
                console.log('Ничего не делаем');
            }*/
        }else{
            //console.log('not not b');
            $('#sub_plank_routing_tip').attr('class','setb');
            //console.log('Устанавливаем начальную точку');
            router.A = latlngs[ latlngs.length - 1];
            //console.log('created');
            create_router();
        }
    }else{
        //console.log('pos2',router.A,router.B);
        // Если нет, то ставим первую или вторую точку
        //console.log('Строим с нуля');

        if(router.A && !router.B && typeof(e) !== 'undefined' && typeof(e.latlng) !== 'undefined'){
            $('#sub_plank_routing_tip').attr('class','routing');
            //console.log('Ставим конечную точку',e.latlng);
            router.B = e.latlng;
            create_router();
        }else if( typeof(e) !== 'undefined' && typeof(e.latlng) !== 'undefined' && !router.A){
            //console.log('Ставим начальную',e.latlng);
            $('#sub_plank_routing_tip').attr('class','setb');
            router.A = e.latlng;
            create_router();
        }else{
            //console.log('Ага!');
            // Этот кусок добавляет вэйпоинты
            if(typeof(e) !== 'undefined' && typeof(e.latlng) !== 'undefined'){
                $('#sub_plank_routing_tip').attr('class','routing');
                waypoints = router.object.getWaypoints();
                waypoints.push(new L.Routing.Waypoint(e.latlng));
                router.object.setWaypoints(waypoints);
            }else{
                if(router.A && router.B){
                    $('#sub_plank_routing_tip').attr('class','routing');
                }else{
                    $('#sub_plank_routing_tip').attr('class','seta');
                }
            }
        }
    }
}

function create_router(){
    //console.log('create router called',router.A,router.B);
    if(!router.object){
        router.object=L.Routing.control({
                                serviceUrl: 'http://vault48.org:5000/route/v1',
                                profile: 'bike',
                                fitSelectedRoutes: false,
                              /* waypoints: [
                                router.A,
                                router.B
                              ], */
                               lineOptions: {
                                    styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: '#4597d0', opacity: 1, weight: 4, dashArray: '15,10'}]
                                },
                                altLineOptions: {
                                  styles: [{color: '#4597d0', opacity: 1, weight: 3}]  
                                },
                                show: false,
                                plan: null,
                                routeWhileDragging: true
                          }).addTo(map);
            router.object.on('routesfound', function(e){
            router.coordinates = {latlngs: e.routes[0].coordinates, dist:  e.routes[0].summary.totalDistance};
            //console.log(e);
            //console.log(e);
            // viewbox  81.63116,55.57524,84.21295,54.47323
        })
        var waypoints = [];
        if(router.A){ waypoints.push(router.A); }
        if(router.B){ waypoints.push(router.B); }
        router.object.setWaypoints(waypoints);
    }else if(router.A && router.B){
        var waypoints = [];
        if(router.A){ waypoints.push(router.A); }
        if(router.B){ waypoints.push(router.B); }
        router.object.setWaypoints([router.A, router.B]);
    }
}

function clear_router(){
    //throw "Error2";
    //console.log('clear router');
    if(typeof(router.object) !== 'undefined' && router.object){
        router.object.spliceWaypoints(0,65535);
        router.A = router.B = router.object = null;
    }
}
/*
function update_router(){
    if(router.A && router.B){
        if(!router.object){
        router.object=L.Routing.control({
                                serviceUrl: 'http://vault48.org:5000/route/v1',
                                profile: 'cycling',
                              waypoints: [
                                router.A,
                                router.B
                              ],
                               lineOptions: {
                                    styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: '#ff4433', opacity: 1, weight: 4, dashArray: '15,10'}]
                                },
                                altLineOptions: {
                                  styles: [{color: '#777777', opacity: 1, weight: 2}]  
                                },
                                show: false,
                                plan: null,
                                routeWhileDragging: true
                          }).addTo(map);
            router.object.on('routesfound', function(e){
            router.coordinates = {latlngs: e.routes[0].coordinates, dist:  e.routes[0].summary.totalDistance};
            console.log(e);
            // viewbox  81.63116,55.57524,84.21295,54.47323
        })
        }else{
            router.object.setWaypoints([router.A, router.B]);
        }
    }
}
*/
function apply_route(){
    var a,b,c,latlngs=simplify(router.coordinates.latlngs);
    poly_latlngs=poly.getLatLngs();
    if(latlngs.length>0){
        if(poly_latlngs.length>0){
            //latlngs.unshift(poly_latlngs);
            latlngs=poly_latlngs.concat(latlngs);
        }
        //console.log(latlngs);
    }else{
        //console.log('exc');
    }
    poly.setLatLngs(latlngs);
    clear_router();
    poly.addTo(map);
    poly.editor.options.skipMiddleMarkers = true;
    poly.editor.disable().enable();
    toggle_none();
    //route_state('active');
    update_overlays();
}

function local_recover_data(){
       if (store && can_i_load) {
        //console.log('local recover');
        var storedRoute, storedPoints, storedStickers, routeLatLngs, i;
        try {
            storedRoute = JSON.parse(localStorage.getItem("route"));
        } catch(e) {
            console.log('!! упс, неправильный формат роута')
            storedRoute = null;
        }
        if (typeof (map_list[localStorage.getItem("map_style")]) !== 'undefined') {
            current_map_style = localStorage.getItem("map_style");
            change_map(current_map_style);
        }
        if(localStorage.getItem("logo") !== 'undefined' && typeof(logos[localStorage.getItem("logo")]) !==  'undefined'){
            current_logo = localStorage.getItem("logo");
        }else{
            current_logo = 'default';  
        } 
        //console.log('current logo restored'+localStorage.getItem("logo"));
        if (typeof(storedRoute) !== 'undefined' && storedRoute && storedRoute.length > 1) {
            routeLatLngs = [];
            $.each(storedRoute, function(a, b) {
                //console.log(storedRoute[i]);
                routeLatLngs.push(new L.latLng(b.lat, b.lng));
                //console.log('{lat: '+b.lat+', lng: '+b.lng+'},')
            });
            //l = L.polyline([L.latLng(lat,lng),L.latLng(new_lat,new_lng)], { color: '#444444' });
            //console.log('restoring', routeLatLngs);return;
            poly.setLatLngs(routeLatLngs);
            poly.addTo(map);
            poly.editor.options.skipMiddleMarkers = true;
            poly.editor.disable().enable();
            poly.on('click', function (e) {
                if(can_i_edit){
                    route_state('active'); 
                }
            });
            //update_overlays();
            map.fitBounds(poly.getBounds());
        } else {
          //console.log('drawing');
            
          //route_state('active');
        }

        try {
            storedPoints = JSON.parse(localStorage.getItem("points"));
        } catch(e) {
            console.log('!! упс, неправильный формат точек')
            storedPoints = null;
        }
        
        //console.log(storedPoints);
        if (typeof(storedPoints) !== 'undefined' && storedPoints && storedPoints.length > 0) {
            $.each(storedPoints, function(a,b){
                if( typeof(b.latlngs) !== 'undefined' && typeof(b.text) !== 'undefined'){
                    point(b.latlngs,b.text);                   
                }
            });
        }
        
        //console.log('stickers',localStorage.getItem("stickers"))
        try {
            storedStickers = JSON.parse(localStorage.getItem("stickers"));
        } catch(e) {
            console.log('!! упс, неправильный формат стикеров')
            storedStickers = null;
        }

        //console.log(storedStickers);
        if (typeof(storedStickers) !== 'undefined' && storedStickers && storedStickers.length > 0) {
            $.each(storedStickers, function(a,b){
                if( typeof(b.latlng) !== 'undefined' && typeof(b.text) !== 'undefined' && typeof(b.style) !== 'undefined') {
                    //console.log('m');
                    sticker_style = b.style;
                    //console.log(b);
                    add_sticker(b.latlng,b.text,b.ang); 
                    current_sticker = null;
                    //console.log('add_sticker({lat: '+b.latlng.lat+', lng: '+b.latlng.lng+'},\''+b.text+'\','+b.ang+')');
                }
            });
        }
        update_overlays();
        set_logo(current_logo);
    }
    can_i_store = true;
}

function remote_load_data(name){
       if (name) {
        var storedRoute, storedPoints, storedStickers, routeLatLngs, i;
        can_i_load = false;
        //console.log('loading!');
        //console.log(can_i_store);
        $.get('/engine/auth.php',
            {'name': decodeURI(name), 'action': 'load'},
            function(data){
                if(data.success){
                    drop_route();
                    drop_stickers();
                    drop_points();
                    can_i_store = false;
                    //drop_points();

                    if( typeof(data.data.logo) !== 'undefined' && typeof(logos[data.data.logo]) !==  'undefined'){
                        current_logo = data.data.logo;
                    }else{                        
                        current_logo = 'default';  
                    } 
                    //console.log('setting logo');
                    //$('#logo_composer').html('<img src="'+logos[current_logo][1]+'">');

                    storedRoute = data.data.route;
                    if (typeof(storedRoute) !== 'undefined' && storedRoute && storedRoute.length > 1) {
                        //console.log('putting route');
                        routeLatLngs = [];
                        $.each(storedRoute, function(a, b) {
                            //console.log(storedRoute[i]);
                            routeLatLngs.push(new L.latLng(b.lat, b.lng));
                            //console.log('{lat: '+b.lat+', lng: '+b.lng+'},')
                        });
                        //l = L.polyline([L.latLng(lat,lng),L.latLng(new_lat,new_lng)], { color: '#444444' });
                        //console.log('restoring', routeLatLngs);return;
                        poly.setLatLngs(routeLatLngs);
                        poly.addTo(map);

                        poly.editor.options.skipMiddleMarkers = true;
                        poly.editor.disable();
                        poly.on('click', function (e) {
                            if(can_i_edit){
                                route_state('active'); 
                            }
                        });
                        map.fitBounds( poly.getBounds() );
                        $('#store_name').val(name);
                        update_store_url();
                        //setTimeout(function(){  }, 5000);
                        //update_overlays();
                        
                    }

                    storedPoints = data.data.points;
                    
                    //console.log(storedPoints);
                    if (typeof(storedPoints) !== 'undefined' && storedPoints && storedPoints.length > 0) {
                        //console.log('putting points');
                        $.each(storedPoints, function(a,b){
                            if( typeof(b.latlngs) !== 'undefined' && typeof(b.text) !== 'undefined'){
                                point(b.latlngs,b.text);                   
                            }
                        });
                    }
                    
                    storedStickers = data.data.stickers;
                    
                    if (typeof(storedStickers) !== 'undefined' && storedStickers && storedStickers.length > 0) {
                        //console.log('putting stickers');
                        $.each(storedStickers, function(a,b){
                            if( typeof(b.latlng) !== 'undefined' && typeof(b.text) !== 'undefined' && typeof(b.style) !== 'undefined') {
                                //console.log('m');
                                sticker_style = b.style;
                                //console.log(b);
                                add_sticker(b.latlng,b.text,b.ang); 
                                current_sticker = null;
                                //console.log('add_sticker({lat: '+b.latlng.lat+', lng: '+b.latlng.lng+'},\''+b.text+'\','+b.ang+')');
                            }
                        });
                    }

                    //console.log(data.data);
                    if(typeof( data.data.map_style) !== 'undefined' && current_map_style !== data.data.map_style){
                        if(typeof(map_list[data.data.map_style])){
                            change_map(data.data.map_style);
                        }else{
                            change_map('default');
                        }
                    }else{

                    }
                    if(can_i_edit){ can_i_store = true; }
                    update_overlays();
                    set_logo(current_logo);

                }
            }, 'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'remote_load_data');
                }
            );;
        }
}
/*
function get_tile_coords(latlng){
	var layerPoint = map.project(latlng).divideBy(256).floor();
	console.log(layerPoint.x, layerPoint.y);
}*/
/*
function new_publish_map(callback) {
      //console.log('new_publish_map');
      //
      //console.log('a:'+$('path.leaflet-interactive').attr('d'));\
      // Я ЗАКОНЧИЛ ТУТ ЭТУ ПОЕБОТУ
      var arrows = [];
      $.each($('.arr_mark'), function (a,b) {
        console.log($(b).find('img').css('transform')); 
        arrows.push($(b).css('transform'));
      });
      var mapPane = $(".leaflet-map-pane")[0];
      var mapTransform = mapPane.style.transform.split(",");
      var mapX = parseFloat(mapTransform[0].split("(")[1].replace("px", ""));
      var mapY = parseFloat(mapTransform[1].replace("px", ""));
      mapPane.style.transform = "";
      mapPane.style.left = mapX + "px";
      mapPane.style.top = mapY + "px";

      var myTiles = $("img.leaflet-tile");
      var tilesLeft = [];
      var tilesTop = [];
      var tileMethod = [];
      for (var i = 0; i < myTiles.length; i++) {
          if (myTiles[i].style.left != "") {
              tilesLeft.push(parseFloat(myTiles[i].style.left.replace("px", "")));
              tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")));
              tileMethod[i] = "left";
          } else if (myTiles[i].style.transform != "") {
              var tileTransform = myTiles[i].style.transform.split(",");
              tilesLeft[i] = parseFloat(tileTransform[0].split("(")[1].replace("px", ""));
              tilesTop[i] = parseFloat(tileTransform[1].replace("px", ""));
              myTiles[i].style.transform = "";
              tileMethod[i] = "transform";
          } else {
              tilesLeft[i] = 0;
              tilesRight[i] = 0;
              tileMethod[i] = "neither";
          }
          myTiles[i].style.left = (tilesLeft[i]) + "px";
          myTiles[i].style.top = (tilesTop[i]) + "px";
      }

      var myDivicons = $(".leaflet-marker-icon");
      var dx = [];
      var dy = [];
      for (var i = 0; i < myDivicons.length; i++) {
          var curTransform = myDivicons[i].style.transform;
          var splitTransform = curTransform.split(",");
          dx.push(parseFloat(splitTransform[0].split("(")[1].replace("px", "")));
          dy.push(parseFloat(splitTransform[1].replace("px", "")));
          myDivicons[i].style.transform = "";
          myDivicons[i].style.left = dx[i] + "px";
          myDivicons[i].style.top = dy[i] + "px";
      }

      var mapWidth = parseFloat($("#map").css("width").replace("px", ""));
      var mapHeight = parseFloat($("#map").css("height").replace("px", ""));

      var linesLayer = $("svg.leaflet-zoom-animated")[0];
      var oldLinesWidth = linesLayer.getAttribute("width");
      var oldLinesHeight = linesLayer.getAttribute("height");
      var oldViewbox = linesLayer.getAttribute("viewBox");
      linesLayer.setAttribute("width", 4000);
      linesLayer.setAttribute("height", 4000);
      linesLayer.setAttribute("viewBox", "0 0 " + 4000 + " " + 4000);
      //console.log(linesLayer);
      var linesTransform = linesLayer.style.transform.split(",");
      var linesX = parseFloat(linesTransform[0].split("(")[1].replace("px", ""));
      var linesY = parseFloat(linesTransform[1].replace("px", ""));
      linesLayer.style.transform = "";
      linesLayer.style.left = "";
      linesLayer.style.top = "";

      $('.leaflet-overlay-pane').attr('data-html2canvas-ignore', 'true');
      $('.leaflet-marker-pane').attr('data-html2canvas-ignore', 'true').attr('id', 'marker-pane');
      $('#map').css('width',$(window).width()).css('height',$(window).height());
      //var matrix = $('.leaflet-map-pane').css('transform');
      //var values = matrix.match(/-?[\d\.]+/g);
      $('#marker-pane').css('width',$(window).width()).css('height',$(window).height());
      console.log(arrows);
      html2canvas(document.getElementById("map"), {
          //useCORS: true,
          //debug:true,
          //logging: true,
          proxy: '/engine/proxy_test.php',
          onrendered: function (map_canvas) {
                  $.post(
                    '/engine/render.php',
                    { 'image' : map_canvas.toDataURL(),
                      //'markers' : marker_canvas.toDataURL(),
                      //'path'  : $('path.leaflet-interactive').attr('d'),
                      'path'  : prepare_paths(),
                      'markers': prepare_dots(),
                      'pan'   : $('.leaflet-map-pane').css('transform')
                    },
                    function (data) {
                      console.log('sup!');
                      console.log(data);
                      window.open(data.image);
                    },
                    'json');
                    $('#map').css('width', '100%').css('height', '100%');
                    $('#marker-pane').css('width', '100%').css('height', '100%');
                    callback();
                }
              //console.log('b:'+$('path.leaflet-interactive').attr('d'));
              //document.body.appendChild(canvas);
              //render_script = 'ender.php?canvas = '+canvas.toDataURL()+'&viewbox = '+encodeURIComponent(linesLayer.getAttribute('viewBox'))+'&path = '+encodeURIComponent($('path.leaflet-interactive').attr('d'));
              //console.log(render_script);
              //window.open(render_script);
            //callback();   
      });

      for (var i = 0; i < myTiles.length; i++) {
          if (tileMethod[i] == "left") {
              myTiles[i].style.left = (tilesLeft[i]) + "px";
              myTiles[i].style.top = (tilesTop[i]) + "px";
          } else if (tileMethod[i] == "transform") {
              myTiles[i].style.left = "";
              myTiles[i].style.top = "";
              myTiles[i].style.transform = "translate(" + tilesLeft[i] + "px, " + tilesTop[i] + "px)";
          } else {
              myTiles[i].style.left = "0px";
              myTiles[i].style.top = "0px";
              myTiles[i].style.transform = "translate(0px, 0px)";
          }
      }
      for (var i = 0; i < myDivicons.length; i++) {
          myDivicons[i].style.transform = "translate(" + dx[i] + "px, " + dy[i] + "px)";
          myDivicons[i].style.left = "0px";
          myDivicons[i].style.top = "0px";
      }
      linesLayer.style.transform = "translate(" + (linesX) + "px," + (linesY) + "px)";
      linesLayer.setAttribute("viewBox", oldViewbox);
      linesLayer.setAttribute("width", oldLinesWidth);
      linesLayer.setAttribute("height", oldLinesHeight);
      mapPane.style.transform = "translate(" + (mapX) + "px," + (mapY) + "px)";
      mapPane.style.left = "";
      mapPane.style.top = "";
}*/
/*
function y_new_publish_map(callback) {
      //
      //console.log('a:'+$('path.leaflet-interactive').attr('d'));
      var mapPane = $(".leaflet-map-pane")[0];
      var mapTransform = mapPane.style.transform.split(",");
      var mapX = parseFloat(mapTransform[0].split("(")[1].replace("px", ""));
      var mapY = parseFloat(mapTransform[1].replace("px", ""));
      mapPane.style.transform = "";
      mapPane.style.left = mapX + "px";
      mapPane.style.top = mapY + "px";

      var myTiles = $("img.leaflet-tile");
      var tilesLeft = [];
      var tilesTop = [];
      var tileMethod = [];
      for (var i = 0; i < myTiles.length; i++) {
          if (myTiles[i].style.left != "") {
              tilesLeft.push(parseFloat(myTiles[i].style.left.replace("px", "")));
              tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")));
              tileMethod[i] = "left";
          } else if (myTiles[i].style.transform != "") {
              var tileTransform = myTiles[i].style.transform.split(",");
              tilesLeft[i] = parseFloat(tileTransform[0].split("(")[1].replace("px", ""));
              tilesTop[i] = parseFloat(tileTransform[1].replace("px", ""));
              myTiles[i].style.transform = "";
              tileMethod[i] = "transform";
          } else {
              tilesLeft[i] = 0;
              tilesRight[i] = 0;
              tileMethod[i] = "neither";
          }
          myTiles[i].style.left = (tilesLeft[i]) + "px";
          myTiles[i].style.top = (tilesTop[i]) + "px";
      }

      var myDivicons = $(".leaflet-marker-icon");
      var dx = [];
      var dy = [];
      for (var i = 0; i < myDivicons.length; i++) {
          var curTransform = myDivicons[i].style.transform;
          var splitTransform = curTransform.split(",");
          dx.push(parseFloat(splitTransform[0].split("(")[1].replace("px", "")));
          dy.push(parseFloat(splitTransform[1].replace("px", "")));
          myDivicons[i].style.transform = "";
          myDivicons[i].style.left = dx[i] + "px";
          myDivicons[i].style.top = dy[i] + "px";
      }

      var mapWidth = parseFloat($("#map").css("width").replace("px", ""));
      var mapHeight = parseFloat($("#map").css("height").replace("px", ""));

      var linesLayer = $("svg.leaflet-zoom-animated")[0];
      var oldLinesWidth = linesLayer.getAttribute("width");
      var oldLinesHeight = linesLayer.getAttribute("height");
      var oldViewbox = linesLayer.getAttribute("viewBox");
      linesLayer.setAttribute("width", 4000);
      linesLayer.setAttribute("height", 4000);
      linesLayer.setAttribute("viewBox", "0 0 " + 4000 + " " + 4000);
      //console.log(linesLayer);
      var linesTransform = linesLayer.style.transform.split(",");
      var linesX = parseFloat(linesTransform[0].split("(")[1].replace("px", ""));
      var linesY = parseFloat(linesTransform[1].replace("px", ""));
      linesLayer.style.transform = "";
      linesLayer.style.left = "";
      linesLayer.style.top = "";

      $('.leaflet-overlay-pane').attr('data-html2canvas-ignore', 'true');
      $('.leaflet-marker-pane').attr('data-html2canvas-ignore', 'true').attr('id', 'marker-pane');
      $('#map').css('width',$(window).width()).css('height',$(window).height());
      var matrix = $('.leaflet-map-pane').css('transform');
      var values = matrix.match(/-?[\d\.]+/g);
      $('#marker-pane').css('width',$(window).width()).css('height',$(window).height());
      html2canvas(document.getElementById("map"), {
          //useCORS: true,
          //debug:true,
          //logging: true,
          proxy: '/engine/proxy_test.php',
          onrendered: function (map_canvas) {
            console.log('rendered map;');
              $('.leaflet-marker-pane').attr('data-html2canvas-ignore',null)
              html2canvas(document.getElementById("marker-pane"), {
                proxy: '/engine/proxy_test.php',
                onrendered: function (marker_canvas) {
                  console.log('yyy',$('.leaflet-map-pane'));
                  console.log('rendered markers;');
                  $.post(
                    '/engine/render.php',
                    { 'image' : map_canvas.toDataURL(),
                      'markers' : marker_canvas.toDataURL(),
                      'path'  : $('path.leaflet-interactive').attr('d'),
                      'pan'   : $('.leaflet-map-pane').css('transform')
                    },
                    function (data) {
                      console.log('sup!');
                      console.log(data);
                      window.open(data.image);
                    },
                    'json');
                    $('#map').css('width', '100%').css('height', '100%');
                    $('#marker-pane').css('width', '100%').css('height', '100%');
                    callback();
                }
              });
              //console.log('b:'+$('path.leaflet-interactive').attr('d'));
              //document.body.appendChild(canvas);
              //render_script = 'ender.php?canvas = '+canvas.toDataURL()+'&viewbox = '+encodeURIComponent(linesLayer.getAttribute('viewBox'))+'&path = '+encodeURIComponent($('path.leaflet-interactive').attr('d'));
              //console.log(render_script);
              //window.open(render_script);
            //callback();   
          }
      });

      for (var i = 0; i < myTiles.length; i++) {
          if (tileMethod[i] == "left") {
              myTiles[i].style.left = (tilesLeft[i]) + "px";
              myTiles[i].style.top = (tilesTop[i]) + "px";
          } else if (tileMethod[i] == "transform") {
              myTiles[i].style.left = "";
              myTiles[i].style.top = "";
              myTiles[i].style.transform = "translate(" + tilesLeft[i] + "px, " + tilesTop[i] + "px)";
          } else {
              myTiles[i].style.left = "0px";
              myTiles[i].style.top = "0px";
              myTiles[i].style.transform = "translate(0px, 0px)";
          }
      }
      for (var i = 0; i < myDivicons.length; i++) {
          myDivicons[i].style.transform = "translate(" + dx[i] + "px, " + dy[i] + "px)";
          myDivicons[i].style.left = "0px";
          myDivicons[i].style.top = "0px";
      }
      linesLayer.style.transform = "translate(" + (linesX) + "px," + (linesY) + "px)";
      linesLayer.setAttribute("viewBox", oldViewbox);
      linesLayer.setAttribute("width", oldLinesWidth);
      linesLayer.setAttribute("height", oldLinesHeight);
      mapPane.style.transform = "translate(" + (mapX) + "px," + (mapY) + "px)";
      mapPane.style.left = "";
      mapPane.style.top = "";
}
function z_new_publish_map(callback) {
      //
      var mapPane = $(".leaflet-map-pane")[0];
      var mapTransform = mapPane.style.transform.split(",");
      var mapX = parseFloat(mapTransform[0].split("(")[1].replace("px", ""));
      var mapY = parseFloat(mapTransform[1].replace("px", ""));
      mapPane.style.transform = "";
      mapPane.style.left = mapX + "px";
      mapPane.style.top = mapY + "px";

      var myTiles = $("img.leaflet-tile");
      var tilesLeft = [];
      var tilesTop = [];
      var tileMethod = [];
      for (var i = 0; i < myTiles.length; i++) {
          if (myTiles[i].style.left != "") {
              tilesLeft.push(parseFloat(myTiles[i].style.left.replace("px", "")));
              tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")));
              tileMethod[i] = "left";
          } else if (myTiles[i].style.transform != "") {
              var tileTransform = myTiles[i].style.transform.split(",");
              tilesLeft[i] = parseFloat(tileTransform[0].split("(")[1].replace("px", ""));
              tilesTop[i] = parseFloat(tileTransform[1].replace("px", ""));
              myTiles[i].style.transform = "";
              tileMethod[i] = "transform";
          } else {
              tilesLeft[i] = 0;
              tilesRight[i] = 0;
              tileMethod[i] = "neither";
          }
          myTiles[i].style.left = (tilesLeft[i]) + "px";
          myTiles[i].style.top = (tilesTop[i]) + "px";
      }

      var myDivicons = $(".leaflet-marker-icon");
      var dx = [];
      var dy = [];
      for (var i = 0; i < myDivicons.length; i++) {
          var curTransform = myDivicons[i].style.transform;
          var splitTransform = curTransform.split(",");
          dx.push(parseFloat(splitTransform[0].split("(")[1].replace("px", "")));
          dy.push(parseFloat(splitTransform[1].replace("px", "")));
          myDivicons[i].style.transform = "";
          myDivicons[i].style.left = dx[i] + "px";
          myDivicons[i].style.top = dy[i] + "px";
      }

      var mapWidth = parseFloat($("#map").css("width").replace("px", ""));
      var mapHeight = parseFloat($("#map").css("height").replace("px", ""));

      var linesLayer = $("svg.leaflet-zoom-animated")[0];
      var oldLinesWidth = linesLayer.getAttribute("width");
      var oldLinesHeight = linesLayer.getAttribute("height");
      var oldViewbox = linesLayer.getAttribute("viewBox");
      linesLayer.setAttribute("width", mapWidth);
      linesLayer.setAttribute("height", mapHeight);
      linesLayer.setAttribute("viewBox", "0 0 " + mapWidth + " " + mapHeight);
      var linesTransform = linesLayer.style.transform.split(",");
      var linesX = parseFloat(linesTransform[0].split("(")[1].replace("px", ""));
      var linesY = parseFloat(linesTransform[1].replace("px", ""));
      linesLayer.style.transform = "";
      linesLayer.style.left = "";
      linesLayer.style.top = "";

      html2canvas(document.getElementById("map"), {
          //useCORS: true,
          debug:true,
          logging: true,
          proxy: '/engine/proxy_test.php',
          onrendered: function (canvas) {
              //document.body.appendChild(canvas);
              window.open(canvas.toDataURL());
              callback();
          }
      });

      for (var i = 0; i < myTiles.length; i++) {
          if (tileMethod[i] == "left") {
              myTiles[i].style.left = (tilesLeft[i]) + "px";
              myTiles[i].style.top = (tilesTop[i]) + "px";
          } else if (tileMethod[i] == "transform") {
              myTiles[i].style.left = "";
              myTiles[i].style.top = "";
              myTiles[i].style.transform = "translate(" + tilesLeft[i] + "px, " + tilesTop[i] + "px)";
          } else {
              myTiles[i].style.left = "0px";
              myTiles[i].style.top = "0px";
              myTiles[i].style.transform = "translate(0px, 0px)";
          }
      }
      for (var i = 0; i < myDivicons.length; i++) {
          myDivicons[i].style.transform = "translate(" + dx[i] + "px, " + dy[i] + "px)";
          myDivicons[i].style.left = "0px";
          myDivicons[i].style.top = "0px";
      }
      linesLayer.style.transform = "translate(" + (linesX) + "px," + (linesY) + "px)";
      linesLayer.setAttribute("viewBox", oldViewbox);
      linesLayer.setAttribute("width", oldLinesWidth);
      linesLayer.setAttribute("height", oldLinesHeight);
      mapPane.style.transform = "translate(" + (mapX) + "px," + (mapY) + "px)";
      mapPane.style.left = "";
      mapPane.style.top = "";
}
function z_publish_map() {
        poly.editor.disable();
        $('.leaflet-control-container').attr('data-html2canvas-ignore', 'true');

        var mapPane = $(".leaflet-map-pane")[0];
        var mapTransform = mapPane.style.transform.replace("translate3d(", "").split(",");
        var mapX = parseFloat(mapTransform[0].replace("px", ""));
        var mapY = parseFloat(mapTransform[1].replace("px", ""));
        mapPane.style.transform = "translate3d(0px,0px,0px)";

        var myTiles = $("img.leaflet-tile");
        var tilesLeft = [];
        var tilesTop = [];
        for (var i = 0; i < myTiles.length; i++) {
            tilesLeft.push(parseFloat(myTiles[i].style.left.replace("px", "")));
            tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")));
            myTiles[i].style.left = (tilesLeft[i] + mapX) + "px";
            myTiles[i].style.top = (tilesTop[i] + mapY) + "px";
        }

        var myDivicons = $(".leaflet-marker-icon");
        var dx = [];
        var dy = [];
        var mLeft = [];
        var mTop = [];
        for (var i = 0; i < myDivicons.length; i++) {
            mLeft.push(parseFloat(myDivicons[i].style.marginLeft.replace("px", "")));
            mTop.push(parseFloat(myDivicons[i].style.marginTop.replace("px", "")));
            var curTransform = myDivicons[i].style.transform;
            var splitTransform = curTransform.replace("translate3d(", "").split(",");
            dx.push(parseFloat(splitTransform[0].replace("px", "")));
            dy.push(parseFloat(splitTransform[1].replace("px", "")));
            myDivicons[i].style.transform = "translate3d(" + (dx[i] + mLeft[i] + mapX) + "px, " + (dy[i] + mTop[i] + mapY) + "px, 0px)";
            myDivicons[i].style.marginLeft = "0px";
            myDivicons[i].style.marginTop = "0px";
        }

        var linesLayer = $("svg.leaflet-zoom-animated")[0];
        var linesTransform = linesLayer.style.transform.replace("translate3d(", "").split(",");
        var linesX = parseFloat(linesTransform[0].replace("px", ""));
        var linesY = parseFloat(linesTransform[1].replace("px", ""));
        //linesLayer.style.transform = "translate3d(" + ((linesX + mapX) / 2) + "px," + ((linesY + mapY) / 2) + "px, 0px)";


        // HERE
        // этот хак чинит сдвиг карты, блеать!
        
        //attrs=$("svg.leaflet-zoom-animated")[0].getAttribute('viewBox').split(' ');

        //var centerPoint = map.getSize().divideBy(2),
        //    targetPoint = centerPoint.subtract([parseInt(attrs[0]), parseInt(attrs[1])]);
        //    targetLatLng = map.containerPointToLatLng(targetPoint);
        //console.log(map.getCenter(),targetLatLng);
        //map.panTo([targetLatLng.lat,targetLatLng.lng],{animate:false,noMoveStart:true});
//

       // $("svg.leaflet-zoom-animated")[0].setAttribute('viewBox', '0 0 '+attrs[2]+' '+attrs[3]);

        //
        //linesLayer.style.transform = "translate3d("+(linesX + mapX) + "px,"+(linesY + mapY)+"px,0px)";
        //console.log(linesX,mapX,linesY,mapY)
        linesLayer.style.transform = "translate3d(0px,0px,0px)";
        linesLayer.style.left = (linesX + mapX) + "px";
        linesLayer.style.top = (linesY + mapY) + "px";



        //console.log(attrs);
        //linesLayer.style.transform = "translate3d("+-1*parseInt(attrs[0])+"px,"+-1*parseInt(attrs[1])+"px,0px)";

        //linesLayer.style.left = -1*parseInt(attrs[0]) + "px";
        //linesLayer.style.top = -1*parseInt(attrs[1]) + "px";

        html2canvas(document.getElementById("map"), {
            //debug:true,
            //logging: true,
        proxy: '/engine/proxy_test.php',
            //useCORS: true,
        //proxy: '/leaflet/proxy.php',
            onrendered: function (canvas) {
                            //linesLayer.style.transform = "translate3d(0px,0px,0px)";
                            var img = new Image();
                            img.onload = function () {
                                img.onload = null;
                                document.body.appendChild(img);
                            };
                            img.onerror = function () {
                                img.onerror = null;
                                if (window.console.log) {
                                    window.console.log("Not loaded image from canvas.toDataURL");
                                } else {
                                    alert("Not loaded image from canvas.toDataURL");
                                }
                            };

                            //here we will place image
                            
                            //var ctx = canvas.getContext("2d");       // get 2D context of canvas
                            //ctx.textBaseline = "top";                // start with drawing text from top
                            //ctx.font = "20px sans-serif";            // set a font and size
                            //ctx.fillStyle = "red";                   // set a color for the text
                            //ctx.fillText("WATERMARK", canvas.width-200, canvas.height-200);
                            
                            //console.log(canvas.width);
                            //img.src = canvas.toDataURL("image/png");

                //document.body.appendChild(canvas);
                window.open(canvas.toDataURL());
                //$('#map').css('width', '100%').css('height', '100%');
                poly.editor.enable();
               // $('.leaflet-control-container').show();
            }
        });

        for (var i = 0; i < myTiles.length; i++) {
            myTiles[i].style.left = (tilesLeft[i]) + "px";
            myTiles[i].style.top = (tilesTop[i]) + "px";
        }
        for (var i = 0; i < myDivicons.length; i++) {
            myDivicons[i].style.transform = "translate3d(" + dx[i] + "px, " + dy[i] + "px, 0)";
            myDivicons[i].style.marginLeft = mLeft[i] + "px";
            myDivicons[i].style.marginTop = mTop[i] + "px";
        }
        linesLayer.style.left = "0px";
        linesLayer.style.top = "0px";
        linesLayer.style.transform = "translate3d(" + (linesX) + "px," + (linesY) + "px, 0px)";
        mapPane.style.transform = "translate3d(" + (mapX) + "px," + (mapY) + "px, 0px)";
}
*/

/*

// delete all this after refactoring
var sticker_id = 0;
var draggable_sticker,sticker_offset,target_object,target_latlng,target_pos,target_sticker_id,target_layer;
$(document).on('mousemove', function (e) {
    'use strict';
    if (draggable_sticker) {
       // test_drag(e); 
        // <-- in case of fire unceommment this
    }
});
$(document).on('mouseup', function (e) {
    'use strict';
    if (draggable_sticker) {
        
        //map.dragging.enable();
        //target_object.dragging.enable();
        draggable_sticker = false;
        //target_object=null;
        //target_object.fire('mouseup');
        //target_object.fire('dragend');
        //$(document).click();
    }
});

function test_drag(e) {
    'use strict';
    //L.DomEvent.stop(e);
    var obj = draggable_sticker,
        sti = $(obj).parent(),
        par = $(obj).parent().parent(),
        off = par.offset(),
        posx = e.pageX-sticker_offset[0],
        posy = e.pageY-sticker_offset[1],    
        a = 50,
        ang=Math.atan2(posy,posx),
        x=Math.cos(ang)*a-30,
        y=Math.sin(ang)*a-30;
        target_object.setLatLng(map.containerPointToLatLng({x:sticker_offset[0],y:sticker_offset[1]}));
        $(sti).css('left',x-parseInt($(obj).css('left'))).css('top',y-parseInt($(obj).css('top')));
        $('#sticker_gap_' + target_sticker_id).css('transform','rotate(' + (parseFloat(ang) + 2.35619) + 'rad)');
    //    console.log('#sticker_gap_' + target_sticker_id,'rotate(' + (parseFloat(ang) - 2.35619) + 'rad)');
    console.log('x: '+x);    
    if (x < -50 && !$('#sticker_text_' + target_sticker_id).hasClass('invert')) {
        $('#sticker_text_' + target_sticker_id).addClass('invert');
    }else if (x > -10 && $('#sticker_text_' + target_sticker_id).hasClass('invert')){
        $('#sticker_text_' + target_sticker_id).removeClass('invert');
    }
        
}

function test_sticker(){
    // Добавляет точку
    var latlng = {lat: 54.96943602216546, lng: 82.95441627502443};
    var text = "Ох ёпт, Боря\nне этого ли мы ждали?";
    over     = '<div class="sticker_with_text" data-sticker="' + sticker_id + '">'
            + '<div class="sticker_image"></div><div class="sticker_gap" id="sticker_gap_' + sticker_id + '"></div>'
            + '<div class="sticker_pos" data-sticker="' + sticker_id + '"></div>'
            + '<div class="sticker_text" id="sticker_text_' + sticker_id + '"><div class="sticker_label" id="sticker_label_' + sticker_id + '">' + text + '--</div>'
            + '<textarea id="sticker_textarea_' + sticker_id + '" onkeydown="sticker_label_update(' + sticker_id + ');"  onkeyup="sticker_label_update(' + sticker_id + ');">' + text + '</textarea></div></div>'
    var myIcon = L.divIcon({ html: over, className: 'sticker' });
    m = L.marker(latlng, { icon: myIcon });

    //console.log([L.latLng(lat,lng),L.latLng(parseInt(lat)+0.000001,parseInt(lng)+0.000001)]);
    stickers.layer.addLayer(m);
    m.enableEdit();
    
    sticker_label_update(sticker_id);
    stickers.objects[sticker_id]=m;
    stickers.layer_to_object[m._leaflet_id] = sticker_id;
    stickers.object_to_layer[sticker_id] = m._leaflet_id;
    //stickers.object_to_layer.push({sticker_id: m._leaflet_id});
    console.log(stickers.layer_to_object);
    //console.log(m._leaflet_id);
    map.setView({lat: 54.96943602216546, lng: 82.95441627502443},16);
    m.on('editable:drag',function(e){
        if(draggable_sticker && target_object && target_latlng){
            target_object.setLatLng(target_latlng); 
        }
    });
    $('.sticker_pos').on('mousedown',function(e){
        //console.log(stickers.object_to_layer[$(e.target).attr('data-sticker')]);
        target_sticker_id = $(e.target).attr('data-sticker');
        target_layer = stickers.object_to_layer[target_sticker_id];
        
        
        //console.log(target_sticker_id);
        
        target_object = stickers.objects[target_sticker_id];
        target_latlng = target_object.getLatLng(),
        target_pos = map.latLngToContainerPoint(target_latlng);
        sticker_offset = [target_pos.x,target_pos.y];
            //console.log(target_pos);
        //sticker_offset=[posx,posy];
        //console.log(sticker_offset);
        //map.dragging.disable();
        //stickers.layer.eachLayer(function(a,b){
        //    a.editor.disable();
        //})
        //target_object.editor.disable();
        //target_object.dragging.disable();
        console.log(target_object);
        draggable_sticker=e.target;        
    });

    //point_array.vectors.addLayer(l);
    //l.enableEdit();
    // В pairs хранятся соответствующие выноскам точки
    //point_array.pairs[l._leaflet_id]=m;
    // В point_to_id хранятся соответствие точек и pnt_id
    //point_array.point_to_id[pnt_id]=l._leaflet_id;
    // Убираем средний маркер
    //l.editor.disable();
    //l.editor.options.skipMiddleMarkers = true;
    //l.editor.enable();
    //l.editor.skipMiddleMarkers = true;
    //m.enableEdit();
}
*/ 

/*
function test_bridge(){
    'use strict';
    var latlng = {lat: 54.972632943832994, lng: 82.95600414276124};
    map.setView({lat: 54.972632943832994, lng: 82.95600414276124},14);
    var myIcon = L.divIcon({ html: '<div class="sticker sticker_bugrinsky_bridge sticker_zoom_'+parseInt(map.getZoom())+'"></div>', className: 'sticker_point' });
    var m = L.marker([latlng.lat,latlng.lng], { icon: myIcon });
    //l = L.polyline([L.latLng(lat,lng),L.latLng(new_lat,new_lng)], { color: '#444444' });

    //console.log([L.latLng(lat,lng),L.latLng(parseInt(lat)+0.000001,parseInt(lng)+0.000001)]);
    stickers.layer.addLayer(m);
    //point_array.vectors.addLayer(l);
    //m.enableEdit();
}
*/

/* end of dev area */
function change_mode(hash){
    hash=hash.substr(1).split(/[:\/\?]+/);
    //console.log('hash burst: '+hash)
    if(hash[0]=='map' && hash[1]){

        can_i_load = false;
        if(can_i_edit){
            disable_editor();
        }
        can_i_store = false;
        remote_load_data(hash[1]);
    }else{
        //console.log('changing'+hash[0]);
        enable_editor();
        can_i_store = true;
        local_store_data();
    }
}
$(document).ready(function () {
    'use strict';
	prepare_map();
    prepare_stickers();
    
    if ("onhashchange" in window) {
        $(window).bind( 'hashchange', function(e) { 
            change_mode(location.hash);
        });
    }
    
    change_mode(location.hash);

});

function make_bigger_shot(size){
    if(size<900 || size>2000){
        size = 1200
    }
    var center = map.getCenter();

    $('#map').css('width',size+'px').css('height',size+'px');
    setTimeout(function(){    
        map.invalidateSize();
        map.panTo(center);
        make_a_shot();        
    }, 400);
}

function show_user_routes(){
    if($('#menu_user_routes_item').hasClass('not_empty')){
        $('#menu_user_routes_item').toggleClass('active');
    }else{
        $('#menu_user_routes_item').removeClass('active');
    }
}
function show_user(){
    $('#sub_plank_user').toggleClass('active');
}

function editor_load(name){
    enable_editor();
    remote_load_data(name);
    //console.log('editor_load: '+name);
}

function get_gpx(){
    var latlngs = poly.getLatLngs(),
        route = [];
    $.each(latlngs, function (a,b) { route.push({lat: b.lat, lng: b.lng}); }); 
    if(route.length > 0){
        //window.open('/engine/auth.php?action=get_gpx&name='+$('#store_name').val()+'&route='+JSON.stringify(route));
        $.post('/engine/auth.php',
            {   'action': 'put_gpx', 
                'name': $('#store_name').val(),
                'route': route 
                },
            function(data){
                console.log(data);

                if(data.success && data.result_id){
                    window.open('/engine/auth.php?action=get_gpx&name='+$('#store_name').val()+'&result_id='+data.result_id);
                }
            },'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'put_gpx');
                }
            );
    }
}

function open_oauth_frame(host){
    var width = parseInt($(window).width()),
        height = parseInt($(window).height());
        oauth_window = window.open("https://oauth.vk.com/authorize?client_id=5987644&scope=&redirect_uri=http://" + host + "/engine/oauth.php&response_type=code", "socialPopupWindow",
                "location=no,width=700,height=370,scrollbars=no,top="+(height-370)/2+",left="+(width-700)/2+",resizable=no");
}

function do_login(input_data){
    old_data = get_token();
    if(oauth_window){
        oauth_window.close();
    }
    oauth_window = null;
    //console.log('moving forces');
    $.get('/engine/auth.php',
    {   'action': 'move_data', 
        'old_id': old_data.id,
        'old_token': old_data.token,
        'new_id': input_data.id,
        'new_token': input_data.token
        },
    function(data){
        set_token(input_data.id, input_data.token, 'vk');
        check_token();
    },'json').fail(
        function(a,b,c){
            report_xhr_error(a,'move_data');
        }
    );       
}

function do_logout(){
    $('#sub_plank_user').removeClass('active');
    set_token(null,null,null);
    gen_guest_token();
}

function remote_drop_route(route_id){
    token = get_token();
    $.get('/engine/auth.php',
        {   'action': 'drop_route', 
            'id': token.id,
            'token': token.token,
            'route': route_id
            },
        function(data){ 
            check_token();       
        },'json').fail(
            function(a,b,c){
                report_xhr_error(a,'drop_route');
            }
        );    
}

function open_route_list(){
    $('#chat_left_slide').removeClass('active');
    $('#editor_left_slide').toggleClass('active');
}

function open_chat(){
    if($('#chat_left_slide').hasClass('active')){
        close_chat();
    }else{
        $('#chat_input_box').focus();
        $('#editor_left_slide').removeClass('active');
        $('#chat_left_slide').addClass('active');
        chat_get();
        $('#menu_user_chat_count').removeClass('active');
        $('#chat_left_slide').addClass('active');
        chat_timer = setInterval(chat_get, 3000);
    }
}

function close_chat(){
    $('#chat_left_slide').removeClass('active');
    clearInterval(chat_timer);
}

function chat_get(){
    console.log('chat');
    token = get_token();
    if(!chat_hold){
        $.get('/engine/auth.php',
            {   'action': 'chat_get',
                'id': token.id,
                'last_message': last_message},
            function(data){
                if(data.success){
                    $('#chat_history_buffer').before(data.messages);
                    if(data.last_message){
                        last_message = data.last_message;
                        set_cookie('last_message', data.last_message);
                    }
                }
                chat_hold = false;
            }, 'json');
    }
}

function chat_put(){
    token = get_token();
    msg = $('#chat_input_box').val().replace(new RegExp('<', 'g'),"&lt;").replace(new RegExp('>', 'g'),"&gt;").replace(new RegExp(">", 'g'),"<br>");
    chat_hold = true;
    if(msg.length>0){
        $('#chat_input .button').addClass('active');
        setTimeout(function(){$('#chat_input .button').removeClass('active');},500)
        $('#chat_history_buffer').append('<div class="chat_msg chat_own_msg"><i class="fa fa-circle-o-notch fa-spin fa-fw pull-right"></i>' + msg + '</div>');
        $.get('/engine/auth.php',
            {   'action': 'chat_put',
                'id': token.id,
                'token': token.token,
                'message': msg,
                'last_message': last_message},
            function(data){
                if(data.success){
                    $('#chat_history_buffer').html('');
                    $('#chat_history_buffer').before(data.messages);
                    if(data.last_message){
                        console.log('initated');
                        set_cookie('last_message', data.last_message);
                        last_message = data.last_message;
                    }
                }
                chat_hold = false;
            }, 'json').fail(
            function(a,b,c){
                chat_hold = false;
                report_xhr_error(a,'chat_put');
            }
        );    
    }
    $('#chat_input_box').val('').focus();
}

function chat_watch_enter(e){
    if( typeof(e) !== 'undefined' && e.type === 'keyup' && e.keyCode === 13 ){
        // Блюрим по эскейпу
        chat_put();
    }
}
/*

Все сторонние функции

*/

function transliterate(engToRus) {
    var     rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
        return function(text, engToRus) {
            var x;
            for(x = 0; x < rus.length; x++) {
                text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
            }
            return text;
        }
}
function translit(text){
    var arrru = new Array ('Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'),
        arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e');

    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
    }
    return text;
}

 
/* в чём стори: когда заходим на карту, открывается редактор. А схуяли?
*/