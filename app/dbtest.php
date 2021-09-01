<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$get_std_list = $conn->query("select std_id,std_name,parent_name,parent_phone from buxiban_student,buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_student.buxiban_id=$buxiban_id")->fetchAll(PDO::FETCH_ASSOC);

for($i=0;$i < count($get_std_list);$i++){
    $std_id = $get_std_list[$i]['std_id'];
    $get_std_selcourse = $conn->query("select course_name,course_price form buxiban_course,buxiban_selcourse where buxiban_selcourse.std_id = $std_id AND buxiban_selcourse.course_id = buxiban_course.course_id")->fetchAll(PDO::FETCH_ASSOC);
    print_r($get_std_selcourse);
}
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