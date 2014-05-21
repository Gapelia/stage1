<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Whoops</title>

		<!--/ WELCOME TO G4P4LI4
			 ______   ______   ______  ______   __       __   ______
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js">s</script>

		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app landing">

		<div id="mp-pusher" class="super-wrapper">

			<h5 class="error">404 error</h5>
			
			<h5>Wait, what are you doing here?<br><a href="/">Go explore some stories!</a></h5>

			<img src="/static/images/cover-error.jpg" alt=""/>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script>
			// Load Gapelia
			$(function () {

				NProgress.start();
				$("#mp-pusher").imgLiquid({ fill: true });
				NProgress.done();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
