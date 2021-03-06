<?php
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
switch ($_POST['action']) { 
    //取得公告
    case "get_bulletin":
        $bulletin = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id")->fetchall(PDO::FETCH_OBJ);  
        echo json_encode($bulletin);
    break;

    //新增一則公告
    case "add_bulletin": 
        $bulletin_title = $_POST['bulletin_title'];
        $bulletin_content = $_POST['bulletin_content'];
        $sqlsend = $conn->query("Insert into buxiban_bulletin(bulletin_title,bulletin_content,bulletin_time,buxiban_id) value('$bulletin_title','$bulletin_content','$datetime',$buxiban_id);");
        header("location:/index.php");
    break;
    
    //更新該則公告
    case "update_bulletin":
        $bulletin_id = $_POST['bulletin_id'];
        $bulletin_title = $_POST['bulletin_title'];
        $bulletin_content = $_POST['bulletin_content'];
        $sqlsend = $conn->query("update buxiban_bulletin set bulletin_title='$bulletin_title' ,bulletin_content='$bulletin_content',bulletin_time='$datetime' where bulletin_id = $bulletin_id;");
    break;

    //刪除該則公告
    case "delete_bulletin":
        $bulletin_id = $_POST['bulletin_id'];
        $sqlsend = $conn->query("delete from buxiban_bulletin where bulletin_id = $bulletin_id;");      
    break;
}
$conn=null;
?>