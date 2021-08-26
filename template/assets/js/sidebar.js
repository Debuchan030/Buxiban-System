$.post("../../app/changepage.php", { action: "get_pagename" }, function (page) {
    page = JSON.parse(page);
    $("#main").load("./template/"+page[0]+".html")
    $("title").html(page[1])
});

$('li').click(function () {
    var targe_tpage = $(this).attr('id');
    var targe_title =  $(this).child("a").text();
    $("#main").load("./template/"+targe_tpage+".html")
    $("title").html(targe_title)
    $.post("../../app/changepage.php", {action:"change_page", target_page: targe_tpage,target_title: target_title });
})