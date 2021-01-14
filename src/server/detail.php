<?php

// 获取前端的传来的值
$good_id=$_GET['goods_id'];

$sql="SELECT * FROM `xiaomi_table` WHERE `id`='$good_id' ";
$link=mysqli_connect('localhost','root','root','test');
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);


echo json_encode($data);



?>