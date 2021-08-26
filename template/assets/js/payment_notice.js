
//獲取buxiban_payment table資料

//將資料用template放上去
var payment_template = ({ payment_id, payment_deadline,}) => `
<div class="border border-secondary border-3 rounded p-2 h1 text-center bg-white" data-bs-toggle="collapse"
	data-bs-target="#record_${payment_id}" aria-expanded="false" aria-controls="record_${payment_id}">
	${payment_deadline}
</div>

<div class="collapse" id="record_${payment_id}">
	<table>
		<h3>未繳款</h3>
		<tbody id="non_payed">

		</tbody>

	</table>
	<table>
		<h3>已繳款</h3>
		<tbody id="payed">

		</tbody>

	</table>
</div>
`

var nonpayed_std_info_template = ({record_std_id,record_std_name, record_parent_name,record_parent_phone,total_price}) => `

<tr data-bs-toggle="collapse" data-bs-target="#std_${record_std_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>學生姓名：${record_std_name}</td>
	<td>總費用：$${total_price}</td>
	<td><button class="non_payed">未繳款</button></td>
</tr>

<tr class="collapse" id="std_${record_std_id}">
	<td>
		<div>
			姓名：${record_std_name}
		</div>
		<div>
			家長：${record_parent_name}，家長電話：${record_parent_phone}
		</div>
		<div>
			詳細資訊：
		</div>
		<div id = "selcourse_${record_std_id}">

		</div>
	</td>
</tr>
	
`
var payed_std_info_template = ({record_std_id,record_std_name, record_parent_name,record_parent_phone,total_price }) => `


<tr data-bs-toggle="collapse" data-bs-target="#std_${record_std_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>${record_std_name}</td>
	<td>總費用：$${total_price}</td>
	<td><button class="payed">已繳款</button></td>
</tr>

<tr class="collapse" id="std_${record_std_id}">
	<td>
		<div>
			姓名：${record_std_name}
		</div>
		<div>
			家長：${record_parent_name}，家長電話：${record_parent_phone}
		</div>
		<div>
			詳細資訊：
		</div>
		<div id = "selcourse_${record_std_id}>

		</div>
	</td>
</tr>

`



var selcourse_template = ({ record_selcourse_name, record_selcourse_price }) => `
<label for="">課程名稱：${record_selcourse_name}---$${record_selcourse_price}</label>

`
//抓取繳款紀錄並放上去
//獲取繳款紀錄資料 buxiban_payment table (select * from buxiban_payment)
//獲取學生家長資料 buxiban_student_record_info table (select * from buxiban_student_record_info where buxiban_payment.payment_id == buxiban_student_record_info.payment_id)
//獲取學生選課紀錄 buxiban_selcourse_record_info table 
//(select * from buxiban_selcourse_record_info where buxiban_payment_record_info.record_selcourse_id == buxiban_selcourse_record_info.record_selcourse_id)

function get_payment_record(){
	$.post("../../app/payment_notice.php", { action: "get_bulletin" }, function (buxiban_bulletin) {

		buxiban_bulletin = JSON.parse(buxiban_bulletin)
		for (var i = 0; i < buxiban_bulletin.length; i++) {
			var id = buxiban_bulletin[i].bulletin_id
			var title = buxiban_bulletin[i].bulletin_title
			var content = buxiban_bulletin[i].bulletin_content
			var time = buxiban_bulletin[i].bulletin_time
			$('#bulletin_board').append([
				{ bulletin_id: id, bulletin_title: title, bulletin_content: content, bulletin_time: time },
			].map(bulletin_template));
		}
	});
}


//新增當月繳款紀錄
var add_payment_record = document.getElementById('add_payment_record')
add_payment_record.addEventListener('click', add_payment_record_func)

function add_payment_record_func() {
	
}

