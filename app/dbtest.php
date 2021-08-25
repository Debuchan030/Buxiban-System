<?php
    ini_set("display_errors", "On"); 
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= 0");
    print_r("FETCH_ASSOC".$sqlresult->fetch(PDO::FETCH_ASSOC));
    print_r("FETCH_NUM".$sqlresult->fetch(PDO::FETCH_NUM ));
    print_r("FETCH_OBJ".$sqlresult->fetch(PDO::FETCH_OBJ ));
    
    
?>