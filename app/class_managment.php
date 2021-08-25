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
    case "add_course": 
        //print_r($_POST);
        $course_name = $_POST['course_name'];
        $course_price = $_POST['course_price'];
        $course_info = $_POST['course_info'];
        $course_time = $_POST['course_time'];
        $sqlsend = $conn->query("Insert into buxiban_course(course_name,course_price,course_info,course_time,buxiban_id) value('$course_name','$course_time','$course_info','$course_time',$buxiban_id);");
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
    case "update_course":
        $course_id = $_POST['course_id'];
        $course_name = $_POST['course_name'];
        $course_price = $_POST['course_price'];
        $course_info = $_POST['course_info'];
        $course_time = $_POST['course_time'];
        $sqlsend = $conn->query("update buxiban_course set course_name='$course_name' ,course_price='$course_price' ,course_info='$course_info',course_time='$course_time' where course_id = $course_id;");
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
    case "delete_course":
        $course_id = $_POST['course_id'];
        $sqlsend = $conn->query("delete from buxiban_course where course_id = $course_id;");
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