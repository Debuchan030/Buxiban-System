//獲取php資料

var attend_status_selection = document.getElementById('attend_status_course');
for (var i = 0; i < 5 /*attend_status_course.length*/; i++) {
    var course_name = i /*attend_status_course_name*/; // course_name
    var course_id = i /*attend_status_course_value*/;// course_id
    var option = document.createElement("option")
    option.value = course_id;
    option.text = course_name;
    attend_status_selection.appendChild(option);
}
//根據option value不同 抓取所有選取此課的學生名單

attend_status_selection.addEventListener("change", change_student_list)//偵測有沒有選擇課程

function change_student_list() { //依據選擇的課程列出此班學生名單
    var selected_course_id = attend_status_selection.options[attend_status_selection.selectedIndex].value
    $("#course_attend").empty()

    //建立所選課程之學生列表
    for (var i = 0; i < parseInt(selected_course_id) /*course_attend_list[i].length*/; i++) {
        
        var std_name = i/*course_attend_list[i].std_name*/;
        var parent_name = i+1/*course_attend_list[i].parent_name*/;
        var parent_phone = i+09000000/*course_attend_list[i].parent_phone*/;
        var attend_status = "未出席";
        var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td><td>"+parent_phone+"</td><td>"+attend_status+"</td><td><button>切換狀態</button></td></tr>"
        $("#course_attend").append(table_list)
    }
}


//點擊按鈕切換成已到班
var non_attend = document.querySelectorAll('.non_attend')
// console.log(non_attend)
for (var i = 0; i < non_attend.length; i++) {
    non_attend[i].addEventListener('click', non_attend_func)
}
function non_attend_func() { //已到班
    console.log("come")
}