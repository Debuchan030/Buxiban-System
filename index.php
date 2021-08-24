<!DOCTYPE html>
<?php
session_start();
if(!isset($_SESSION['user_id'])){
    header("location:login.php");
}
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>

    <!-- 外部引入css -->
    <?php
    include('./template/link_css.html');
    ?>

</head>

<body class="is-preload">

    <!-- 要放的頁面 -->
    <div id="content">

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
                    <li><a id="bullentin_board">公佈欄</a></li>
                    <li><a>繳款通知管理</a></li>
                    <li><a>學生/家長管理 </a></li>
                    <li>
                        <span class="opener">課程管理</span>
                        <ul>
                            <li><a>選課管理</a></li>
                            <li><a>開課課程管理</a></li>

                        </ul>
                    </li>
                    <li><a>到班通知管理</a></li>
                    <li><a href="app/logout.php">登出</a></li>
                </ul>
            </nav>

        </div>
    </div>
    </div>
    <script>
        $$(document).ready(function(){
            $("#bullentin_board").click(function(){
                $("#content").load("template/bullentin_board.html");  
            });
        });
    </script>
    <!-- script -->
    <?php
    include('./template/link_script.html');
    ?>
</body>

</html>