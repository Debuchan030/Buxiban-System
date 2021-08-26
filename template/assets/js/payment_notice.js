
//獲取buxiban_payment table資料

//將資料用template放上去
var payment_template = ({ payment_id, std_id, std_name, payment_deadline, total_price, parent_name, selcourse_name, selcourse_price }) => `
<div class="border border-secondary border-3 rounded p-2 h1 text-center bg-white" data-bs-toggle="collapse"
			data-bs-target="#${payment_id}" aria-expanded="false" aria-controls="${payment_id}">
			${payment_deadline}
		</div>

		<div class="collapse" id="${payment_id}">
			<div>
				<table>
					<h3>未繳款</h3>
					<tbody id="non_payed">
							<tr data-bs-toggle="collapse" data-bs-target="#${std_id}" aria-expanded="false"
							aria-controls="non_payed1">
							<td>${std_name}</td>
							<td>繳費期限：${payment_deadline}</td>
							<td>總費用：$${total_price}</td>
							<td><button class="non_payed">未繳款</button></td>
						</tr>
						
						<tr class="collapse" id="${std_id}">
							<td>
								<div>
									姓名：${std_name}
								</div>
								<div>
									家長：${parent_name}
								</div>
								<div>
									詳細資訊：
								</div>
								<div>
								${selcourse_name}--$${selcourse_price}
								</div>
								<div>
								${selcourse_name}--$${selcourse_price}
								</div>
								<div>
									繳費期限：${total_price}
								</div>
							</td>
						</tr>
					</tbody>

				</table>
			</div>

			<div>
				<table>
					<h3>已繳款</h3>
					<tbody id="payed">
							<tr data-bs-toggle="collapse" data-bs-target="#${std_id}" aria-expanded="false"
							aria-controls="non_payed1">
							<td>${std_name}</td>
							<td>繳費期限：${payment_deadline}</td>
							<td>總費用：$${total_price}</td>
							<td><button class="non_payed">未繳款</button></td>
						</tr>
						
						<tr class="collapse" id="${std_id}">
							<td>
								<div>
									姓名：${std_name}
								</div>
								<div>
									家長：${parent_name}
								</div>
								<div>
									詳細資訊：
								</div>
								<div>
								${selcourse_name}--$${selcourse_price}
								</div>
								<div>
								${selcourse_name}--$${selcourse_price}
								</div>
								<div>
									繳費期限：${total_price}
								</div>
							</td>
						</tr>
					</tbody>

				</table>
			</div>
		</div>
`
//抓取繳款紀錄並放上去
//獲取繳款紀錄資料 buxiban_payment table (select * from buxiban_payment)
//獲取學生家長資料 buxiban_student_record_info table (select * from buxiban_student_record_info where buxiban_payment.payment_id == buxiban_student_record_info.payment_id)
//獲取學生選課紀錄 buxiban_selcourse_record_info table 
//(select * from buxiban_selcourse_record_info where buxiban_payment_record_info.record_selcourse_id == buxiban_selcourse_record_info.record_selcourse_id)


//新增當月繳款紀錄
var add_payment_record = document.getElementById('add_payment_record')
add_payment_record.addEventListener('click',add_payment_record_func)

function add_payment_record_func(){
    //獲取學生資料 buxiban_student table (std_id、std_name、payment_state) (select * from buxiban_student)

    //獲取家長資料 buxiban_parent table (parent_id、parent_name、parent_phone) (select *from buxiban_parent where buxiban_student.parent_id == buxiban_parent.parent_id)

    //獲取選課資料 buxiban_selcourse table (std_id、course_id) (select * from buxiban_selcourse where buxiban_student.std_id == buxiban_selcourse.std_id)
    
    //獲取課程資訊 buxiban_course table (course_id、course_name、course_price) (select* from buxiban_course where buxiban_selcourse.course_id == buxiban_course.course_id)

    //建立record表單

    //時間 buxiban_payment.payment_time (幾月)
    //buxiban_payment_record_info存學生姓名、家長姓名、家長電話
    //buxiban_selcourse_record_info存學生選課課程名稱、課程價錢

    //post上去
}
