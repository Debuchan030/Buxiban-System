var payment_template = ({ payment_id, std_id, std_name, payment_deadline, total_price, parent_name, selcourse_name, selcourse_price }) => `
<div class="border border-secondary border-3 rounded p-2 h1 text-center bg-white" data-bs-toggle="collapse"
			data-bs-target="#${payment_id}" aria-expanded="false" aria-controls="${payment_id}">
			${payment_deadline}
		</div>

		<div class="collapse" id="${payment_id}">
			<div>
				<table>
					<h3>未繳款</h3>
					<tbody id="payed">
						<!-- <form action="" method="GET"> -->
							<tr data-bs-toggle="collapse" data-bs-target="#${std_id}" aria-expanded="false"
							aria-controls="non_payed1">
							<td>${std_name}</td>
							<td>繳費期限：${payment_deadline}</td>
							<td>總費用：$${total_price}</td>
							<td><button class="non_payed">未繳款</button></td>
							<td><button>未發送繳款訊息</button></td>
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
			<!-- <button class="mb-5">一鍵催繳</button> -->

			<div>
				<table>
					<h3>已繳款</h3>
					<tbody id="non_payed">
						<!-- <form action="" method="GET"> -->
							<tr data-bs-toggle="collapse" data-bs-target="#${std_id}" aria-expanded="false"
							aria-controls="non_payed1">
							<td>${std_name}</td>
							<td>繳費期限：${payment_deadline}</td>
							<td>總費用：$${total_price}</td>
							<td><button class="non_payed">未繳款</button></td>
							<td><button>未發送繳款訊息</button></td>
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

//獲取學生資料、家長資料、

for (var i = 0; i < 5 /*buxiban_payment.length*/ ; i++) {
    var payment_state = true //buxiban_payment[i].payment_state true = 有繳款 false = 未繳款
    if(payment_state){

    }
}