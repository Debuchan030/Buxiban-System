<?php
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
switch ($_POST['action']) {
    //取得現有課程列表
    case "get_course":
        $course = $conn->query("select * from buxiban_course where buxiban_id= $buxiban_id")->fetchall(PDO::FETCH_OBJ);
        echo json_encode($course);
        break;

    //取得有選課之學生
    case "get_selcourse_std":
        $course_id = $_POST['course_id'];
        $std_info = $conn->query("select buxiban_student.std_id,buxiban_student.std_name from buxiban_student where buxiban_student.buxiban_id =$buxiban_id AND buxiban_student.std_id in(SELECT std_id FROM buxiban_selcourse where buxiban_selcourse.course_id = $course_id)")->fetchAll(PDO::FETCH_ASSOC);
        if($std_info){
            echo json_encode($std_info);
        }
        else{
            echo "no data";
        }
        break;

    //取得未選課之學生 
    case "get_nonselcourse_std":
        $course_id = $_POST['course_id'];
        $std_info = $conn->query("select buxiban_student.std_id,buxiban_student.std_name from buxiban_student where buxiban_student.buxiban_id =$buxiban_id AND buxiban_student.std_id NOT in(SELECT std_id FROM buxiban_selcourse where buxiban_selcourse.course_id = $course_id)")->fetchAll(PDO::FETCH_ASSOC);        if($std_info){
            echo json_encode($std_info);
        }
        else{
            echo "no data";
        }
        break;

    //新增選課學生
    case "add_selcourse":
        $course_id = $_POST['course_id'];
        $std_id = json_decode($_POST['one_btn_add_std_array'],true);
        foreach ($std_id as $value) {
            $sqlsend = $conn->query("Insert into buxiban_selcourse(std_id,course_id) value($value,$course_id);"); 
            $sqlsend = $conn->query("update buxiban_student set selcourse_states=1 where std_id=$value");
        }
        break;
    //刪除選課學生
    case "delete_selcourse":
        $course_id = $_POST['course_id'];
        $std_id = json_decode($_POST['one_btn_delete_std_array'],true);
        foreach ($std_id as $value) {
            $sqlsend = $conn->query("delete from buxiban_selcourse where course_id = $course_id AND std_id = $value");
            $sqlsend = $conn->query("update buxiban_student set selcourse_states=1 where std_id=$value");
        }
        break;
}
$conn=null;
?>