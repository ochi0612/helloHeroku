
var map;
var marker = [];
var LatLng = [];
var mapLatLng = [{
        name: "aaa",
        let: 10,
        lng: 100
    },
    {
        name: "bbb",
        let: 10.2,
        lng: 100.1
    },
    {
        name: "ccc",
        let: 10.8,
        lng: 100.2
    },
    {
        name: "ddd",
        let: 10.2,
        lng: 100.3
    },
    {
        name: "eee",
        let: 10.6,
        lng: 100.4
    },
    {
        name: "fff",
        let: 10.0,
        lng: 100.5
    }
];

var mapStyles = [{
        "featureType": "landscape",
        "stylers": [{
            "color": "#f0f0f0"
        }]
    },
    {
        "featureType": "poi",
        "stylers": [{
                "color": "#f0f0f0"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [{
            "visibility": "off"
        }]
    }
];

// 現在地取得
function getMyPlace() {
    var output = document.getElementById("result");
    if (!navigator.geolocation) { //Geolocation apiがサポートされていない場合
        output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude; //緯度
        var longitude = position.coords.longitude; //経度
        output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
        // 位置情報
        var latlng = new google.maps.LatLng(latitude, longitude);
        // Google Mapsに書き出し
        var map = new google.maps.Map(document.getElementById('map2'), {
            zoom: 15, // ズーム値
            center: latlng, // 中心座標
            stylers: mapStyles
        });
        // マーカーの新規出力
        new google.maps.Marker({
            map: map,
            position: latlng,
        });
    };

    function error() {
        //エラーの場合
        output.innerHTML = "座標位置を取得できません";
    };
    navigator.geolocation.getCurrentPosition(success, error); //成功と失敗を判断
}

// map出力
function setMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: new google.maps.LatLng(mapLatLng[0].let, mapLatLng[0].lng),
        styles: mapStyles
    });
}

// マーカーの新規出力(複数)
function setMarker() {
    for (let i = 0; i < mapLatLng.length; i++) {
        LatLng[i] = new google.maps.LatLng(mapLatLng[i].let, mapLatLng[i].lng);
        marker[i] = new google.maps.Marker({
            map: map,
            position: LatLng[i],
            animation: google.maps.Animation.DROP,
            icon: {
                path: 'M -1,-1 1,1 M 1,-1 -1,1', //円を指定
                scale: 5, //円のサイズ
                strokeColor: "#ff5353", //枠の色
                strokeWeight: .5, //枠の透過率
                strokeWeight: 4.0
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
