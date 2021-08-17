

var edit = document.getElementById('edit');
console.log(edit)
edit.addEventListener('click',edit_enable);

// initial
edit_flag = 0;//0 =  編輯 ， 1 = 儲存
var title = document.getElementById('title');
title.disabled= true;

var content = document.getElementById('content');
content.disabled = true;








// function
function edit_enable(){//edit btn
    if(edit_flag ==0){
        document.getElementById('title').disabled = false
        document.getElementById('content').disabled = false
        document.getElementById('edit').innerHTML = "儲存";
        edit_flag = 1;
    }
    else if(edit_flag == 1){
        document.getElementById('title').disabled = true
        document.getElementById('content').disabled = true
        document.getElementById('edit').innerHTML = "編輯";
        edit_flag = 0;
    }
}