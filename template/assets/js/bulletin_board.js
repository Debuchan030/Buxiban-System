// 公佈欄模板
var bulletin_template = ({ bulletin_id, bulletin_title, bulletin_content, bulletin_time }) => `
<tr data-bs-toggle="collapse" data-bs-target="#b${bulletin_id}" aria-expanded="false"
aria-controls="#b${bulletin_id}">
    <td>
        <textarea cols="30" rows="1" id = "${bulletin_id}_title">${bulletin_title}</textarea>
    </td>
</tr>
<tr class="collapse"  id="b${bulletin_id}">
    <td name = "${bulletin_id}">
        <textarea name="bulletin_content" cols="30" rows="3"
            class="m-2" id = "${bulletin_id}_content">${bulletin_content}</textarea>
        <label for="" class="my-3 mx-3" >發布時間：${bulletin_time}</label>
        <button class="m-2 bulletin_save">儲存</button>
        <button class="m-2 bulletin_delete">刪除</button>
    </td>
</tr>
`;

// 獲取所有公佈欄資訊 id title content time , buxiban_bulletin.length

$.post("../../app/bulletin_board.php", { action: "get_bulletin" }, function (buxiban_bulletin) {

    buxiban_bulletin = JSON.parse(buxiban_bulletin)
    for (var i = 0; i < buxiban_bulletin.length; i++) {
        var id = buxiban_bulletin[i].bulletin_id
        var title = buxiban_bulletin[i].bulletin_title
        var content = buxiban_bulletin[i].bulletin_content
        var time = buxiban_bulletin[i].bulletin_time
        $('#bulletin_board').append([
            { bulletin_id: id, bulletin_title: title, bulletin_content: content, bulletin_time: time },
        ].map(bulletin_template));
    }
});


// console.log("hihi")

// 修改貼文
$("#bulletin_board").on("click", ".bulletin_save", bulletin_save_func)
function bulletin_save_func() {
    var id = $(this).parent().attr("name")
    var title_addr = "#" + id + "_title"
    var content_addr = "#" + id + "_content"
    var title = $(title_addr).val()
    var content = $(content_addr).val()
    $.post("../../app/bulletin_board.php", { action: "update_bulletin", bulletin_id: id, bulletin_title: title, bulletin_content: content });
    location.reload();
}
//刪除貼文
$("#bulletin_board").on("click", ".bulletin_delete", bulletin_delete_func)
function bulletin_delete_func() {
    var id = $(this).parent().attr("name")
    $.post("../../app/bulletin_board.php", { action: "delete_bulletin", bulletin_id: id });
    location.reload();
}