<?php

// 获取前端的传来的值
$uname=$_POST['uname'];
$password=$_POST['password'];

$sql="SELECT * FROM `users` WHERE `uname`='$uname' AND `upassword`='$password'";
$link=mysqli_connect('localhost','root','root','test');
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);


if(count($data)){
    $arr=array(
        'message'=>'请求成功',
        'code'=>1,
        'nickname'=>$data[0]['nickname'],
    );
}else{
    $arr=array(
        'message'=>'请求失败',
        'code'=>0,
    );
}
echo json_encode($arr);



?>