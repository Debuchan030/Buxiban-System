// 公佈欄模板
var bulletin_template = ({ bulletin_id, bulletin_title, bulletin_content, bulletin_time }) => `
<tr data-bs-toggle="collapse" data-bs-target="#b${bulletin_id}" aria-expanded="false"
aria-controls="content">
    <td><textarea cols="30" rows="1" name = "bulletin_title">${bulletin_title}</textarea></td>
</tr>
<tr class="collapse"  id="b${bulletin_id}">
    <td name = "${bulletin_id}" class = "${bulletin_title}">
        <textarea name="bulletin_content" id="" cols="30" rows="3"
            class="m-2">${bulletin_content}</textarea>
        <textarea name="bulletin_time" id="" cols="30" rows="1"
            class="m-2">${bulletin_time}</textarea>
            <button class="m-2 bulletin_save">儲存</button>
            <button class="m-2 bulletin_delete">刪除</button></td>
    </tr>
`;

// 獲取所有公佈欄資訊 id title content time , buxiban_bulletin.length

$.post("../../app/bulletin_board.php",{action: "get_bulletin"}, function(buxiban_bulletin){
    // Display the returned data in browser
    // $("#result").html(buxiban_bulletin);
    buxiban_bulletin = JSON.parse(buxiban_bulletin)
    console.log(buxiban_bulletin)
    console.log(buxiban_bulletin.length)
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
$(".bulletin_save").on("click",bulletin_save_func)
function bulletin_save_func(){
    var id = $(this).parent().attr("name")
    var title = $(this).parent().attr('class')
    var content = $(this).parent().find(name = 'bulletin_content').text()
    console("hi")
    $.post("../../app/bulletin_board.php",{action: "update_bulletin",bulletin_id:id,bulletin_title:title,bulletin_content:content}, function(buxiban_bulletin){
        // Display the returned data in browser
        // $("#result").html(buxiban_bulletin);
       
    });
}
//刪除貼文
$(".bulletin_delete").on("click",bulletin_delete_func)
function bulletin_delete_func(){
    console("hihihi")
    var id = $(this).parent().attr("name")
    $.post("../../app/bulletin_board.php",{action: "delete_bulletin",bulletin_id:id}, function(buxiban_bulletin){
        // Display the returned data in browser
        // $("#result").html(buxiban_bulletin);
       
    });
}