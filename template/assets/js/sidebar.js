

$('li').click(function () {
    switch ($(this).attr('id')) {
        case 'bulletin_board':
            $("#main").load("./template/bulletin_board.html")
            break
        case 'payment_notice':
            $("#main").load("./template/payment_notice.html")
            break
        case 'member_management':
            $("#main").load("./template/member_management.html")
            break
        case 'class_selected_management':
            $("#main").load("./template/class_selected_management.html")
            break
        case 'class_management':
            $("#main").load("./template/class_management.html")
            break
        case 'attend_record':
            $('#main').load('./template/attend_record.html')
    }

})