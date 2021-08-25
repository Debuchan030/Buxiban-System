<?php
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= 0");
    print("FETCH_ASSOC");
    print_r($sqlresult->fetch(PDO::FETCH_ASSOC));
    print("FETCH_NUM");
    print_r($sqlresult->fetch(PDO::FETCH_NUM ));
    print("FETCH_OBJ");
    print_r($sqlresult->fetch(PDO::FETCH_OBJ ));
    
?>