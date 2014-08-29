
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Folio &middot; New Library</title>

		<!--/ LIBRARY VIEW
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
				    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
				    </li>
				    <li class="not-mobile"><a href="/librarymanager">Libraries</a>
				    </li>
				    <li class="not-mobile"><a href="/createbook">New Story</a>
				    </li>
		
				    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
					<ul id="draft-menu"></ul>
				    </li>
					
				    <li class="not-mobile"><a href="/analytics">Analytics</a>
				    </li>
		
				    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
					<ul>
					</ul>
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

			<!--/ library-editing /-->
			<section id="new-library" style="background-image: url('/static/images/cover-bg.jpg');">
				<div class="library-controls">
					<button id="confirm-create-library" style="display: none;" class="outline">Create</button>
				</div>

				<div class="button-wrapper">
					<input class="photo-picker" type="filepicker" data-fp-apikey="AqrddQT2HQIebG8DinaqUz" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH" data-fp-maxSize="10485760*1024" onchange="url=event.fpfile.url; insertBackgroundImage(url);">
				</div>

				<div id="new-library-info">

					<h2 data-placeholder="Write your title here" contenteditable="true"></h2>
					<p data-placeholder="Add a description" contenteditable="true"></p>

					<section>
						<input type="text" id="input-tags" placeholder="Add up to three tags" value=""/>

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
				
				<div id="library-tutorial">*Title, description and cover photo are required.</div>
				<div id="about-section-tutorial"><p>Scroll down and add an About section</p><img src="../static/images/arrow-down.png"></div>
				
				<div id="close-splash">Your library was created! Other users can now submit stories to it.<a Id="go-to-library">Go to your library</a></div>
			</section>
			
		   <div id="about-section">
				<h2>About <span></span></h2>
				<p data-placeholder="Write an introduction statement or relevant information about this newly created library..." contenteditable="true"></p>	
		   </div>
			<!--//library-editing /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/userNotifications.js"></script>
		<script src="/static/scripts/ajax.js"></script>
		
		<script src="/static/scripts/charLimiter.js"></script>
		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			function insertBackgroundImage(file) {
				filepicker.stat({ url: file }, {container: true, path: true}, function(metadata){
					$('#new-library').css('background-image', 'url("https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '")');
				});
			}

			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
				
				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}
			
			if ($vW > "1599") {
				$(".selectize-control").css("cssText", "margin-left: 0 !important");
			}
			
			if ($vH > "1190") {
				$(".mp-menu ul .fq").css("cssText", "margin-top: 260% !important");
			}
			
			Spinner({ radius: 40, length: 10 }).spin(document.getElementById("new-library"));
			
			
			$(function () {
				getNotifications();
			});	
			
			//poll until all forms are filled
			function doPoll(){
				title = $("#new-library-info h2").html();
				description = $("#new-library-info p").html();
				bg = $("#new-library").css("background-image");
				coverPhoto = bg.replace("url(", "").replace(")", "");
				about = $("#about-section p").html();
				
				if ( !(description == "" || coverPhoto.indexOf("static/images/cover-bg.jpg") != -1 || title == "")) {
					$("#confirm-create-library").css("display", "block");
					$("#library-tutorial").css("display", "none");
				}else {
					$("#confirm-create-library").css("display", "none");
					$("#library-tutorial").css("display", "block");	
				}
				setTimeout(doPoll,1000);
			}
			doPoll();
			
			//cleans up text when copty/paste
			$('[contenteditable]').on('paste',function(e) {
				e.preventDefault();
				var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
				document.execCommand('insertText', false, text);
			});
			
			
			$("#new-library-info p").limit({ maxlength: 300 });
			
			
			//Frankie searched for library array intersection
			function intersection(a, b)
				{
				  var result = new Array();
				  while( a.length > 0 && b.length > 0 )
				  {  
				     if      (a[0] < b[0] ){ a.shift(); }
				     else if (a[0] > b[0] ){ b.shift(); }
				     else /* they're equal */
				     {
				       result.push(a.shift());
				       b.shift();
				     }
				}
				
				return result;
			}
			
			
			// Events after clicking "Save" button
			$(function () {
				
			$("#confirm-create-library").click(function () {
				
				sessionId = readCookie("JSESSIONID");
				createLibrary();
				$("#confirm-create-library").remove();
				
				libraryId = getCreatedLibrariesArray()[0];
				
				$("#go-to-library").attr("href", "/library/"+libraryId.libraryId);
				
				// Disable
					$(".button-wrapper").css("opacity", "0").hide();
					$("#confirm-create-library").hide();
					$("[contenteditable='true']").attr("contenteditable", "false");
					
				// Enable
					$("#new-library-info").css({
						"border-top": "1px solid #fcfcfc",
						"border-bottom": "1px solid #fcfcfc"
					});
					
					$("#new-library-info small").css("opacity", "1");
					$("#close-splash").css("opacity", "1");
				});
				
				$("button.photo-picker").html("&#xf2e4;");
				$("#g-menu-toggle").css("color", "#fcfcfc");
				//$("#new-library").css({"overflow: hidden; background-image": 'url(' + library.coverPhoto + ')',"background-size": "cover","background-position": "50% 50%"});
			});
		</script>
		<!--//scripts /-->
		
	</body>
	
</html>
