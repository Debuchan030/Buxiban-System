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

        //取得有選課之學生
    case "get_selcourse_std":
        $course_id = $_POST['course_id'];
        $sqlresult = $conn->query("select std_id from buxiban_selcourse where course_id= $course_id");
        $std_id_array = $sqlresult->fetchAll(PDO::FETCH_ASSOC);
        $std_info = $conn->query("select * from buxiban_student where std_id IN($sqlresult)");
        $std_info = $std_info->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($std_info);
        break;

        //取得未選課之學生
    case "get_nonselcourse_std":
        $course_id = $_POST['course_id'];
        $sqlresult = $conn->query("select std_id from buxiban_selcourse where course_id= $course_id");
        $std_id_array = $sqlresult->fetchAll(PDO::FETCH_ASSOC);
        $std_info = $conn->query("select * from buxiban_student where std_id NOT IN($sqlresult)");
        $std_info = $std_info->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($std_info);
        break;

        //新增選課學生
    case "add_selcourse":

        break;
        //刪除選課學生
    case "delete_selcourse":

        break;
}
