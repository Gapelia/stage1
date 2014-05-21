<%@ page import="com.gapelia.core.auth.AuthHelper" %>
<%
	if (AuthHelper.isSessionAvailable(request) ) {
		response.sendRedirect("/featured");
	}
%>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Folio &middot; Be Curious</title>

		<!--/ WELCOME TO GAPELIA
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Folio" />
		<meta name="description" content="Reimagining scholarly publishing" />
		<meta name="keywords" content="academia, publishing, blogging, scholar, ideas, storytelling, long-form, platform, collaboration" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>



		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app landing">

		<div id="mp-pusher" class="super-wrapper">

			<h5 id="beta">Product in Beta</h5>
			<h1 id="gapelia"><a href="/">Gapelia</a></h1>
			<h4>Reimagining scholarly publishing.</h4>

			<div class="wrapper">
				<button class="fb-btn">Sign in with Facebook</button>
				<button class="gplus-btn">Sign in with Gmail</button>
			</div>

			<img class="page-bg" src="/static/images/cover.jpg"/>

			<footer>
				<nav>
					<ul>
						<li><a href="/read/754">Our Mission</a></li>
						<li><a href="/read/755">How It Works</a></li>
						<li><a href="/read/756">Become an Editor</a></li>
					</ul>
				</nav>
			</footer>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script>
			// Load Gapelia
			$(function () {

				NProgress.start();

				$("#mp-pusher").imgLiquid({ fill: true });

				$(".fb-btn").click(function () { window.location.href = "/login?type=facebook"; });
				$(".gplus-btn").click(function () { window.location.href = "/login?type=google"; });


				NProgress.done();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
