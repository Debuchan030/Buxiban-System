<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$get_this_record_id = $conn->query("select record_id from buxiban_record_payment where parent_id =$parent_id AND payment_time='$payment_time'")->fetch(PDO::FETCH_ASSOC);
print_r($get_this_record_id);
/*
/*
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
    

    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id");
    $bulletin = $sqlresult->fetchall(PDO::FETCH_OBJ);
    //print_r($bulletin);
    echo json_encode($bulletin);
*/

// ini_set("display_errors", "On");
// include('dbconfig.php');
// session_start();
// $buxiban_id = $_SESSION['buxiban_id'];
// $sqlresult = $conn->query("select std_id from buxiban_selcourse where course_id= 1");
// print($sqlresult);
// $std_id_array = $sqlresult->fetchAll(PDO::FETCH_ASSOC);
// print($std_id_array);

?>