/* hey, ho, let's go!

    zoomanim - действие по изменению зума, ищи, если нужно
    OBSOLETE - пометка неиспользуемых функций. Помечай и удаляй их

    TODO:

    Места:
    - Удаление
    - Подсказка о выключении в редакторе
    - Подсказка о включении большего числа в просмотре
    - Загрузка фотографий

*/


/* jslint browser: true */
// noinspection JSJQueryEfficiency
/* global L, $, jQuery, alert, middle_latlng, findDistance,console */

var map, poly, point_btn, map_layer, mode, map_layer, is_dragged,
    dgis, current_logo, current_zoom, can_i_store = false,
    can_i_edit = false, can_i_load=true, previous_store_name, engaged_by_shift = false,
    token,

    // В этой штуке мы храним точки и выноски, их связки и всё такое
    point_array = {
        points: L.layerGroup(),
        vectors: L.layerGroup(),
        handles: L.layerGroup(),
        pairs: {},
        point_to_id: {},
        id_to_point: {},
        savedata: {}
    },

    logos = {
        'default': ['Без логотипа', '', 'bottom-right'],
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
    last_message, chat_hold = false, chat_timer,

    // Интересные места;
    places_layer, places = {}, places_objects = {}, active_place = 0, place_loading = 0,
    places_lids = {}, // здесь хранятся layer_id мест в формате places_lids[lid] = id
    place_types, place_types_selected,
    places_show;
//
// function test_get_tiles(){
//     var w  = $('#map').width(),h = $('#map').height(),
//         sw = latlng_to_tile(map.getBounds()._southWest),
//         ne = latlng_to_tile(map.getBounds()._northEast),
//         zsw= tile_to_latlng(sw),
//         zne= tile_to_latlng(ne),
//         rsw=map.latLngToContainerPoint(zsw);
//         msw=map.latLngToContainerPoint(map.getBounds()._southWest);
//         test_fetch_tiles({
//             min_x:  sw.x,
//             min_y:  ne.y,
//             max_x:  ne.x,
//             max_y:  sw.y,
//             sh_x: (rsw.x-msw.x),
//             sh_y: (h+rsw.y-msw.y),
//             size:   256,
//             width:  w,
//             height: h,
//             zoom: map.getZoom()
//         });
// }

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
        xtile = parseInt(Math.floor((latlng.lng + 180) / 360 * (1 << zoom)));
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

}

function prepare_stickers() {
    'use strict';
    var obj = $('#sub_plank_stickers').find('.sub_plank_sticker_list'),i;

    for (i=stickers.src.length-1;i>=0;i=i-1) {
        obj.prepend('<div class="sticker_thumb" data-sticker="' + i + '"><div style="background-position: -' + parseInt(stickers.src[i].off * 48) + 'px 0px;"></div></div>');
    };
    $('.sticker_thumb').on('click', function () { set_sticker($(this)) })
}

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
        is_dragged = true;
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

// function bridge_layer(){
//     // OBSOLETE
//     zzz=L.imageOverlay('/misc/stickers/bridge_layer.svg', [{lat: 54.97308784358926, lng: 82.95710921287538},{lat: 54.976259054848086, lng: 82.96591758728029}]).addTo(map);
// }

if (typeof (localStorage) !== "undefined") { store = true; } // проверим, есть ли локальное хранилище

function get_route_array() {
    'use strict';
    return poly.toGeoJSON().geometry.coordinates;
}

function update_overlays(e) {
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
                    km_marks.addLayer(L.marker([middle.lat, middle.lng], { icon: L.divIcon({ html: '<div style="transform: scale(' + (map.getZoom() / 13) + ');"><img src="misc/arr.png" style="transform: translateX(-4px) translateY(-4px) rotate(' + (270 + rotation) + 'deg);"></div>', className: 'arr_mark' }) }));
                }

            }
        } else {
            $('#text_route_length').text('0 км');
        }
    }
    local_store_data();
}

function local_store_data(){
    if (store && can_i_store && can_i_edit) {
        var latlngs = poly.getLatLngs(),
            route = [],
            points_to_save = [],
            stickers_to_save = [];
        $.each(latlngs, function (a,b) { route.push({lat: b.lat, lng: b.lng}); });
        $.each(point_array.savedata, function (a,b) { points_to_save.push(b); });
        $.each(stickers.savedata, function (a,b) { stickers_to_save.push(b); });

        localStorage.setItem("route", JSON.stringify(route));
        localStorage.setItem("points", JSON.stringify(points_to_save) );
        localStorage.setItem("stickers", JSON.stringify(stickers_to_save) );
        if( typeof(current_map_style) !== 'undefined' && current_map_style) {

          localStorage.setItem("map_style", current_map_style);
        }

        if(typeof(current_logo) !== 'undefined'){ localStorage.setItem("logo", current_logo); }
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

                if(data.success){
                    if(typeof(data.description) !== 'undefined' && data.description){
                        $('#store_status').text(data.description);
                    }
                    $('#sub_plank_remote_store').removeClass('error recheck storing renaming overwriting').addClass('success');
                    $('#store_name').val(data.name);
                    update_store_url();
                    check_token();
                }else{

                    $('#sub_plank_remote_store').removeClass('error recheck success storing renaming overwriting');
                    if(typeof(data.description) !== 'undefined' && data.description){
                        $('#store_status').text(data.description);
                    }
                    if(typeof(data.mode) !== 'undefined' && data.mode){
                        $('#sub_plank_remote_store').addClass('error '+data.mode);
                        if(data.mode === 'recheck'){
                            //console.log(":from remote_store_data 2");
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
function gen_guest_token(callback){

    callback = typeof(callback) === 'function' && callback ? callback : null;

    $.get('/engine/auth.php',{action:'gen_guest_token'},
        function(data){
            set_token(data.id,data.token,data.role);
            //console.log('puuz: ',data)
            if($('#store_name').val().length === 0 && typeof(data.random_url) !== 'undefined'){
                $('#store_name').val(data.random_url);
                update_store_url();
            }
            //console.log(':from gen_guest_token');
            check_token(callback);
            //console.log(data.random_url);
        }, 'json').fail(
                function(a,b,c){
                    report_xhr_error(a,'gen_guest_token');
                }
            );
}

function check_token(callback){

    callback = typeof(callback) === 'function' && callback ? callback : null;

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
                    gen_guest_token(callback);
                }else{

                    if($('#store_name').val().length===0 && typeof(data.random_url) !== 'undefined'){
                        $('#store_name').val(data.random_url);
                        update_store_url();
                    }
                    if(data.role == 'guest'){
                        $('#user_login_logged').hide();
                        $('#user_login_unauthorized').show();
                        $('.btn-places').removeClass('enabled').addClass('inactive');
                        $('#place_left_slide').removeClass('can_comment');
                    }else{
                        if(data.userdata.photo){
                            $('.field_user_avatar').css('background-image', 'url(\'' + data.userdata.photo + '\')');
                        }
                        $('.btn-places').removeClass('inactive').addClass('enabled');
                        $('.field_user_id').html('<span class="fa fa-vk"></span> <b>' + userdata.id.replace('vk:','') + '</b>');
                        $('.field_user_name').text(data.userdata.name);
                        $('#user_login_unauthorized').hide();
                        $('#user_login_logged').show();
                        $('#place_left_slide').addClass('can_comment');
                    }


                    // Заполняем менюшку со списком роутов
                    $('#user_route_list').html('');
                    $('#menu_user_route_count').hide();

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

                    // Если есть новые сообщения в чате, показываем их количество на кнопку
                    if(data.new_messages>0){
                        $('#menu_user_chat_count').text(data.new_messages).addClass('active');
                    }

                    // Заполняем список типов мест
                    if(data.place_types){
                        place_types = data.place_types;

                        $('#place_type_options').html('');
                        $('#places-view-checkboxes').html('');

                        $.each(data.place_types, function(index, value){
                            // Заполняем select в редакторе места
                            $('#place_type_options').append('<div class="place-type-' + index + '" data-pick="' + index + '" onclick="place_change_type(event);">' + value + '</div>');

                            // Заполняем чекбоксы в меню выбора типов мест
                            $('#places-view-checkboxes').append('<label for="places-toggle-' + index + '"><input type="checkbox" class="checkbox-type-' + index + '" id="places-toggle-' + index + '" data-type="' + index + '">' + value + '</label>');
                            $('#places-view-checkboxes .checkbox-type-' + index ).on('change', function(){ select_place_type(event, index); } );
                        });

                    }

                    // Подгружаем выбранные пользователем типы мест для показа

                    // Пытаемся подгрузить из localStorage
                    place_types_selected = typeof (localStorage) !== "undefined" ? (localStorage.getItem("place_types") ? localStorage.getItem("place_types").split(',') : ['favs','building','nature','cult']) : ['favs'];

                    // Чекаем необходимые чекбоксы
                    $.each(place_types_selected, function(index, value){
                        $('.checkbox-type-' + value).attr('checked', true);
                    });

                    // Подгружаем из localStorage опции отображения мест
                    // [x, y] - x в режиме просмотра
                    //          y в режиме редактора

                    places_show = typeof (localStorage) !== "undefined" ? (localStorage.getItem("places_show") ? localStorage.getItem("places_show").split(',') : [1, 1] ) : [1, 1];

                    // Показываем места
                    decide_toggle_places();

                    // Выполняем коллбэк при необходимости
                    if(callback){
                        callback();
                    }

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
    if (!logos[preset]) { preset = 'default'; console.log('it happened!');}
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

function toggle_places_add(){
    enable_places();
    if($('.btn-places').hasClass('enabled')){
        if(mode==='placing'){
            $('#sub_plank_places').removeClass('active');
            $('.btn-places').removeClass('active');
            toggle_none();
            mode = 'none';
        }else{
            $('#sub_plank_places').addClass('active');
            $('.btn-places').addClass('active');
            mode = 'placing';
            $('#map').addClass('cross');
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
        if(e.shiftKey && mode === 'none'){
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
                    //$('#chat_left_slide').removeClass('active');
                    close_chat();
                    close_place();
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
        //console.log(e.keyCode);
        if (e.keyCode === 27) {
            $('#store_helper').hide();
            // esc или enter либо блюрят инпут, либо выходят из всех режимов
            if ($(e.target).is('input') || $(e.target).is('textarea') ) {
                console.log(e.target);
                if(e.keyCode!==13 || !$(e.target).is('textarea')){
                    $(e.target).blur();
                }
            } else {
                $('#editor_left_slide').removeClass('active');
                close_chat();
                close_place();
                toggle_none();   // esc
            }

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

function set_crop_logo(preset){
    if (!logos[preset]) { preset = 'default'; console.log('On crop logo');}
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
  let current_flows = 0;

  for(let i = 0; i < tiles.raw.length; i++) {
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
    // если щелкнуть по кривой во время редактирования, editable не должно рисовать новую точку
    if (e.type === 'editable:drawing:click') e.cancel();

    let latlngs = poly.getLatLngs(); // набор точек ломанной
    let best = 10000;
    let pos = []; // переменные для определения принадлежности точки отрезку на ломанной

    for(let i=0; i<latlngs.length-1; i++) {
      // Дальше определяем, лежит ли точка на отрезке ломаной перебором этих отрезков
      const x = e.latlng['lat'];
      const x1 = latlngs[i]['lat'];
      const x2 = latlngs[i+1]['lat'];
      const y = e.latlng['lng'];
      const y1 = latlngs[i]['lng'];
      const y2 = latlngs[i+1]['lng'];

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
          let dx1 = x2 - x1;
          let dy1 = y2 - y1;
          let dx = x - x1;
          let dy = y - y1;
          let result = Math.abs((dx1 * dy) - (dx * dy1));
          if (result < best) {
            // это - не очень-то точная функция. Но по клику она определяет, по какому отрезку мы кликнули
            best = result;
            pos = [i, i+1];
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
    let obj = point_array.point_to_id[pnt_id];

    if (typeof(obj)!=='undefined' && obj>0) {
        point_array.pairs[obj].remove();
        delete point_array.pairs[obj];
        point_array.vectors.getLayer(obj).remove();
        delete point_array.savedata[obj];
        local_store_data();
    }
}

function on_vertex_drag(e) {
  let obj = e.layer;
  //console.log();
  let m = point_array.pairs[obj._leaflet_id];
  if (typeof(m)!=='undefined') {
    let latlngs = obj.getLatLngs();
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
    //console.log(":from prepare_map");
    //check_token();
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

  // Слой с интересными местами
  places_layer =  L.markerClusterGroup({maxClusterRadius: 20});
  //console.log(20);
  //places_layer.addLayer(L.marker(getRandomLatLng(map)));

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
    map.on('click', e => {
      console.log('mapClick');
        // map_click
        if (e.type === 'click' && can_i_edit && !is_dragged) {
            // console.log('drag: ', is_dragged);
            L.DomEvent.preventDefault(e);
            if ($(e.originalEvent.target).attr('id') === 'map') {
                if(mode === 'point'){
                    point(e.latlng, 'Точка');
                } else if (mode === 'sticker' || ( mode === 'sticker_dialog' && sticker_style)) {
                    add_sticker(e.latlng);
                } else if (mode === 'routing') {
                    update_router(e);
                } else if (mode === 'placing') {
                    add_place(e.latlng);
                } else {
                    //console.log(sticker_style,mode);
                }
            }
        }else{
          // Это на случай, если кто-то тянет стикер
          // и выполняет после этого mouseup
          is_dragged = false;
        }
    });

    // Если на карте что-то меняется, пересчитать километражи
    map.editTools.addEventListener('editable:drawing:mouseup', update_overlays);
    map.editTools.addEventListener('editable:vertex:dragend', update_overlays);

    // map.editTools.addEventListener('editable:vertex:rawclick', e => {
    //   console.log('rawclick', e);
    //   // poly.editor.continueForward();
    //   // e.cancel();
    // });
    //

    // map.editTools.addEventListener('editable:vertex:click', e => {
    // });

    map.editTools.addEventListener('editable:vertex:deleted', e => {
      console.log('deleted', e);
      poly.editor.continueForward();
      update_overlays(e);
    });

    // Добавлять точек в полилинию по щелчку
    map.editTools.addEventListener('editable:drawing:click', insert_vertex);
    map.editTools.addEventListener('editable:drawing:clicked', update_overlays);

    // poly.on('click', () => {
    //     if (can_i_edit){
    //         route_state('active');
    //     }
    // });
    // Это для точек. При перетаскивании конца указателя тащим точку
    map.editTools.addEventListener('editable:vertex:drag', on_vertex_drag);

    // this is a hack to continue drawing on dblclick
    // BTW ON CHANGING MODES ADD HERE CHECK FOR MODE
    // хз, что это, возможно, можно удалить
    // map.editTools.addEventListener('editable:drawing:end', function (e) {
    //     if (!force_stop) {
    //         //setTimeout(function () { poly.editor.continueForward(); }, 100);
    //     }
    // });

    // при перетаскивании ручек убирать все отметки километров
    map.editTools.addEventListener('editable:vertex:dragstart', function (e) { km_marks.clearLayers(); });

    // при масштабировании карты масштабировать стрелки
    map.on('zoom', function (e) {
        $('.arr_mark >div').css('transform', 'scale(' + (map.getZoom()/13) + ')');
    });
    //
    // map.on('zoomanim', function (e) {
    //     var current_zoom = map.getZoom(),
    //         new_zoom = e.zoom;
    //     //console.log(new_zoom);
    //     // $('.sticker').removeClass('sticker_zoom_' + current_zoom).addClass('sticker_zoom_' + new_zoom);
    //     // $('.sticker').css('transform','scale(' + parseFloat(map.getZoomScale(new_zoom,15)) + ')');
    // })

    // map.on('zoomend', function (e) {
    //     //console.log(e.target._zoom);
    //     current_zoom = map.getZoom();
    // });

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
    //$('#place_left_slide').addClass('active');

}

function show_places(){
  // Функция подгружает все достопримечательности (на самом деле - последние 200)
  token = get_token(); // получаем данные о пользователе


  clear_all_places();
  places_layer.addTo(map);

  $.get('/engine/auth.php', // обращаемся к скрипту за списком мест
  {   'action': 'places_get',
      'id': token.id,
      'token': token.token,
      'filter': place_types_selected
      },
  function(data){
      if(data.success){ // если получилось, наносим их на карту
        clear_all_places();
        $.each(data.places, function(i,v){
          place(v.lat, v.lng, v.id, v.title, v.type, v.owned) // вот этой функцией
        });

      }
  }, 'json').fail(
      function(a,b,c){
          //report_xhr_error(a,'move_data'); // расскомментить в продакшне
      }
  );

}

function clear_all_places(){
    //console.log('engaged clear all places');
    places_layer.clearLayers();
    // Очищает весь список мест
    $.each(places, function(i, v){
        drop_place(i);
    });
    // На всякий случай чистим вообще все слои

}

function hide_places(){
    places_layer.clearLayers().removeFrom(map);
}

function place(lat, lng, id, title, type, owned){
  //console.log('place',lat, lng, id, title, type, owned);
    // добавляет место на карту
  if( typeof(lat) !== 'undefined' && lat,
      typeof(lng) !== 'undefined' && lng,
      typeof(id)  !== 'undefined'  // Вот это потому, что при добавлении места мы делаем место с id = 0
    ){

    over = '<div id="place-'+id+'" data-id="'+id+'" class="type-'+type+'" onclick="click_place(event);"><span></span><b>'+title+'</b></div>';
    myIcon = L.divIcon({ html: over, className: 'place' }),
    m = L.marker(new L.latLng(lat, lng), {editable: true, icon: myIcon}); // L-объект с местом

    // При перетаскивании метка места теряет класс active. Этот хак его восстанавливает:
    m.on('dragend', function (e) {
      console.log('m moved to: '+m.getLatLng(), e.target._latlng);
      if(active_place == places_lids[e.target._leaflet_id]){
        $('#place-input-lat').val(e.target._latlng.lat);
        $('#place-input-lng').val(e.target._latlng.lng);
      }
      setTimeout(function(){ $('#place-'+id).addClass('active'); }, 100);
    });

    places_objects[id] = m; // здесь храним сам объект
    /* здесь -- информацию о нём:
        loaded - есть ли подробности о месте (на этапе добавления -- нет)
        owned - является ли пользователь хозяином этого места
    */
    places[id] = { 'title': title, 'type': type, 'lat': lat, 'lng': lng, 'owned': owned, 'loaded': false};
    // Добавляем на карту
    places_layer.addLayer(m);
    // В массиве будет храниться по _leaflet_id
    places_lids[m._leaflet_id] = id;
  }
}

function click_place(event){
    // срабатывает по клику на место на карте
  target = $(event.target);
  //console.log(target);
  if(target.data('id')){
    //console.log('activated ' + target.data('id'));
    show_place(target.data('id')); // Если у места есть айди, фокус на него и показываем инфу
  }
}

function show_place(id, edit_mode){

  // при выборе места сфокусироваться на нём и показать инфу
  // id         - айди места
  // edit_mode  - если true, показывать сразу редактор данных места,
  //              используется при добавлении места

  edit_mode = typeof(edit_mode) !== 'undefined' && edit_mode ? edit_mode : false;

  place_stop_editing();

  if(active_place > 0){ // если до этого было выбрано другое место
    places_objects[active_place].disableEdit(); // отключить перетаскивание
    $('#place-' + active_place).removeClass('active'); // убрать выделение
  }

  // Если место не подгружено, грузим его, и только потом запускаем show_place

  if( typeof(places[id]) === 'undefined' || !places[id] ){
    load_single_place(id, function(){ show_place(id); });
    return;
  }

  active_place = id; // теперь это место активное

  close_chat(); // прячем чат
  $('#store_helper').hide(); // прячем панель со списком маршрутов

  if(places[active_place].owned === true){ // если можно редактировать, включаем перетаскивание
    $('#place_left_slide').addClass('can_edit').removeClass('cannot_edit');
  }else{
    $('#place_left_slide').removeClass('can_edit').addClass('cannot_edit');
  }

  // центрируем карту на нём
  // Если место в кластере, приблизим к нему
  if($('div#place-'+id).length<=0){
    map.once("moveend zoomend", function(){
        $('#place-' + active_place).addClass('active');
    })
    map.setView(places_objects[active_place].getLatLng(), 17);
  }else{
    // Если место итак видно, то просто двигаем, без зума
    map.setView(places_objects[active_place].getLatLng());
    $('#place-' + active_place).addClass('active'); // добавляем выделение
  }

  $('#place_left_slide').addClass('active loading'); // показываем левую панель

  load_place_data(id, edit_mode); // подгружаем данные о месте

}

function load_single_place(id, callback){
    // Функция на случай, если место не показано / не подгружено,
    // а показать его надо.
    // Используется в show_place на этот самый случай
    // Берём данные пользователя
    token = get_token();
    //console.log('load single place');
    // Если уже подгружено, то не надо
    if( typeof(places[id]) !== 'undefined' || places[id] ){ return; }
    //console.log('getting' + id);
    // Подгружаем из базы место
    $.get('/engine/auth.php', // обращаемся к скрипту за списком мест
    {   'action': 'load_single_place',
        'id': token.id,
        'token': token.token,
        'filter': place_types_selected,
        'place': id
    },
    function(data){
        if(data.success){ // если подгрузили место
            //console.log('data load success', data.places);
            // Добавляем место

            place(parseFloat(data.places.lat), parseFloat(data.places.lng), parseInt(data.places.id), data.places.title, data.places.type, data.places.owned)

            // Выполняем коллбэк
            if( typeof(callback) === 'function' ){
                callback();
            }

      }
    }, 'json').fail(
      function(a,b,c){
          //report_xhr_error(a,'move_data'); // расскомментить в продакшне
      }
    );

}

function place_toggle_editing(){

    if($('#place_left_slide').hasClass('editing')){
      place_stop_editing();
    }else{
      place_start_editing();
    }

}

function place_start_editing(){

  if(!active_place || typeof(places[active_place]) === 'undefined' || !places[active_place] ||! places[active_place]['owned']){
    console.log('U can\'t edit me!');
    return;
  }
  //lock_map();
  places_objects[active_place].enableEdit();
  $('#place_left_slide').addClass('editing');
  $('#place-input-title').focus();
  $('#place_type_options').removeClass('expanded');
  //console.log('let\' start editing');
  check_input_desc();
  check_input_title();
}

function place_stop_editing(){
  //unlock_map();
  if(active_place){
    places_objects[active_place].disableEdit();
  }
  $('#place_left_slide').removeClass('editing');
}

function close_place(){
    if(active_place){
      if($('#place_left_slide').hasClass('editing')){
        place_stop_editing();
      }else{
        $('#place-' + active_place).removeClass('active'); // убрать выделение
        $('#place_left_slide').removeClass('active');
        places_objects[active_place].disableEdit();
        active_place = 0;
      }
    }
}

function load_place_data(id, edit_mode){

    // подгружает данные о месте и заполняет ими левую табличку, после чего показывает эту табличку
    // id           - айди места
    // edit_mode    - открывать ли сразу редактор, на случай создания точки

    edit_mode = typeof(edit_mode) !== 'undefined' && edit_mode ? edit_mode : false;

    place_loading = id; // в эту переменную пишем id места, потому что данные грузятся асинхронно

    $.get('/engine/auth.php', // обращаемся к скрипту за списком мест
      {   'action': 'place_get_info',
          'place': id,
          'id': token.id,
          'token': token.token
          },
      function(data){
          if(data.success && data.place.id == place_loading){ // если получилось, записываем данные в табличку

            // Поля в инфо
            $('#place_title').html(data.place.title);
            $('#place_owner').html(data.place.owner_name);
            $('#place_description').html(data.place.desc.replace(/\n/ig, "<br />"));
            $('#place_left_slide').removeClass('loading');
            if(data.place.uuid && data.place.filename){
                $("#place_thumb").removeClass('no_thumb').css('background-image', 'url(/misc/thumbs/' + data.place.uuid + '/' + data.place.filename);
            }else{
                $("#place_thumb").addClass('no_thumb').css('background-image', 'none');
            }
            $('#place_thumb').removeClass('upload_started upload_success upload_error');

            // Поля в редакторе
            $('#place-input-title').val(data.place.title);
            $('#place-input-desc').val(data.place.desc.replace(/\<br \/\>/ig, "\n"));
            $('#place-input-lat').val(data.place.lat);
            $('#place-input-lng').val(data.place.lng);

            // Тип места в редакторе
            $('#place_type_options > div').removeClass('active');
            $('div.place-type-'+data.place.type).addClass('active');
            $('#place-input-type').val(data.place.type);

            // Комментарии
            $('#place_history').find('.chat_msg').remove();
            if(data.comments && data.comments.length>0){
                for( i=0; i<data.comments.length; i++){
                    $('#place_history_buffer').after(data.comments[i]);
                }

            }
            // Обновим аплоадер, если он есть
            update_uploader();

            if(edit_mode){
                // Включает режим редактирования вместо просто показа места
                place_start_editing();
            }

          }else{
            //console.log('place_loading: '+place_loading+' / '+data.place.id)
            $('#place_left_slide').removeClass('active loading');
          }
      },'json').fail(
          function(a,b,c){
            $('#place_left_slide').removeClass('active loading');
            //report_xhr_error(a,'move_data'); // расскомментить в продакшне
          }
      );
}

function place_change_type(e){
    // Обрабатывает select-бокс в меню редактирования места
    pick     = $(e.target).data('pick');
    $('#place_type_options > div').removeClass('active');
    $('div.place-type-'+pick).addClass('active');
    $('#place-input-type').val(pick);
    //$('#place-'+active_place).attr('class', 'active type-'+pick)
    //console.log(pick);
}

function save_place_data(){
  // После нажатия на кнопку "Сохранить" обновляет данные и отправляет запрос на сервер
  token = get_token();

  // Проверки
  if(!active_place || !places[active_place] || !places[active_place]['owned'] || role === 'guest'){ return; }

  if(!place_check_input()){
    // тут проверка введёных данных
    return;
  }

  // Обновляем данные о месте
  places[active_place]['title'] = $('#place-input-title').val().substr(0,64);
  places[active_place]['desc'] = $('#place-input-desc').val().substr(0,400).replace('<','&lt;').replace('<','&gt;').replace(/\n/ig,"<br />");
  places[active_place]['type'] = $('#place-input-type').val();
  places[active_place]['lat'] = $('#place-input-lat').val();
  places[active_place]['lng'] = $('#place-input-lng').val();

  // Обновляем карточку места
  $('#place_title').html($('#place-input-title').val().substr(0,64));
  $('#place_description').html($('#place-input-desc').val().substr(0,400).replace('<','&lt;').replace('<','&gt;').replace(/\n/ig,"<br />"));

  // Помещаем данные места во временный массив, удаляем его и заменяем новым
  var place_temp = places[active_place];
  drop_place(active_place);
  console.log(place_temp);
  place(place_temp.lat, place_temp.lng, active_place, place_temp.title, place_temp.type, place_temp.owned)
  $('#place-'+active_place).addClass('active');

  // Отправляем данные на сервер

  $.get('/engine/auth.php', // обращаемся к скрипту за списком мест
    {   'action': 'place_set_info',
        'place': active_place,
        'id': token.id,
        'token': token.token,
        'title': $('#place-input-title').val().substr(0,64),
        'desc': $('#place-input-desc').val().substr(0,400),
        'type': $('#place-input-type').val(),
        'lat': $('#place-input-lat').val(),
        'lng': $('#place-input-lng').val(),
        },
    function(data){
      // Ничего не делаем
    },'json').fail(
        function(a,b,c){
          //report_xhr_error(a,'move_data'); // расскомментить в продакшне
        }
    );

    // Завершаем редактирование
    place_stop_editing();

}

function add_place(latlng){
  //place(lat, lng, id, title, type, owned)
  place(latlng.lat, latlng.lng, 0, '...', 'none', true); // Временная точка

  lock_map();can_i_edit = false;

  $.get('/engine/auth.php', // отправляем xhr на добавление места и ждём получения его id
    {   'action': 'place_add',
        'lat':    latlng.lat,
        'lng':    latlng.lng,
        'id':     token.id,
        'token':  token.token
        },
    function(data){
        if(data.success){
          /*
              если получилось, дропаем временное место,
              добавляем новое с id от php-скрипта
              и сразу переводим его в режим редактирования

              место будет временным, пока ему не зададут title
          */
          place(data.place.lat, data.place.lng, data.place.id, '...', 'none', true);
          drop_place(0);
          can_i_edit = true;
          unlock_map();
          show_place(data.place.id, true);
        }else{
          console.log('Ошибка добавления места (php): ', data);
          drop_place(0);
          can_i_edit = true;
          unlock_map();
        }
    },'json').fail(
        function(a,b,c){
          console.log('Ошибка добавления места (xhr): ', a);
          drop_place(0);
          can_i_edit = true;
          unlock_map();
          //report_xhr_error(a,'move_data'); // расскомментить в продакшне
        }
    );
}

function drop_place(id){
    // Полностью удаляет место и все упоминания о нём
  if( typeof(places_objects[id]) !== 'undefined' && typeof(places_lids[places_objects[id]._leaflet_id]) !== 'undefined' ){
    places_layer.removeLayer(places_objects[id]);
    delete( places_lids[places_objects[id]._leaflet_id] );
  }
  if( typeof(places[id] ) !== 'undefined' ) delete( places[id] );
}

function lock_map(){
  map.dragging.disable();
  map.touchZoom.disable();
  //map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  if (map.tap) map.tap.disable();
  document.getElementById('map').style.cursor='default';
}

function unlock_map(){
  map.dragging.enable();
  map.touchZoom.enable();
  //map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
  if (map.tap) map.tap.enable();
  document.getElementById('map').style.cursor='grab';
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

    update_overlays();

    can_i_edit  = true;
    can_i_store = true;

    if(store && !localStorage.getItem('hello')){
        $('#plank_hello').addClass('active');
        localStorage.setItem('hello',1);
    }

    // Если надо, включаем места
    decide_toggle_places();

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

    // Если надо, включаем места
    decide_toggle_places();
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
        let storedRoute, storedPoints, storedStickers, routeLatLngs;

        try {
            storedRoute = JSON.parse(localStorage.getItem("route"));
        } catch(e) {
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
            console.log('Here!', localStorage.getItem("logo"));
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
              console.log('clck');
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

        $.get('/engine/auth.php',
            {'name': decodeURI(name), 'action': 'load'},
            function(data){
                if(data.success){
                    drop_route();
                    drop_stickers();
                    drop_points();
                    can_i_store = false;


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
            );
        }
}

function change_mode(hash){
    hash=hash.substr(1).split(/[:\/\?]+/);
    if(hash[0]=='map' && hash[1]){
        can_i_load = false;
        if(can_i_edit){
            disable_editor();
        }
        can_i_store = false;
        remote_load_data(hash[1]);
        check_token(function(){ disable_places(); });
    }else if(hash[0]=='editor'){
        //console.log('changing'+hash[0]);
        enable_editor();
        check_token();
        can_i_store = true;
        local_store_data();
    }else if(hash[0]=='place'){
        //console.log('changing'+hash[0]);
        check_token( function(){ show_place(hash[1]); } );
    }else{
        check_token();
        disable_editor();
        can_i_store = false;
    }
    init_uploader();
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
        place_stop_editing();
        close_place();
        set_token(input_data.id, input_data.token, 'vk');
        check_token(function(){ show_places(); });
    },'json').fail(
        function(a,b,c){
            report_xhr_error(a,'move_data');
        }
    );
}

function do_logout(){
    place_stop_editing();
    close_place();
    $('#sub_plank_user').removeClass('active');
    set_token(null,null,null);
    gen_guest_token(function(){ show_places(); });
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
    close_place();
    if($('#chat_left_slide').hasClass('active')){
        close_chat();
    }else{
        $('#chat_input_box').focus();
        $('#editor_left_slide').removeClass('active');
        $('#chat_left_slide').addClass('active');
        chat_get();
        $('#menu_user_chat_count').removeClass('active');
        $('#chat_left_slide').addClass('active');
        chat_timer = setInterval(chat_get, 30000);
    }
}

function close_chat(){
    $('#chat_left_slide').removeClass('active');
    clearInterval(chat_timer);
}

function chat_get(){
//    console.log('chat');
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
    // При нажатии enter в поле ввода чата отправляет сообщение
    if( typeof(e) !== 'undefined' && e.type === 'keyup' && e.keyCode === 13 ){
        // Блюрим по эскейпу
        chat_put();
    }
}

function check_input_title (e) {
    e = typeof(e) !== 'undefined' ? e : (typeof(window.event) !== 'undefined' ? window.event : null);
    obj = $('#place-input-title');
    if(obj.val().length > 32){
        obj.val(obj.val().substr(0,32))
    }
    $('#place_title_progress .bar').css('width', parseInt(obj.val().length/32*100) + '%');
}

function input_title_enter(e){
    // Отслеживает нажатие enter в title редактора мест
    e = typeof(e) !== 'undefined' ? e : (typeof(window.event) !== 'undefined' ? window.event : null);
    if(e && e.keyCode && e.keyCode === 13){
        e.preventDefault();
        save_place_data();
    }
}

function check_input_desc (e) {
    // Обрезает текст в textarea редактора мест и двигает прогрессбар
    e = typeof(e) !== 'undefined' ? e : (typeof(window.event) !== 'undefined' ? window.event : null);
    obj = $('#place-input-desc');
    if(obj.val().length > 400){
        obj.val(obj.val().substr(0,400))
    }

    $('#place_desc_progress .bar').css('width', parseInt(obj.val().length/420*100) + '%');
}

function input_desc_ctrlenter(e){
    // По ctrl+enter отправляет данные в textarea редактора мест
    e = typeof(e) !== 'undefined' ? e : (typeof(window.event) !== 'undefined' ? window.event : null);

    if(e && e.keyCode && e.keyCode === 13 && e.ctrlKey){
        e.preventDefault();
        save_place_data();
    }
    //console.log(e);
}

function place_check_input(){
    // Проверяет введёные данные в редакторе мест
    obj = $('#place-input-title');
    if(obj.val().replace(/\s/,'').length >= 2){
        $('#place_error_container .place_error_title').hide();
        return true;
    }else{
        $('#place_error_container .place_error_title').show();
        return false;
    }
}

function select_place_type(e, type){
    // Срабатывает по нажатию на чекбокс в меню выбора типов мест для показа
    // Добавляет тип мест к списку выбранных / убирает его
    e = typeof(e) !== 'undefined' ? e : ( typeof(window.event) !== 'undefined' ? window.event : null);

    // Если есть event, то продолжаем
    if(!e || !place_types[type]) return;
    // Объект, по которому кликнули
    obj = $(e.target)
    // Очищаем список выбранных мест
    place_types_selected.splice(0, place_types_selected.length);
    // Обновляем список выбранных мест
    checkboxes = $('#places-view-checkboxes').find('input').get();
    for( index=0; index < checkboxes.length; index++ ){
        value = checkboxes[index];
        if( typeof(place_types[$(value).data('type')]) !== 'undefined' && $(value).prop("checked")){
            place_types_selected.push($(value).data('type'));
        }
    }

    // Запоминаем их в localStorage
    if( typeof(localStorage) !== 'undefined' ){
        localStorage.setItem('place_types', place_types_selected.join(","));
    }

    // Второстепенное поведение при выключении всех чекбоксов или включении чекбокса
    // при выключенных местах
    if( $('.btn-places-view').hasClass('inactive') && place_types_selected.length > 0){
        // если нажали по чекбоксу, а показ выключен
        enable_places();
    }else if( place_types_selected.length == 0){
        // чекбокс выключал последнюю опцию
        disable_places();
    }else{
        // В остальных, обычных случаях, просто обновляем места на карте
        show_places();
    }
}

function toggle_places(){
    if( $('.btn-places-view').length <= 0 ){ return; }
    if( $('.btn-places-view').hasClass('inactive') ){
        enable_places();
    }else{
        disable_places();
    }
}

function enable_places(){

    $('.btn-places-view').removeClass('inactive')
    $('#places-toggle-' + (can_i_edit ? 'editor' : 'viewer')).prop("checked", true);
    $('span.places-view-tooltip').removeClass('inactive');

    places_show[ can_i_edit ? 1 : 0] = 1;
    store_places_view();
    show_places();

}

function disable_places(){

    $('.btn-places-view').addClass('inactive')
    $('#places-toggle-' + (can_i_edit ? 'editor' : 'viewer')).prop("checked", false);
    $('span.places-view-tooltip').addClass('inactive');

    places_show[ can_i_edit ? 1 : 0] = 0;

    store_places_view();
    hide_places();

}

function store_places_view(){
    if( typeof(localStorage) !== 'undefined' ){
        localStorage.setItem('places_show', places_show.join(","));
    }

}

function decide_toggle_places(){
    // При переключении между режимами редактора и просмотра,
    // а так же при загрузке выбирает, показывать места или нет,
    // в зависимости от настроек

    if(!places_show){ return; }

    if( (can_i_edit && places_show[1]==1) || (!can_i_edit && places_show[0]==1) ){
        enable_places();
    }else{
        disable_places();
    }

}

function select_place_view(e){
    // Срабатывает при нажатии на чекбокс "Показывать при просмотре / в редакторе"

    e = typeof(e) !== 'undefined' ? e : ( typeof(window.event) !== 'undefined' ? window.event : null);

    // Если есть event, то продолжаем
    if(!e) return;
    // Объект, по которому кликнули
    obj = $(e.target);

    // Меняем текущий режим отображения
    places_show[ obj.data('type') == 'editor' ? 1 : 0 ] = obj.prop("checked") ? 1 : 0;

    // Запускаем выбор режима отображения мест, там же будет сохранение
    decide_toggle_places();
}

function place_comment_put(){
    token = get_token();

    msg = $('#place_comment_input_box').val().replace(new RegExp('<', 'g'),"&lt;").replace(new RegExp('>', 'g'),"&gt;").replace(new RegExp(">", 'g'),"<br>");
    chat_hold = true; // она для чата, но пофиг

    if(msg.length>0){
        $('#place_comment .button').addClass('active');
        setTimeout(function(){$('#place_comment .button').removeClass('active');}, 500)
        $('#place_history_buffer').append('<div class="chat_msg chat_own_msg"><i class="fa fa-circle-o-notch fa-spin fa-fw pull-right"></i>' + msg + '</div>');
        $('#place_comment_input_box').val('');

        $.get('/engine/auth.php',
            {   'action': 'place_comment',
                'id': token.id,
                'token': token.token,
                'message': msg,
                'place': active_place
            },
            function(data){
                if(data.success){
                    $('#place_history_buffer').html('');
                    $('#place_history_buffer').before(data.message);
                }
                chat_hold = false;
            }, 'json').fail(
            function(a,b,c){
                chat_hold = false;
                report_xhr_error(a,'place_comment');
            }
        );
    }
    $('#chat_input_box').val('').focus();
}

function place_comment_watch_enter(e){
    // При нажатии enter в поле ввода чата отправляет сообщение
    if( typeof(e) !== 'undefined' && e.type === 'keyup' && e.keyCode === 13 ){
        // Блюрим по эскейпу
        place_comment_put();
    }
}

function init_uploader(){

    $('#place_thumb_uploader').fineUploader({
        debug: false,
        request: {
            endpoint: '/put/endpoint.php',
        },
        retry: {

        }
    })
    .on('complete', function (event, id, name, data) {
        if(data && !data.error){
            if(data.uuid && data.uploadName){
                $('#place_thumb').removeClass('upload_started upload_error').addClass('upload_success');
                setTimeout(function(){ $('#place_thumb').removeClass('upload_success'); }, 2000)
                $("#place_thumb").css('background-image', 'url(\'/misc/thumbs/' + data.uuid + '/' + data.uploadName + '\')');
                $("#place_thumb").removeClass('no_thumb')
            }else{
                $('#place_thumb').removeClass('upload_started upload_success').addClass('upload_error');
                setTimeout(function(){ $('#place_thumb').removeClass('upload_error'); }, 2000)
            }
        }else{
            $('#place_thumb').removeClass('upload_started upload_success').addClass('upload_error');
            setTimeout(function(){ $('#place_thumb').removeClass('upload_error'); }, 2000)
        }
    })
    .on('submitted', function(a,b,c){
        $('#place_thumb').removeClass('upload_success upload_error').addClass('upload_started');
    })
    .on('error', function (a,b,c) {
        $('#place_thumb').removeClass('upload_started upload_success').addClass('upload_error');
        setTimeout(function(){ $('#place_thumb').removeClass('upload_error'); }, 2000)
        //console.log('error');
        //console.log(a,b,c);
    });

}

function update_uploader(){
    console.log('fire!');
    token = get_token();
    $('#place_thumb_uploader').fineUploader('setParams',{
        'id':       token.id,
        'token':    token.token,
        'place':    active_place
    });
}

/*

Все сторонние функции

*/
//
// function transliterate(engToRus) {
//     var     rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
//             eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
//         return function(text, engToRus) {
//             var x;
//             for(x = 0; x < rus.length; x++) {
//                 text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
//                 text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
//             }
//             return text;
//         }
// }
function translit(text){
    var arrru = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'],
        arren = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e'];

    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
    }
    return text;
}


/* в чём стори: когда заходим на карту, открывается редактор. А схуяли?
*/
