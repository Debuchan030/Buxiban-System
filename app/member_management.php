<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
$back = getenv("HTTP_REFERER");
switch ($_POST['action']) {
    //取得學生/家長名單
    case "get_member":
        $sqlresult = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_parent.parent_name,buxiban_parent.parent_phone,buxiban_parent.parent_pwd from buxiban_student inner join buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_id= $buxiban_id");
        $member = $sqlresult->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($member);
    break;
    //新增學生/家長資料
    case "add_member": 
        $std_name = $_POST['std_name'];
        $parent_name = $_POST['parent_name'];
        $parent_acct = $_POST['parent_acct'];
        $parent_pwd = $_POST['parent_pwd'];
        $parent_phone = $_POST['parent_phone'];
        $sql = "Insert into buxiban_student(std_name) value('$std_name',$buxiban_id);";
        $sql .= "Insert into buxiban_parent(parent_name,parent_acct,parent_pwd,parent_phone) value('$parent_name','$parent_acct','$parent_acct','$parent_pwd','$parent_acct',$buxiban_id);";
        $sqlsend = $conn->multi_query($sql);
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("新增成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
            header("location:$back");
        break;

    //修改學生/家長資料
    case "update_member":
        $std_id = $_POST['std_id'];    
        $std_name = $_POST['std_name'];
        $parent_name = $_POST['parent_name'];
        $parent_acct = $_POST['parent_acct'];
        $parent_pwd = $_POST['parent_pwd'];
        $parent_phone = $_POST['parent_phone'];
        $sql = "update buxiban_student set std_name='$std_name' where std_id = $std_id;"
        $sql .= "update buxiban_parent set parent_name='$parent_name',parent_acct='$parent_acct',parent_pwd='$parent_pwd',parent_phone='$parent_phone' where parent_id = $std_id;"
        $sqlsend = $conn->multi_query($sql);
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("修改成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
        header("location:$back");
    break;

    //刪除學生/家長資料
    case "delete_member":
        $std_id = $_POST['std_id'];
        $sql = "delete from buxiban_student where std_id = $std_id;"
        $sql .= "delete from buxiban_parent where parent_id = $std_id;"
        $sqlsend = $conn->query($sql);
        $conn=null;
        if($sqlsend){
            echo '<script> window.alert("刪除成功");</script>';
        }
        else{
            echo '<script> window.alert("出現錯誤!請聯繫HCT工程部專員");</script>';
        }
        header("location:$back");
    break;
}
?>