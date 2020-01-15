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
require_once('../../lib/twitteroauth/autoload.php');
// TwitterOAuthクラスをインポート
use Abraham\TwitterOAuth\TwitterOAuth;

// Twitter APIを利用するための認証情報。xxxxxxxxの箇所にそれぞれの情報をセット
$CK = 'jqiCT1aoHkS1kIBhJDGj9zB2A'; // Consumer Keyをセット
$CS = 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ'; // Consumer Secretをセット
$AT = '1214022018179272706-W0fRr6ryoPyWY3Q2qwy8o0EEEiHHbX'; // Access Tokenをセット
$AS = 'EAxDHKOwbEzCSC6duxgvXkCECiY2FoxszWMpTK3Cq3qiy'; // Access Token Secretをセット

$connect = new TwitterOAuth( $CK, $CS, $AT, $AS );


$json = file_get_contents("php://input");

// JSON文字列をobjectに変換
//   ⇒ 第2引数をtrueにしないとハマるので注意
$contents = json_decode($json, true);

if(isset($contents['tweet_create_events']) && $contents['tweet_create_events'][0]['retweeted_status']['id_str'] === '1215208380056256512') {

    // ID取得API
    $ids = $connect->get(
        "friends/ids",
        array(
            "user_id" => $contents['tweet_create_events'][0]['user']['id']
        )
    );

    if (array_search($contents['for_user_id'], $ids->ids) !== false) {

        // ツイートAPI
        $text = '@'.$contents['tweet_create_events'][0]['user']['screen_name'].' ありがとう'.mt_rand();
        $statuses = $connect->post(
            "statuses/update",
            array(
                "status" => $text
            )
        );

        echo '成功';

    }

    exit;
}