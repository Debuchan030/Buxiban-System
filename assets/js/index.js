//獲取buxiban_bulletin資訊
var bulletin =`
<div>
<tr data-bs-toggle="collapse" data-bs-target="#content1" aria-expanded="false"
    aria-controls="content">
    <td>
        <textarea cols="30" rows="1">標題：HCT線上程式設計夏令營開張啦~</textarea>
    </td>
</tr>
<tr class="collapse" id="content1">
    <td>
        <textarea name="" id="" cols="30" rows="3"
            class="m-2">開課資訊：在最嚴峻的時代，做最完善的準備，讓您的孩子超前部屬，走在時尚的尖端，在未來成為一位年薪千萬的工程師！開課日期：8月每周三下午4:30收費：$12500  </textarea>
        <button class="m-2">儲存</button>
        <button class="m-2">刪除</button>
    </td>
</tr>
</div>`
$("#bulletin_board").append(bulletin)