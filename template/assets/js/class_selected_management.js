//獲取php資料
//將課程新增option並填入select
$.post("../../app/class_selected_management.php", { action: "get_course" }, function (course) {
    course = JSON.parse(course)
    var course_selection = document.getElementById('course_selection');
    var option = document.createElement("option")
    option.value = "0";
    option.text = "請選擇課程";
    course_selection.appendChild(option);
    for (var i = 0; i < course.length; i++) {
        var course_name = course[i].course_name
        var course_id = course[i].course_id
        var option = document.createElement("option")
        option.value = course_id;
        option.text = course_name;
        course_selection.appendChild(option);
    }
});
var one_btn_add_std_array = []
var one_btn_delete_std_array = []
//根據option value不同抓取有選取此課的學生名單
var course_selection = document.getElementById('course_selection');
course_selection.addEventListener("change", change_student_list)//偵測有沒有選擇課程
function change_student_list() { //依據選擇的課程來分類有選課/未選課 並列表
    var selected_course_id = course_selection.options[course_selection.selectedIndex].value
    if (selected_course_id == "0") {
        $("#course_selected_std").empty()
        $("#course_nonselected_std").empty()
        return
    }
    else {
        $("#course_selected_std").empty()
        $("#course_nonselected_std").empty()
        one_btn_add_std_array = []
        one_btn_delete_std_array = []
        //建立已選修學生之列表
        $.post("../../app/class_selected_management.php", { action: "get_selcourse_std", course_id: selected_course_id }, function (std) {
            if (std != "no data") {

                std = JSON.parse(std)

                for (var i = 0; i < std.length; i++) {
                    var std_id = std[i].std_id
                    var std_name = std[i].std_name;
                    var table_list = "<tr class = \"std_info\" id = \"" + std_id + "_std_id" + "\"><td>學生姓名：" + std_name + "</td><td><button class = \"std_delete_selcourse\">刪除</button></td></tr>"
                    $("#course_selected_std").append(table_list)
                }

            }


        });
        //建立未選修學生之列表
        $.post("../../app/class_selected_management.php", { action: "get_nonselcourse_std", course_id: selected_course_id }, function (std) {
            if (std != "no data") {
                std = JSON.parse(std)

                for (var i = 0; i < std.length; i++) {
                    var std_id = std[i].std_id
                    var std_name = std[i].std_name;
                    var table_list = "<tr class = \"std_info\" id = \"" + std_id + "_std_id" + "\"><td>學生姓名：" + std_name + "</td><td><button class = \"std_add_selcourse\">新增</button></td></tr>"
                    $("#course_nonselected_std").append(table_list)
                }
            }

        });
    }
}
// 暫時刪除已選修學生
$('#course_selected_std').on('click', '.std_delete_selcourse', std_delete_selcourse);
function std_delete_selcourse() {
    if ($(this).text() == "刪除") {
        $(this).html("已刪除")
        $(this).css({ "box-shadow": "inset 0 0 0 2px gray", "color": "gray !important;" })
        var std_id = $(this).parent().parent().attr('id')
        std_id = std_id.substring(0, std_id.length - 7)
        one_btn_delete_std_array.push(std_id)
    }
    else {
        $(this).html("刪除")
        $(this).css({ "box-shadow": "inset 0 0 0 2px #f56a6a", "color": "#f56a6a !important;" })
        var std_id = $(this).parent().parent().attr('id')
        std_id = std_id.substring(0, std_id.length - 7)
        one_btn_delete_std_array.pop(std_id)
    }
}

// 暫時新增未選修學生
$('#course_nonselected_std').on('click', '.std_add_selcourse', std_add_selcourse);
function std_add_selcourse() {
    //傳送std_name、parent_name去新增
    if ($(this).text() == "新增") {
        $(this).html("已新增")
        $(this).css({ "box-shadow": "inset 0 0 0 2px green  !important;", "color": "green !important;" })
        var std_id = $(this).parent().parent().attr('id')
        std_id = std_id.substring(0, std_id.length - 7)
        one_btn_add_std_array.push(std_id)
    }
    else {
        $(this).html("新增")
        $(this).css({ "box-shadow": "inset 0 0 0 2px #f56a6a  !important;", "color": "f56a6a !important;" })
        var std_id = $(this).parent().parent().attr('id')
        std_id = std_id.substring(0, std_id.length - 7)
        one_btn_add_std_array.pop(std_id)
    }
}
// 一鍵新增post上去
$(".one_btn_add_std").on("click", one_btn_add_std)
function one_btn_add_std() {
    var selected_course_id = course_selection.options[course_selection.selectedIndex].value
    one_btn_add_std_array = JSON.stringify(one_btn_add_std_array)
    $.post("../../app/class_selected_management.php", { action: "add_selcourse", course_id: selected_course_id, one_btn_add_std_array }, function (data) {
        console.log(data)
        change_student_list.call(this)
    });

}
// 一鍵刪除post上去
$(".one_btn_delete_std").on('click', one_btn_delete_std)
function one_btn_delete_std() {
    var selected_course_id = course_selection.options[course_selection.selectedIndex].value
    one_btn_delete_std_array = JSON.stringify(one_btn_delete_std_array)

    $.post("../../app/class_selected_management.php", { action: "delete_selcourse", course_id: selected_course_id, one_btn_delete_std_array });
    change_student_list.call(this)
}