window.onload = function()
{
   $("#std_list").empty()

    //學生/家長列表 std_list[i]
    for (var i = 0; i < 10 /*std_id.length*/; i++) {
        var std_name = i ; /*std_list[i].std_name*/
        var parent_name = i+1 ; /*std_list[i].parent_name*/
        var parent_acct = "HCTxxxxxxx"+i ; /*std_list[i].parent_acct*/
        var parent_pwd = "HCTxxxxxxx"+i ; /*std_list[i].parent_pwd*/
        var parent_phone = "09xxxxxx"+i ; /*std_list[i].parent_phone*/
        var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td><td>"+parent_acct+"</td><td>"+parent_pwd+"</td><td>"+parent_phone+"</td><td><button>修改資料</button></td></tr>"
        $("#std_list").append(table_list)
    }

}
//修改學生/家長資料


