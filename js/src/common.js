function findDistance(t1,n1,t2,n2) {
    var lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km;
    
    // convert coordinates to radians
    lat1 = deg2rad(t1);
    lon1 = deg2rad(n1);
    lat2 = deg2rad(t2);
    lon2 = deg2rad(n2);
    
    // find the differences between the coordinates
    dlat = lat2 - lat1;
    dlon = lon2 - lon1;
    
    // here's the heavy lifting
    a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
    c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
    dm = c * 3961; // great circle distance in miles
    dk = c * 6373; // great circle distance in km
    
    // round the results down to the nearest 1/1000
    mi = round(dm);
    km = round(dk);
    
    // display the result
    return km;
}

function deg2rad(deg) {
    var rad = deg * Math.PI/180; // radians = degrees * pi/180 
    return rad;
}


// round to the nearest 1/1000
function round(x) {
    return Math.round( x * 1000) / 1000;
}

function middle_latlng(latlng1,latlng2){
    return { 'lat': (latlng2.lat+(latlng1.lat-latlng2.lat)/2), 'lng': (latlng2.lng+(latlng1.lng-latlng2.lng)/2) };
    //middle[0]=routes[i-1][0]+(routes[i][0]-routes[i-1][0])/2;
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