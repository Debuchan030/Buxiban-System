//載入學生/家長列表
window.onload = function()
{
   $("#std_list").empty()
   $("#parent_list").empty()

    //學生列表 std_list[i]
    for (var i = 0; i < 10 /*std_id.length*/; i++) {
        var std_name = i ; /*std_list[i].std_name*/
        var parent_name = i ; /*std_list[i].parent_name*/
        var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td></tr>"
        $("#std_list").append(table_list)
    }

    //家長列表 parent_list[i]
    for (var i = 0; i < 10 /*parent_id.length*/; i++) {
        var parent_name = i+1 ; /*parent_list[i].parent_name*/
        var parent_acct = i+2 ; /*parent_list[i].parent_acct*/
        var parent_pwd = i+3 ; /*parent_list.parent_pwd*/
        var parent_phone = i ; /*parent_list.parent_phone*/       
        var std_name = i ; /*std_list[i].std_name*/
        var table_list = "<tr><td>"+parent_name+"</td><td>"+parent_acct+"</td><td>"+parent_pwd+"</td><td>"+parent_phone+"</td><td>"+std_name+"</td></tr>"
        $("#parent_list").append(table_list)
    }

}
//修改學生/家長資料


