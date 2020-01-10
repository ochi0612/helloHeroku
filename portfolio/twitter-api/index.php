<?php

// CRC試験用
if(isset($_REQUEST['crc_token'])) {
  $signature = hash_hmac('sha256', $_REQUEST['crc_token'], 'lyP5QcjEPEoopezvrAovGqo6HgHXFcsqlhF63Q9xxM1nsjiJHJ', true);
  $response['response_token'] = 'sha256='.base64_encode($signature);
  print json_encode($response);
  exit;
}