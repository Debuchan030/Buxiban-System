// 學生/家長名單模板
var member_management_template = ({ std_id, std_name, parent_name, parent_pwd, parent_phone }) => `
<tr id="${std_id}_std_id">
    <td >
        <input id="${std_id}_std_name" type="text" value="${std_name}" required>
    </td>
    <td>
        <input id="${std_id}_parent_name" type="text" value="${parent_name}" required>
    </td>
    <td>
        <input id="${std_id}_parent_phone" type="text" maxlength = "10" value="${parent_phone}" required>
    </td>
    <td >
        <input id="${std_id}_parent_pwd" type="text" value="${parent_pwd}" required>
    </td>
    <td><button class = "update_member">確認修改</button></td>
    <td><button class = "delete_member">確認刪除</button></td>
</tr>
`;

// 獲取所有學生/家長名單 std_n parent_n aact pwd phone, buxiban_parent.length

$.post("../../app/member_management.php", { action: "get_member" }, function (member) {

    member = JSON.parse(member)
    for (var i = 0; i < member.length; i++) {
        var id = member[i].std_id
        var std_n = member[i].std_name
        var parent_n = member[i].parent_name
        var pwd = member[i].parent_pwd
        var phone = member[i].parent_phone
        $('#member_info').append([
            { std_id: id, std_name: std_n, parent_name: parent_n, parent_pwd: pwd, parent_phone: phone },
        ].map(member_management_template));
    }
});

// 修改名單資料
$("#member_info").on("click", ".update_member", update_member_func)
function update_member_func() {
    var id = $(this).parent().parent().attr("id")
    var std_id = id.substring(0, id.length - 7)
    var std_name = $("#" + std_id + "_std_name").val()
    var parent_name = $("#" + std_id + "_parent_name").val()
    var parent_phone = $("#" + std_id + "_parent_phone").val()
    var parent_pwd = $("#" + std_id + "_parent_pwd").val()
    var member_update_list = {}
    member_update_list.std_id = std_id
    member_update_list.std_name = std_name
    member_update_list.parent_name = parent_name
    member_update_list.parent_phone = parent_phone
    member_update_list.parent_pwd = parent_pwd
    var flag = 1
    console.log("test")
    for (var i = 0; i < member_update_list.length; i++) {
        console.log(member_update_list[i])

        if (member_update_list[i] == "") {
            flag = 0
            break
        }
    }
    member_update_list = JSON.stringify(member_update_list)
    if (flag == 1) {
        console.log("push")
        $.post("../../app/member_management.php", { action: "update_member", member_update_list });

    }
    else{
        alert("請勿空格！")
    }
}

//刪除名單資料
$("#std_list").on("click", ".delete_member", delete_member_func)
function delete_member_func() {
    var id = $(this).parent().attr("id")
    id = id.substring(0, id.length - 7)
    $.post("../../app/member_management.php", { action: "delete_member", std_id: id });
}

//動態生成一列
$("#add_data_write").empty()
var add_list = "<tr><td><input></td><td><input></td><td><input></td><td><button class = \"delete_new_member\">刪除</button></td></tr>";
$("#add_data_write").append(add_list)
var add_new_member = document.getElementById('add_new_member')
add_new_member.addEventListener('click', add_new_member_func)
function add_new_member_func() {
    var add_list = "<tr><td><input></td><td><input></td><td><input></td><td><button class = \"delete_new_member\">刪除</button></td></tr>";
    $("#add_data_write").append(add_list)
}
//新增名單資料



