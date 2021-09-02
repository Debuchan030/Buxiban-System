<?php
ini_set("display_errors", "On"); 
include('dbconfig.php');
session_start();
$buxiban_id = $_SESSION['buxiban_id'];
$datemonth = date("Y-m");
$get_std_selstates = $conn->query("select std_id,std_name,buxiban_parent.parent_id,parent_name,parent_phone from buxiban_student,buxiban_parent where buxiban_student.parent_id = buxiban_parent.parent_id AND buxiban_student.buxiban_id=$buxiban_id AND buxiban_student.selcourse_states")->fetchAll(PDO::FETCH_ASSOC);
print(0);
if($get_std_selstates){
    print(1);
    for($i=0;$i<count($get_std_selstates);$i++){
        $std_id = $get_std_selstates[$i]['std_id'];
        $std_name = $get_std_selstates[$i]['std_name'];
        $parent_id = $get_std_selstates[$i]['parent_id'];
        $parent_name = $get_std_selstates[$i]['parent_name'];
        $parent_phone = $get_std_selstates[$i]['parent_phone'];
        $total_price = 0;
        //檢測紀錄
        $get_record_id = $conn->query("select record_id from buxiban_record_payment where parent_id=$parent_id AND record_std_name='$std_name' AND payment_time='$datemonth'")->fetch(PDO::FETCH_ASSOC);
        $record_id = $get_record_id['record_id'];
        print("record:".$record_id);
        //檢測成功，清除之前紀錄
        if($record_id){
            $del_record_selcourse = $conn->query("delete from buxiban_record_selcourse where record_id=$record_id");
        }
        //檢測失敗，新增一筆紀錄
        else{
            $add_new_record_payment = $conn->query("insert into buxiban_record_payment(record_std_name,record_parent_name,record_parent_phone,record_total_price,payment_time,parent_id,buxiban_id) value('$std_name','$parent_name','$parent_phone',$total_price,'$datemonth',$parent_id,$buxiban_id)");
            $get_record_id = $conn->query("select record_id from buxiban_record_payment where parent_id=$parent_id AND record_std_name='$std_name' AND payment_time='$datemonth'")->fetch(PDO::FETCH_ASSOC);
            $record_id = $get_record_id['record_id'];
        }
        print(2);
        //更新選課
        $get_std_selcourse = $conn->query("select course_name,course_price from buxiban_course,buxiban_selcourse where buxiban_selcourse.std_id = $std_id AND buxiban_selcourse.course_id = buxiban_course.course_id")->fetchAll(PDO::FETCH_ASSOC);
        if($get_std_selcourse){
            for($j=0;$j<count($get_std_selcourse);$j++){
                $course_name = $get_std_selcourse[$j]['course_name'];
                $course_price = $get_std_selcourse[$j]['course_price'];
                $add_new_record_selcourse = $conn->query("insert into buxiban_record_selcourse(record_id,record_selcourse_name,record_selcourse_price) value($record_id,'$course_name',$course_price) ");
                $total_price += $get_std_selcourse[$j]['course_price'];
            }
        }
        //更新總價
        $update_this_record = $conn->query("update buxiban_record_payment set record_total_price=$total_price where record_id=$record_id ");
    } 
    print(3.);
    $reset_student_selstates = $conn->query("update buxiban_student set selcourse_states=0 where buxiban_id=$buxiban_id");
}

?>