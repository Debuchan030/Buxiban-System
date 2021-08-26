<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$back = getenv("HTTP_REFERER");
switch ($_POST['action']) { 
    //取得現有課程列表
    case "get_course":
        $sqlresult = $conn->query("select * from buxiban_course where buxiban_id= $buxiban_id");
        $course = $sqlresult->fetchall(PDO::FETCH_OBJ);
        echo json_encode($course);
    break;

    //新增課程
    case "get_selcourse_std": 
       
    break;
    
    //更新該則公告
    case "get_nonselcourse_std":
        
    break;

    //刪除該則公告
    case "add_selcourse":
        
    break;
    case "delete_selcourse":
        
    break;
}
