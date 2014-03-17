
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; [Library Name] Library</title>

		<!--/ LIBRARY VIEW
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

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch(e) {}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/selectize.js"></script>
		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon" href="/accounts">&#xf13d;</a></li>
						<li><a href="/createlibrary">Create book</a></li>
						<li><a href="#" id="create-library">Start library</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><a class="icon" href="#">&#xf104;</a>
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#">&#xf104;</a>
							<ul>
								<li><a href="#">Diego thanked you for your story: "The Matrix Has You"</a></li>
								<li><a href="#">Tommy commented on your story: "Well that was weird"</a></li>
								<li><a href="#">Daniel added your story to a library: "Gapelia Nation"</a></li>
								<li><a href="#">Frankie wants to collaborate on your story: "Hoverboards Are The Future"</a></li>
								<li><a href="#">2 edit requests are pending for your review</a></li>
							</ul>
						</li>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle">
					<i class="ion-drag"></i>
				</button>

				<!--/
				<div class="featured-info">
					<h2>[Library Name]</h2>
				</div>
				/-->
			</div>

			<section id="new-library">
				<div class="library-controls">
					<button id="confirm-cancel-library" class="blank">Cancel</button>
					<button id="confirm-create-library" class="outline">Create</button>
				</div>

				<div id="new-library-info">
					<div class="button-wrapper">
						<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('#new-library').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); });">
					</div>

					<h2 data-placeholder="Write your title here" contenteditable="true"></h2>
					<p data-placeholder="Add a description" contenteditable="true"></p>

					<section>
						<input type="text" id="input-tags" placeholder="Type up to three tags" value=""/>

						<script>
							$("#input-tags").selectize({
								delimiter: ",",
								maxItems: 3,
								persist: false,
								create: function(input) {
									return {
										value: input,
										text: input
									}
								}
							});
						</script>
					</section>
				</div>

				<div id="close-splash"><i class="ion-ios7-arrow-right"></i></div>
				<img class="page-bg" src="/static/images/libraries/wheat-field-by-phk-dan-10.jpg"/>
			</section>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}
			
			Spinner({ radius: 40, length: 10 }).spin(document.getElementById("new-library"));

			$(function () {

				$("button.photo-picker").html("&#xf2e4;");
				$("#new-library").imgLiquid({ fill: true });
				$("#g-menu-toggle").css("color", "#fcfcfc");

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
