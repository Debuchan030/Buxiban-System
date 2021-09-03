<?php
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
switch ($_POST['action']) {
    //取得學生/家長名單
    case "get_member":
        $sqlresult = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_student.school,buxiban_student.enrollment_year,buxiban_parent.parent_name,buxiban_parent.parent_phone,buxiban_parent.parent_pwd from buxiban_student inner join buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_student.buxiban_id= $buxiban_id");
        $member = $sqlresult->fetchall(PDO::FETCH_OBJ);
        echo json_encode($member);
    break;
    
    //新增學生/家長資料
    case "add_member":        
        $std_name = $_POST['std_name'];
        $parent_name = $_POST['parent_name'];
        $school = $_POST['school'];
        $enrollment_year = $_POST['enrollment_year'];
        $parent_phone = $_POST['parent_phone'];
        for($i=0;$i<sizeof($std_name);$i++){
            $this_std_name = $std_name[$i];
            $this_parent_name = $parent_name[$i];
            $this_school = $school[$i];
            $this_enrollment_year = $enrollment_year[$i];
            $this_parent_phone = $parent_phone[$i];
            $get_oldparent_id = $conn->query("select parent_id from buxiban_parent where parent_phone = '$this_parent_phone';")->fetch(PDO::FETCH_ASSOC);
            if($get_oldparent_id){
                //存在家長
                $parent_id = $get_oldparent_id['parent_id'];
            }
            else{
                //不存在則順勢新增家長
                $sqlinsert = $conn->query("Insert into buxiban_parent(parent_name,parent_phone,parent_pwd,buxiban_id) value('$this_parent_name','$this_parent_phone','$this_parent_phone',$buxiban_id);");
                $get_parent_id = $conn->query("select parent_id from buxiban_parent where parent_phone = '$this_parent_phone';")->fetch(PDO::FETCH_ASSOC);
                $parent_id = $get_parent_id['parent_id'];
            }
            $sqlinsert = $conn->query("Insert into buxiban_student(std_name,school,enrollment_year,buxiban_id,parent_id) value('$this_std_name','$this_school,'$this_enrollment_year',$buxiban_id,$parent_id);");
        }
        header("location:/index.php");
    break;
    
    //修改學生/家長資料
    case "update_member":
        $get_data = json_decode($_POST['member_update_list'],true);
        $std_id = $get_data['std_id'];
        $std_name = $get_data['std_name'];
        $school =$get_data['school'];
        $enrollment_year = $get_data['enrollment_year'];
        $parent_name = $get_data['parent_name'];
        $parent_phone = $get_data['parent_phone'];
        $parent_pwd = $get_data['parent_pwd'];
        $sql = "update buxiban_student,buxiban_parent set buxiban_student.std_name='$std_name',buxiban_student.school='$school',buxiban_student.enrollment_year='$enrollment_year',buxiban_parent.parent_name='$parent_name',buxiban_parent.parent_phone='$parent_phone',buxiban_parent.parent_pwd='$parent_pwd' where buxiban_student.std_id = $std_id AND buxiban_parent.parent_id = buxiban_student.parent_id;";
        $sqlsend = $conn->query($sql);
    break;
    
    //刪除學生/家長資料
    case "delete_member":
        $std_id = $_POST['std_id'];
        // echo $std_id;
        $find_parent_id = $conn->query("select parent_id from buxiban_student where std_id = $std_id;")->fetch(PDO::FETCH_ASSOC);
        $parent_id = $find_parent_id['parent_id'];
        //殺小孩
        $sqlresult = $conn->query("delete from buxiban_student where std_id = $std_id;");
        //查找小孩
        $get_kids = $conn->query("select * from buxiban_student where parent_id = $parent_id;")->fetch(PDO::FETCH_ASSOC);
        //沒小孩就砍了家長
        if(!$get_kids){
            $sqlresult = $conn->query("delete from buxiban_parent where parent_id = $parent_id;");
        }
    break;
}
$conn=null;
?>