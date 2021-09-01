<?php
ini_set("display_errors", "On");
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datemonth = date("Y-m");
switch ($_POST['action']) {
    //生成該月紀錄
    case "add_new_payment":
        //檢測該月紀錄
        // $check_payent = $conn->query("select from buxiban_payment where buxiban_id = $buxiban_id AND payment_time = '$datemonth'"); 
        // if($check_payent){

        // }
        // else{
            //取學生表
            // $get_std_list = $conn->query("select std_id,std_name,parent_name,parent_phone from buxiban_student,bixiban_parent where buxiban_student.parent_id = bixiban_parent.parent_id AND bixiban_student.buxiban_id=$buxiban_id")->fetchAll(PDO::FETCH_ASSOC);
            //
            // $std_info = $conn->query("select buxiban_student.std_id,buxiban_student.std_name from buxiban_student where buxiban_student.buxiban_id =$buxiban_id AND buxiban_student.std_id in(SELECT std_id FROM buxiban_selcourse where buxiban_selcourse.course_id = $course_id)")->fetchAll(PDO::FETCH_ASSOC);
        }
        // $course_id = $_POST['course_id'];
        // $std_id = json_decode($_POST['one_btn_delete_std_array'],true);
        // foreach ($std_id as $value) {
        //     $sqlsend = $conn->query("delete from buxiban_selcourse where course_id = $course_id AND std_id = $value"); 
        // }
    break;

    ////切換繳款狀態
    case "update_payment_states":
        // $record_id = $_POST['record_id'];
        // $sqlsend = $conn->query("update buxiban_record_payment set record_payment_states = NOT(record_payment_states) where record_id = $record_id"); 
        
    break;

    //刪除紀錄
    case "":
        // $course_id = $_POST['course_id'];
        // $std_id = json_decode($_POST['one_btn_delete_std_array'],true);
        // foreach ($std_id as $value) {
        //     $sqlsend = $conn->query("delete from buxiban_selcourse where course_id = $course_id AND std_id = $value"); 
        // }

    break;
}
$conn = null;
?>