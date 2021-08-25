<?php
switch ( $_POST['action'] ) { 
    //登入
    case "login": 
        session_start();
        //ini_set("display_errors", "On"); 
        $acct = $_POST["buxiban_acct"];
        $pwd = $_POST["buxiban_pwd"];

        if(!isset($acct) || !isset($pwd)){
            echo '<script> window.alert("請輸入帳號或密碼!");</script>';
            echo '<script>window.location.replace("/login.php")</script>';
        }
        else{
            include("dbconfig.php");
            $sqlresult =$conn->query("select * from buxiban_user where buxiban_acct = '$acct' and buxiban_pwd=md5('$pwd')");
            $buxiban = $sqlresult->fetch();
            //print_r($user);
            if($buxiban){
                $_SESSION['buxiban_id'] = $buxiban['buxiban_id'];
                $_SESSION['buxiban_name'] = $buxiban['buxiban_name'];
                $aaa = $_SESSION['buxiban_id'];
                echo "<script>alert('$aaa')</script>";
                echo '<script>window.location.replace("/")</script>';
            }
            else{ 
                echo '<script> window.alert("帳號或密碼錯誤!");</script>';
                echo '<script>window.location.replace("/login.php")</script>';
            }
            $conn=null;
        }

    break;
}
?>