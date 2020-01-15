// ハッシュタグによるツイート検索
$hash_params = ['q' => '#html5,#css3' ,'count' => '10', 'lang'=>'ja'];
$hash = $connection->get('search/tweets', $hash_params)->statuses;
