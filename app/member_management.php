<?php
/*
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$back = getenv("HTTP_REFERER");
switch ($_POST['action']) { 
    //取得名單
    case "get_bulletin":
        $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id");
        $bulletin = $sqlresult->fetchall(PDO::FETCH_OBJ);
        echo json_encode($bulletin);
    break;

    //新增一則公告
    case "add_bulletin": 
        //print_r($_POST);
        $bulletin_title = $_POST['bulletin_title'];
        $bulletin_content = $_POST['bulletin_content'];
        $sqlsend = $conn->query("Insert into buxiban_bulletin(bulletin_title,bulletin_content,bulletin_time,buxiban_id) value('$bulletin_title','$bulletin_content','$datetime',$buxiban_id);");
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("新增成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
        header("location:$back");
    break;
    
    //更新該則公告
    case "update_bulletin":
        $bulletin_id = $_POST['bulletin_id'];
        $bulletin_title = $_POST['bulletin_title'];
        $bulletin_content = $_POST['bulletin_content'];
        $sqlsend = $conn->query("update buxiban_bulletin set bulletin_title='$bulletin_title' ,bulletin_content='$bulletin_content',bulletin_time='$datetime' where bulletin_id = $bulletin_id;");
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("更新成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
        header("location:$back");
    break;

    //刪除該則公告
    case "delete_bulletin":
        $bulletin_id = $_POST['bulletin_id'];
        $sqlsend = $conn->query("delete from buxiban_bulletin where bulletin_id = $bulletin_id;");
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("更新成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
        header("location:$back");
    break;
}

?>