<html>
<head>
<title>A sample REST API consumption</title>

	<script src="http://api.jquery.com/jquery-wp-content/themes/jquery/js/modernizr.custom.2.6.2.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="http://api.jquery.com/jquery-wp-content/themes/jquery/js/jquery-migrate-1.1.1.min.js"></script>
	<script src="http://api.jquery.com/jquery-wp-content/themes/jquery/js/plugins.js"></script>
	<script src="http://api.jquery.com/jquery-wp-content/themes/jquery/js/main.js"></script>


	<script>
		// All REST API calls available at: http://localhost:8080/api/application.wadl
		// The URL to API being called
		var getAllBooksUrl = "http://localhost:8080/api/dimension/getAllBooks"; // I didnt use this variable
		// The session Id (this will already be provided as a js variable by BE)
		var sId = "6677888";
		// The dimension we need books for
		var dimension = "Pulse"; // I didnt make use of this variable

		$(document).ready(function() {
			// When someone clicks on element with id 'target'
			$( "#target" ).click(function() {

				// Make AJAX call to the REST API
                $.ajax({
                    url: "http://localhost:8080/api/dimension/getAllBooks", // Url string or variable having url
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    type: "POST",
                    data: {
                        sessionId: sId,
                        dimension: 'Pulse'
                    },
                    success: function(data) {
                        // Parse json response which is received back in variable data
                    	var parsedHtml = parseJsonToStringForBooks(data);
                    	// Update parsed html into some placeholder on page, randomDiv in our case
                        $("#randomDiv").html(parsedHtml);
                    },
                    error: function(q, status, err) {
                         // Process error or timeout from backend
                         if(status == "timeout") {
                             alert("Request timed out");
                         } else {
                            alert("Some issue happened with your request: " + err);
                         }
                    }
                });
                // Ajax call code ends here

		    });
		});

		// A sample function parsing json to html
		// You need to investigae the API response to understand the json that is returned back to
		// .. figure out of how to parse it (preferably through google chrome)
		function parseJsonToStringForBooks(books) {
			var html = "<div>";
			var i=1;
			$.each(books, function() {
				html += "<div bookid=\"" + this['bookId'] + "\" > \n";
				html += "<h2> Title: " + this['title'] + " " + i + "</h2>";
				html += "<b> Created Date: </b>" + this['createdDate'] + "</br>";
				html += "<b> isPublished: </b>" + this['isPublished'] + "</br>";
				html += "<b> Dimension: </b>" + this['dimension'] + "</br>";
				html += "<b> Language: </b>" + this['language'] + "</br>";
				html += "<b> Last Edited: </b>" + this['lastEditedDate'] + "</br>";
				html += "<b> Published Date: </b>" + this['publishedDate'] + "</br>";

				var tags = this['tags'];
				html += "<b> Tags: </b> ";
				$.each(tags, function() {
					html += this + ", "; 
				});
				html += "</br>";
				
				var createdBy = this['createdByUserIds'];
				html += "<b> Created By: </b> ";
				$.each(createdBy, function() {
					html += this + ", "; 
				});
				html += "</br>";
				
				var pages = this['pages'];
				var j=0;
				$.each(pages, function() {
					html += "<b> Page </b> " + this['title'] + " " + j + "</br>";
					// I have not parsed further inside to the levels of pages / photos / tags / comments
					// .. you can dive in more and more as you need
					j++;
				});
  				html += "</div>";
  				i++;
  			});
  			html += "</div>";
  			return html;
		}


	</script>
</head>
<body>
	<input id="target" type="button" value="Test GetAllBooks call" />
	<div id="randomDiv">
	</div>
</body>
</html>