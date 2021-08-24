

$('li').click(function () {
    switch ($(this).attr('id')) {
        case 'bulletin_board':
            $("#main").load("./template/bulletin_board.html")
            $("title").html("公佈欄")
            break
        case 'payment_notice':
            $("#main").load("./template/payment_notice.html")
            $("title").html("繳款通知管理")
            break
        case 'member_management':
            $("#main").load("./template/member_management.html")
            $("title").html("學生/家長管理")
            break
        case 'class_selected_management':
            $("#main").load("./template/class_selected_management.html")
            $("title").html("選課管理")
            break
        case 'class_management':
            $("#main").load("./template/class_management.html")
            $("title").html("開課課程管理")
            break
        case 'attend_record':
            $('#main').load('./template/attend_record.html')
            $("title").html("到班通知管理")
    }

})