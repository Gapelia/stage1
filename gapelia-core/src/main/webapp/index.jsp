<%@ page import="com.gapelia.core.auth.AuthHelper" %>
<%
    if (AuthHelper.isSessionAvailable(request) ) {
        response.sendRedirect("/me");
    }
%>
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Better stories, together.</title>

		<!--/
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

		<link href="/static/css/style.splash.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

	</head>

	<body>

		<header>
			<h1><a href="#">Gapelia</a></h1>
			<h3>A blogging platform built in Boston, 2013</h3>

			<p>Breaking news and tweets are insufficient to make us a more informed society. <span class="mobile">Authentic stories are life-changing, but the fascination about knowledge inside of books is taken away by today's quick media.</span> Gapelia is building a better platform for telling delivering long-form stories in the most beautiful and easiest way. No coding required, just focus on your content.</p>

			<div class="cta">Ready to enlighten the world?</div>
		</header>

		<div id="container-01">
			<div class="split-left">
				<h3>Designed to publish stories with no friction</h3>
				<p>With our easy to use editor, you can start crafting wonderfully immersive stories in no time.</p>
			</div>

			<div class="split-right">
				<div class="video-container">
					 <iframe src="http://player.vimeo.com/video/82982349?title=0&amp;byline=0&amp;portrait=0&amp;color=70a1b1"></iframe>
				</div>
			</div>
		</div>
		
		<div id="container-02">
			<h3>Blog Memorably</h3>
			<p>Whether you publish for fun or to showcase your professional work, our platform is great for individuals or organizations who want to deliver the very best content to their audience. Use our live editor, add pages, and choose premium layouts that best fit your content.</p>

			<ul>
				<li>
					<h3>You Own Your Content</h3>
					<p>Use our technology to create stories, connect them to your own domain, or have Gapelia be your content host.</p>
				</li>

				<li>
					<h3>Find an Audience</h3>
					<p>Posts are organized in topic-based libraries your followers can subscribe to.</p>
				</li>

				<li>
					<h3>Geo-tagging</h3>
					<p>Knowing where, or from where stories originate is meaningful information, so we also organize posts around places.</p>
				</li>
			</ul>
		</div>

		<footer>
			<div class="cta">Sign up as a beta user now</div>

			<ul>
				<li><a href="/login?type=facebook">Connect with Facebook</a></li>
				<li><a href="/login?type=google">Connect with Google</a></li>
				<li><a href="/login?type=twitter">Connect with Twitter</a></li>
			</ul>

			<h3><a href="#">Gapelia</a></h3>
			<p>Say hello!</p>
		</footer>

	</body>

</html>
