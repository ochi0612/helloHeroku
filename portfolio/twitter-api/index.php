<?php

// CRC試験用
if(isset($_REQUEST['crc_token'])) {
  $signature = hash_hmac('sha256', $_REQUEST['crc_token'], 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ', true);
  $response['response_token'] = 'sha256='.base64_encode($signature);
  print json_encode($response);
  exit;
}

// {
//   "id": "1216955312290222080",
//   "url": "https://ochi.herokuapp.com/portfolio/twitter-api/",
//   "valid": true,
//   "created_timestamp": "2020-01-14 05:28:52 +0000"
// }

// TwitterOAuthを利用するためautoload.phpを読み込み
require_once('twitteroauth/autoload.php');
// TwitterOAuthクラスをインポート
use Abraham\TwitterOAuth\TwitterOAuth;

function Twitter_OAuth() {

    // Twitter APIを利用するための認証情報。xxxxxxxxの箇所にそれぞれの情報をセット
    $CK = 'jqiCT1aoHkS1kIBhJDGj9zB2A'; // Consumer Keyをセット
    $CS = 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ'; // Consumer Secretをセット
    $AT = '1214022018179272706-W0fRr6ryoPyWY3Q2qwy8o0EEEiHHbX'; // Access Tokenをセット
    $AS = 'EAxDHKOwbEzCSC6duxgvXkCECiY2FoxszWMpTK3Cq3qiy'; // Access Token Secretをセット

    return new TwitterOAuth( $CK, $CS, $AT, $AS );
}

// Account Activity API
require_once('auto-tweet.php');

