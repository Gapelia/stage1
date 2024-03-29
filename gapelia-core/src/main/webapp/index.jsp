<%@ page import="com.gapelia.core.auth.AuthHelper" %>
<%
	if (AuthHelper.isSessionAvailable(request) ) response.sendRedirect("/featured");
%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>Folio: The Blogging Platform for Scholars and Researchers</title>
	<!--/ WELCOME TO GAPELIA
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

	/-->
	<meta name="author" content="Folio: The Blogging Platform for Scholars and Researchers" />
	<meta name="description" content="Our mission is to bring public access to the public domain. Engineered at Harvard Innovation Lab." />
	<meta name="keywords" content="academia, publishing, blogging, scholar, ideas, storytelling, long-form, platform, collaboration" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link href="/static/css/style.css" rel="stylesheet" />
	<link href="/static/images/favicon.png" rel="shortcut icon" />
	<script src="/static/scripts/modernizr.custom.js"></script>
	<script src="/static/scripts/jquery-2.1.0.min.js"></script>
	<script src="/static/scripts/nprogress.js"></script>
	<script>
		//// Google Analytics ////
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-41288707-4', 'auto');
		ga('send', 'pageview');
		 //// Google Analytics ////
	</script>
</head>

<body class="app landing">
	<div id="mp-pusher" class="super-wrapper" style="overflow: hidden;">
		<h5 id="beta">Product in Beta &#8212; Engineered at Harvard Innovation Lab</h5>
		<a href="https://twitter.com/folio" class="twitter-follow-button" data-show-count="false">Follow @folio</a>
		<script>
			! function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0],
					p = /^http:/.test(d.location) ? 'http' : 'https';
				if(!d.getElementById(id)) {
					js = d.createElement(s);
					js.id = id;
					js.src = p + '://platform.twitter.com/widgets.js';
					fjs.parentNode.insertBefore(js, fjs);
				}
			}(document, 'script', 'twitter-wjs');
		</script>
		<h1 id="gapelia"></h1>
		<h4 style="border: none; font-size: 2rem;">Folio is <span style="font-style: italic">a laboratory of ideas</span></h4>
		<br>
		<h4 id="subtitle">The blogging platform for scholars and researchers.</h4>
		<div class="wrapper">
			<button class="fb-btn">Sign in with Facebook</button>
			<button class="gplus-btn">Sign in with Gmail</button>
		</div>
		<img class="page-bg" src="../static/images/home-animated.gif" alt="flash" />
		<div id="about-one">
			<h1 style="margin-top: 4rem;">Re-imagining Digital Publications</h1>
			<p id="creation">
				Scholars need a place on the Internet where to collaborate, discuss complex ideas and connect with the public. We envision a renewed and rejuvenated academy &#8212; one that is publicly engaged, networked, and designed.
			</p>
			<iframe src="http://player.vimeo.com/video/99745946" width="75%" height="500" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			<hr>
			<h1>An outlet for your writing, ideas and stories</h1>
			<p id="curation">
				Folio provides an easy-to-use content management system, letting authors publish digitally native multimedia articles, peer-review and seek feedback from others, and conveniently track previous revisions of their work.
			</p>
			<img src="/static/images/darwin.jpg" alt="Darwin on Species" />
			<hr>
			<h1>Start a digital publication, reach an audience</h1>
			<p id="reach">
				On Folio, content is organized across "libraries", which are curated by editors &#8212; users who self-start topic-based publications. The idea is that everybody can create content, however, stories will only gain exposure if they are previously reviewed and accepted by an editor.
			</p>
			<img src="/static/images/evolve-magazine.jpg" alt="Evolve Magazine" />
			<footer>
				<nav>
					<ul>
						<li><a href="/read/754">LEARN MORE</a></li>
						<li><a id="how-it-works" href="/read/755">HOW IT WORKS</a></li>
						<li><a id="team" href="/read/2939">TEAM</a></li>
					</ul>
				</nav>
			</footer>
			<div class="wrapper" id="wrapper-bottom">
				<p>Create an account today. It is free.</p>
				<button class="fb-btn" style="margin-top: 3.5rem !important;">Sign in with Facebook</button>
				<button class="gplus-btn">Sign in with Gmail</button>
			</div>
			<h1 class="gapelia"></h1>
		</div>
		<div id="home-quote" style="display: none;">
			<p>Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity. &#8212; Aaron Swartz</p>
		</div>
	</div>
	<!--/ scripts /-->
	<script src="/static/scripts/g.money.js"></script>
	<script>
		// Load Gapelia
		$(function () {
			NProgress.start();
			$(".fb-btn").click(function () {
				window.location.href = "/login?type=facebook"
			});
			$(".gplus-btn").click(function () {
				window.location.href = "/login?type=google"
			});
			NProgress.done();
		});
		
		setInterval(function() {
		$("#mp-pusher h4 span").fadeOut(500, function() {
				var $this = $(this);
				$this.text($this.text() == 'a platform for scholarly discourse' ? 'making the world a smarter place' : 'a platform for scholarly discourse');        
				$this.toggleClass('first second');        
				$this.fadeIn(800);
			});
		}, 5000);
		
		if($vW > "1919") {
			$("#about-one img, iframe").css("cssText", "height: 700px !important");
		}
		
		$("#gapelia").mouseenter(function () {
			$("#home-quote").show()
		});
	</script>
	<!--//scripts /-->
</body>

</html>