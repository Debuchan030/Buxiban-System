// 1.先準備好學生的資料,用陣列形式儲存，每個陣列元素是一個物件
var datas = [{
    name: '張三',
    subject: 'JavaScript',
    score: 100
}, {
    name: '李四',
    subject: 'JavaScript',
    score: 98
}, {
    name: '王五',
    subject: 'JavaScript',
    score: 99
}, {
    name: '趙六',
    subject: 'JavaScript',
    score: 88
}, {
    name: '哈哈',
    subject: 'JavaScript',
    score: 0
}];
// 2. 往tbody 里面創建行： 有幾個人（通過陣列的長度）我們就創建幾行
var tbody = document.querySelector('tbody');
for (var i = 0; i < datas.length; i++) { // 外面的for回圈管行 tr
    // 1. 創建 tr行
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    // 2. 行里面創建單元格(跟資料有關系的3個單元格) td 單元格的數量取決于每個物件里面的屬性個數  for回圈遍歷物件 datas[i]
    for (var k in datas[i]) { // 里面的for回圈管列 td
        // 創建單元格 
        var td = document.createElement('td');
        // 把物件里面的屬性值 datas[i][k] 給 td  
        // console.log(datas[i][k]);
        td.innerHTML = datas[i][k];
        tr.appendChild(td);
    }
    // 3. 創建有洗掉2個字的單元格 
    var td = document.createElement('td');
    td.innerHTML = '<a href="javascript:;">洗掉</a>';
    tr.appendChild(td);

}
// 4. 洗掉操作
var as = document.querySelectorAll('a');
for (var i = 0; i < as.length; i++) {
    as[i].onclick = function() {
        // 點擊a洗掉 當前a所在的行(a父節點的父節點)  node.removeChild(child)  
        tbody.removeChild(this.parentNode.parentNode)
    }
}
// for(var k in obj) {
//     k 得到的是屬性名
//     obj[k] 得到是屬性值
// }