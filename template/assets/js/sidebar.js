

$('li').click(function () {
    switch ($(this).attr('id')) {
        case 'bulletin_board':
            $("#mainpage_change").load("./template/bulletin_board.html")
            break
        case 'payment_notice':
            $("#mainpage_change").load("./template/payment_notice.html")
            break
        case 'member_management':
            $("#mainpage_change").load("./template/member_management.html")
            break
        case 'class_selected_management':
            $("#mainpage_change").load("./template/class_selected_management.html")
            break
        case 'class_opened_management':
            $("#mainpage_change").load("./template/class_management.html")
            break
    }

})