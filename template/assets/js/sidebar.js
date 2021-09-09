
$.post("../../app/changepage.php", { action: "get_pagename" }, function (page) {
    page = JSON.parse(page);
    $("#main").load("./template/"+page[0]+".html")
    $("title").html(page[1])
    this_page=page[0];
});

var this_page;
$('li').click(function () {
    if($(this).attr('id')!=this_page){
        var target_page = $(this).attr('id');
        var target_title = $(this).first().text();
        if(target_page){
            $("#main").load("./template/"+target_page+".html")
            $("title").html(target_title)
            $.post("../../app/changepage.php", {action:"change_page", target_page: target_page,target_title: target_title });
        }
    }
    this_page=$(this).attr('id');
})