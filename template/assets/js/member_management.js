//學生/家長列表 std_list[i]
$("#std_list").empty()
for (var i = 0; i < 10 /*std_id.length*/; i++) {
    var std_name = i ; /*std_list[i].std_name*/
    var parent_name = i+1 ; /*std_list[i].parent_name*/
    var parent_acct = "HCTxxxxxxx"+i ; /*std_list[i].parent_acct*/
    var parent_pwd = "HCTxxxxxxx"+i ; /*std_list[i].parent_pwd*/
    var parent_phone = "09xxxxxx"+i ; /*std_list[i].parent_phone*/
    var table_list = "<tr class = \"std_info\"><td>"+std_name+"</td><td>"+parent_name+"</td><td>"+parent_acct+"</td><td>"+parent_pwd+"</td><td>"+parent_phone+"</td><td><button class = \"update_data\">修改資料</button></td><td><button class = \"delete_data\">刪除資料</button></td></tr>"
    $("#std_list").append(table_list)
}

// 刪除名單資料
$('#std_list').on('click', '.delete_data', delete_data);
function delete_data(){
    //將std_name、parent_name、parent_acct、parent_pwd、parent_phone刪除
    var std_name = $(this).parents(".std_info").find("td").first().text().substring(0)
    var parent_name = $(this).parents(".std_info").find("td").first().next().text().substring(0)
    var parent_acct = $(this).parents(".std_info").find("td").first().next().next().text().substring(0)
    var parent_pwd = $(this).parents(".std_info").find("td").first().next().next().next().text().substring(0)
    var parent_phone = $(this).parents(".std_info").find("td").first().next().next().next().next().text().substring(0)
    console.log(std_name)
    console.log(parent_name)
    console.log(parent_acct)
    console.log(parent_pwd)
    console.log(parent_phone)
}

// 修改名單資料
$('#std_list').on('click', '.update_data', update_data);
function update_data(){
    //將std_name、parent_name、parent_acct、parent_pwd、parent_phonet修改
    var std_name = $(this).parents(".std_info").find("td").first().text().substring(0)
    var parent_name = $(this).parents(".std_info").find("td").first().next().text().substring(0)
    var parent_acct = $(this).parents(".std_info").find("td").first().next().next().text().substring(0)
    var parent_pwd = $(this).parents(".std_info").find("td").first().next().next().next().text().substring(0)
    var parent_phone = $(this).parents(".std_info").find("td").first().next().next().next().next().text().substring(0)
    console.log(std_name)
    console.log(parent_name)
    console.log(parent_acct)
    console.log(parent_pwd)
    console.log(parent_phone)
}

//動態生成一列
function add_data_row(){
    //$("#add_data_write").empty()
   //var add_list = "<tr><td><input></td><td><input></td><td><input></td></tr>";
   //$("#add_data_write").append(add_list) 
   console.log(ha)   
    }



