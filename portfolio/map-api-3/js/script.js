var marker = [];
var latlngObj = [];
var address = [];
var searchArea = ["東京駅","池袋駅", "新宿駅", "渋谷駅"];

// map出力
function setMap() {
    // 初期値
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: {lat: 0,lng: 0}
    });
}

// マーカーの新規出力(複数)
function setMarker(address) {
    for (let i = 0; i < latlngObj.length; i++) {
        marker[i] = new google.maps.Marker({
            map: map,
            position: latlngObj[i],
            animation: google.maps.Animation.DROP,
            icon: {
                path: 'M -1,-1 1,1 M 1,-1 -1,1', //円を指定
                scale: 5, //円のサイズ
                strokeColor: "#ff5353", //枠の色
                strokeWeight: 4.0 //枠の太さ
            }
        });
        attachMessage(marker[i], address[i]);
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
    if (marker[0].getPosition()) {
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
}

// 吹き出し
function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function (event) {
        new google.maps.InfoWindow({
            content: msg
        }).open(marker.getMap(), marker);
    });
}

function getAddressInfo() {

    for (let i = 0; i < searchArea.length; i++) {
        var geocoder = new google.maps.Geocoder();

        // geocodeリクエストを実行。
        geocoder.geocode({
            address: searchArea[i]
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                for (var a in results) {
                    if (results[a].geometry) {

                        // 住所取得
                        address[i] = results[a].formatted_address.replace(/^日本\、/, '');

                        // 緯度経度を取得
                        latlngObj[i] = results[a].geometry.location;
                        setMarker(address);
                        zoomAdjustment();
                        setLines(latlngObj);
                    }
                }
            } else {
                alert("えぇ～っと・・、バージョンアップ？");
            }
        });
    }
}

// 作成用関数
function initMap() {
    setMap();
    getAddressInfo();
    // zoomAdjustment();
    // setLines(LatLng);
}

