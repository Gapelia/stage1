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

		<div id="mp-pusher" class="super-wrapper" style="overflow: hidden;">

			<h5 id="beta">Product in Beta &#8212; Engineered at Harvard Innovation Lab</h5>
			<h1 id="gapelia"></h1>
			<h4 style="border: none; font-size: 2rem;">Folio &#8212; A Laboratory of Ideas</h4></br>
			<h4 id="subtitle">The blogging platform for scholars and researchers.</h4>

			<div class="wrapper">
				<button class="fb-btn">Sign in with Facebook</button>
				<button class="gplus-btn">Sign in with Gmail</button>
			</div>

			<img class="page-bg" src="http://static4.businessinsider.com/image/520e7890eab8ea642c000000/77bke.gif"/>
			
			<div id="about-one">
				<h1 style="margin-top: 4rem;">Re-imagining Digital Publications</h1><p id="creation">Scholars need a place on the Internet where to collaborate, discuss complex ideas and connect with the public. We envision a renewed and rejuvenated academy &#8212; one that is publicly engaged, networked, and designed.</p>
				<iframe src="http://player.vimeo.com/video/99745946" width="75%" height="500" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

				<hr><h1>An outlet for your writing, ideas and stories</h1><p id="curation">Folio provides an easy-to-use content management system, letting authors publish digitally native multimedia articles, peer-review and seek feedback from others, and conveniently track previous revisions of their work.</p>
				<img src="/static/images/darwin.jpg"/>
				
				<hr><h1>Start a digital publication, reach an audience</h1><p id="reach">On Folio, content is organized across "libraries", which are curated by editors &#8212; users who self-start topic-based publications. The idea is that everybody can create content, however, stories will only gain exposure if they are previously reviewed and accepted by an editor.</p>
				<img src="/static/images/evolve-magazine.jpg"/>
				
				<footer>
					<nav>
						<ul>
							<li><a href="/read/754">LEARN MORE</a></li>
							<li><a id="how-it-works" href="/read/755">HOW IT WORKS</a></li>
							<li><a id="team" href="/read/2939">TEAM</a></li>
						</ul>
					</nav>
				</footer>
				
				<div class="wrapper" id="wrapper-bottom"><p>Create an account today. It is free.</p>
					<button class="fb-btn" style="margin-top: 3.5rem !important;">Sign in with Facebook</button>
					<button class="gplus-btn">Sign in with Gmail</button>
				</div>
				
				<h1 id="gapelia"></h1>
			</div>
			
			<div id="home-quote" style="display: none;"><p>Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity. &#8212; Aaron Swartz</p></div>
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
			
			if ($vW > "1919") {
				$("#about-one img, iframe").css("cssText", "height: 700px !important");
			}
			
			$("#gapelia").mouseenter(function(){
				$("#home-quote").show();
			})
		</script>
		<!--//scripts /-->

	</body>

</html>
