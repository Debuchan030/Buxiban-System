<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$date = date("Y-m-d");
$time = date("H:i:s");

switch ($_POST['action']) {
    //依日期取得紀錄
    case "get_attend":

        if(isset($_POST['date'])){
            $date = $_POST['date'];
        }
        $attend = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_parent.parent_name,buxiban_parent.parent_phone,buxiban_attend.attend_time,buxiban_attend.leave_time,buxiban_attend.attend_states,buxiban_attend.remark FROM buxiban_student,buxiban_parent,buxiban_attend WHERE buxiban_student.parent_id=buxiban_parent.parent_id AND buxiban_attend.std_id = buxiban_student.std_id AND buxiban_student.buxiban_id = $buxiban_id AND buxiban_attend.date = '$date'")->fetchall(PDO::FETCH_ASSOC);
        if($attend){
            echo json_encode($attend);
        }
        else{
            echo "查無紀錄";
        }

    break;

    //修改狀態
    case "update_attend_states":
        
        $std_id = $_POST['student_id'];
        $date = $_POST['date'];
        $attend_states = $_POST['attend_states'];
        echo json_encode(var_dump($attend_states));
        switch($attend_states){
            case 0:
                $sqlsend = "update buxiban_attend set attend_time ='00:00:00',leave_time='00:00:00' where std_id = $std_id AND date = '$date'";
            break;

            case 1:
                $sqlsend = "update buxiban_attend set attend_time='$time' where std_id = $std_id AND date = $date ";
            break;

            case 2:
                $sqlsend = "update buxiban_attend set leave_time='$time' where std_id = $std_id AND date = $date ";
            break;

            case 3:
                $sqlsend = "update buxiban_attend set attend_time ='00:00:00',leave_time='00:00:00' where std_id = $std_id AND date = '$date'";
            break;
        }
        $sqlresult = $conn->query("$sqlsend");

    break;
        
    //修改附註
    case "update_remark":

        $std_id = $_POST['student_id'];
        $daremarkte = $_POST['remark'];
        $date = $_POST['date'];
        $attend = $conn->query("update buxiban_attend set remark ='$remark' where std_id = $std_id AND date = '$date'");

    break;


}
?>