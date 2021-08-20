//新增學生/家長資料
//學生列表 std_list[i]
for (var i = 0; i < parseInt(std_id) /*std_id.length*/; i++) {
        
    var std_name = i ; /*std_list[i].std_name*/
    var parent_name = i ; /*std_list[i].parent_name*/
    var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td></tr>" /*列出std_list[i]*/
}

//家長列表 parent_list[i]
for (var i = 0; i < parseInt(parent_id) /*parent_id.length*/; i++) {
    var parent_name = i ; /*parent_list[i].parent_name*/
    var parent_acct = i ; /*parent_list[i].parent_acct*/
    var parent_pwd = i ; /*parent_list.parent_pwd*/
    var parent_phone = i ; /*parent_list.parent_phone*/       
    var std_name = i ; /*std_list[i].std_name*/
    var table_list = "<tr><td>"+std_name+"</td><td>"+parent_name+"</td></tr>" /*列出parent_list[i]*/
}

