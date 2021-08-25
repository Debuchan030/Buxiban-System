//獲取php資料
//建立所有學生列表

$("#course_attend").empty()
for (var i = 0; i < 10 /*course_attend_list[i].length*/; i++) {
        
    var std_name = i/*course_attend_list[i].std_name*/;
    var parent_name = i+1/*course_attend_list[i].parent_name*/;
    var parent_phone = "0"+9000000+i/*course_attend_list[i].parent_phone*/; 
    var row_list = "<tr id = \"attend_row\"><td>"+std_name+"</td><td>"+parent_name+"</td><td>"+parent_phone+"</td>><td><button class = \"attend_btn\">已到班</button></td><td><button>切換狀態</button></td></tr>"
    $("#course_attend").append(row_list)
}


//點擊已到班按鈕 

$('#course_attend').on('click', '.attend_btn',attend_btn)
function attend_btn(){
    //顯示到班/離開的時間
    $("#attend_data").empty()
    var attend_data_div = "hihihih";
    $("#attend_data").append(attend_data_div)
    console.log("hi")
}
