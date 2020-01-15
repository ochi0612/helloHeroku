<?php

$json = file_get_contents("php://input");

// JSON文字列をobjectに変換
//   ⇒ 第2引数をtrueにしないとハマるので注意
$contents = json_decode($json, true);

$connect = Twitter_OAuth();

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