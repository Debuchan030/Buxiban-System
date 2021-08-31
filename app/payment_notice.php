<?php ini_set("display_errors", "On");
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
switch ($_POST['action']) {

    
    case "spawn_newpayment":
        // $course_id = $_POST['course_id'];
        // $std_id = json_decode($_POST['one_btn_delete_std_array'],true);
        // foreach ($std_id as $value) {
        //     $sqlsend = $conn->query("delete from buxiban_selcourse where course_id = $course_id AND std_id = $value"); 
        // }
        // $conn = null;
    break;
}
?>