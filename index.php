<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("location:login.php");
}
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>

    <!-- 外部引入css -->
    <?php
    include('./template/link_css.html');
    ?>

</head>

<body class="is-preload">


    <div id="wrapper">
        <!-- 要放的頁面 -->
        <div id="main">

        </div>

        <!-- 側邊攔 -->
        <div id="sidebar" style="background-color: rgb(245, 246, 247);">
            <div class="inner">

                <!-- Menu -->
                <nav id="menu">
                    <header class="major">
                        <h2>目錄</h2>
                    </header>
                    <ul>
                        <li id="bulletin_board"><a>公佈欄</a></li>
                        <li id="payment_notice"><a>繳款通知管理</a></li>
                        <li id="member_management"><a>學生/家長管理 </a></li>
                        <li>
                            <span class="opener">課程管理</span>
                            <ul>
                                <li id="class_selected_management"><a>選課管理</a></li>
                                <li id="class_management"><a>開課課程管理</a></li>

                            </ul>
                        </li>
                        <li id="attend_record"><a>到班通知管理</a></li>
                        <li><a href="app/logout.php">登出</a></li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>
    <script>
        $("#main").load("template/bulletin_board.html");
        $("title").html("公佈欄")
    </script>
    <!-- script -->
    <script src="./template/assets/js/sidebar.js"></script>

    <?php
    include('./template/link_script.html');
    ?>
</body>

</html>