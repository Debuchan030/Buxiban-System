<?php 
session_start();
switch ($_POST['action']) { 
    //檢測目前頁面狀態(回調用)
    case "get_pagename":
        // //$return_page = new array("bulletin_board","公佈欄");
        // if(isset($_SESSION['page_name'] && $_SESSION['title'])){
        //     $return_page[0] = $_SESSION['page_name'];
        //     $return_page[1] = $_SESSION['title'];
        //     //echo json_encode($return_page);
        // }
        // else{
        //     //echo json_encode($return_page);
        // }; 
        // echo "132"       
    break;

    case "change_page":
        $target_page = $_POST['target_page'];
        $target_title = $_POST['target_title'];
        $_SESSION['page_name'] = $target_page;
        $_SESSION['page_title'] = $target_title;
    break;
}
?>