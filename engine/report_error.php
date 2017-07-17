<?
file_put_contents('../logs/'.date('Y-m-d H:i:s.').'txt', print_r($_REQUEST,true));
echo json_encode(array('success'=>true));
?>