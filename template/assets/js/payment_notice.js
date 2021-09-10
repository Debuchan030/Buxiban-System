
//獲取buxiban_payment table資料

//將資料用template放上去
//展開模板
var payment_template = ({ payment_time }) => `
<div class="border border-secondary border-3 rounded p-2 h1 text-center bg-white" data-bs-toggle="collapse"
	data-bs-target="#record_${payment_time}" aria-expanded="false" aria-controls="record_${payment_time}">
	${payment_time}
</div>
<div class="collapse" id="record_${payment_time}">
	<input class = "search_bar" id="${payment_time}_search" type="search" placeholder="搜尋學生姓名">
	<table>
		<h3>未繳款</h3>
		<tbody id="${payment_time}_non_payed">

		</tbody>

	</table>
	<table>
		<h3>已繳款</h3>
		<tbody id="${payment_time}_payed">

		</tbody>

	</table>
</div>
`
//未繳款模板
var nonpayed_std_info_template = ({ record_id, record_std_name, record_total_price, record_contact_name, record_contact_phone }) => `
<tr data-bs-toggle="collapse" data-bs-target="#std_${record_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>學生姓名：${record_std_name}</td>
	<td>總金額：$${record_total_price}</td>
	<td><button class="non_payed"  id = "${record_id}_non_payed">未繳款</button></td>
</tr>

<tr class="collapse" id="std_${record_id}">
	<td>
		<div>
			姓名：${record_std_name}
		</div>
		<div>
			家長：${record_contact_name}
		</div>
		<div>
			家長電話：${record_contact_phone}
		</div>
		
	</td>
	<td>
		<div>
			詳細資訊：
		</div>
		<div id = "selcourse_${record_id}">

		</div>
	</td>
</tr>
	
`
//已繳款模板
var payed_std_info_template = ({ record_id, record_std_name, record_total_price, record_contact_name, record_contact_phone, record_payment_done }) => `
<tr data-bs-toggle="collapse" data-bs-target="#std_${record_id}" aria-expanded="false"
	aria-controls="non_payed1">
	<td>學生姓名：${record_std_name}</td>
	<td>總金額：$${record_total_price}</td>
	<td>繳費時間：${record_payment_done}</td>
	<td><button class="payed" id = "${record_id}_payed">已繳款</button></td>
</tr>
<tr class="collapse" id="std_${record_id}">
	<td>
		<div>
			姓名：${record_std_name}
		</div>
		<div>
			家長：${record_contact_name}
		</div>
		<div>
			家長電話：${record_contact_phone}
		</div>

		</td>
		<td>
		<div>
			詳細資訊：
		</div>
		<div id = "selcourse_${record_id}">

		</div>
	</td>
</tr>
`
//課程模板
var selcourse_template = ({ record_selcourse_name, record_selcourse_price }) => `
課程名稱：${record_selcourse_name}---$${record_selcourse_price}<br>
`

Date.prototype.yyyymmdd = function () {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(),
	(mm > 9 ? '' : '0') + mm,
	(dd > 9 ? '' : '0') + dd
	].join('-');
};

var date = new Date();
date = date.yyyymmdd();
date = date.toString()
function get_payment_record() { //放上年月大標題
	$.post("../../app/payment_notice.php", { action: "get_payment" }, function (record_payment) {
		if (record_payment != "NO DATA") {
			record_payment = JSON.parse(record_payment)
			for (var i = 0; i < record_payment.length; i++) {
				var time = record_payment[i].payment_time
				$('#record_payment').append([
					{ payment_time: time },
				].map(payment_template));
				get_student_record_info.call(this, time)
			}

		}
		else {
			alert("暫無資料")
		}
	});
}
function get_student_record_info(payment_time) { //放上學生資訊 根據有繳費未繳費區分
	$.post("../../app/payment_notice.php", { action: "get_record_payment", payment_time: payment_time }, function (student_record_info) {
		student_record_info = JSON.parse(student_record_info)
		for (var i = 0; i < student_record_info.length; i++) {
			if (parseInt(student_record_info[i].record_payment_states) == 0) { //未繳款
				var id = student_record_info[i].record_id
				var std_name = student_record_info[i].record_std_name
				var record_contact_name = student_record_info[i].record_contact_name
				var record_contact_phone = student_record_info[i].record_contact_phone
				var total_price = student_record_info[i].record_total_price
				$("#" + payment_time + "_non_payed").append([
					{ record_id: id, record_std_name: std_name, record_total_price: total_price, record_contact_name: record_contact_name, record_contact_phone: record_contact_phone },
				].map(nonpayed_std_info_template));
				// 放上選課課程資料
				get_std_selcourse.call(this, id)
			}
			else {//有繳款
				var id = student_record_info[i].record_id
				var std_name = student_record_info[i].record_std_name
				var record_contact_name = student_record_info[i].record_contact_name
				var record_contact_phone = student_record_info[i].record_contact_phone
				var total_price = student_record_info[i].record_total_price
				var record_payment_done = student_record_info[i].record_payment_done
				$("#" + payment_time + "_payed").append([
					{ record_id: id, record_std_name: std_name, record_total_price: total_price, record_contact_name: record_contact_name, record_contact_phone: record_contact_phone, record_payment_done: record_payment_done },
				].map(payed_std_info_template));
				// 放上選課課程資料
				get_std_selcourse.call(this, id)
				if (payment_time != date.substring(0, date.length - 3)) {
					$("#" + id + "_payed").attr('disabled', true)
				}

			}
		}

	});
}
function get_std_selcourse(record_id) {
	$.post("../../app/payment_notice.php", { action: "get_record_selcourse", record_id: record_id }, function (record_selcourse) {
		if (record_selcourse != "NO DATA") {
			record_selcourse = JSON.parse(record_selcourse)
			for (var i = 0; i < record_selcourse.length; i++) {
				var record_selcourse_name = record_selcourse[i].record_selcourse_name
				var record_selcourse_price = record_selcourse[i].record_selcourse_price
				$("#selcourse_" + record_id).append([
					{ record_selcourse_name: record_selcourse_name, record_selcourse_price: record_selcourse_price },
				].map(selcourse_template));
			}
		}
	});
}
//新增當月繳款紀錄
var add_payment_record = document.getElementById('add_payment_record')
add_payment_record.addEventListener('click', add_payment_record_func)
function add_payment_record_func() {
	$.post("../../app/payment_notice.php", { action: "add_new_payment" }, function (payment) {
		$("#record_payment").empty()
		get_payment_record.call(this)
	});
}
//更新當月繳款紀錄
$("#record_payment").on('click', '.non_payed', function () {
	if ($(this).text() == "未繳款") {
		var record_id = $(this).attr('id')
		var datemonth = $(this).closest('tbody').attr('id')
		datemonth = datemonth.substring(0, datemonth.length - 10)
		record_id = record_id.substring(0, record_id.length - 10)
		$(this).html("更新成已繳款")
		$.post("../../app/payment_notice.php", { action: "update_payment_states", record_id: record_id, record_payment_states: "0", datemonth: datemonth }, function (data) {
			if (data) {
				alert(data)
			}
		})
	}
	else {
		var record_id = $(this).attr('id')
		var datemonth = $(this).closest('tbody').attr('id')
		datemonth = datemonth.substring(0, datemonth.length - 10)
		record_id = record_id.substring(0, record_id.length - 10)
		$(this).html("未繳款")
		$.post("../../app/payment_notice.php", { action: "update_payment_states", record_id: record_id, record_payment_states: "1", datemonth: datemonth }, function (data) {
			if (data) {
				alert(data)
			}
		})
	}

})
$("#record_payment").on('click', '.payed', function () {
	if ($(this).text() == "已繳款") {
		var record_id = $(this).attr('id')
		var datemonth = $(this).closest('tbody').attr('id')
		datemonth = datemonth.substring(0, datemonth.length - 6)
		record_id = record_id.substring(0, record_id.length - 6)
		if (date.substring(0, date.length - 3) == datemonth) {
			$(this).html("更新成未繳款")
			$.post("../../app/payment_notice.php", { action: "update_payment_states", record_id: record_id, record_payment_states: "1", datemonth: datemonth }, function (data) {
				if (data) {
					alert(data)
				}
			})
		}

	}
	else {
		var record_id = $(this).attr('id')
		var datemonth = $(this).closest('tbody').attr('id')
		datemonth = datemonth.substring(0, datemonth.length - 6)
		record_id = record_id.substring(0, record_id.length - 6)
		$(this).html("已繳款")
		$.post("../../app/payment_notice.php", { action: "update_payment_states", record_id: record_id, record_payment_states: "0", datemonth: datemonth }, function (data) {
			if (data) {
				alert(data)
			}
		})
	}

})
//搜尋
$("#record_payment").on('keydown', '.search_bar', function (event) {
	if (event.keyCode === 13) {
		var id = $(this).attr('id')
		var payment_time = id.substring(0, id.length - 7)
		var search_text = $(this).val()
		if (search_text == "") {
			$("#" + payment_time + "_non_payed").empty()
			$("#" + payment_time + "_payed").empty()
			get_student_record_info.call(this, payment_time)
		}
		else {
			$("#" + payment_time + "_non_payed").empty()
			$("#" + payment_time + "_payed").empty()
			$.post("../../app/payment_notice.php", { action: "get_record_payment", payment_time: payment_time }, function (student_record_info) {
				student_record_info = JSON.parse(student_record_info)
				for (var i = 0; i < student_record_info.length; i++) {
					if (parseInt(student_record_info[i].record_payment_states) == 0) { //未繳款
						var id = student_record_info[i].record_id
						var std_name = student_record_info[i].record_std_name
						var record_contact_name = student_record_info[i].record_contact_name
						var record_contact_phone = student_record_info[i].record_contact_phone
						var total_price = student_record_info[i].record_total_price
						if (std_name.indexOf(search_text) != -1) {
							$("#" + payment_time + "_non_payed").append([
								{ record_id: id, record_std_name: std_name, record_total_price: total_price, record_contact_name: record_contact_name, record_contact_phone: record_contact_phone },
							].map(nonpayed_std_info_template));
							// 放上選課課程資料
							get_std_selcourse.call(this, id)
						}
					}
					else {//有繳款
						var id = student_record_info[i].record_id
						var std_name = student_record_info[i].record_std_name
						var record_contact_name = student_record_info[i].record_contact_name
						var record_contact_phone = student_record_info[i].record_contact_phone
						var total_price = student_record_info[i].record_total_price
						var record_payment_done = student_record_info[i].record_payment_done
						if (std_name.indexOf(search_text) != -1) {
							$("#" + payment_time + "_payed").append([
								{ record_id: id, record_std_name: std_name, record_total_price: total_price, record_contact_name: record_contact_name, record_contact_phone: record_contact_phone, record_payment_done: record_payment_done },
							].map(payed_std_info_template));
							// 放上選課課程資料
							get_std_selcourse.call(this, id)
							if (payment_time != date.substring(0, date.length - 3)) {
								$("#" + id + "_payed").attr('disabled', true)
							}
						}
					}
				}

			});

		}
	}
})
//初始化
$("#record_payment").empty()
get_payment_record.call(this)