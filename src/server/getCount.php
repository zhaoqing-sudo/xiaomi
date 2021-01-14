<?php


$sql="SELECT * FROM `xiaomi_table`";
$link=mysqli_connect('localhost','root','root','test');
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);



$arr=array(
    'message'=>'请求成功',
    'code'=>1,
    'count'=>count($data),
);
echo json_encode($arr);


?>