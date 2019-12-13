
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
        var latlng = {
            lat: latitude,
            lng: longitude
        };
        // Google Mapsに書き出し
        var map = new google.maps.Map(document.getElementById('map'), {
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
