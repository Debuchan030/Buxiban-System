//獲取php資料
//將課程新增option並填入select
$.post("../../app/class_selected_management.php", { action: "get_course" }, function (course) {

    course = JSON.parse(course)
    var course_selection = document.getElementById('course_selection');
    for (var i = 0; i < course.length; i++) {
        var course_name = course[i].course_name 
        var course_id = course[i].course_id 
        var option = document.createElement("option")
        option.value = course_id;
        option.text = course_name;
        course_selection.appendChild(option);
    }
});


//根據option value不同抓取有選取此課的學生名單

course_selection.addEventListener("change", change_student_list)//偵測有沒有選擇課程

function change_student_list() { //依據選擇的課程來分類有選課/未選課 並列表
    var selected_course_id = course_selection.options[course_selection.selectedIndex].value
    $("#course_selected_std").empty()
    $("#course_nonselected_std").empty()
    //獲取buxiban_selcourse.course_id = selected_course_id之資料
    //(select * from buxiban_selcourse where selected_course_id = buxiban_selcourse.course_id)

    //獲取buxiban_selcourse.std_id = buxiban_student.std_id之資料
    //(select * from buxiban_student where buxiban_selcourse.std_id = buxiban_student.std_id)
    //我將這個資料命名為course_selected_std_list


    //建立已選修學生之列表

    $.post("../../app/class_selected_management.php", { action: "get_selcourse_std" }, function (std) {

        std = JSON.parse(std)
        for (var i = 0; i < std.length; i++) {
            var std_id = std[i].std_id
            var std_name = std[i].std_name;
            var parent_name = std[i].parent_name;
            var parent_phone = std[i].parent_phone
            var table_list = "<tr class = \"std_info\" id = \""+std_id+"\"><td>學生姓名：" + std_name + "</td><td>家長姓名：" + parent_name + "</td><td>家長電話："+parent_phone+"</td><td><button class = \"std_delete_selcourse\">刪除</button></td></tr>"
            $("#course_selected_std").append(table_list)
        }
    });
    
    

   
    //獲取buxiban_selcourse.std_id = buxiban_student.std_id之資料
    //(select * from buxiban_student where buxiban_selcourse.std_id != buxiban_student.std_id)

    //建立未選修學生之列表

    $.post("../../app/class_selected_management.php", { action: "get_nonselcourse_std" }, function (std) {

        std = JSON.parse(std)
        for (var i = 0; i < std.length; i++) {
            var std_id = std[i].std_id
            var std_name = std[i].std_name;
            var parent_name = std[i].parent_name;
            var parent_phone = std[i].parent_phone
            var table_list = "<tr class = \"std_info\" id = \""+std_id+"\"><td>學生姓名：" + std_name + "</td><td>家長姓名：" + parent_name + "</td><td>家長電話："+parent_phone+"</td><td><button class = \"std_add_selcourse\">新增</button></td></tr>"
            $("#course_nonselected_std").append(table_list)
        }
    });
}
// 刪除已選修學生
$('#course_selected_std').on('click', '.std_delete_selcourse', std_delete_selcourse);
function std_delete_selcourse() {
    //傳送std_name、parent_name去刪除
    var std_name = $(this).parents(".std_info").find("td").first().text().substring(5)
    var parent_name = $(this).parents(".std_info").find("td").first().next().text().substring(5)
    console.log(std_name)
    console.log(parent_name)
    //reload視窗
    change_student_list.call()
}

// 新增未選修學生
$('#course_nonselected_std').on('click', '.std_add_selcourse', std_add_selcourse);
function std_add_selcourse() {
    //傳送std_name、parent_name去新增
    var std_name = $(this).parents(".std_info").find("td").first().text().substring(5)
    var parent_name = $(this).parents(".std_info").find("td").first().next().text().substring(5)
    console.log(std_name)
    console.log(parent_name)
    //reload視窗
    change_student_list.call()
}