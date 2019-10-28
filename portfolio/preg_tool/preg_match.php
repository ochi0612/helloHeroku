<?php

$content = '
    <li class="facilities-icon-off">
        <span class="facilities-item baby-bed"></span>
        <span class="facilities-info-text">�x�r�[�x�b�h</span>
    </li>
';

$patterns = array(
    'li' => [ //���O
        'select' => '/<(li|\/li)/s', //�I��
        'change_after' => 'div'  //�u����
    ],
    'facilities' => [ //���O
        'select' => '/facil(i(ti))es/s', //�I��
        'change_after' => 'aaa'  //�u����
    ],
    'class' => [ //���O
        'select' => '/class/s', //�I��
        'change_after' => 'id'  //�u����
    ]
);

echo "�ύX�O\n";
echo $content;

$preg_match_contents = array();
$new_preg_match_contents = array();
foreach ( $patterns as $key => $value ) {
    // �R���e���c����ϊ����镔���̔����o��
    if ( preg_match_all( $value[ 'select' ], $content, $preg_match_contents ) ) {
        $last_index = array_keys( $preg_match_contents, end( $preg_match_contents ) );
        // �ϊ�����ꏊ�̎w��
        $change_before = '/' . $preg_match_contents[ $last_index[ 0 ] ][ 0 ] . '/s';
        // �ύX��̃R���e���c���쐬
        $new_preg_match_contents = preg_replace( $change_before, $value[ 'change_after' ], $preg_match_contents[ 0 ] );
        // �ϊ��O�ƕϊ�������ւ�
        $content = str_replace( $preg_match_contents[ 0 ], $new_preg_match_contents, $content );
    }
}

echo "\n�ύX��\n";
echo $content;