<?php
session_start();
include("dbconfig.php");
switch ( $_POST['action'] ) { 
    //登入驗證
    case "login": 
        $acct = $_POST["buxiban_acct"];
        $pwd = $_POST["buxiban_pwd"];
        if(!isset($acct) || !isset($pwd)){
            echo '<script> window.alert("請輸入帳號或密碼!");</script>';
            header("location:/login.php");
        }
        else{
            $buxiban =$conn->query("select * from buxiban_user where buxiban_acct = '$acct' and buxiban_pwd=md5('$pwd')")->fetch(PDO::FETCH_ASSOC);
            if($buxiban){
                $_SESSION['buxiban_id'] = $buxiban['buxiban_id'];
                $_SESSION['buxiban_name'] = $buxiban['buxiban_name'];
                header("location:/index.php");
            }
            else{ 
                echo '<script> window.alert("帳號或密碼錯誤!");</script>';
                echo '<script>window.location.replace("/login.php")</script>';
            }
        }
    break;
    //傳送補習班名稱
    case "get_buxiban_name":
        echo $_SESSION['buxiban_name'];
    break;
}
$conn=null;
?>