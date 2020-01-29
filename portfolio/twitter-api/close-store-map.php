<?php
require_once('index.php');

$connect = Twitter_OAuth();

// ハッシュタグによるツイート検索
$search_hash = $connect->get(
    'search/tweets',
    array(
        'q' => '#閉店セール　OR　#閉店' ,
        'count' => '100',
        'lang'=>'ja'
    )
)->statuses;


foreach ($search_hash as $value) {
    if ($value->user->followers_count > 500) {
        echo '<pre>';
        print_r($value->created_at." ");
        print_r($value->user->screen_name." ");
        print_r($value);
        echo '</pre>';
    }
    // $value->user->followers_count
    // exit;
}
