<?php
    $servername = "localhost";
    $dbname = "ysnkzxov_hct_db";
    $dbuser = "ysnkzxov_hct";
    $dbpwd = "hctdbadmin!@#$";
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8","$dbuser","$dbpwd");
    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // }
