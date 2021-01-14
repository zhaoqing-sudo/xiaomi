<?php

// 获取前端的传来的值
$uname=$_POST['uname'];
$password=$_POST['password'];
$nkname=$_POST['nkname'];


$sql="INSERT INTO `users` (`uname`,`upassword`,`nickname`) VALUE ('$uname','$password','$nkname' )";
$link=mysqli_connect('localhost','root','root','test');
$res=mysqli_query($link,$sql);
mysqli_close($link);

echo $res;



?>