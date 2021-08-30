<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
switch ($_POST['action']) {
    //依日期取得紀錄
    case "get_attend":
        $sqlresult = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_parent.parent_name,buxiban_parent.parent_phone,buxiban_attend.attend_time,buxiban_attend.leave_time,buxiban_attend.attend_states,buxiban_attend.remark FROM buxiban_student,buxiban_parent,buxiban_attend WHERE buxiban_student.parent_id=buxiban_parent.parent_id AND buxiban_attend.std_id = buxiban_student.std_id AND buxiban_student.buxiban_id = $buxiban_id");
        $atten = $sqlresult->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($atten);
    break;
    //修改附註
    case "update_attend":

        
    break;

    //刪除學生/家長資料
    case "update_attend_states":
 
    break;
    
}
?>