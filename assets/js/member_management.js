//新增學生/家長資料

window.onload = function(){
//學生列表 std_list[i]
    var std_list = document.getElementById('std_table_list');
    for (var i = 0; i < 10 /*std_id.length*/; i++) {
        var std_name = i ; /*std_list[i].std_name*/
        var parent_name = i ; /*std_list[i].parent_name*/
        var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td></tr>" /*列出std_list[i]*/
        std_list.append(table_list)
    }

//家長列表 parent_list[i]
    var parent_list = document.getElementById('parent_table_list');
    for (var i = 0; i < 10 /*parent_id.length*/; i++) {
        var parent_name = i ; /*parent_list[i].parent_name*/
        var parent_acct = i ; /*parent_list[i].parent_acct*/
        var parent_pwd = i ; /*parent_list.parent_pwd*/
        var parent_phone = i ; /*parent_list.parent_phone*/       
        var std_name = i ; /*std_list[i].std_name*/
        var table_list = "<tr><td>"+parent_name+"</td><td>"
        +parent_acct+"</td></tr>"+parent_pwd+"</td></tr>"
        +parent_phone+"</td></tr>"+std_name+"</td></tr>"/*列出parent_list[i]*/
        parent_list.append(table_list)
    }
}

//修改學生/家長資料

