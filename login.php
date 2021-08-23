<!DOCTYPE HTML>
<?php 
	session_start();
	if(isset($_SESSION['user_id'])){
		header("location:index.php");
	}
?>
<html>

<head>
	<title>Login</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>
	<link rel="stylesheet" href="./template/assets/css/login.css">

</head>

<body class="is-preload">
	<section class="vh-100">
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-6 col-xl-5">
					<div class="card shadow-2-strong" style="border-radius: 1rem;">
						<div class="card-body p-5 text-center">
							<div class="d-flex justify-content-center align-items-center me-5">
								<img src="./template/images/LOGO.png" alt="" class="m-3" style="width: 50px;">
								<h3 class="d-flex align-items-center">登入</h3>
							</div>
							<form action="" method="POST">
								<input type="hidden" name="action" value="login">
								<div class="form-outline mb-4">
									<input type="phone"  id="typeEmailX" class="form-control form-control-lg "
										placeholder="帳號" name="buxiban_acct" required/>
								</div>
								<div class="form-outline mb-4">
									<input type="password" id="typePasswordX" class="form-control form-control-lg"
										placeholder="密碼" name="buxiban_pwd" required/>
								</div>
								<!-- Checkbox -->
								<div class="form-check d-flex justify-content-start mb-4">
									<input class="form-check-input mx-2" type="checkbox" value="" id="form1Example3" />
									<label class="form-check-label" for="form1Example3"> Remember password </label>
								</div>
								<button class="btn btn-primary btn-lg btn-block" type="submit" action="submit" id="login_submit">Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Scripts -->

</body>

</html>