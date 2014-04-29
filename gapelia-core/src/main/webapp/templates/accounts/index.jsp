<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Your Account Settings</title>

		<!--/ ACCOUNTS VIEW
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

		<%@include file="../../userDetails.jsp" %>
		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
        <script src="/static/scripts/userNotifications.js"></script>

	</head>

	<body class="app profile accounts">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
						<li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
						<li class="not-mobile"><a href="/createbook">Create book</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
							<ul id="draft-menu"></ul>
						</li>

						<li id="gpl-menu-notify">
							<a>Notifications</a><a class="icon" href="#"></a>
							<ul></ul>
						</li>

						<li class="fq"><a href="#">Help</a>
						<li class="help"><a href="#">Contact</a>
						<li class="logout"><a href="#">Log Out</a>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->
			
			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle" class="notification-time">
					<span id="notification-count"></span>
					<i class="ion-drag"></i>
				</button>
			</div>
			<!--//main-panel /-->

			<div id="account-information">

				<!--/ Personal Settings /-->
				<div class="account-info-wrapper">

					<div class="col-0">

						<div id="account-splash-wrapper">
							<section id="account-user-splash">

								<div class="account-user-avatar">
									<div class="account-avatar-wrapper" style="background-image: url(/static/images/users/user-avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;">

										<div class="button-wrapper avatar-button">
											<input type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.user-avatar').attr('src', url); $('.account-avatar-wrapper').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();">
										</div>

										<!--/ <img class="user-avatar" src="/static/images/users/user-avatar.jpg"/> /-->

									</div>
								</div>

							</section>
						</div>

					</div>

					<div class="col-0">
						<form class="bl_form">

							<label for="user-name">Name</label>
							<input id="user-name" type="text" placeholder="Add your full name"></input>
							
							<label for="user-display-name">Username</label>
							<input id="user-display-name" type="text" placeholder="Your custom url (i.e. gapelia.com/username)"></input>

							<label for="user-email">Email</label>
							<input id="user-email" type="email" placeholder="Where you receive notifications and newsletters"></input>

							<label for="user-location">Location</label>
							<input id="user-location" type="text" placeholder="Location"></input>

							<label for="user-personal-website">Website</label>
							<input id="user-personal-website" type="text" placeholder="Link to your website, blog, portfolio..."></input>

							<label for="user-twt">Twitter</label>
							<input id="user-twt" type="text" placeholder="twitter.com/@yourname"></input>

							<label for="user-fb">Facebook</label>
							<input id="user-fb" type="text" placeholder="Facebook URL"></input>

							<label for="user-gp">Google+</label>
							<input id="user-gp" type="text" placeholder="Google+ URL"></input>

							<div id="notifications-toggle"><span>Would you like to receive email notifications?</span>
							<input type="checkbox" class="js-switch" checked /></div>

							<button class="update-user" onclick="updateUserAccounts();"><a>Update Settings</a></button>
		
							
						</form>

						<div class="account-delete-wrapper">
							<section id="oh-noes" class="not-mobile">
								<p>Delete account? <a href="#" id="delete-account">Yes please!</a></p>
							</section>
						</div>
					</div>

				</div>

				<!--/ Overlay — delete account /-->
				<div id="delete-account-overlay" class="overlay">
					<section>
						<h1>Warning</h1>
	
						<p>Account deletion is <strong>final</strong>. All of your books will be deleted and there will be no way to recover them. Are you <strong>sure</strong> you want to delete your account?</p>
	
						<p>
							<a href="#" class="overlay-close oc-01">No, I changed my mind</a>
							<button class="red overlay-close oc-02" id="confirm-account-deletion" onclick="deleteAccount();">Yes, I am sure</button>
						</p>
					</section>
				</div>
			</div>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/ajax.js"></script>

		<script src="/static/scripts/labelBetter.js"></script>
		<script src="/static/scripts/switchery.min.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script src="/static/scripts/spin.js"></script>

		<script>
			$(function() {

				getUser();

				// Fixes menu positioning issue when scrolled
				$("#g-menu-toggle").click(function () {

					window.scrollTo(0, 0);
					// $("body.accounts").css("overflow", "hidden");

				});

			});

			function load() {
                 getNotifications();
				Spinner({ radius: 40, length: 10 }).spin(document.getElementById("account-splash-wrapper"));

				var elem = document.querySelector(".js-switch");
				var init = new Switchery(elem);

				// Load Gapelia
				NProgress.start();

				$(".labelBetter").labelBetter({ easing: "bounce" });

				// $("#user-info h2").html(_fullName);
				$(".account-avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");

				// Slide menu for desktop
				if ($vW > "1024") {

					new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

					$(".mp-pushed").ready(function () {
						$("#book-scroller").css("z-index", "0");
					});

				}

				// Dropdown menu for mobile
				if ($vW < "1025") {

					
					$("#featured-panel .featured-info").remove();
					$("#featured-panel").append('<span id="category-title">Account Settings</span>');

					$("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-books"><a href="/featured">Explore</a></li><li id="nav-explore"><a href="/libraryManager">Libraries</a></li><li id="nav-profile"><a href="/me">My Profile</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

					$("#book-list").append('<li class="book" id="book-cta"><p><a href="#">Explore</a> some of our featured topic-based libraries.</p><img src="/static/images/covers/bg.jpg" alt=""/></li>');

					$(document).on("click", "#g-menu-toggle, #nav-books, #nav-libraries, #nav-bookmarks", function () {
						$("#featured-nav").toggle();
					});
									
					$(document).on("click", "#nav-notify", function (e) {

						$("#nav-notify ul").toggle();

						if ($("#nav-notify ul").css("display") == "block") {
							$("#nav-notify").css("padding", "1rem 0 0 0");
						} else {
							$("#nav-notify").css("padding", "1rem");
						}

						e.preventDefault();

					});

				}

				// Make things fit nicely on iPhones
				if ($vW < "322") {
					$("#email-yay").text("Heck yeah!");
					$("#email-nay").text("Erm, no thanks");
				}

				NProgress.done();
				getUserAccounts();
				// Modal — delete account
				$("#delete-account").click(function (e) {

					$("#delete-account-overlay").addClass("open");
					e.preventDefault();

				});
                loadDelete();
				// Log Out
				$("#logout").click(function (e) {
					document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
					window.location = "";
				});
				
				//update button
				$('.update-user').click(function(){
				var $this = $(this);
					$this.toggleClass('update-user');
					if($this.hasClass('update-user')){
						$this.text('Update Settings');			
					} else {
						$this.text('Changes Saved!');
					}
				})
			}
		</script>

	</body>

</html>
