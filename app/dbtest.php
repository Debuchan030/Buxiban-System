<?php
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= 2");
    $bulletin = $sqlresult->fetch();
    print_r($bulletin);
    
?>