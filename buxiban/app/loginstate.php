<?php
session_start();
print($_SESSION['user_id']);
if(!isset($_SESSION['user_id'])){
    header("login.php");
}
?>