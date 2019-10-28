<?php

$content = '
    <li class="facilities-icon-off">
        <span class="facilities-item baby-bed"></span>
        <span class="facilities-info-text">ベビーベッド</span>
    </li>
';

$patterns = array(
    'li' => [ //名前
        'select' => '/<(li|\/li)/s', //選択
        'change_after' => 'div'  //置換後
    ],
    'facilities' => [ //名前
        'select' => '/facil(i(ti))es/s', //選択
        'change_after' => 'aaa'  //置換後
    ],
    'class' => [ //名前
        'select' => '/class/s', //選択
        'change_after' => 'id'  //置換後
    ]
);

echo "変更前\n";
echo $content;

$preg_match_contents = array();
$new_preg_match_contents = array();
foreach ( $patterns as $key => $value ) {
    // コンテンツから変換する部分の抜き出し
    if ( preg_match_all( $value[ 'select' ], $content, $preg_match_contents ) ) {
        $last_index = array_keys( $preg_match_contents, end( $preg_match_contents ) );
        // 変換する場所の指定
        $change_before = '/' . $preg_match_contents[ $last_index[ 0 ] ][ 0 ] . '/s';
        // 変更後のコンテンツを作成
        $new_preg_match_contents = preg_replace( $change_before, $value[ 'change_after' ], $preg_match_contents[ 0 ] );
        // 変換前と変換後を入れ替え
        $content = str_replace( $preg_match_contents[ 0 ], $new_preg_match_contents, $content );
    }
}

echo "\n変更後\n";
echo $content;