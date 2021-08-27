<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datetime = date("Y-m-d H:i:s");
switch ($_POST['action']) {
    //取得學生/家長名單
    case "get_member":
        $sqlresult = $conn->query("select buxiban_student.std_id,buxiban_student.std_name,buxiban_parent.parent_name,buxiban_parent.parent_phone,buxiban_parent.parent_pwd from buxiban_student inner join buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_student.buxiban_id= $buxiban_id");
        $member = $sqlresult->fetchall(PDO::FETCH_OBJ);
        echo json_encode($member);
    break;
    
    //新增學生/家長資料
    case "add_member":        
        $std_name = $_POST['std_name'];
        $parent_name = $_POST['parent_name'];
        $parent_phone = $_POST['parent_phone'];
        for($i=0;$i<sizeof($std_name);$i++){
            $this_std_name = $std_name[$i];
            $this_parent_name = $parent_name[$i];
            $this_parent_phone = $parent_phone[$i];
            $get_oldparent_id = $conn->query("select parent_id from buxiban_parent where parent_phone = '$this_parent_phone';")->fetch(PDO::FETCH_ASSOC);
            if($get_oldparent_id != false){
                //存在家長
                $temp = $get_oldparent_id['parent_id'];
                print("就ㄉ".var_dump($temp));
                $sqlinsert = $conn->query("Insert into buxiban_student(std_name,buxiban_id,parent_id) value('$this_std_name',$buxiban_id,$temp);");
            }
            else{
                //不存在則順勢新增家長
                $sqlinsert = $conn->query("Insert into buxiban_parent(parent_name,parent_phone,parent_pwd,buxiban_id) value('$this_parent_name','$this_parent_phone','$this_parent_phone',$buxiban_id);");
                $get_parent_id = $conn->query("select parent_id from buxiban_parent where parent_phone = '$this_parent_phone';")->fetch(PDO::FETCH_ASSOC);
                $new_parent_id = $get_parent_id['parent_id'];
                print("新的家長".var_dump($new_parent_id));
                $sqlinsert = $conn->query("Insert into buxiban_student(std_name,buxiban_id,parent_id) value('$this_std_name',$buxiban_id,$new_parent_id);");
            }
        }
        $conn=null;
    break;
    
    //修改學生/家長資料
    case "update_member":
        $get_data = json_decode($_POST['member_update_list'],true);
        $std_id = $get_data['std_id'];
        $std_name = $get_data['std_name'];
        $parent_name = $get_data['parent_name'];
        $parent_phone = $get_data['parent_phone'];
        $parent_pwd = $get_data['parent_pwd'];
        
        $sql = "update buxiban_student,buxiban_parent set buxiban_student.std_name='$std_name',buxiban_parent.parent_name='$parent_name',buxiban_parent.parent_phone='$parent_phone',buxiban_parent.parent_pwd='$parent_pwd' where buxiban_student.std_id = $std_id AND buxiban_parent.parent_id = buxiban_student.parent_id;";
        $sqlsend = $conn->query($sql);
        $conn=null;
        
        header("location:/index.php");
    break;
    
    /*
    //刪除學生/家長資料
    case "delete_member":
        
        $std_id = $_POST['std_id'];
        $sql = "delete from buxiban_student where std_id = $std_id;"
        $sql .= "delete from buxiban_parent where parent_id = $std_id;"
        $sqlsend = $conn->query($sql);
        //檢測該家長是否還有其他筆小孩資料
        $sql=   $conn->query("");     
        $conn=null;
    break;
    */
}
?>