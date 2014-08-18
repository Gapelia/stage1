
	// Book Creation
	// @Gapelia
	// ========================================================
	// Left Menus | Layout and page interaction | Right Menus | Content Creation
	// Live Preview
	// Globals

	var $vW = $(window).width(), $vH = $(window).height();

	// Set menu height, necessary for scrollbar plugin
	$("#pages-scroller").css("height", $vH + "px");
	$("#layout-scroller").css("height", $vH + "px");

	// Left Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#pages-toggle").on("click", function (e) {

		$("#back").stop(true).css("margin", "0 0 0 200px");
		$("#pages-scroller").stop(true).css("left", "0");

		$("#main-content").stop(true).css({
			"left": "200px",
			"position": "fixed"
		});

		e.preventDefault();

	});

	$("#pages-scroller").on("mouseenter", function () {}).on("mouseleave", function () {

		$("#back").stop(true).css("margin", "0").stop(true).delay(5000);
		$("#pages-scroller").css("left", "-200px").stop(true).delay(5000);

		$("#main-content").css({
			"left": "0",
			"position": "fixed"
		}).stop(true).delay(5000);

	});

	$(document).on("click", "#pages-scroller ul li", function (ev) {

		$("#pages-scroller ul li").css("border", "3px solid transparent");

		var e = $(this).closest("li");
		e = e[0];

		if (e.id == "add-page") { return; }

		e.style.border = "3px solid #59b3a6";
		currentPage = $(this).closest("li").index();

		console.log("currentPage on click: " + currentPage);
		console.log("li index: " + $(this).closest("li").index());
		console.log(pages.page);
		templateId = pages.page[currentPage].templateId;

		if (templateId == undefined || templateId == null) {
			templateId = 0;
		}

		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;
		attribution = pages.page[currentPage].attribution;

		switch (templateId) {
			case 0:
				fluidLayout();
				break;

			case 1:
				photoLayout();
				break;

			case 2:
				overlayLayout();
				break;

			case 3:
				photoTextLayout();
				break;

			case 4:
				verticalLayout();
				break;

			case 5:
				videoLayout();
				break;

			case 6:
				baseLayout();
		}

		ev.preventDefault();

	});

	$(document).on("click", "#pages-scroller ul li .edit-page", function (e) {

		$("#layout-scroller").stop(true).css("left", "0");
		$("#back").stop(true).css("margin", "0 0 0 200px");

		setTimeout(function () {
			$("#pages-scroller").stop(true).css("left", "-200px");
		}, 200);

		$("#layout-scroller").on("mouseenter", function () {

			$("#back").stop(true).css("margin", "0 0 0 200px");
			$(this).stop(true).css("left", "0").clearQueue();
			$("#pages-scroller").css("left", "-200px");

			$("#main-content").stop(true).css({
				"left": "200px",
				"position": "fixed"
			});

		}).on("mouseleave", function () {

			setTimeout(function () {
				$("#back").css("margin", "0");
				$("#layout-scroller").css("left", "-200px");

				$("#main-content").css({
					"left": "0",
					"position": "fixed"
				});
			}, 100);

		});

		e.preventDefault();

	});

	$("#back-to-pages").on("click", function (e) {

		$("#pages-scroller").stop(true).css("left", "0");
		$("#back").stop(true).css("margin", "0 0 0 200px");
		$("#layout-scroller").stop(true).css("left", "-200px");

		$("#main-content").stop(true).css({
			"left": "200px",
			"position": "fixed"
		}).stop(true).delay(5000);

		$("#pages-scroller").on("mousemove", function () {

			$("#back").stop(true).css("margin", "0 0 0 200px");
			$(this).stop(true).css("left", "0").clearQueue();

			$("#main-content").stop(true).css({
				"left": "200px",
				"position": "fixed"
			});

		}).on("mouseleave", function () {

			$("#back").stop(true).css("margin", "0").stop(true).delay(5000);
			$("#pages-scroller").css("left", "-200px").stop(true).delay(5000);

			$("#main-content").css({
				"left": "0",
				"position": "fixed"
			}).stop(true).delay(5000);

		});

		e.preventDefault();

	});

	////

	$("#preview-book").click(function () {

	

		var temp = JSON.stringify(pages);
		localStorage.setItem("pages", temp);

		// Page Sorter
		$("#pages-scroller ul").sortable({
			items: ":not(.disable-sort)"
		}).bind("sortupdate", function () {
			var temp = JSON.stringify(pages);
			localStorage.setItem("pages", temp);
		});


	});

	// Layout and page interaction
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#add-page").click(function (e) {

		if (pagesCreated > 20) {
			alert("Your book is too big please remove a page!\n");
			return;
		}

		pagesCreated++;

		$(this).before($("<li id=\"" + pagesCreated + "\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/grayBG.png\" id='page" + (pagesCreated) + "Image' alt=\"\"/><div id='page" + (pagesCreated) + "Title'><span class=\"page-thumb-number\">" + (pagesCreated) + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section>"));

		title = $(".page-title-elem").html();
		text = $(".page-desc").html();
		imageURL = $(".page-bg").attr("src");
		attribution = $(".image-attribution").html();

		console.log("creating page: currenp: " + currentPage + "     pagesCreated:" + pagesCreated); 

		// save to previous page
		if (pagesCreated == 0) {
			pages.page[0] = {
				"pageNumber": pagesCreated,
				"templateId": 0,
				"title": null,
				"text": null,
				"image": "/static/images/grayBG.png",
				"video": "null",
				"attribution": null
			};

			templateId = 0;
			createPage();
			fluidLayout();
		} else {
			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
			createPage();
			currentPage = pagesCreated;
			templateId = 6;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
			attribution = null;
			baseLayout();
		}

		// Page Sorter
		$("#pages-scroller ul").sortable({
			items: ":not(.disable-sort)"
		}).bind("sortupdate", function () {});

		e.preventDefault();

	});

	// Delete page
	$(document).on("click", "#pages-scroller ul li .delete-page", function (e) {

		$(this).closest("li").prepend("<div class=\"delete-page-confirm\"><h5>Confirm Delete</h5><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-page\">Yes</a><a href=\"#\" class=\"button b white nay-delete-page\">No</a></div></div>");

		e.preventDefault();

	});

	// Confirm page deletion
	$(document).on("click", ".yay-delete-page", function (e) {

		var deletingFirst = false;

		pageToDeleteId = $(this).closest("li").attr("id");
		pageToDelete = pages.page[pageToDeleteId].pageId;

		console.log("page to delete:" + pageToDelete);
		if(pageToDeleteId == 0){
			deletingFirst = true;
		}
		

		deletePage(pageToDelete);

		$(this).closest("li").remove();
		currentPage = pageToDeleteId;


		var listItems = $("#pages-scroller li section div .page-thumb-number");
		listItems.each(function(idx, li) {
			$(li).text(idx);
		});

		pages.page.splice(currentPage, 1);

		console.log(pages.page);

		if(!deletingFirst) {
			console.log("DELETING COVER: current poage: " + currentPage);
			currentPage--;
		}
		//currentPage--;
		pagesCreated--;


		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;
		attribution = pages.page[currentPage].attribution;
		templateId = pages.page[currentPage].templateId;

		switch (templateId) {
			case 0:
				fluidLayout();
				break;

			case 1:
				photoLayout();
				break;

			case 2:
				overlayLayout();
				break;

			case 3:
				photoTextLayout();
				break;

			case 4:
				verticalLayout();
				break;

			case 5:
				videoLayout();
				break;

			case 6:
				baseLayout();
		}

		e.preventDefault();

	});

	// Cancel page deletion
	$(document).on("click", ".nay-delete-page", function (e) {

		$(this).closest(".delete-page-confirm").remove();
		e.preventDefault();

	});
	

	// Image insertion
	var file = '<p><a class="inserted-img" href=' + file + '><img src=' + file + '></a></p>';

	function insertImageToEditor(file) {
		console.log(file);
		filepicker.stat({ url: file }, {container: true, path: true}, function(metadata){
			pasteHtmlAtCaret('<p><a class="inserted-img" href="https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '"><img src="https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '"></a></p>');
		});

		//this fixes margin for photos//
		$(".page-desc p").each(function() {
			if ($(this).find('img').length) {
				$(this).css("cssText", "margin-bottom: 0 !important");
			}
		});
	}

	function insertCoverImage(file) {
		console.log(url);
		filepicker.stat({ url: file }, {container: true, path: true}, function(metadata){
			$('.spinner').show(); 
			$($('#pages-scroller li section img')[currentPage]).attr('src', 'https://s3.amazonaws.com/'+ metadata.container + '/'+metadata.path); 
			$('.page-bg').attr('src', 'https://s3.amazonaws.com/'+ metadata.container + '/'+metadata.path).attr('data-adaptive-background', '1'); 
			$('.page-bg').bind('load', function () { 
				$('.fluid-preview').css('top', '75%'); 
				$('.fluid-preview article').css('padding', '0 0 4rem 0'); 
				$('.spinner').hide(); 
				$('.image-attribution').css('display', 'block'); 
				$('.button-wrapper').css({ 'top': 'initial', 'opacity': '0', 'position': 'absolute', 'text-align': 'center' });
				$(".draggable-placeholder .button-wrapper").css({
						"bottom": "8%",
						"margin-top": "300px",
						"position": "absolute",
						"text-align": "center",
						"top": "inherit",
						"width": "100%"
				});	
				$('.page-bg, .button-wrapper, button.photo-picker').css('opacity', '1'); 
				$('.page-bg').css('display', 'block').css('position', 'absolute'); 
				$('.image-attribution').show().text('Add photo credit?'); 
				$.adaptiveBackground.run({ normalizeTextColor: true });
			});
		});		
	}
	
	// Base Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function baseLayout() {

		var insert = "<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">Choose a layout from the <i class=\"ion-gear-b\"></i> menu</p></article></div></section>";
		$("#create-content").html(insert);

		showResponseInfo(location.pathname.split("/"));

	}

	// Fluid Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function fluidLayout() {

		var insert = "";
		
		console.log(imageURL);

		if (imageURL == null || imageURL == "../static/images/grayBG.png") {

			insert += "<section class=\"fluid-preview-wrapper\"><section class=\"draggable-placeholder\">";

			insert += "<img class=\"page-bg\" src=\"../static/images/grayBG.png\" alt=\"\" data-adaptive-background=\"0\" style=\"0\"/>";

			insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url); \"></div>";

			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\" style=\"display: none;\">" + attribution + "</span></section><div class=\"fluid-preview\" style=\"padding: 2rem 2rem 0 2rem; top: 0;\"><article style=\"padding: 7rem 0\">";

		} else {

			insert += "<section class=\"fluid-preview-wrapper\">";

			insert += "<section class=\"draggable-placeholder\">";

			insert += "<img class=\"page-bg\" style=\"height: auto; width: 100%; display: block; opacity: 1;\" src=\"" + imageURL + "\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/>";

			insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url); \"></div>";

			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\" style=\"display: block\">" + attribution + "</span></section><div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0 2rem; top: 75%;\"><article style=\"padding: 0 0 4rem 0;\">";
		}

		if (title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		insert += "<a href=\"#\" class=\"add-inline-content\">&#xf218;</a>";
		insert += "<div class=\"add-inline-content-wrapper\">";
		insert += "<button class=\"inline-embed-insert\">< ></button>";

		insert += "<input class=\"inline-image-insert\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertImageToEditor(url);\">";

		insert += "<div class=\"gapelia-editor-toolbar-form-anchor\" style=\"background-color: #59b3a6;\">";
		insert += "<input type=\"text\" style=\"background-color: #59b3a6;\" value=\"Paste the link you want to embed\" placeholder=\"Paste the link you want to be\">";
		insert += "<a href=\"#\">&#xf2bb;</a>";
		insert += "</div>";
		insert += "</div>";

		if (text == null) {

			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";
			insert += "</article></div></section>";

		} else {

			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div>";
			insert += "</article></div></section>";

		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 0;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		var element2 = $(".inline-image-insert");
		element2 = element2[0];
		element2.type = "filepicker";
		filepicker.constructWidget(element2);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		var pageBG = $(".page-bg");

		if ($(".page-bg").data("adaptive-background") == 1) {

			// Image attribution
			$(".image-attribution").css("display", "block");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "75%"
			});
			
			$(".draggable-placeholder .button-wrapper").css({
				"bottom": "8%",
				"margin-top": "300px",
				"position": "absolute",
				"text-align": "center",
				"top": "inherit",
				"width": "100%"
			});	

			$(".fluid-preview article").css("padding", "0 0 4rem 0");

		} else if ($(".page-bg").data("adaptive-background") == 0) {

			// Image attribution
			$(".image-attribution").css("display", "none");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "0"
			});
			
			$(".draggable-placeholder.button-wrapper").css("display", "none");

			$(".fluid-preview article").css("padding", "7rem 0");

		}

		$(window).ready(function () {
			$(".page-desc").focus();
		});
		
		//forcing margin for Ps due to blockquote bug//
		$(".page-desc p").css("cssText", "margin-bottom: 1.5rem !important");
		
		
		$(".fluid-preview .page-desc p").each(function() {
			if ($(this).find('img').length) {
				$(this).css("cssText", "margin-bottom: 0 !important");
			}
		});	
		
		// Empty attribution field when user clicks in it
		$(document).one("click", ".image-attribution", function () {
			$(this).text("");
		});

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");
		$("button.inline-image-insert").html("&#xf147;");

		// Inline content embedder
		$(".add-inline-content").click(function (e) {

			caretPosition = getCaretPosition();

			// $(".add-inline-content-wrapper").toggle();

			$(".add-inline-content-wrapper").toggle(function () {
				$(this).css("bottom", "-13.7rem");
			}, function () {
				$(this).css("bottom", "3.7rem");
			});

			e.preventDefault();

		});

		$(".inline-embed-insert").click(function () {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").toggle();
		});

		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor input").on("keyup", function (ev) {
			

			if (ev.which === 13) {
				$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").toggle();
				
				
				//$(".fluid-preview .page-desc p:last").append('<a href="' + this.value + '" class="embedded-embedly" style="display: none;">test</a>');
				pasteHtmlAtPosition(caretPosition, '<a href="' + this.value + '" class="embedded-embedly" style="display: none;">test</a>');
				
				// Embedly
				var regex;

				regex = /((http:\/\/(.*yfrog\..*\/.*|www\.flickr\.com\/photos\/.*|flic\.kr\/.*|twitpic\.com\/.*|www\.twitpic\.com\/.*|twitpic\.com\/photos\/.*|www\.twitpic\.com\/photos\/.*|.*imgur\.com\/.*|twitgoo\.com\/.*|i.*\.photobucket\.com\/albums\/.*|s.*\.photobucket\.com\/albums\/.*|media\.photobucket\.com\/image\/.*|www\.mobypicture\.com\/user\/.*\/view\/.*|moby\.to\/.*|xkcd\.com\/.*|www\.xkcd\.com\/.*|imgs\.xkcd\.com\/.*|www\.asofterworld\.com\/index\.php\?id=.*|www\.asofterworld\.com\/.*\.jpg|asofterworld\.com\/.*\.jpg|www\.qwantz\.com\/index\.php\?comic=.*|23hq\.com\/.*\/photo\/.*|www\.23hq\.com\/.*\/photo\/.*|.*dribbble\.com\/shots\/.*|drbl\.in\/.*|.*\.smugmug\.com\/.*|.*\.smugmug\.com\/.*#.*|picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*|img\.ly\/.*|www\.tinypic\.com\/view\.php.*|tinypic\.com\/view\.php.*|www\.tinypic\.com\/player\.php.*|tinypic\.com\/player\.php.*|www\.tinypic\.com\/r\/.*\/.*|tinypic\.com\/r\/.*\/.*|.*\.tinypic\.com\/.*\.jpg|.*\.tinypic\.com\/.*\.png|meadd\.com\/.*\/.*|meadd\.com\/.*|.*\.deviantart\.com\/art\/.*|.*\.deviantart\.com\/gallery\/.*|.*\.deviantart\.com\/#\/.*|fav\.me\/.*|.*\.deviantart\.com|.*\.deviantart\.com\/gallery|.*\.deviantart\.com\/.*\/.*\.jpg|.*\.deviantart\.com\/.*\/.*\.gif|.*\.deviantart\.net\/.*\/.*\.jpg|.*\.deviantart\.net\/.*\/.*\.gif|www\.fotopedia\.com\/.*\/.*|fotopedia\.com\/.*\/.*|photozou\.jp\/photo\/show\/.*\/.*|photozou\.jp\/photo\/photo_only\/.*\/.*|instagr\.am\/p\/.*|instagram\.com\/p\/.*|skitch\.com\/.*\/.*\/.*|img\.skitch\.com\/.*|www\.questionablecontent\.net\/|questionablecontent\.net\/|www\.questionablecontent\.net\/view\.php.*|questionablecontent\.net\/view\.php.*|questionablecontent\.net\/comics\/.*\.png|www\.questionablecontent\.net\/comics\/.*\.png|twitrpix\.com\/.*|.*\.twitrpix\.com\/.*|www\.someecards\.com\/.*\/.*|someecards\.com\/.*\/.*|some\.ly\/.*|www\.some\.ly\/.*|pikchur\.com\/.*|achewood\.com\/.*|www\.achewood\.com\/.*|achewood\.com\/index\.php.*|www\.achewood\.com\/index\.php.*|www\.whosay\.com\/.*\/content\/.*|www\.whosay\.com\/.*\/photos\/.*|www\.whosay\.com\/.*\/videos\/.*|say\.ly\/.*|ow\.ly\/i\/.*|mlkshk\.com\/p\/.*|lockerz\.com\/s\/.*|pics\.lockerz\.com\/s\/.*|d\.pr\/i\/.*|www\.eyeem\.com\/p\/.*|www\.eyeem\.com\/a\/.*|www\.eyeem\.com\/u\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|frontback\.me\/p\/.*|www\.fotokritik\.com\/.*\/.*|fotokritik\.com\/.*\/.*|vid\.me\/.*|galeri\.uludagsozluk\.com\/.*|gist\.github\.com\/.*|www\.crunchbase\.com\/.*\/.*|crunchbase\.com\/.*\/.*|www\.slideshare\.net\/.*\/.*|www\.slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|www\.scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|www\.scribd\.com\/mobile\/documents\/.*|screenr\.com\/.*|polldaddy\.com\/community\/poll\/.*|polldaddy\.com\/poll\/.*|answers\.polldaddy\.com\/poll\/.*|www\.howcast\.com\/videos\/.*|www\.screencast\.com\/.*\/media\/.*|screencast\.com\/.*\/media\/.*|www\.screencast\.com\/t\/.*|screencast\.com\/t\/.*|issuu\.com\/.*\/docs\/.*|www\.kickstarter\.com\/projects\/.*\/.*|www\.scrapblog\.com\/viewer\/viewer\.aspx.*|foursquare\.com\/.*|www\.foursquare\.com\/.*|4sq\.com\/.*|linkedin\.com\/in\/.*|linkedin\.com\/pub\/.*|.*\.linkedin\.com\/in\/.*|.*\.linkedin\.com\/pub\/.*|linkedin\.com\/in\/.*|linkedin\.com\/company\/.*|.*\.linkedin\.com\/company\/.*|www\.sliderocket\.com\/.*|sliderocket\.com\/.*|app\.sliderocket\.com\/.*|portal\.sliderocket\.com\/.*|beta-sliderocket\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|.*\.craigslist\.org\/.*\/.*|my\.opera\.com\/.*\/albums\/show\.dml\?id=.*|my\.opera\.com\/.*\/albums\/showpic\.dml\?album=.*&picture=.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|www\.polleverywhere\.com\/polls\/.*|www\.polleverywhere\.com\/multiple_choice_polls\/.*|www\.polleverywhere\.com\/free_text_polls\/.*|www\.quantcast\.com\/wd:.*|www\.quantcast\.com\/.*|siteanalytics\.compete\.com\/.*|.*\.status\.net\/notice\/.*|identi\.ca\/notice\/.*|www\.studivz\.net\/Profile\/.*|www\.studivz\.net\/l\/.*|www\.studivz\.net\/Groups\/Overview\/.*|www\.studivz\.net\/Gadgets\/Info\/.*|www\.studivz\.net\/Gadgets\/Install\/.*|www\.studivz\.net\/.*|www\.meinvz\.net\/Profile\/.*|www\.meinvz\.net\/l\/.*|www\.meinvz\.net\/Groups\/Overview\/.*|www\.meinvz\.net\/Gadgets\/Info\/.*|www\.meinvz\.net\/Gadgets\/Install\/.*|www\.meinvz\.net\/.*|www\.schuelervz\.net\/Profile\/.*|www\.schuelervz\.net\/l\/.*|www\.schuelervz\.net\/Groups\/Overview\/.*|www\.schuelervz\.net\/Gadgets\/Info\/.*|www\.schuelervz\.net\/Gadgets\/Install\/.*|www\.schuelervz\.net\/.*|myloc\.me\/.*|pastebin\.com\/.*|pastie\.org\/.*|www\.pastie\.org\/.*|redux\.com\/stream\/item\/.*\/.*|redux\.com\/f\/.*\/.*|www\.redux\.com\/stream\/item\/.*\/.*|www\.redux\.com\/f\/.*\/.*|cl\.ly\/.*|cl\.ly\/.*\/content|speakerdeck\.com\/.*\/.*|www\.kiva\.org\/lend\/.*|www\.timetoast\.com\/timelines\/.*|storify\.com\/.*\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|www\.dailymile\.com\/people\/.*\/entries\/.*|.*\.kinomap\.com\/.*|www\.metacdn\.com\/r\/c\/.*\/.*|www\.metacdn\.com\/r\/m\/.*\/.*|prezi\.com\/.*\/.*|.*\.uservoice\.com\/.*\/suggestions\/.*|formspring\.me\/.*|www\.formspring\.me\/.*|formspring\.me\/.*\/q\/.*|www\.formspring\.me\/.*\/q\/.*|twitlonger\.com\/show\/.*|www\.twitlonger\.com\/show\/.*|tl\.gd\/.*|www\.qwiki\.com\/q\/.*|crocodoc\.com\/.*|.*\.crocodoc\.com\/.*|www\.wikipedia\.org\/wiki\/.*|.*\.wikipedia\.org\/wiki\/.*|www\.wikimedia\.org\/wiki\/File.*|graphicly\.com\/.*\/.*\/.*|360\.io\/.*|www\.behance\.net\/gallery\/.*|behance\.net\/gallery\/.*|www\.jdsupra\.com\/legalnews\/.*|jdsupra\.com\/legalnews\/.*|minilogs\.com\/.*|www\.minilogs\.com\/.*|jsfiddle\.net\/.*|ponga\.com\/.*|list\.ly\/list\/.*|crowdmap\.com\/post\/.*|.*\.crowdmap\.com\/post\/.*|crowdmap\.com\/map\/.*|.*\.crowdmap\.com\/map\/.*|ifttt\.com\/recipes\/.*|weavly\.com\/watch\/.*|www\.weavly\.com\/watch\/.*|tagmotion\.com\/tree\/.*|www\.tagmotion\.com\/tree\/.*|public\.talely\.com\/.*\/.*|polarb\.com\/.*|.*\.polarb\.com\/.*|on\.bubb\.li\/.*|bubb\.li\/.*|.*\.bubb\.li\/.*|embed\.imajize\.com\/.*|giflike\.com\/a\/.*|www\.giflike\.com\/a\/.*|i\.giflike\.com\/.*|rapidengage\.com\/s\/.*|infomous\.com\/node\/.*|stepic\.org\/.*|chirb\.it\/.*|beta\.polstir\.com\/.*\/.*|polstir\.com\/.*\/.*|www\.gettyimages\.com\/detail\/photo\/.*|gty\.im\/.*|isnare\.com\/.*|www\.isnare\.com\/.*|www\.branchtrack\.com\/projects\/.*|.*amazon\..*\/gp\/product\/.*|.*amazon\..*\/.*\/dp\/.*|.*amazon\..*\/dp\/.*|.*amazon\..*\/o\/ASIN\/.*|.*amazon\..*\/gp\/offer-listing\/.*|.*amazon\..*\/.*\/ASIN\/.*|.*amazon\..*\/gp\/product\/images\/.*|.*amazon\..*\/gp\/aw\/d\/.*|www\.amzn\.com\/.*|amzn\.com\/.*|www\.shopstyle\.com\/browse.*|www\.shopstyle\.com\/action\/apiVisitRetailer.*|api\.shopstyle\.com\/action\/apiVisitRetailer.*|www\.shopstyle\.com\/action\/viewLook.*|itunes\.apple\.com\/.*|shoplocket\.com\/products\/.*|etsy\.com\/listing\/.*|www\.etsy\.com\/listing\/.*|fiverr\.com\/.*\/.*|www\.fiverr\.com\/.*\/.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|.*\.youtube\.com\/user\/.*|.*\.youtube\.com\/.*#.*\/.*|m\.youtube\.com\/watch.*|m\.youtube\.com\/index.*|.*\.youtube\.com\/profile.*|.*\.youtube\.com\/view_play_list.*|.*\.youtube\.com\/playlist.*|www\.youtube\.com\/embed\/.*|.*twitch\.tv\/.*|.*twitch\.tv\/.*\/b\/.*|www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|www\.ustream\.tv\/.*|ustre\.am\/.*|qik\.com\/video\/.*|qik\.com\/.*|qik\.ly\/.*|.*revision3\.com\/.*|.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*|collegehumor\.com\/video:.*|collegehumor\.com\/video\/.*|www\.collegehumor\.com\/video:.*|www\.collegehumor\.com\/video\/.*|telly\.com\/.*|www\.telly\.com\/.*|break\.com\/.*\/.*|www\.break\.com\/.*\/.*|vids\.myspace\.com\/index\.cfm\?fuseaction=vids\.individual&videoid.*|www\.myspace\.com\/index\.cfm\?fuseaction=.*&videoid.*|www\.metacafe\.com\/watch\/.*|www\.metacafe\.com\/w\/.*|blip\.tv\/.*\/.*|.*\.blip\.tv\/.*\/.*|video\.google\.com\/videoplay\?.*|.*viddler\.com\/v\/.*|liveleak\.com\/view\?.*|www\.liveleak\.com\/view\?.*|animoto\.com\/play\/.*|dotsub\.com\/view\/.*|www\.overstream\.net\/view\.php\?oid=.*|www\.livestream\.com\/.*|new\.livestream\.com\/.*|www\.worldstarhiphop\.com\/videos\/video.*\.php\?v=.*|worldstarhiphop\.com\/videos\/video.*\.php\?v=.*|bambuser\.com\/v\/.*|bambuser\.com\/channel\/.*|bambuser\.com\/channel\/.*\/broadcast\/.*|www\.schooltube\.com\/video\/.*\/.*|bigthink\.com\/ideas\/.*|bigthink\.com\/series\/.*|sendables\.jibjab\.com\/view\/.*|sendables\.jibjab\.com\/originals\/.*|jibjab\.com\/view\/.*|www\.xtranormal\.com\/watch\/.*|socialcam\.com\/v\/.*|www\.socialcam\.com\/v\/.*|v\.youku\.com\/v_show\/.*|v\.youku\.com\/v_playlist\/.*|www\.snotr\.com\/video\/.*|snotr\.com\/video\/.*|www\.clipfish\.de\/.*\/.*\/video\/.*|www\.myvideo\.de\/watch\/.*|www\.vzaar\.com\/videos\/.*|vzaar\.com\/videos\/.*|www\.vzaar\.tv\/.*|vzaar\.tv\/.*|vzaar\.me\/.*|.*\.vzaar\.me\/.*|coub\.com\/view\/.*|coub\.com\/embed\/.*|www\.streamio\.com\/api\/v1\/.*|streamio\.com\/api\/v1\/.*|vine\.co\/v\/.*|www\.vine\.co\/v\/.*|www\.viddy\.com\/video\/.*|www\.viddy\.com\/.*\/v\/.*|www\.tudou\.com\/programs\/view\/.*|tudou\.com\/programs\/view\/.*|sproutvideo\.com\/videos\/.*|embed\.minoto-video\.com\/.*|iframe\.minoto-video\.com\/.*|play\.minoto-video\.com\/.*|dashboard\.minoto-video\.com\/main\/video\/details\/.*|api\.minoto-video\.com\/publishers\/.*\/videos\/.*|www\.brainshark\.com\/.*\/.*|brainshark\.com\/.*\/.*|23video\.com\/.*|.*\.23video\.com\/.*|goanimate\.com\/videos\/.*|brainsonic\.com\/.*|.*\.brainsonic\.com\/.*|lustich\.de\/videos\/.*|web\.tv\/.*|.*\.web\.tv\/.*|mynet\.com\/video\/.*|www\.mynet\.com\/video\/|izlesene\.com\/video\/.*|www\.izlesene\.com\/video\/|alkislarlayasiyorum\.com\/.*|www\.alkislarlayasiyorum\.com\/.*|59saniye\.com\/.*|www\.59saniye\.com\/.*|zie\.nl\/video\/.*|www\.zie\.nl\/video\/.*|app\.ustudio\.com\/embed\/.*\/.*|bale\.io\/.*|www\.allego\.com\/.*|www\.whitehouse\.gov\/photos-and-video\/video\/.*|www\.whitehouse\.gov\/video\/.*|wh\.gov\/photos-and-video\/video\/.*|wh\.gov\/video\/.*|www\.hulu\.com\/watch.*|www\.hulu\.com\/w\/.*|www\.hulu\.com\/embed\/.*|hulu\.com\/watch.*|hulu\.com\/w\/.*|.*crackle\.com\/c\/.*|www\.funnyordie\.com\/videos\/.*|www\.funnyordie\.com\/m\/.*|funnyordie\.com\/videos\/.*|funnyordie\.com\/m\/.*|www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|www\.ted\.com\/talks\/.*\.html.*|www\.ted\.com\/talks\/lang\/.*\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|www\.ted\.com\/talks\/|.*nfb\.ca\/film\/.*|www\.thedailyshow\.com\/watch\/.*|www\.thedailyshow\.com\/full-episodes\/.*|www\.thedailyshow\.com\/collection\/.*\/.*\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|www\.colbertnation\.com\/the-colbert-report-collections\/.*|www\.colbertnation\.com\/full-episodes\/.*|www\.colbertnation\.com\/the-colbert-report-videos\/.*|www\.comedycentral\.com\/videos\/index\.jhtml\?.*|www\.theonion\.com\/video\/.*|theonion\.com\/video\/.*|wordpress\.tv\/.*\/.*\/.*\/.*\/|www\.traileraddict\.com\/trailer\/.*|www\.traileraddict\.com\/clip\/.*|www\.traileraddict\.com\/poster\/.*|www\.trailerspy\.com\/trailer\/.*\/.*|www\.trailerspy\.com\/trailer\/.*|www\.trailerspy\.com\/view_video\.php.*|fora\.tv\/.*\/.*\/.*\/.*|www\.spike\.com\/video\/.*|www\.gametrailers\.com\/video.*|gametrailers\.com\/video.*|www\.koldcast\.tv\/video\/.*|www\.koldcast\.tv\/#video:.*|mixergy\.com\/.*|video\.pbs\.org\/video\/.*|www\.zapiks\.com\/.*|www\.trutv\.com\/video\/.*|www\.nzonscreen\.com\/title\/.*|nzonscreen\.com\/title\/.*|app\.wistia\.com\/embed\/medias\/.*|wistia\.com\/.*|.*\.wistia\.com\/.*|.*\.wi\.st\/.*|wi\.st\/.*|confreaks\.net\/videos\/.*|www\.confreaks\.net\/videos\/.*|confreaks\.com\/videos\/.*|www\.confreaks\.com\/videos\/.*|video\.allthingsd\.com\/video\/.*|videos\.nymag\.com\/.*|aniboom\.com\/animation-video\/.*|www\.aniboom\.com\/animation-video\/.*|grindtv\.com\/.*\/video\/.*|www\.grindtv\.com\/.*\/video\/.*|ifood\.tv\/recipe\/.*|ifood\.tv\/video\/.*|ifood\.tv\/channel\/user\/.*|www\.ifood\.tv\/recipe\/.*|www\.ifood\.tv\/video\/.*|www\.ifood\.tv\/channel\/user\/.*|logotv\.com\/video\/.*|www\.logotv\.com\/video\/.*|lonelyplanet\.com\/Clip\.aspx\?.*|www\.lonelyplanet\.com\/Clip\.aspx\?.*|streetfire\.net\/video\/.*\.htm.*|www\.streetfire\.net\/video\/.*\.htm.*|sciencestage\.com\/v\/.*\.html|sciencestage\.com\/a\/.*\.html|www\.sciencestage\.com\/v\/.*\.html|www\.sciencestage\.com\/a\/.*\.html|link\.brightcove\.com\/services\/player\/bcpid.*|bcove\.me\/.*|wirewax\.com\/.*|www\.wirewax\.com\/.*|canalplus\.fr\/.*|www\.canalplus\.fr\/.*|www\.vevo\.com\/watch\/.*|www\.vevo\.com\/video\/.*|pixorial\.com\/watch\/.*|www\.pixorial\.com\/watch\/.*|spreecast\.com\/events\/.*|www\.spreecast\.com\/events\/.*|showme\.com\/sh\/.*|www\.showme\.com\/sh\/.*|.*\.looplogic\.com\/.*|on\.aol\.com\/video\/.*|on\.aol\.com\/playlist\/.*|videodetective\.com\/.*\/.*|www\.videodetective\.com\/.*\/.*|khanacademy\.org\/.*|www\.khanacademy\.org\/.*|.*vidyard\.com\/.*|www\.veoh\.com\/watch\/.*|veoh\.com\/watch\/.*|.*\.univision\.com\/.*\/video\/.*|.*\.vidcaster\.com\/.*|muzu\.tv\/.*|www\.muzu\.tv\/.*|vube\.com\/.*\/.*|www\.vube\.com\/.*\/.*|.*boxofficebuz\.com\/video\/.*|www\.godtube\.com\/featured\/video\/.*|godtube\.com\/featured\/video\/.*|www\.godtube\.com\/watch\/.*|godtube\.com\/watch\/.*|mediamatters\.org\/mmtv\/.*|www\.clikthrough\.com\/theater\/video\/.*|www\.clipsyndicate\.com\/video\/playlist\/.*\/.*|www\.srf\.ch\/player\/tv\/.*\/video\/.*\?id=.*|www\.srf\.ch\/player\/radio\/.*\/audio\/.*\?id=.*|www\.mpora\.com\/videos\/.*|mpora\.com\/videos\/.*|vice\.com\/.*|www\.vice\.com\/.*|videodonor\.com\/video\/.*|api\.lovelive\.tv\/v1\/.*|www\.hurriyettv\.com\/.*|www\.hurriyettv\.com\/.*|video\.uludagsozluk\.com\/.*|espn\.go\.com\/video\/clip.*|espn\.go\.com\/.*\/story.*|abcnews\.com\/.*\/video\/.*|abcnews\.com\/video\/playerIndex.*|abcnews\.go\.com\/.*\/video\/.*|abcnews\.go\.com\/video\/playerIndex.*|washingtonpost\.com\/wp-dyn\/.*\/video\/.*\/.*\/.*\/.*|www\.washingtonpost\.com\/wp-dyn\/.*\/video\/.*\/.*\/.*\/.*|www\.boston\.com\/video.*|boston\.com\/video.*|www\.boston\.com\/.*video.*|boston\.com\/.*video.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|www\.facebook\.com\/.*\/photos\/.*|cnbc\.com\/id\/.*\?.*video.*|www\.cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|www\.cnbc\.com\/id\/.*\/play\/1\/video\/.*|cbsnews\.com\/video\/watch\/.*|plus\.google\.com\/.*|www\.google\.com\/profiles\/.*|google\.com\/profiles\/.*|www\.cnn\.com\/video\/.*|edition\.cnn\.com\/video\/.*|money\.cnn\.com\/video\/.*|today\.msnbc\.msn\.com\/id\/.*\/vp\/.*|www\.msnbc\.msn\.com\/id\/.*\/vp\/.*|www\.msnbc\.msn\.com\/id\/.*\/ns\/.*|today\.msnbc\.msn\.com\/id\/.*\/ns\/.*|msnbc\.msn\.com\/.*\/watch\/.*|www\.msnbc\.msn\.com\/.*\/watch\/.*|nbcnews\.com\/.*|www\.nbcnews\.com\/.*|multimedia\.foxsports\.com\/m\/video\/.*\/.*|msn\.foxsports\.com\/video.*|www\.globalpost\.com\/video\/.*|www\.globalpost\.com\/dispatch\/.*|theguardian\.com\/.*\/video\/.*\/.*\/.*\/.*|www\.theguardian\.com\/.*\/video\/.*\/.*\/.*\/.*|guardian\.co\.uk\/.*\/video\/.*\/.*\/.*\/.*|www\.guardian\.co\.uk\/.*\/video\/.*\/.*\/.*\/.*|bravotv\.com\/.*\/.*\/videos\/.*|www\.bravotv\.com\/.*\/.*\/videos\/.*|dsc\.discovery\.com\/videos\/.*|animal\.discovery\.com\/videos\/.*|health\.discovery\.com\/videos\/.*|investigation\.discovery\.com\/videos\/.*|military\.discovery\.com\/videos\/.*|planetgreen\.discovery\.com\/videos\/.*|science\.discovery\.com\/videos\/.*|tlc\.discovery\.com\/videos\/.*|video\.forbes\.com\/fvn\/.*|distrify\.com\/film\/.*|muvi\.es\/.*|video\.foxnews\.com\/v\/.*|video\.foxbusiness\.com\/v\/.*|www\.reuters\.com\/video\/.*|reuters\.com\/video\/.*|live\.huffingtonpost\.com\/r\/segment\/.*\/.*|video\.nytimes\.com\/video\/.*|www\.nytimes\.com\/video\/.*\/.*|nyti\.ms\/.*|www\.vol\.at\/video\/.*|vol\.at\/video\/.*|www\.spiegel\.de\/video\/.*|spiegel\.de\/video\/.*|www\.zeit\.de\/video\/.*|zeit\.de\/video\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|www\.last\.fm\/music\/.*|www\.last\.fm\/music\/+videos\/.*|www\.last\.fm\/music\/+images\/.*|www\.last\.fm\/music\/.*\/_\/.*|www\.last\.fm\/music\/.*\/.*|www\.mixcloud\.com\/.*\/.*\/|www\.radionomy\.com\/.*\/radio\/.*|radionomy\.com\/.*\/radio\/.*|www\.hark\.com\/clips\/.*|www\.rdio\.com\/#\/artist\/.*\/album\/.*|www\.rdio\.com\/artist\/.*\/album\/.*|www\.zero-inch\.com\/.*|.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*|freemusicarchive\.org\/music\/.*|www\.freemusicarchive\.org\/music\/.*|freemusicarchive\.org\/curator\/.*|www\.freemusicarchive\.org\/curator\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/templates\/story\/story\.php.*|huffduffer\.com\/.*\/.*|www\.audioboo\.fm\/boos\/.*|audioboo\.fm\/boos\/.*|boo\.fm\/b.*|www\.xiami\.com\/song\/.*|xiami\.com\/song\/.*|www\.saynow\.com\/playMsg\.html.*|www\.saynow\.com\/playMsg\.html.*|grooveshark\.com\/.*|radioreddit\.com\/songs.*|www\.radioreddit\.com\/songs.*|radioreddit\.com\/\?q=songs.*|www\.radioreddit\.com\/\?q=songs.*|www\.gogoyoko\.com\/song\/.*|hypem\.com\/premiere\/.*|bop\.fm\/s\/.*\/.*|clyp\.it\/.*|www\.dnbradio\.com\/.*|dnbradio\.com\/.*))|(https:\/\/(picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*|skitch\.com\/.*\/.*\/.*|img\.skitch\.com\/.*|vidd\.me\/.*|vid\.me\/.*|gist\.github\.com\/.*|foursquare\.com\/.*|www\.foursquare\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|speakerdeck\.com\/.*\/.*|storify\.com\/.*\/.*|crocodoc\.com\/.*|.*\.crocodoc\.com\/.*|urtak\.com\/u\/.*|urtak\.com\/clr\/.*|ganxy\.com\/.*|www\.ganxy\.com\/.*|sketchfab\.com\/models\/.*|sketchfab\.com\/show\/.*|ifttt\.com\/recipes\/.*|cloudup\.com\/.*|hackpad\.com\/.*|rapidengage\.com\/s\/.*|stepic\.org\/.*|readtapestry\.com\/s\/.*\/|chirb\.it\/.*|medium\.com\/.*|medium\.com\/.*\/.*|www\.branchtrack\.com\/projects\/.*|itunes\.apple\.com\/.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|www\.youtube\.com\/embed\/.*|screen\.yahoo\.com\/.*\/.*|www\.streamio\.com\/api\/v1\/.*|streamio\.com\/api\/v1\/.*|vine\.co\/v\/.*|www\.vine\.co\/v\/.*|mixbit\.com\/v\/.*|www\.brainshark\.com\/.*\/.*|brainshark\.com\/.*\/.*|brainsonic\.com\/.*|.*\.brainsonic\.com\/.*|www\.reelhouse\.org\/.*|reelhouse\.org\/.*|www\.allego\.com\/.*|www\.vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|app\.wistia\.com\/embed\/medias\/.*|wistia\.com\/.*|.*\.wistia\.com\/.*|.*\.wi\.st\/.*|wi\.st\/.*|.*\.looplogic\.com\/.*|khanacademy\.org\/.*|www\.khanacademy\.org\/.*|.*vidyard\.com\/.*|.*\.stream\.co\.jp\/apiservice\/.*|.*\.stream\.ne\.jp\/apiservice\/.*|api\.lovelive\.tv\/v1\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|www\.facebook\.com\/.*\/photos\/.*|plus\.google\.com\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*|clyp\.it\/.*)))/i;

				$(".embedded-embedly").embedly({
					urlRe: regex,
					method: "after"
				});
			

				// Avoid form submit
				return false;
			}

		});

		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").click(function () {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor input").val("");
		});

		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor a").click(function (e) {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").hide();
			e.preventDefault();
		});

		// Update title in page menu
		$(document).on("keyup", ".fluid-preview-wrapper .page-title-elem", function () {
			console.log("keyup: currentpage" + $(this).closest("li").index());
			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".fluid-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		showResponseInfo(location.pathname.split("/"));

	}

	// Photo Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoLayout() {

		var insert = "";

		insert += "<section class=\"photo-preview-wrapper\">";
		insert += "<div class=\"page-bg-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"../static/images/grayBG.png\" alt=\"\" style=\"display: none;\" data-adaptive-background=\"0\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url);\"></div>";

		if (title == null) {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}
		
		if (text == null) { //display none for this layout, but need it to avoid data loss when switching layouts
			insert += "<div class=\"page-desc\" style=\"display: none;\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" style=\"display: none;\" contenteditable=\"true\">" + text + "</div></article></div></section>";
		}

		$("#create-content").html(insert);
		templateId = 1;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").attr("src") === "../static/images/grayBG.png") {
			$(".image-attribution").css("display", "none");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".photo-preview-wrapper .page-title-elem", function () {

			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".photo-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		$(".photo-preview-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function (e) {
			check_charcount(descElem, descMax, e);
		});

		function check_charcount(descElem, descMax, e) {
			if (e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

		showResponseInfo(location.pathname.split("/"));

	}

	// Overlay Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function overlayLayout() {

		var insert = "";

		insert += "<section class=\"overlay-preview-wrapper\">";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"../static/images/grayBG.png\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url);\"></div>";

		if (title == null) {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write a quote here\"></div>";
		} else {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-title-elem\" contenteditable=\"true\">" + title + "</div>";
		}

		insert += "</article></div>";
		if (imageURL == "../static/images/grayBG.png") {
			insert += "<span class=\"image-attribution\"></span>";
		} else {
			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";
		}
		insert += "</section>";

		// no paragraphs in this view, but having this allows it to keep between layout switching
		if (text == null) {
			insert += "<h1 class=\"page-desc\" data-placeholder=\"Write story here\" style=\"display: none;\"></h1>";
		} else {
			insert += "<h1 class=\"page-desc\" style=\"display: none;\">" + text + "</h1>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 2;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () {
			$(this).text("");
		});

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".overlay-preview-wrapper .page-title-elem", function () {

			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

		});

		// description input limiter
		var descElem = "page-title-elem";
		descMax = 149;

		$("." + descElem).keydown(function (e) {
			check_charcount(descElem, descMax, e);
		});

		function check_charcount(descElem, descMax, e) {
			if (e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}
		showResponseInfo(location.pathname.split("/"));
	}

	// Photo/Text Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoTextLayout() {

		var insert = "";

		insert += "<section class=\"phototext-preview-wrapper\">";

		if (imageURL == "../static/images/grayBG.png") {
			insert += "<span class=\"image-attribution\" style=\"background: transparent;\"></span>";
		} else {
			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";
		}

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"../static/images/grayBG.png\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" style=\"display: block;\" src=\"" + imageURL + "\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url);\"></div>";

		if (title == null) {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".phototext-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 3;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".phototext-preview-wrapper .page-title-elem", function () {

			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".phototext-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		showResponseInfo(location.pathname.split("/"));

	}

	// Vertical Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function verticalLayout() {

		var insert = "";

		insert += "<section class=\"vertical-preview-wrapper\">";
		insert += "<div class=\"draggable-placeholder\">";

		if (imageURL == "../static/images/grayBG.png") {
			insert += "<span class=\"image-attribution\" style=\"background: transparent;\"></span>";
		} else {
			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";
		}

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"../static/images/grayBG.png\" alt=\"\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertCoverImage(url);\"></div>";

		if (title == null) {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 4;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// .serialize(): returns a JSON object with element's contents
		// var editor = new GapeliaEditor('[contenteditable="true"]').serialize();
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".vertical-preview-wrapper .page-title-elem", function () {

			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".vertical-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		showResponseInfo(location.pathname.split("/"));

	}

	// Video Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function videoLayout() {

		var insert = "";

		insert += "<section class=\"video-preview-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add video credit?\">" + attribution + "</span>";
		insert += "<div class=\"button-wrapper\"><button class=\"photo-picker video-btn\">&#xf256;</button>";

		insert += "<input class=\"video-picker\" type=\"text\" data-placeholder=\"Vimeo URL here\" placeholder=\"Vimeo URL here\" onchange=\"$('#page" + $(this).closest("li").index() + "Image').addClass('large'); $($('#pages-scroller li section img')["+currentPage+"]).VimeoThumb(); $('.image-attribution').show().text('Add video credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); \" style=\"display: none;\"/></div>";

		insert += "<div class=\"video-preview\"><span class=\"play-video\">Play</span>";

		if (videoURL == null) {
			insert += "<div class=\"video-player-container\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		if (title == null) {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></section>";
		}

		// no background in this view, but having this allows it to keep between layout switching
		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/view-modes/video.png\" style=\"display: none;\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" style=\"display: none;\"/>";
		}

		$("#create-content").html(insert);
		$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 5;

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker.video-btn").html("&#xf256;");

		// Update title in page menu
		$(document).on("keyup", ".video-preview-wrapper .page-title-elem", function () {

			var titleThing = $($("#pages-scroller li section div .page-thumb-title")[currentPage]);
			var numberThing = $($("#pages-scroller li section div .page-thumb-number")[currentPage]);
			$(titleThing).text($(this).text());
			$(numberThing).text(currentPage);

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".video-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		$(".video-preview-wrapper .photo-picker").on("click", function () {

			$(this).hide();
			$(".video-preview-wrapper .video-picker").show();

		});

		function getVimeoId(url) {

			var match = /vimeo.*\/(\d+)/i.exec(url);

			// if the match isn't null (i.e. it matched)
			if (match) {
				return match[1]; // the grouped/matched digits from the regex
			}

		}

		$(".video-picker").keypress(function (e) {

			var
			videoURL = "http://player.vimeo.com/video/" + getVimeoId($(this).val()) + "?title=0&amp;byline=0&amp;portrait=0&amp;color=70a1b1",
			videoThumb = "$($('#pages-scroller li section img')["+currentPage+"])",
			videoID = getVimeoId($(this).val());

			if (e.which == 13) {
				$(".video-player-container iframe").attr("src", videoURL);
				$(".video-preview-wrapper .video-picker").hide();
				$(".video-preview-wrapper .photo-picker").show();
				$(videoThumb).attr("data-vimeo-id", videoID);

				return false;
			}

		});

		showResponseInfo(location.pathname.split("/"));

	}

	// Layout Constants
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Save data of what is being edited every second
	window.setInterval(function () {

		if (pages.page[0].templateId != null && pagesCreated != -1) {
			imageURL = $(".page-bg").attr("src");
			videoURL = $(".video-player-container iframe").attr("src");
			title = $(".page-title-elem").html();
			text = $(".page-desc").html();

			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
		}

	}, 1000);

	// Save book information every 10 seconds
	window.setInterval(function () {
		
		if(!hasClickedPublish){
			console.log("autosaving");
			updateBookAndPages(false);
			$("#notify-saving").finish().fadeIn("fast").delay(1000).fadeOut("slow");
		}
		else{console.log("not autosaving");}

	}, 10000);

	// Save page information every 10 seconds
	window.setInterval(function () {


		imageURL = $(".page-bg").attr("src");
		videoURL = $(".video-player-container iframe").attr("src");
		title = $(".page-title-elem").html();
		title= title.replace(/&lt;br&gt;/g," ");
		firstTitle=pages.page[0].title;
		$(".page-title-elem").html(title);
		text = $(".page-desc").html();
		templateId = pages.page[currentPage].templateId;
		attribution = $(".image-attribution").html();

	}, 10000);

	// Toggle layout switcher
	$("#select-fluid-layout").click(function ()			{ fluidLayout(); });
	$("#select-photo-layout").click(function ()			{ photoLayout(); });
	$("#select-overlay-layout").click(function ()		{ overlayLayout(); });
	$("#select-phototext-layout").click(function ()	{ photoTextLayout(); });
	$("#select-vertical-layout").click(function ()	{ verticalLayout(); });
	$("#select-video-layout").click(function ()			{ videoLayout(); });

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").on("click", function (e) {
		if(title=="") {
			alert("Please add a title to your story before publishing.") + ("#publish-modal").css("display", "none");
		}
	
	firstTitle=pages.page[0].title;
	
		$("#publish-book-title").html(firstTitle);
		$(".page-title-elem").html(title);
		$("#publish-modal").css({
			"width": "100%",
			"height": "100%",
			"opacity": "1",
			"z-index": "10"
		}).show();

		e.preventDefault();

	});

	var hasClickedPublish = false;

	$("#publish-this").on("click", function (e) {
		hasClickedPublish = true;
	});

	$("#close-button").on("click", function (e) {
		
	updateBookAndPages(false);
	
		lastPublished = getLastPublishedBookId();
		
		if  (lastPublished == null) {
			
			$("#draft-tutorial").show().css({
				"font-size": "2rem",
				"line-height": "1.5",
				"margin-top": "9%",
				"text-align": "center",
				"width": "100%"
			});
			$("#draft-tutorial #leave-editor").css({
				"padding": "7px 12px 7px 12px",
				"background-color": "#59B3A6",
				"border-radius": "5px",
				"color": "white",
				"font-size": "1.5rem",
				"right": "1rem",
				"top": "1rem",
				"position": "absolute"
			});
			$("#back, #finish, #notify-saving").hide();
		} else {
			window.location = "/featured";
		}
		
	});

	$(document).on("click", ".close-modal", function (e) {

		hasClickedPublish = false;

		$(this).closest(".modal").css({
			"display": "none",
			"opacity": "0"
		}).hide();

		e.preventDefault();

	});


	// Content Creation
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Hide inline-wrapper when click outisde

	$(document).mouseup(function (e) {

		var container = $(".add-inline-content-wrapper");

		// if the target of the click isn't the container...
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.hide(); // ... nor a descendant of the container
		}

	});

	// Hide editor, show when mouse moves
	var timedelay = 1;

	function delayCheck() {

		if (timedelay == 2) {
			$(".book-creation header").fadeOut("slow");

			$(".add-inline-content, .fluid-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "0");

			timedelay = 1;
		}

		timedelay = timedelay + 1;

	}


	$(document).mousemove(function () {

		$(".book-creation header").fadeIn();

		$(".add-inline-content, .fluid-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "1");

		// $(".video-preview-wrapper button.photo-picker").css("opacity", "1");

		timedelay = 1;
		clearInterval(_delay);
		_delay = setInterval(delayCheck, 1000);

	});
	
	// page load starts delay timer
	_delay = setInterval(delayCheck, 500);