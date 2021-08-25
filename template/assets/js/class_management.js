var class_management_template = ({ course_id, course_name, course_info, course_price, course_time }) => `
<tr data-bs-toggle="collapse" data-bs-target="#c${course_id}" aria-expanded="false"
    aria-controls="content">
    <textarea id="${course_id}_name" cols="30" rows="1">${course_name}</textarea>


</tr>
<tr class="collapse" id="c${course_id}">
    <td name = "${course_id}">
        <textarea id="${course_id}_info" cols="30" rows="1">${course_info}</textarea>
        <textarea id="${course_id}_price" cols="30" rows="3">${course_price}</textarea>
        <textarea id="${course_id}_time" cols="30" rows="1">${course_time}</textarea>
        <button class="m-2 course_save">儲存</button>
        <button class="m-2 course_delete">刪除</button>
    </td>
    </td>
</tr>

`;

$.post("../../app/class_management.php", { action: "get_course" }, function (all_course) {
    all_course = JSON.parse(all_course)
    console.log(all_course.length)
    for (var i = 0; i < all_course.length; i++) {
        var id = all_course[i].course_id
        var name = all_course[i].course_name
        var info = all_course[i].course_info
        var price = all_course[i].course_price
        var time = all_course[i].course_time
        console.log(id)
        console.log(name)
        console.log(info)
        console.log(price)
        console.log(time)
        $('#all_course').append([
            { course_id: id, course_name: "name", course_info:"info", course_price: 3000, course_time: "time" },
        ].map(class_management_template));
    }
});

// 修改貼文
$("#all_course").on("click", ".course_save", course_save_func)
function course_save_func() {
    var id = $(this).parent().attr("name")
    var name_addr = "#" + id + "_name"
    var info_addr = "#" + id + "_info"
    var price_addr = "#" + id + "_price"
    var time_addr = "#" + id + "_time"

    var name = $(name_addr).val()
    var info = $(info_addr).val()
    var price = $(price_addr).val()
    var time = $(time_addr).val()
    $.post("../../app/class_management.php", { action: "update_course", course_id: id, course_name: name, course_info: info, course_price: price, course_time: time });
    $("#main").load("./template/class_management.html")
    $("title").html("開課課程管理")
}
//刪除貼文
$("#all_course").on("click", ".course_delete", course_delete_func)
function course_delete_func() {
    var id = $(this).parent().attr("name")
    $.post("../../app/class_management.php", { action: "delete_course", course_id: id });
    $("#main").load("./template/class_management.html")
    $("title").html("開課課程管理")
}