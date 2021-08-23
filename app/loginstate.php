<?php
session_start();
//print($_SESSION['user_id']);
if(!isset($_SESSION['user_id'])){
    echo '<script> window.alert(123");</script>';
    header("login.php");
}
?>