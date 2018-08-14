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
        rad = deg * Math.PI/180; // radians = degrees * pi/180
        return rad;
    }


    // round to the nearest 1/1000
    function round(x) {
        return Math.round( x * 1000) / 1000;
    }

    export function middle_latlng(latlng1,latlng2){
        return { 'lat': (latlng2.lat+(latlng1.lat-latlng2.lat)/2), 'lng': (latlng2.lng+(latlng1.lng-latlng2.lng)/2) };
        //middle[0]=routes[i-1][0]+(routes[i][0]-routes[i-1][0])/2;
    }
