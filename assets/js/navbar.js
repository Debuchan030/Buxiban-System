
// import "./main.js";
// import "./util.js";
// import "./browser.min.js";
// import "./jquery.min.js";
// import "./breakpoints.min.js";

Vue.component('navbar', {
	template: `
    <div id="sidebar">
			<div class="inner">

				<!-- Menu -->
				<nav id="menu">
					<header class="major">
						<h2>目錄</h2>
					</header>
					<ul>
						<li><a href="index.html">公佈欄</a></li>
						<li><a href="payment_notice.html">繳款通知管理</a></li>
						<li><a href="member_management.html">學生/家長管理 </a></li>
						<li>
							<span class="opener">課程管理</span>
							<ul>
								<li><a href="class_selected_management.html">選課管理</a></li>
								<li><a href="class_management.html">開課課程管理</a></li>

							</ul>
						</li>
						<li><a href="attend_record.html">到班通知管理</a></li>
						<li><a href="login.html">登出</a></li>
					</ul>
				</nav>

			</div>
		</div>
    `,
})

new Vue({
	el: 'navbar'

})
