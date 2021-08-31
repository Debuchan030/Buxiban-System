
//獲取buxiban_payment table資料

//將資料用template放上去
var payment_template = ({ payment_id, payment_time, }) => `
<div class="border border-secondary border-3 rounded p-2 h1 text-center bg-white" data-bs-toggle="collapse"
	data-bs-target="#record_${payment_id}" aria-expanded="false" aria-controls="record_${payment_id}">
	${payment_time}
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

var nonpayed_std_info_template = ({ record_std_id, record_std_name, record_parent_name, record_parent_phone }) => `

<tr data-bs-toggle="collapse" data-bs-target="#std_${record_std_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>學生姓名：${record_std_name}</td>
	<td id = "total_price_${record_std_id}"></td>
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
var payed_std_info_template = ({ record_std_id, record_std_name, record_parent_name, record_parent_phone }) => `


<tr data-bs-toggle="collapse" data-bs-target="#std_${record_std_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>學生姓名：${record_std_name}</td>
	<td id = "total_price_${record_std_id}"></td>
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
var total_price_template = ({ total_price }) => `
總金額：$${total_price}
`
//抓取繳款紀錄並放上去
//獲取繳款紀錄資料 buxiban_payment table (select * from buxiban_payment)
//獲取學生家長資料 buxiban_student_record_info table (select * from buxiban_student_record_info where buxiban_payment.payment_id == buxiban_student_record_info.payment_id)
//獲取學生選課紀錄 buxiban_selcourse_record_info table 
//(select * from buxiban_selcourse_record_info where buxiban_payment_record_info.record_selcourse_id == buxiban_selcourse_record_info.record_selcourse_id)

function get_payment_record() {
	$.post("../../app/payment_notice.php", { action: "get_payment_record" }, function (payment_record) {

		payment_record = JSON.parse(payment_record)
		for (var i = 0; i < payment_record.length; i++) {
			var id = payment_record[i].payment_id
			var time = payment_record[i].payment_time

			$('#payment_record').append([
				{ payment_id: id, payment_time: time },
			].map(payment_template));
		}
	});
}
function get_student_record_info() {
	$.post("../../app/payment_notice.php", { action: "get_student_record_info" }, function (student_record_info) {

		student_record_info = JSON.parse(student_record_info)
		for (var i = 0; i < student_record_info.length; i++) {
			if (student_record_info[i].record_payment_state == false) { //未繳款
				var id = student_record_info[i].record_std_id
				var std_name = student_record_info[i].record_std_name
				var parent_name = student_record_info[i].record_parent_name
				var parent_phone = student_record_info[i].record_parent_phone
				$('#non_payed').append([
					{ record_std_id: id, record_std_name: std_name, record_parent_name: parent_name, record_parent_phone: parent_phone },
				].map(payed_std_info_template));

			}
			else{//有繳款

			}

		}
	});
}


//新增當月繳款紀錄
var add_payment_record = document.getElementById('add_payment_record')
add_payment_record.addEventListener('click', add_payment_record_func)
function add_payment_record_func() {
	$.post("../../app/payment_notice.php", { action: "get_member" }, function (member) {

    });
}

