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
function get_all_member_func() {
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

}
get_all_member_func.call()
// 修改名單資料
$("#member_info").on("click", ".update_member", update_member_func)
function update_member_func() {
    var id = $(this).parent().parent().attr("id")
    var flag = 1
    var std_id = id.substring(0, id.length - 7)
    var std_name = $("#" + std_id + "_std_name").val()
    var parent_name = $("#" + std_id + "_parent_name").val()
    var parent_phone = $("#" + std_id + "_parent_phone").val()
    var parent_pwd = $("#" + std_id + "_parent_pwd").val()
    if (std_name == "" || parent_name == "" || parent_phone == "" || parent_pwd == "") { flag = 0 }
    var member_update_list = {}
    member_update_list.std_id = std_id
    member_update_list.std_name = std_name
    member_update_list.parent_name = parent_name
    member_update_list.parent_phone = parent_phone
    member_update_list.parent_pwd = parent_pwd

    member_update_list = JSON.stringify(member_update_list)
    if (flag == 1) {
        $.post("../../app/member_management.php", { action: "update_member", member_update_list });
        location.reload();
    }
    else {
        alert("請勿空格！")
    }
}

//刪除名單資料
$("#std_list").on("click", ".delete_member", delete_member_func)
function delete_member_func() {
    var id = $(this).parent().attr("id")
    id = id.substring(0, id.length - 7)
    $.post("../../app/member_management.php", { action: "delete_member", std_id: id });
    location.reload();
}

//動態生成一列
$("#add_data_write").empty()
var add_list = "<tr><td><input name = \"std_name[]\"></td><td><input name = \"parent_name[]\"></td><td><input name = \"parent_phone[]\" type=\"tex\" maxlength = \"10\"></td><td><button type = \"button\" class = \"delete_new_member\">刪除</button></td></tr>";
$("#add_data_write").append(add_list)
var add_new_member = document.getElementById('add_new_member')
add_new_member.addEventListener('click', add_new_member_func)
function add_new_member_func() {
    var add_list = "<tr><td><input name = \"std_name[]\"></td><td><input name = \"parent_name[]\"></td><td><input name = \"parent_phone[]\" type=\"tex\" maxlength = \"10\"></td><td><button type = \"button\" class = \"delete_new_member\">刪除</button></td></tr>";
    $("#add_data_write").append(add_list)
}

//刪除動態生成一列
$('#add_data_write').on('click', ".delete_new_member", function () {
    $(this).parent().parent().remove()
})

//搜尋
$('#search_text').addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        var search_text = $('#search_text').text()
        var count = 0;
        if (search_text == "") {

        }
        else {
            $.post("../../app/member_management.php", { action: "get_member" }, function (member) {

                member = JSON.parse(member)
                $('#member_info').empty()
                for (var i = 0; i < member.length; i++) {
                    var id = member[i].std_id
                    var std_n = member[i].std_name
                    var parent_n = member[i].parent_name
                    var pwd = member[i].parent_pwd
                    var phone = member[i].parent_phone
                    if (std_n.indexOf(search_text) != -1 || parent_n.indexOf(search_text) != -1 || pwd.indexOf(search_text) != -1 || phone.indexOf(search_text) != -1) {
                        $('#member_info').append([
                            { std_id: id, std_name: std_n, parent_name: parent_n, parent_pwd: pwd, parent_phone: phone },
                        ].map(member_management_template));
                        count++
                    }
                }
            });
            if (count == 0) {
                alert("查無結果")
                $('#member_info').empty()
                get_all_member_func.call()
            }
            else {


            }
        }
    }
})




