<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Welcome to Folio!</title>

		<!--/ ONBOARD VIEW
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
		<link href="/static/css/slytest.css" rel="stylesheet" />
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>
		<script src="/static/scripts/sly.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/ajax.js"></script>
		<script src="/static/scripts/selectize.js"></script>

	</head>

	<body class="app profile onboard">

		<!--/ main-content /-->
		<div id="featured-scroller" style="overflow-x: hidden";>
			<div id="header-message" style="opacity: 0";>
				Subscribe to at least 3 libraries. Personalize your experience.
				<button id="onboard-next" class="branded">Next step</button>
			</div>
			
			<div id="university-affiliation">
				<h1 id="welcome"><p></p>, welcome to Folio</h1>
				<p id="uni-intro"><b>Select your academic/research institution</b><br/>Affiliates to listed institutions will own publishing rights.</br> Please <a href='mailto:team@folio.is?subject=New%20University%20Request&amp;body=Hello Folio team, I understand that publishing rights are only given to affiliates of Harvard University at this time, however I would like to request that you add my university too.'>request yours</a> to be added if not listed below.</p>
				<select id="university-search" placeholder="Search university..."></select>
				<p id="school-intro"><b>Academic email</b></br>Folio is a community for scholarly discourse.<br/>Verify your .edu email address.</p>
				<select id="school-search" placeholder="Add your email..."></select>
				</br><div id="skip-container"><a id="skip-onboarding" href="/featured">SKIP ONBOARDING PROCESS: Take me to Folio</a></div><button id="uni-next" class="branded">NEXT STEP</button>
			</div>
			
			<div id="intro" style="opacity: 0";>
				<p id="intro-hello"><b>Folio</b> is a network where ideas and stories are organized in topic-based libraries. Each library is curated by an editor, who can accept and reject submissions.</br></br>Because you are new to Folio, we invite you to subscribe to a few of the libraries that currently exist.</p>
				</br><button id="next-intro" class="branded">Ok, I get it</button>
			</div>

			<!--/ Featured Libraries /-->
			<div class="library-list-wrapper" style="display: none; z-index: -1">
				<ul id="explore-list"></ul>
			</div>	
		</div>
		<!--//main-content /-->

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/charLimiter.js"></script>
		<script src="/static/scripts/filepicker2.js"></script>

		<script>
			$(function () { getListSubscribed();getLibraries(); });

			function insertProfilePicture(file) {
				filepicker.stat({
					url: file
				}, {
					container: true,
					path: true
				}, function (metadata) {
					$('.spinner').show(); 
					$('.user-avatar').attr('src', 'https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path); 
					$('.account-avatar-wrapper').css({ 'background-image': 'url("https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '")', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); 
					$('.spinner').hide();
				});
			}

			function insertBackgroundImage(file) {
				filepicker.stat({
						url: file
					}, {
						container: true,
						path: true
					}, function (metadata) {
						$('.spinner').show();
						$('#onboard-photos-overlay').css({ 'background-color': '#fcfcfc', 'background-image': 'url("https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '")', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' });
						$('.spinner').hide();
				});
			}			

			function load() {

				if (user.isOnboarded == true) { document.location.href = "/me"; }

				var $vW = $(window).width(), $vH = $(window).height();

				Spinner({ radius: 40, length: 10 }).spin(document.getElementById("account-splash-wrapper"));


				// Load Gapelia
				NProgress.start();

				
			var
				allBooks = $("#explore-list li"),		// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					var w = 0, h = 0;

					$("#explore-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					if ($vW > "1024") {
						$("#explore-list").css("width", w + "px");
						$("#explore-list .library").css("height", $vH - 97 + "px");
					}
					// fades in the all the books after section width is added
					$("#explore-list li").fadeIn("1");
					$("#explore-list").fadeIn("1");
					
				if ($vW > "1024") {
				    $(".library-list-wrapper").sly({
					horizontal: 1,
					itemNav: 'forceCentered',
					smart: 1,
					activateMiddle: 1,
					//activateOn: 'mouseenter',
					mouseDragging: 1,
					touchDragging: 1,
					swingSpeed: 1,
					releaseSwing: 0,
					startAt: 0,
					scrollBar: $(".scrollbar"),
					scrollBy: 1,
					speed: 0.0001,
					elasticBounds: 1,
					easing: 'swing',
					dragHandle: 1,
					dynamicHandle: 1,
					clickBar: 1,
					keyboardNavBy: 'items',
				    });
				}
				
				if ($vW < "1025") {
					$("#explore-list").css("cssText", "padding: 6rem 1.25rem 1.25rem 1.25rem !important");
					$(".library-list-wrapper").css("top", "-100%");
				}
				
				if ($vW < "800") {
					$("#explore-list").css("cssText", "padding: 5rem 1.25rem 1.25rem 1.25rem !important");
				}
				
				if ($vW < "321") {
					$("#explore-list").css("cssText", "padding: 5rem 1.25rem 1.25rem !important");
				}
				
				}, 1000);

				$(".library").imgLiquid({ fill: true });

				NProgress.done();

				// Initialize "Overlay — onboard photos"
				oop = "";
				oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/cover-bg.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"overlay-controls\">";
				oop += "<button class=\"branded\" id=\"finalize-setup\">Go to Folio!</button>";
				oop += "</div>";

				oop += "<div class=\"account-user-avatar\">";
				oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/user-avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"button-wrapper avatar-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertProfilePicture(url);\">";
				oop += "</div>";
				oop += "</div>";
				oop += "</div>";

				oop += "<div id=\"user-info\">";
				oop += "<h2 id=\"user-name\"></h2>";
				oop += "<div id=\"user-bio\" contenteditable=\"true\">Add your bio...</div>";
				oop += "</div>";

				oop += "<div class=\"button-wrapper cover-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; insertBackgroundImage(url);\">";
				oop += "</div>";

				oop += "</div>";

				$("body").append(oop);
				
				//asssign factors to html//
				$("#university-affiliation #welcome p").html(user.name);
				$("#user-info h2").html(user.name);
				$(".account-avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");

				// Empty bio field when user clicks in it
				$(document).one("click", "#user-bio", function () { $(this).text(""); });
				$("#user-bio").limit({ maxlength: 300 });

				
				//clicking on uni//
				$("#uni-next").click(function (e) {
					
					user.university = $(".selectize-input div")[0].textContent;
					user.department = $(".selectize-input div")[1].textContent;
					
					$.ajax({
						url: "/api/users/updateUser",
						contentType: "application/x-www-form-urlencoded;charset=utf-8",
						type: "POST",
						data: {
						    sessionId: sessionId,
						    name: user.name,
						    email: user.email,
						    location: user.location,
						    avatarImage: user.avatarImage,
						    coverImage: user.coverImage,
						    displayName: user.displayName,
						    personalWebsite: user.personalWebsite,
						    bio: user.bio,
						    tags: user.tags,
						    fb: user.fb,
						    gp: user.gp,
						    twt: user.twt,
						    isPublic: true,
						    university: user.university,
						    department: user.department
						},
						error: function (q, status, err) {
						    if (status == "timeout") {
							alert("Request timed out");
						    }
						}
					});
					
					$("#intro").css("opacity", "0.75");
					$("#university-affiliation").css("display", "none");
				});
				
				//school and uni dropdowns//
				$("#university-search").selectize({
					options: [
						{ name: "Brown University", value: "brown" },
						{ name: "Columbia University", value: "columbia" },
						{ name: "Cornell University", value: "cornell" },
						{ name: "Darmouth College", value: "darmouth" },
						{ name: "Harvard University", value: "harvard" },
						{ name: "Duke University", value: "duke" },
						{ name: "Massachusetts Institute of Technology", value: "mit" },
						{ name: "Princetown University", value: "princeton" },
						{ name: "University of Pennsylvania", value: "pennsylvania" },
						{ name: "Stamford University", value: "stamford" },
						{ name: "Yale University", value: "yale" },
					],
					labelField: "name",
					searchField: ["name"]
				});
				
				$("#school-search").selectize({
					delimiter: ',',
					persist: false,
					create: function(input) {
					    return {
						value: input,
						text: input
					    }
					}
				});
				
				//hide suggestions for email box//
				//$(".selectize-dropdown").remove();
								
				//tutorial message goes away on click//
				$("#next-intro").click(function (e) {
					$("#intro").css("opacity", "0");
					$("#header-message").css("opacity", "1");
					$("#featured-scroller").css("overflow-x", "auto");
					$(".library-list-wrapper").css({
						"z-index": "1",
						"display": "block"
					});
					
					if ($vW < "421") {
						$(".onboard #featured-scroller").css("cssText", "overflow-y: scroll !important");
					}
				});
				
				// Overlay — onboard photos
				$("#onboard-next").click(function (e) {

					var element = $(".photo-picker");

					element1 = element[0];
					element2 = element[1];
					element1.type = "filepicker";
					filepicker.constructWidget(element1);
					element2.type = "filepicker";
					filepicker.constructWidget(element2);
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

					updateUserOnboard();
					document.location.href = "/featured";

				});
				
				//cleans up text when copty/paste
				$('[contenteditable]').on('paste',function(e) {
					e.preventDefault();
					var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
					document.execCommand('insertText', false, text);
				});

			}

			$(function () {

				$(".avatar-button button").addClass("white").html("Add Avatar");
				$(".cover-button button").addClass("white").html("+ Cover Photo");

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
