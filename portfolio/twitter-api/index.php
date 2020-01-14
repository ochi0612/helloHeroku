<?php

$json = file_get_contents("php://input");

// JSON文字列をobjectに変換
//   ⇒ 第2引数をtrueにしないとハマるので注意
$contents = json_decode($json, true);

// デバッグ用にダンプ
// var_dump($contents['test']);

if(isset($contents['tweet_create_events'])) {
    $file = 'people.txt';
    $old_ids_data = file_get_contents($file);
    file_put_contents($file, $old_ids_data."\n".json_encode($contents));

    // TwitterOAuthを利用するためautoload.phpを読み込み
    require_once('twitteroauth/autoload.php');
    // TwitterOAuthクラスをインポート
    use Abraham\TwitterOAuth\TwitterOAuth;

    // Twitter APIを利用するための認証情報。xxxxxxxxの箇所にそれぞれの情報をセット
    $CK = 'jqiCT1aoHkS1kIBhJDGj9zB2A'; // Consumer Keyをセット
    $CS = 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ'; // Consumer Secretをセット
    $AT = '1214022018179272706-W0fRr6ryoPyWY3Q2qwy8o0EEEiHHbX'; // Access Tokenをセット
    $AS = 'EAxDHKOwbEzCSC6duxgvXkCECiY2FoxszWMpTK3Cq3qiy'; // Access Token Secretをセット

    $connect = new TwitterOAuth( $CK, $CS, $AT, $AS );

    // ツイートAPI
    $text = '@'.$contents['tweet_create_events'][0]['user']['screen_name'].' ありがとう'.mt_rand();
    $statuses = $connect->post(
        "statuses/update",
        array(
            "status" => $text
        )
    );

    echo 'test';
}





// // CRC試験用
// if(isset($_REQUEST['crc_token'])) {
//   $signature = hash_hmac('sha256', $_REQUEST['crc_token'], 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ', true);
//   $response['response_token'] = 'sha256='.base64_encode($signature);
//   print json_encode($response);
//   exit;
// }

// // {
// //   "id": "1216937494383456256",
// //   "url": "https://5fdfec8a.ngrok.io/private/portfolio/twitter-api/",
// //   "valid": true,
// //   "created_timestamp": "2020-01-14 04:18:03 +0000"
// // }

// // TwitterOAuthを利用するためautoload.phpを読み込み
// require_once('twitteroauth/autoload.php');
// // TwitterOAuthクラスをインポート
// use Abraham\TwitterOAuth\TwitterOAuth;

// // Twitter APIを利用するための認証情報。xxxxxxxxの箇所にそれぞれの情報をセット
// $CK = 'jqiCT1aoHkS1kIBhJDGj9zB2A'; // Consumer Keyをセット
// $CS = 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ'; // Consumer Secretをセット
// $AT = '1214022018179272706-W0fRr6ryoPyWY3Q2qwy8o0EEEiHHbX'; // Access Tokenをセット
// $AS = 'EAxDHKOwbEzCSC6duxgvXkCECiY2FoxszWMpTK3Cq3qiy'; // Access Token Secretをセット

// $connect = new TwitterOAuth( $CK, $CS, $AT, $AS );

// // リツイートしたユーザーIDの一覧取得API（最大100件）
// $user_id = $connect->get(
//     'statuses/retweeters/ids',
//     array(
//         'id' => '1215208380056256512',
//         'count' => '50'
//     )
// );

// $file = 'people.txt';
// $old_ids_data = file_get_contents($file);
// $new_ids_data = implode(',', $user_id->ids);

// // if (!isset($user_id->ids[0]) || preg_match('/'.$user_id->ids[0].'/', $old_ids_data, $content)) {
// //     exit;
// // }

// // if ($old_ids_data === $new_ids_data) {
// //     exit;
// // }

// // リツイートしたユーザーがフォローしているのかの確認
// // $followers_id = $connect->get(
// //     'followers/ids',
// //     array('user_id' => '1214022018179272706')
// // );

// // echo '<pre>';
// // print_r($user_id->ids);
// // print_r($followers_id);
// // echo '</pre>';

// file_put_contents($file, $new_ids_data);

// // exit;

// // ユーザー情報取得API
// $user_info = $connect->get(
//     'users/show',
//     array(
//         'user_id' => $user_id->ids[0],
//     )
// );

// // テキスト作成
// if ($user_info->screen_name === '') {
//     $text = '鍵垢やんけ';
// } else {
//     $text = '@' . $user_info->screen_name . 'ありがとう';
// }

// // ツイートAPI
// $statuses = $connect->post("statuses/update", array("status" => $text));

// echo '<pre>';
// print_r($user_id->ids[0]."\n");
// print_r($user_info->screen_name."\n");
// print_r($text."\n");
// echo '</pre>';

// exit;