//獲取php資料

var attend_template = ({ std_id, std_name, parent_name, parent_phone, attend_time, leave_time, remark }) => `

<tr id="${std_id}_attend">
    <td>${std_name}</td>
    <td>${parent_name}</td>
    <td>${parent_phone}</td>
    <td>
        <label for="">到班時間：${attend_time}</label>
        <label for="">離班時間：${leave_time}</label>
    </td>
    <td>
        <input type="radio" name="${std_id}_attend_state" id="${std_id}_not_attend" value="未到班">
        <label for="${std_id}_not_attend" name="${std_id}_attend_state">未到班</label><br>
        <input type="radio" name="${std_id}_attend_state" id="${std_id}_attended" value="到班">
        <label for="${std_id}_attended" name="${std_id}_attend_state">到班</label><br>
        <input type="radio" name="${std_id}_attend_state" id="${std_id}_leaved" value="離班">
        <label for="${std_id}_leaved" name="${std_id}_attend_state">離班</label><br>
        <input type="radio" name="${std_id}_attend_state" id="${std_id}_day_off" value="請假">
        <label for="${std_id}_day_off" name="${std_id}_attend_state">請假</label><br>
    </td>
    <td>
        <input id="${std_id}_remark" type="text" value="${remark}" >
    </td>
</tr>

`

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};
$(function () {
    $("#datepicker").datepicker({
        altFormat: 'yy-mm-dd'
    });
});

//建立所有學生列表
function get_attend_table(date) {
    $.post("../../app/attend_record.php", { action: "get_attend", date: date }, function (attend) {

        attend = JSON.parse(attend)
        for (var i = 0; i < attend.length; i++) {
            var id = attend[i].std_id
            var std_n = attend[i].std_name
            var parent_n = attend[i].parent_name
            //確認狀態 0 未到班 1 到班 2 離班 3 請假
            var attend_time = attend[i].attend_time
            var leave_time = attend[i].leave_time
            var phone = attend[i].parent_phone
            var remark = attend[i].remark
            $('#attend_student').append([
                { std_id: id, std_name: std_n, parent_name: parent_n, parent_phone: phone, attend_time: attend_time, leave_time: leave_time, remark: remark },
            ].map(attend_template));

            var attend_states = attend[i].attend_states
            if (attend_states == 0) {
                $("#" + id + "_not_attend").prop('checked', true);
            }
            else if (attend_states == 1) {
                $("#" + id + "_attended").prop('checked', true);
            }
            else if (attend_states == 2) {
                $("#" + id + "_leaved").prop('checked', true);
            }
            else {
                $("#" + id + "_day_off").prop('checked', true);
            }
        }
    });
}
var today = new Date();

get_attend_table.call(today.yyyymmdd())

// 修改狀態
$('#attend_student').on('click', $('input:radio'), update_attend_table)
function update_attend_table() {
    var id = $(this).attr('name')
    console.log(id)
    id = id.substring(0, id.length - 13)
    var attend_states = 0
    if ($(this).attr('value') == "未到班") {
        attend_states = 0
    }
    else if ($(this).attr('value') == "到班") {
        attend_states = 1
    }
    else if ($(this).attr('value') == "離班") {
        attend_states = 2
    }
    else {
        attend_states = 3
    }
    $.post("../../app/attend_record.php", { action: "update_attend_states", student_id: id, attend_states: attend_states })
}

// 修改備註
$('#attend_student').on('keydown', $('input:text'), event => {
    if (event.keyCode === 13) {
        var id = $(this).attr('id')
        id = id.substring(0, id.length - 7)
        var remark = $(this).val()
        $.post("../../app/attend_record.php", { action: "update_remark", student_id: id, remark: remark })
    }
})
//搜尋
$('#search_text').on("keydown", event => {
    if (event.keyCode === 13) {
        var search_text = $('#search_text').val()
        if (search_text == "") {
            $('#attend_student').empty()
            get_attend_table.call()
        }
        else {
            $('#attend_student').empty()

            $.post("../../app/attend_record.php", { action: "get_attend" }, function (attend) {

                attend = JSON.parse(attend)
                for (var i = 0; i < attend.length; i++) {
                    var id = attend[i].std_id
                    var std_n = attend[i].std_name
                    var parent_n = attend[i].parent_name
                    //確認狀態 0 未到班 1 到班 2 離班 3 請假

                    var phone = attend[i].parent_phone
                    var remark = attend[i].remark
                    if (std_n.indexOf(search_text) != -1 || parent_n.indexOf(search_text) != -1 || phone.indexOf(search_text) != -1 || remark.indexOf(search_text) != -1) {
                        $('#attend_student').append([
                            { std_id: id, std_name: std_n, parent_name: parent_n, parent_phone: phone, remark },
                        ].map(attend_template));

                        var attend_states = attend[i].attend_states
                        if (attend_states == 0) {
                            $("#" + id + "_not_attend").prop('checked', true);
                        }
                        else if (attend_states == 1) {
                            $("#" + id + "_attended").prop('checked', true);
                        }
                        else if (attend_states == 2) {
                            $("#" + id + "_leaved").prop('checked', true);
                        }
                        else {
                            $("#" + id + "_day_off").prop('checked', true);
                        }
                    }
                }
                alert("以下為搜尋結果")
            });
        }
    }
})



// $("#course_attend").empty()
// for (var i = 0; i < 10 /*course_attend_list[i].length*/; i++) {

//     var std_name = i/*course_attend_list[i].std_name*/;
//     var parent_name = i + 1/*course_attend_list[i].parent_name*/;
//     var parent_phone = "0" + 9000000 + i/*course_attend_list[i].parent_phone*/;
//     var row_list = ""
//     $("#course_attend").append(row_list)
// }


// //點擊已到班按鈕 

// $('#course_attend').on('click', '.attend_btn', attend_btn)
// function attend_btn() {
//     //顯示到班/離開的時間
//     $("#attend_data").empty()
//     var attend_data_div = "hihihih";
//     $("#attend_data").append(attend_data_div)
//     console.log("hi")
// }
