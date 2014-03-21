<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Welcome to Gapelia!</title>

		<!--/ ONBOARD VIEW
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

		<% /* ******************************* */ %>
		<% /* Copy this on all jsp get sessionId %>
		<!--/ To get session id /-->
		<script>
			<% String id = session.getId(); %>
			var sessionId = '<%= id %>'
		</script>
		<% /* ******************************* */ %>

	</head>

	<body class="app profile onboard">

		<!--/ main-content /-->
		<div id="featured-scroller">
			<div id="header-message">
				<!--/ Personalize your experience by subscribing to your favorite libraries. /-->
				Subscribe to at least 3 libraries, so we can personalize your experience.
				<button id="onboard-next" class="branded">Next step</button>
			</div>

			<!--/ Featured Libraries /-->
			<div class="library-list-wrapper">
				<ul id="library-list">

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/001/architecture">Architecture</a></div>
							<div class="lib-blurb">Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/covers/architecture-sonn-visionsofart.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/002/biography">Biography</a></div>
							<div class="lib-blurb">A biography or simply bio is a detailed description or account of a person's life. It entails more than basic facts.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/covers/biography-dieterrams.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/003/cinema">Cinema</a></div>
							<div class="lib-blurb">Filmmaking takes place in many places around the world in a range of contexts, and using a variety of technologies and cinematic techniques.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/covers/cinema-matrix.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/004/cuisine">Cuisine</a></div>
							<div class="lib-blurb">Cuisine is a characteristic style of cooking practices and traditions, often associated with a specific culture.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/covers/cuisine-traceysculinaryadventures.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/005/era">Era</a></div>
							<div class="lib-blurb">An era is a period of time marked by distinctive character, events, &amp;c.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/covers/era-akasped.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/006/the-far-east">The Far East</a></div>
							<div class="lib-blurb">The term evokes cultural as well as geographic separation; the Far East is not just geographically distant, but also culturally exotic.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-11.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/007/fashionista">Fashionista</a></div>
							<div class="lib-blurb">A person who creates or promotes high fashion, i.e. a fashion designer or fashion editor, + who dresses according to the trends of fashion.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-12.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/008/future">Future</a></div>
							<div class="lib-blurb">The future is the indefinite time period after the present. Its arrival is considered inevitable due to the existence of time + the physics.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-13.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/009/gapelians">Gapelians</a></div>
							<div class="lib-blurb">A biography or simply bio is a detailed description or account of a person's life. It entails more than basic facts.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-13.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/010/historian">Historian</a></div>
							<div class="lib-blurb">Historians are concerned with the continuous, methodical narrative and research of past events as relating to the human race.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb.JPG" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/011/into-the-wild">Into the Wild</a></div>
							<div class="lib-blurb">The Age of Discovery (a/k/a the Age of Exploration) was a period starting in the early 15th century and continuing to the 17th century.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-01.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/012/japanimation">Japanimation</a></div>
							<div class="lib-blurb">Anime are Japanese animated productions featuring hand-drawn art or CGI. For simplicity, many view anime as an animation product from Japan.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/013/land-of-kawaii">Land of Kawaii</a></div>
							<div class="lib-blurb">Kawaii is the quality of cuteness in the context of Japanese culture.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/014/manifesto">Manifesto</a></div>
							<div class="lib-blurb">A manifesto is a published verbal declaration of the intentions, motives, or views of the issuer, be it an individual, group, or government.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/015/modernism">Modernism</a></div>
							<div class="lib-blurb">Modernism encompasses the activities and output of those who felt the "traditional" forms of art were becoming outdated in the world. </div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/016/mother-gaea">Mother Gaea</a></div>
							<div class="lib-blurb">Gaia was the great mother of all: the primal Greek Mother Goddess; creator and giver of birth to the Earth and all the Universe.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/017/museum">Museum</a></div>
							<div class="lib-blurb">A museum is an institution that cares for artifacts and other objects of scientific, artistic, cultural, or historical importance.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/018/on-the-road">On the Road</a></div>
							<div class="lib-blurb">Today, modern road tripping is a fast growing hobby, and not just a means of vacationing.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/019/products-of-tomorrow">Products of Tomorrow</a></div>
							<div class="lib-blurb">Cyberpunk features advanced science, such as information technology and cybernetics, coupled with a degree of breakdown or radical change.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

					<li class="library">
						<div class="library-info">
							<div class="title"><a href="/library/020/subculture">Subculture</a></div>
							<div class="lib-blurb">In sociology + cultural studies, a subculture is a group of people within a culture that differentiates themselves from the larger culture.</div>
						</div>

						<div class="wrapper">
							<button class="subscribe transparent-ii">Subscribe</button>
						</div>

						<span class="image-overlay"></span>
						<img src="/static/images/book-thumb-02.jpg" alt=""/>
					</li>

				</ul>
			</div>
			<!--//Featured Libraries /-->
		</div>
		<!--//main-content /-->

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/charLimiter.js"></script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
		<script src="/static/scripts/scroll.js"></script>

		<script>
			$(function () {

				var $vW = $(window).width(), $vH = $(window).height();

				Spinner({ radius: 40, length: 10 }).spin(document.getElementById("account-splash-wrapper"));

				// Scrolling on desktop
				$("#featured-scroller").mousewheel(function (event, delta) {

					if ($vW > "1024") {

						// this.scrollLeft -= (delta * 40);

						$("#featured-scroller").stop().animate({
							scrollLeft: "-=" + (75 * delta) + "px"
						}, "150", "easeOutCubic");

					} else {
						this.scroll -= (delta * 40);
					}

					event.preventDefault();

				});

				// Load Gapelia
				NProgress.start();

				var
				allBooks = $("#library-list li"),		// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					var w = 0, h = 0;

					$("#library-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					if ($vW > "1024") {
						$("#library-list").css("width", w - 155 + "px");
					} else {
						// $("#library-list").css("height", h + 379 + "px");
					}

					// fades in the all the books after section width is added
					$("#library-list li").fadeIn("100");
					$("#library-list").fadeIn("100");

				}, 1000);

				$(".library").imgLiquid({ fill: true });

				NProgress.done();

				// Initialize "Overlay — onboard photos"
				oop = "";
				oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/libraries/wheat-field-by-phk-dan-10.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				// oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/blankBG.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"overlay-controls\">";
				oop += "<button class=\"transparent-ii\" id=\"finalize-setup\">Profile is all set!</button>";
				oop += "</div>";

				oop += "<div class=\"account-user-avatar\">";
				oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/user-avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
				// oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
				oop += "<div class=\"button-wrapper avatar-button\">";
				oop += "<input type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.account-avatar-wrapper').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.user-avatar').hide(); $('.spinner').hide();\">";
				oop += "</div>";
				oop += "</div>";
				oop += "</div>";

				oop += "<div id=\"user-info\">";
				oop += "<h2>Paul Anthony Webb</h2>";
				oop += "<div id=\"user-bio\" contenteditable=\"true\">Add your bio...</div>";
				oop += "</div>";

				oop += "<div class=\"button-wrapper cover-button\">";
				oop += "<input type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#onboard-photos-overlay').css({ 'background-color': '#fcfcfc', 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();\">";
				oop += "</div>";

				oop += "</div>";

				$("body").append(oop);

				$("#user-info h2").html(_fullName);
				$("#user-bio img").attr("src", _image);

				// Empty bio field when user clicks in it
				$(document).one("click", "#user-bio", function () { $(this).text(""); });

				$("#user-bio").limit({ maxlength: 150 });

				// Overlay — onboard photos
				$("#onboard-next").click(function (e) {

					$("#onboard-photos-overlay").addClass("open");

					$("#mp-pusher").css({
						"transform": "translate3d(0, 0, 0)",
						"-o-transform": "translate3d(0, 0, 0)",
						"-ms-transform": "translate3d(0, 0, 0)",
						"-moz-transform": "translate3d(0, 0, 0)",
						"-webkit-transform": "translate3d(0, 0, 0)"
					});

					e.preventDefault();

				});

				// Finish onboarding process
				$("#finalize-setup").click(function () {
					document.location.href = "/featured";
				});

			});
		</script>

		<!--/
		<script>
			<% String id = session.getId(); %>
			sessionId = '<%= id %>';

			$.ajax({
				url: "http://localhost:8080/api/users/getUser",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				type: "POST",
				data: {
					sessionId: sessionId
				},
				success: function (data) {
					console.log(data);
				},
				error: function (q, status, err) {
					if (status == "timeout") {
						alert("Request timed out");
					} else {
						alert("Some issue happened with your request: " + err);
					}
				}
			});
		</script>
		/-->

		<script src="/static/scripts/filepicker2.js"></script>

		<script>
			$(function () {

				$(".avatar-button button").addClass("white").html("Add Avatar");
				$(".cover-button button").addClass("white").html("+ Cover Photo");
				// $(".avatar-button button").addClass("slate").html("Change avatar");
				// $(".cover-button button").addClass("slate").html("Change cover photo");

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
