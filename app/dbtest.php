<?php
    $buxiban_id = $_SESSION['buxiban_id'];
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id");
    $bulletin = $sqlresult->fetch(PDO::FETCH_ASSOC); 
    print_r($bulletin);
?>