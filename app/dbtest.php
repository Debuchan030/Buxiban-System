<?php
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= 0");
    $a = $sqlresult->fetch(PDO::FETCH_ASSOC);
    $b = $sqlresult->fetch(PDO::FETCH_NUM);
    $c = $sqlresult->fetch(PDO::FETCH_OBJ);
    print("FETCH_ASSOC");
    print_r($a);
    print("FETCH_NUM");
    print_r($b);
    print("FETCH_OBJ");
    print_r($c);
    
?>