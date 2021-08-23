<?php
    include('dbconfig.php');
    $gettest = $conn->query("select * from buxiban_user");
    $testdata = $gettest->fetchall(PDO::FETCH_NUM);
    //print_r($testdata);
?>