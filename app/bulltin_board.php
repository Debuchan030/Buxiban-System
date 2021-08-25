<?php
include('dbconfig.php');
$buxiban_id = $_SESSION['buxiban_id']; 
switch ($_POST['action']) { 
    //取得公告
    case "get_bulletin":
        $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id");
        $bulletin = $sqlresult->fetch(); 
    break;

    //新增一則公告
    case "add_bulletin": 
        ini_set("display_errors", "On"); 
        $bulletin_title = $_POST['bulletin_title'];
        $bulletin_content = $_POST['bulletin_content'];
        $bulletin_time = date("Y-m-d H:i:s");  

        $sqlsend = $conn->query("Insert into buxiban_user(bulletin_title,bulletin_content,bulletin_time,buxiban_id) value('$bulletin_title','$bulletin_content','$bulletin_time','$buxiban_id');");
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("新增成功");</script>';
        }
        else{
            echo '<script> window.alert("Error");</script>';
        }
        //header("Refresh:0");
    break;
    
    //更新該則公告
    case "update_bulletin":
        
    break;

    //刪除該則公告
    case "delete_bulletin":

    break;
}

?>