$.post("../../app/changepage.php", { action: "get_pagename" }, function (page) {
    page = JSON.parse(page);
    if(page){
        $("#main").load("./template/"+page[0]+".html")
        $("title").html(page[1])
    }
});

$('li').click(function () {
    var targetpage = $(this).attr('id');
    //var pagetitle =  $(this).
    $.post("../../app/changepage.php", {action:"change_page", target_page: targetpage }, function (get_title) {
        $("#main").load("./template/"+targetpage+".html")
        $("title").html("GGG")
    });
})