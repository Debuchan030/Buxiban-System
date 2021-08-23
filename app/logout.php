<?php
    //登出
    session_start();
    session_destroy();
    echo '<script>window.location.replace("/login.php")</script>';
?>