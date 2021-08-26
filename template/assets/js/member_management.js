// 學生/家長名單模板
var member_management_template = ({ std_id,std_name, parent_name, parent_acct, parent_pwd, parent_phone }) => `
<tr id="${std_id}_std_id">
    <td id="${std_id}_std_name">${std_name}</td>
    <td id="${std_id}_parent_name">${parent_name}</td>
    <td id="${std_id}_parent_acct">${parent_acct}</td>
    <td id="${std_id}_parent_pwd">${parent_pwd}</td>
    <td id="${std_id}_parent_phone">${parent_phone}</td>
    <td><button class = "update_data">修改資料</button></td>
    <td><button class = "delete_data">刪除資料</button></td>
</tr>
`;

// 獲取所有學生/家長名單 std_n parent_n aact pwd phone, buxiban_parent.length

$.post("../../app/member_management.php", { action: "get_list" }, function (buxiban_student) {

    buxiban_student = JSON.parse(buxiban_student)
    for (var i = 0; i < buxiban_student.length; i++) {
        var id = buxiban_student[i].std_id       
        var std_n = buxiban_student[i].std_name
        var parent_n = buxiban_parent[i].parent_name
        var aact = buxiban_parent[i].parent_acct
        var pwd = buxiban_parent[i].parent_pwd
        var phone = buxiban_parent[i].parent_phone
        $('#std_list').append([
            { std_id: id,std_name: std_n, parent_name: parent_n, parent_acct: aact, parent_pwd: pwd, parent_phone: phone },
        ].map(member_management_template));
    }
});

// 修改名單資料
$("#std_list").on("click", ".update_data", update_data_func)
function update_data_func() {
    var id = $(this).parent().attr("name")
    var std_n_addr = "#" + id + "std_name"
    var parent_n_addr = "#" + id + "parent_name"
    var aact_addr = "#" + id + "parent_acct"
    var pwd_addr = "#" + id + "parent_pwd"
    var phone_addr = "#" + id + "parent_phone"
    var std_n = $(std_n_addr).val()
    var parent_n = $(parent_n_addr).val()
    var aact = $(aact_addr).val()
    var pwd = $(pwd_addr).val()
    var phone = $(phone_addr).val()
    $.post("../../app/member_management.php", { action: "update_data", std_id: id,std_name: std_n, parent_name: parent_n, parent_acct: aact, parent_pwd: pwd, parent_phone: phone });
}

//刪除名單資料
$("#std_list").on("click", ".delete_data", delete_data_func)
function delete_data_func() {
    var id = $(this).parent().attr("name")
    $.post("../../app/member_management.php", { action: "delete_data", std_id: id });
}

//動態生成一列
$("#add_data_write").empty() 
var add_list = "<tr><td><input></td><td><input></td><td><input></td></tr>";
$("#add_data_write").append(add_list)
function add_data_row(){
    var add_list = "<tr><td><input></td><td><input></td><td><input></td></tr>";
    $("#add_data_write").append(add_list)   
    console.log("hi") 
    }



