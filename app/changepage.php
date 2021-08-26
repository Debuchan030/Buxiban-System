<?php 
session_start();
switch ($_POST['action']) { 
    //檢測目前頁面狀態(回調用)
    case "get_pagename":
        $return_page = array("bulletin_board","公佈欄");
        if(isset($_SESSION['page_name']) && isset($_SESSION['page_title'])){
            $return_page[0] = $_SESSION['page_name'];
            $return_page[1] = $_SESSION['page_title'];
        }
        echo json_encode($return_page);    
    break;
    //切換頁面
    case "change_page":
        $target_page = $_POST['target_page'];
        $target_title = $_POST['target_title'];
        $_SESSION['page_name'] = $target_page;
        $_SESSION['page_title'] = $target_title;
        echo $_SESSION['page_name'].$_SESSION['page_title'];
    break;
}
?>