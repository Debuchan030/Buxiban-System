<?php
ini_set("display_errors", "On"); 
/*
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
    
    include('dbconfig.php');
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

$return_page = new array("bulletin_board","公佈欄");
if(isset($_SESSION['page_name'] && $_SESSION['title'])){
    $return_page[0] = $_SESSION['page_name'];
    $return_page[1] = $_SESSION['title'];
    print_r($return_page);
}
else{
    print_r($return_page);
}; 

?>