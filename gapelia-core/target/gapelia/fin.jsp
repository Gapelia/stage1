<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Welcome to Gapelia!</title>

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

		<link href="/static/css/style.splash.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>

		<% /* ******************************* */ %>
            <% /* Copy this on all jsp get sessionId %>
            <!--/ To get session id /-->
            <script>
                <% String id = session.getId(); %>
                var sessionId = <%= id %>
            </script>
        <% /* ******************************* */ %>

	</head>

	<body class="app profile">

		<div id="user-panel">
			<div class="user-avatar">
				<img src="/static/images/users/avatar.jpg"/>
			</div>

			<div class="user-data">
				<h2>*USERNAME*</h2>

				<span contenteditable="true">Write a short bio here</span>
			</div>

			<div class="button-wrapper"><button class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="url=event.fpfile.url; console.log(url); $('.user-bg img').attr('src', url);">Change Background</button></div>

			<div class="user-bg">
				<img src="/static/images/covers/bg.jpg"/>
			</div>
		</div>

		<div id="the-rest">
			<p>Upload a cover photo<br/>and write your bio</p>
			<button><a href="/featured">Ready to go</a></button>
		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/jquery.mCustomScrollbar.js"></script>

		<script>
			$('[contenteditable="true"]').click(function () {
				$(this).text("");
			});

			var element = $(".photo-picker");
			element = element[0];
			element.type = "filepicker";
			filepicker.constructWidget(element);
		</script>
		<!--//scripts /-->

	</body>

</html>
