<?php
session_start();
include("dbconfig.php");
$date = date("Y-m-d");
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
                $buxiban_id = $buxiban['buxiban_id'];
                $_SESSION['buxiban_id'] = $buxiban_id;
                $_SESSION['buxiban_name'] = $buxiban['buxiban_name'];
                //檢查今日紀錄狀態 
                $checkattend =$conn->query("select buxiban_attend.std_id from buxiban_attend,buxiban_student where buxiban_student.buxiban_id=$buxiban_id AND buxiban_student.std_id=buxiban_attend.std_id AND buxiban_attend.date='$date'")->fetch(PDO::FETCH_ASSOC);
                if(!$checkattend){
                    $get_std_list =$conn->query("select std_id from buxiban_student where buxiban_id=$buxiban_id")->fetch(PDO::FETCH_ASSOC);
                    for($i=0;$i<count($get_std_list);$i++){
                        $std_id = $get_std_list[$i]['std_id'];
                        $buxiban =$conn->query("insert into buxiban_attend(std_id,date) value($std_id,'$date')");
                    }
                }
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