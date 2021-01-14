<?php

// 获取前端的传来的值
$current=$_GET['current'];
$pagesize=$_GET['pagesize'];

$sql="SELECT * FROM `xiaomi_table`";

// 分页查询
// limit 开始索引(（当前页-1）*$pagesize)，多少个（$pagesize）
$start=($current-1)*$pagesize;
$sql .=" LIMIT $start,$pagesize";

$link=mysqli_connect('localhost','root','root','test');
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);



$arr=array(
    'message'=>'请求成功',
    'code'=>1,
    'list'=>$data,
);
echo json_encode($arr);


?>