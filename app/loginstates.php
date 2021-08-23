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
            echo '<script>window.location.replace("/login")</script>';
        }
        else{
            include("dbconfig.php");
            $sqlresult =$conn->query("select * from buxiban_user where user_acct = '$acc' and user_pwd=md5('$pwd')");
            $user=$sqlresult->fetch();
            //print_r ($user);
            if($user){
                $_SESSION['user_id']=$user['user_id'];
                $_SESSION['user_name']=$user['user_name'];
                $_SESSION['pc_quantity']=$user['pc_quantity'];
                echo '<script>window.location.replace("/")</script>';
            }
            else{ 
                echo '<script> window.alert("帳號或密碼錯誤!");</script>';
                echo '<script>window.location.replace("/login")</script>';
            }
            $conn=null;
        }

    break;
    
    //登出
    case "logout":
        session_start();
        session_destroy();
        echo '<script>window.location.replace("/login")</script>';
    break;
}
?>