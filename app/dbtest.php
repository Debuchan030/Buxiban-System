<?php
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= 2");
    $bulletin = $sqlresult->fetch(PDO::FETCH_ASSOC);
    $bulletin = $sqlresult->fetch(PDO::FETCH_NUM );
    $bulletin = $sqlresult->fetch(PDO::FETCH_OBJ );
    print_r($bulletin);
    
?>