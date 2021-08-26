<?php 
session_start();
switch ($_POST['action']) { 
    //檢測目前頁面狀態(回調用)
    case "get_pagename":
        if(isset($_SESSION['page_name'] && $_SESSION['title'])){
            $return_page[0] = $_SESSION['page_name'];
            $return_page[1] = $_SESSION['title'];
        }
        else{
            $return_page[0] = "bulletin_board";
            $return_page[1] = "公佈欄";
        }
        echo json_encode($return_page);
    break;

    case "change_page":
        $target_page = $_POST['page'];
        $target_title = $_POST['page'];
        $_SESSION['page_name'] = $target_page;
        switch ($target_page) {
            case 'bulletin_board':
                echo "公佈欄"; 
            break;

            case 'payment_notice':
                echo "繳款通知管理"; 
            break;

            case 'member_management':
                echo "學生/家長管理"; 
            break;

            case 'class_selected_management':
                echo "選課管理"; 
            break;

            case 'class_management':
                echo "開課課程管理"; 
            break;

            case 'attend_record':
                echo "到班通知管理"; 
            break;
        }
    break;
}
?>