<?php
ini_set("display_errors", "On");
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
switch ($_POST['action']) {
    //取得學生/家長名單
    case "get_member":
        $sqlresult = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_student.school,buxiban_student.enrollment_year,buxiban_contact.contact1_name,buxiban_contact.contact1_phone,buxiban_contact.contact2_name,buxiban_contact.contact2_phone,buxiban_contact.contact_pwd from buxiban_student inner join buxiban_contact where buxiban_student.contact_id = buxiban_contact.contact_id AND buxiban_student.buxiban_id= $buxiban_id");
        $member = $sqlresult->fetchall(PDO::FETCH_OBJ);
        echo json_encode($member);
    break;
    
    //新增學生/家長資料
    case "add_member":        
        $std_name = $_POST['std_name'];
        $contact1_name = $_POST['contact1_name'];
        $contact1_phone = $_POST['contact1_phone'];
        $contact2_name = $_POST['contact2_name'];
        $contact2_phone = $_POST['contact2_phone'];
        print(var_dump($contact2_name));
        print(var_dump($contact2_phone));
        if($contact2_name=''){
            $contact2_name='無';
        }
        if($contact2_phone=''){
            $contact2_phone='無';
        }
        $school = $_POST['school'];
        $enrollment_year = $_POST['enrollment_year'];
        for($i=0;$i<sizeof($std_name);$i++){
            $this_std_name = $std_name[$i];
            $this_contact1_name = $contact1_name[$i];
            $this_contact1_phone = $contact1_phone[$i];
            $this_contact2_name = $contact2_name[$i];
            $this_contact2_phone = $contact2_phone[$i];
            $this_school = $school[$i];
            $this_enrollment_year = $enrollment_year[$i];
            $get_old_contact_id = $conn->query("select contact_id from buxiban_contact where contact1_phone = '$this_contact1_phone';")->fetch(PDO::FETCH_ASSOC);
            if($get_old_contact_id){
                //存在家長
                $contact_id = $get_old_contact_id['contact_id'];
            }
            else{
                //不存在則順勢新增家長
                $sqlinsert = $conn->query("Insert into buxiban_contact(contact1_name,contact1_phone,contact2_name,contact2_phone,contact_pwd,buxiban_id) value('$this_contact1_name','$this_contact1_phone','$this_contact2_name','$this_contact2_phone','$this_contact1_phone',$buxiban_id);");
                $get_contact_id = $conn->query("select contact_id from buxiban_contact where contact1_phone = '$this_contact1_phone';")->fetch(PDO::FETCH_ASSOC);
                $contact_id = $get_contact_id['contact_id'];
            }
            $sqlinsert = $conn->query("Insert into buxiban_student(std_name,school,enrollment_year,buxiban_id,contact_id) value('$this_std_name','$this_school','$this_enrollment_year',$buxiban_id,$contact_id);");
        }
        //header("location:/index.php");
    break;
    
    //修改學生/家長資料
    case "update_member":
        $get_data = json_decode($_POST['member_update_list'],true);
        $std_id = $get_data['std_id'];
        $std_name = $get_data['std_name'];
        $school =$get_data['school'];
        $enrollment_year = $get_data['enrollment_year'];
        $contact1_name = $get_data['contact1_name'];
        $contact1_phone = $get_data['contact1_phone'];
        $contact2_name = $get_data['contact2_name'];
        $contact2_phone = $get_data['contact2_phone'];
        $contact_pwd = $get_data['contact_pwd'];
        $sql = "update buxiban_student,buxiban_contact set buxiban_student.std_name='$std_name',buxiban_student.school='$school',buxiban_student.enrollment_year='$enrollment_year',buxiban_contact.contact1_name='$contact1_name',buxiban_contact.contact1_phone='$contact1_phone',buxiban_contact.contact2_name='$contact2_name',buxiban_contact.contact2_phone='$contact2_phone',buxiban_contact.contact_pwd='$contact_pwd' where buxiban_student.std_id = $std_id AND buxiban_contact.contact_id = buxiban_student.contact_id;";
        $sqlsend = $conn->query($sql);
    break;
    
    //刪除學生/家長資料
    case "delete_member":
        $std_id = $_POST['std_id'];
        $find_contact_id = $conn->query("select contact_id from buxiban_student where std_id = $std_id;")->fetch(PDO::FETCH_ASSOC);
        $contact_id = $find_contact_id['contact_id'];
        //殺小孩
        $sqlresult = $conn->query("delete from buxiban_student where std_id = $std_id;");
        //查找小孩
        $get_kids = $conn->query("select * from buxiban_student where contact_id = $contact_id;")->fetch(PDO::FETCH_ASSOC);
        //沒小孩就砍了家長
        if(!$get_kids){
            $sqlresult = $conn->query("delete from buxiban_contact where contact_id = $contact_id;");
        }
    break;
}
$conn=null;
?>