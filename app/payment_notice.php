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
        // $check_payment = $conn->query("select * from buxiban_payment where buxiban_id = $buxiban_id AND payment_time = '$datemonth'"); 
        // if($check_payment){

        // }
        // else{
            // $add_payment =  $conn->query("insert into buxiban_payment(buxiban_id,payment_time) value($buxiban_id,'$datemonth')");
            //取學生表
            // $get_std_list = $conn->query("select std_id,std_name,parent_name,parent_phone from buxiban_student,buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_student.buxiban_id=$buxiban_id")->fetchAll(PDO::FETCH_ASSOC);
            // for($i=0;$i<count($get_std_list);$i++){
            //     $std_id = $get_std_list[$i]['std_id'];
            //     $get_std_selcourse = $conn->query("select course_name,course_price from buxiban_course,buxiban_selcourse where buxiban_selcourse.std_id = $std_id AND buxiban_selcourse.course_id = buxiban_course.course_id")->fetchAll(PDO::FETCH_ASSOC);
            //     if($get_std_selcourse){
            //         $add_payment = $conn->query("insert into course_name,course_price from buxiban_course,buxiban_selcourse where buxiban_selcourse.std_id = $std_id AND buxiban_selcourse.course_id = buxiban_course.course_id")->fetchAll(PDO::FETCH_ASSOC);
            
            //         print_r($get_std_selcourse);
            //     }
            //     else{
            //         print("NO DATA");
            //     }
            // }
        // }
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