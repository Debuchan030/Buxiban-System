<?php
    include('dbconfig.php');
    $sqlresult = $conn->query("select * from buxiban_bulletin where buxiban_id= $buxiban_id");
    $bulletin = $sqlresult->fetch();
    print_r($bulletin);
    
?>