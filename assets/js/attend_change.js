//點擊按鈕切換成已到班

var non_attend = document.querySelectorAll('.non_attend')
// console.log(non_attend)
for (var i = 0; i < non_attend.length; i++) {
    non_attend[i].addEventListener('click', non_attend_func)
}
function non_attend_func() { //已到班
    console.log("come")
}