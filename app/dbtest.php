<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
$this_parent_phone = '0987654321';
$parent_ld = $conn->query("select parent_id from buxiban_parent where parent_phone = '$this_parent_phone';")->fetch(PDO::FETCH_ASSOC);
//print($parent_ld);
print(var_dump($parent_ld));
print($parent_ld['parent_id']);
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