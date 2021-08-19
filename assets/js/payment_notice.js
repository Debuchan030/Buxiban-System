var non_payed = document.querySelectorAll('.non_payed')
// console.log(non_payed)
for (var i = 0; i < non_payed.length; i++) {
    non_payed[i].addEventListener('click', non_payed_func)
}
function non_payed_func() { //換成已繳費
    console.log("hi")
}