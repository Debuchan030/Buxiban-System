// 學生/家長名單模板
var member_management_template = ({ std_id, std_name, school, enrollment_year, contact1_name, contact2_name, contact_pwd, contact1_phone, contact2_phone }) => `
<tr id="${std_id}_std_id">
    <td >
        <input id="${std_id}_std_name" type="text" value="${std_name}" >
    </td>
    <td>
        <input id="${std_id}_school" type="text" value="${school}" >
    </td>
    <td>
        <input id="${std_id}_enrollment_year" type="text" value="${enrollment_year}" >
    </td>
    <td>
        <input id="${std_id}_contact1_name" type="text" value="${contact1_name}" placeholder = "聯絡人1(必填)">
        <input id="${std_id}_contact2_name" type="text" value="${contact2_name}" placeholder = "聯絡人2(選填)">
    </td>
    <td>
        <input id="${std_id}_contact1_phone" type="text" maxlength = "10" value="${contact1_phone}" placeholder = "聯絡電話1(必填)">
        <input id="${std_id}_contact2_phone" type="text" maxlength = "10" value="${contact2_phone}" placeholder = "聯絡電話2(選填)">
    </td>
    <td >
        <input id="${std_id}_contact_pwd" type="text" value="${contact_pwd}" >
    </td>
    <td><button class = "update_member">確認修改</button></td>
    <td><button class = "delete_member">確認刪除</button></td>
</tr>
`

var dynamic_member_template = ({ }) => `

<tr>
    <td><input name="std_name[]" type="text" required></td>
    <td><input name="school[]" type="text" required></td>
    <td><input name="enrollment_year[]" type="text" required></td>
    <td>
        <input name="contact1_name[]" type="text" placeholder = "聯絡人1(必填)" required>
        <input name="contact2_name[]" type="text" placeholder = "聯絡人2(選填)">
    </td>
    <td>
        <input name="contact1_phone[]" type="text" maxlength = "10" placeholder = "聯絡電話1(必填)" required >
        <input name="contact2_phone[]" type="text" maxlength = "10" placeholder = "聯絡電話2(選填)">
    </td>

    <td><button type="button" class="delete_new_member">刪除</button></td>
</tr>       

`

// 獲取所有學生/家長名單 std_n parent_n aact pwd phone, buxiban_parent.length
function get_all_member_func() {
    $.post("../../app/member_management.php", { action: "get_member" }, function (member) {
        member = JSON.parse(member)
        for (var i = 0; i < member.length; i++) {
            var id = member[i].std_id
            var std_n = member[i].std_name
            var school = member[i].school
            var enrollment_year = member[i].enrollment_year
            var contact1_name = member[i].contact1_name
            var contact2_name = member[i].contact2_name
            var contact1_phone = member[i].contact1_phone
            var contact2_phone = member[i].contact2_phone
            var pwd = member[i].contact_pwd
            $('#member_info').append([
                { std_id: id, std_name: std_n, school: school, enrollment_year: enrollment_year, contact1_name: contact1_name, contact2_name: contact2_name, contact1_phone: contact1_phone, contact2_phone: contact2_phone, contact_pwd: pwd },
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
    var school = $("#" + std_id + "_school").val()
    var enrollment_year = $("#" + std_id + "_enrollment_year").val()
    var contact1_name = $("#" + std_id + "_contact1_name").val()
    var contact2_name = $("#" + std_id + "_contact2_name").val()
    var contact1_phone = $("#" + std_id + "_contact1_phone").val()
    var contact2_phone = $("#" + std_id + "_contact2_phone").val()
    var contact_pwd = $("#" + std_id + "_contact_pwd").val()
    if (std_name == "" || school == "" || enrollment_year == "" || contact1_name == "" || contact1_phone == "" || contact_pwd == "") { flag = 0 }
    var member_update_list = {}
    member_update_list.std_id = std_id
    member_update_list.std_name = std_name
    member_update_list.school = school
    member_update_list.enrollment_year = enrollment_year
    member_update_list.contact1_name = contact1_name
    member_update_list.contact2_name = contact2_name
    member_update_list.contact1_phone = contact1_phone
    member_update_list.contact2_phone = contact2_phone
    member_update_list.contact_pwd = contact_pwd
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
$("#member_info").on("click", ".delete_member", delete_member_func)
function delete_member_func() {
    var id = $(this).closest("tr").attr("id")
    id = id.substring(0, id.length - 7)
    $.post("../../app/member_management.php", { action: "delete_member", std_id: id });
    location.reload();
}

//動態生成一列
$("#add_data_write").empty()
$('#add_data_write').append([{}].map(dynamic_member_template));
var add_new_member = document.getElementById('add_new_member')
add_new_member.addEventListener('click', add_new_member_func)
function add_new_member_func() {
    $('#add_data_write').append([{}].map(dynamic_member_template));
}

//刪除動態生成一列
$('#add_data_write').on('click', ".delete_new_member", function () {
    if ($('#add_data_write').children().length > 1) {
        $(this).parent().parent().remove()
    }

})

//搜尋
$('#search_text').on("keydown", event => {
    if (event.keyCode === 13) {
        var search_text = $('#search_text').val()
        if (search_text == "") {
            $('#member_info').empty()
            get_all_member_func.call()
        }
        else {
            $('#member_info').empty()

            $.post("../../app/member_management.php", { action: "get_member" }, function (member) {

                member = JSON.parse(member)
                for (var i = 0; i < member.length; i++) {
                    var id = member[i].std_id
                    var std_n = member[i].std_name
                    var school = member[i].school
                    var enrollment_year = member[i].enrollment_year
                    var contact1_name = member[i].contact1_name
                    var contact2_name = member[i].contact2_name
                    var contact1_phone = member[i].contact1_phone
                    var contact2_phone = member[i].contact2_phone
                    var pwd = member[i].contact_pwd
                    if (std_n.indexOf(search_text) != -1 || enrollment_year.indexOf(search_text) != -1 || school.indexOf(search_text) != -1 || contact1_name.indexOf(search_text) != -1 || contact2_name.indexOf(search_text) != -1 || contact1_phone.indexOf(search_text) != -1 || contact2_phone.indexOf(search_text) != -1 || pwd.indexOf(search_text) != -1) {
                        $('#member_info').append([
                            { std_id: id, std_name: std_n, school: school, enrollment_year: enrollment_year, contact1_name: contact1_name, contact2_name: contact2_name, contact1_phone, contact2_phone, contact_pwd: pwd },
                        ].map(member_management_template));
                    }
                }

            });
            // alert("以下為搜尋結果")

        }
    }
})




