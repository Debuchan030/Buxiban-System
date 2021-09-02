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
        <textarea id="${std_id}_remark" cols="30" rows="4">${remark}</textarea>
        <button class = "mt-3 update_remark" id = "${std_id}_update_remark" >儲存</button>
    </td>
</tr>

`

$(function () {
    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {

            $('#attend_student').empty()
            date = dateText;
            get_attend_table.call(this, dateText)
        }
    });
});

//建立所有學生列表
function get_attend_table(date) {
    $.post("../../app/attend_record.php", { action: "get_attend", date: date }, function (attend) {
        $('#attend_student').empty()
        if (attend == "查無紀錄") {
            alert(attend)
            return
        }
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
            if (attend_states == "0") {
                $("#" + id + "_not_attend").prop('checked', true);
            }
            else if (attend_states == "1") {
                $("#" + id + "_attended").prop('checked', true);
            }
            else if (attend_states == "2") {
                $("#" + id + "_leaved").prop('checked', true);
            }
            else {
                $("#" + id + "_day_off").prop('checked', true);
            }
        }
    });
}

// 修改狀態
$('#attend_student').on('click', 'input:radio', update_attend_table)
function update_attend_table() {
    var id = $(this).attr('name')
    id = id.substring(0, id.length - 13)
    var attend_states = ""
    if ($(this).attr('value') == "未到班") {
        attend_states = "0"
    }
    else if ($(this).attr('value') == "到班") {
        attend_states = "1"
    }
    else if ($(this).attr('value') == "離班") {
        attend_states = "2"
    }
    else {
        attend_states = "3"
    }
    $.post("../../app/attend_record.php", { action: "update_attend_states", student_id: id, attend_states: attend_states, date: date }, function () {
        $('#attend_student').empty()
        get_attend_table.call(this, date)
    })

}

// 修改備註

$('#attend_student').on('click', '.update_remark', update_remark)
function update_remark() {


    var id = $(this).attr('id')
    id = id.substring(0, id.length - 14)
    var remark = $("#" + id + "_remark").val()
    $.post("../../app/attend_record.php", { action: "update_remark", student_id: id, remark: remark, date: date }, function () {
        $('#attend_student').empty()
        get_attend_table.call(this, date)
    })

}
//搜尋
$('#search_text').on("keydown", event => {
    if (event.keyCode === 13) {
        var search_text = $('#search_text').val()
        if (search_text == "") {
            $('#attend_student').empty()
            get_attend_table.call(this, date)
        }
        else {
            $('#attend_student').empty()

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
                    if (std_n.indexOf(search_text) != -1 || parent_n.indexOf(search_text) != -1 || attend_time.indexOf(search_text) != -1 || leave_time.indexOf(search_text) != -1 || phone.indexOf(search_text) != -1 || remark.indexOf(search_text) != -1) {
                        $('#attend_student').append([
                            { std_id: id, std_name: std_n, parent_name: parent_n, parent_phone: phone, attend_time: attend_time, leave_time: leave_time, remark },
                        ].map(attend_template));

                        var attend_states = attend[i].attend_states
                        if (attend_states == "0") {
                            $("#" + id + "_not_attend").prop('checked', true);
                        }
                        else if (attend_states == "1") {
                            $("#" + id + "_attended").prop('checked', true);
                        }
                        else if (attend_states == "2") {
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
