
var map;
var marker = [];
var LatLng = [];
var mapLatLng = [
    {
        name: "東京駅",
        latLng: {
            lat: 35.68123620000001,
            lng: 139.76712480000003
        }
    },
    {
        name: "池袋駅",
        latLng: {
            lat: 35.7295028,
            lng: 139.7109001
        }
    },
    {
        name: "新宿駅",
        latLng: {
            lat: 35.6896067,
            lng: 139.70057129999998
        }
    },
    {
        name: "渋谷駅",
        latLng: {
            lat: 35.6580339,
            lng: 139.70163579999996
        }
    },
    {
        name: "上野駅",
        latLng: {
            lat: 35.7141672,
            lng: 139.7774091
        }
    },
];

var mapStyles = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f0f0f0"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "color": "#f0f0f0"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

// map出力
function setMap() {
    // 初期値
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: {lat: 0,lng: 0},
        styles: mapStyles
    });
}

// マーカーの新規出力(複数)
function setMarker() {
    for (let i = 0; i < mapLatLng.length; i++) {
        LatLng[i] = mapLatLng[i].latLng;
        marker[i] = new google.maps.Marker({
            map: map,
            position: LatLng[i],
            animation: google.maps.Animation.DROP,
            icon: {
                path: 'M -1,-1 1,1 M 1,-1 -1,1', //円を指定
                scale: 5, //円のサイズ
                strokeColor: "#ff5353", //枠の色
                strokeWeight: 4.0 //枠の太さ
            }
        });
        attachMessage(marker[i], mapLatLng[i].name);
    }
}

// 線を引く
function setLines(LatLng) {
    var lines = new google.maps.Polyline({
        path: LatLng,
        strokeColor: "#FF0000",
        strokeWeight: 3
    });

    lines.setMap(map)
}

// 範囲内に収める
function zoomAdjustment() {
    var minX = marker[0].getPosition().lng();
    var minY = marker[0].getPosition().lat();
    var maxX = minX;
    var maxY = minY;
    for (var i = 0; i < marker.length; i++) {
        var lt = marker[i].getPosition().lat();
        var lg = marker[i].getPosition().lng();
        if (lg <= minX) {
            minX = lg;
        }
        if (lg > maxX) {
            maxX = lg;
        }
        if (lt <= minY) {
            minY = lt;
        }
        if (lt > maxY) {
            maxY = lt;
        }
    }
    var sw = new google.maps.LatLng(maxY, minX);
    var ne = new google.maps.LatLng(minY, maxX);
    var bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds);
}

// 吹き出し
function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function (event) {
        new google.maps.InfoWindow({
            content: msg
        }).open(marker.getMap(), marker);
    });
}

// 作成用関数
function initMap() {
    setMap();
    setMarker();
    zoomAdjustment();
    setLines(LatLng);
}