//獲取php資料

window.onload = function()
{
    $("#course_attend").empty()

    //建立所有學生列表
    for (var i = 0; i < 10 /*course_attend_list[i].length*/; i++) {
        
        var std_name = i/*course_attend_list[i].std_name*/;
        var parent_name = i+1/*course_attend_list[i].parent_name*/;
        var parent_phone = "0"+9000000+i/*course_attend_list[i].parent_phone*/;
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