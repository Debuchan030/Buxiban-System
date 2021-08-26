$.post("../../app/changepage.php", { action: "get_pagename" }, function (get_pagename) {
    if(get_pagename){
        $("#main").load("./template/"+get_pagename+".html")
        $("title").html(get_title)
    }
});

$('li').click(function () {
    var targetpage = $(this).attr('id');
    $.post("../../app/pagestates.php", {action:"change_page", target_page: targetpage }, function (get_title) {
        $("#main").load("./template/"+page+".html")
        $("title").html(get_title)
    });
})