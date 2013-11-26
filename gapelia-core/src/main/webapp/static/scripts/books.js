	// Book Creation
	// @Gapelia
	// ====================================================================================
	// Left Menus | Layout and page interaction | Right Menus | Content Creation
	// Live Preview
	// Globals
	var $vW = $(window).width(), $vH = $(window).height();
	// Set menu height, necessary for scrollbar plugin
	$("#pages-scroller").css("height", $vH - 52 + "px");
	$("#layout-scroller").css("height", $vH - 52 + "px");
	// $("#comments-scroller").css("height", $vH - 52 + "px");

	// will need to check/change these heights later
	$(".text-preview-wrapper .page-desc").css("height", $vH - 165 + "px");
	$(".phototext-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(document).ready(function () {
		//geotag = document.getElementById("geotag");
		geotag="BUGGGGGG";
		//autocomplete = new google.maps.places.Autocomplete(geotag);
 		book = {"author":"AUTHOR","title":null,"library":"NULL","dimension":"NULL"};
 		pages = {"page":[{"pageNumber":0,"geotag":geotag,"templateId":null,"title":null,"text":null,"image":"/static/images/blank-bg.jpg","video":"NULL"}]};
		index=0;
		author=book.author;
		pageNumber=pages.page[index].pageNumber;
		text=pages.page[index].text;
		imageURl=pages.page[index].image;
		videoURL=pages.page[index].video;
		templateId=pages.page[index].templateId;
		title=pages.page[index].title;
		pagesCreated=1;
		currentPage=0
		one =1;
	});

	// Left Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#pages-toggle").click(function (e) {
		$("#pages-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#layout-toggle").click(function (e) {
		$("#layout-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#comments-toggle").click(function (e) {
		$("#comments-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#pages-scroller").mouseleave(function() {
		$("#pages-scroller").css("left", "-150px");
	});

	$("#layout-scroller").mouseleave(function() {
		$("#layout-scroller").css("left", "-150px");
	});

	$("#comments-scroller").mouseleave(function() {
		$("#comments-scroller").css("left", "-150px");
	});

	// Layout and page interaction
	// @Gapelia
	// ------------------------------------------------------------------------------------
	$("#add-page").click(function (e) {
		$(this).before($("<li id=\""+pagesCreated+"\"draggable='true'></li>").html("<a class=\"delete-page entypo\">☕</a><section><img src='static/images/new-page-thumb.png' class='page' id='"+(pagesCreated)+"' alt=''/><span>"+(pagesCreated)+ "&middot; New Page</span></section>"));
		e.preventDefault();
		imageURl=$('#theImage').attr('src');
		text=$('#theText').text();
		title=$('#theTitle').text();
		geotag=$('geotag').text();
		if(pagesCreated==0)
		{
			pages.page[pagesCreated] = {"pageNumber":pagesCreated,"geotag":geotag,"templateId":null,"title":null,"text":null,"image":"/static/images/blank-bg.jpg","video":"NULL"};
		}
		else if(pagesCreated>21)
		{
			alert("Your book is too big please remove a page!\n");
		}
		else{ 

			if(geotag==undefined)
			{
				pages.page[pagesCreated-1].geotag=null
			}
			else{
				pages.page[pagesCreated-1].geotag=geotag;
			}
			pages.page[pagesCreated-1].templateId=templateId;
			pages.page[pagesCreated-1].title=title;
			pages.page[pagesCreated-1].text=text;
			pages.page[pagesCreated-1].image=imageURl;
			pages.page[pagesCreated-1].video=videoURL;
			pages.page[pagesCreated] = {"pageNumber":pagesCreated,"geotag":null,"templateId":"0","title":null,"text":null,"image":"/static/images/blank-bg.jpg","video":"NULL"};
			pagesCreated++;
		}
	});
	$(document).on('click',"#pages-scroller ul li .delete-page", function (e) {
		currentPage=$(this).closest("img").attr('id');
		console.log(pages);
		pages.page.splice(currentPage,1);
		console.log(pages);
		currentPage--;
		$(this).closest("li").remove();
		e.preventDefault();
	});
	// Clicking on a page in menu opens layout menu
	$(document).on('click',"#pages-scroller ul li img", function (e) {
		var oldPage=currentPage
		currentPage=$(this).closest("img").attr('id');
		if(oldPage==currentPage)
		{
		imageURl=$('#theImage').attr('src');
		 text=$('#theText').text();
		 title=$('#theTitle').text();
		}
		else{
			pages.page[oldPage].templateId=templateId;
			pages.page[oldPage].title=title;
			pages.page[oldPage].text=text;
			pages.page[oldPage].image=imageURl;
			pages.page[oldPage].video=videoURL;
			templateId=pages.page[currentPage].templateId;
			title=pages.page[currentPage].title;
			text=pages.page[currentPage].text;
			imageURl=pages.page[currentPage].image;
			videoURL=pages.page[currentPage].video;
		}
		$("#pages-scroller").css("left", "-150px");
		$("#layout-scroller").css("left", "0");
		if(pages.page[currentPage].templateId=null)
		{
			var insert="<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"button-wrapper\"></div><div class=\"blank-preview\"><article><p contenteditable=\"false\">Your page has been created.<br/><br/>Choose a layout from the <span class=\"entypo\">&#9871;</span> menu to get started!</p></article></div></section>";
		}
		else{
			switch(templateId)
			{
				case 0:
					frontCoverLayout();
					break;
				case 1:
					photoLayout();
					break;
				case 2:
					
				default:
					frontCoverLayout();
					break;
			}
		}
		e.preventDefault();
	});
	function frontCoverLayout(){
		insert="";
		insert+="<section class=\"frontcover-preview-wrapper\">";
		if(imageURl==null)
		{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		}
		else{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\""+imageURl+"\"/>";
		}
		insert+="<div class=\"button-wrapper\"><input id=\"me\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"window\" data-fp-multiple=\"true\"onchange=\"url=event.fpfile.url; console.log(url); $('#theImage').attr('src', url);\"></div>";
		if(title==null){
			insert+="<div class=\"frontcover-preview\"><article><h1 id=\"theTitle\" class=\"page-title-elem\"  placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		}
		else{
			insert+="<div class=\"frontcover-preview\"><article><h1 id=\"theTitle\" class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}
		if(text==null){
			insert+="<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div id=\"theText\" class=\"page-desc\" placeholder=\"Start writing your story here.\" contenteditable=\"true\"></div></article></div></section>";
		}
		else{
			insert+="<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div id=\"theText\" class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}
		$("#create-content").html(insert);
		var element=$('#me');
		element=element[0];
		element.type="filepicker";
		filepicker.constructWidget(element); 
	}
	function photoLayout(){
		var insert="";
		insert+="<section class=\"photo-preview-wrapper\">";
		if(imageURl==null)
		{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		}
		else{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\""+imageURl+"\"/>";
		}
		insert+="<div class=\"button-wrapper\"><input id=\"me\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"window\" data-fp-multiple=\"true\"onchange=\"url=event.fpfile.url; console.log(url); $('#theImage').attr('src', url);\"></div>";
		if(title==null){
			insert+="<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\"  id=\"theTitle\" placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		}
		else{
			insert+="<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" id=\"theTitle\" contenteditable=\"true\">"+title+"</h1>";
		}
		insert+="<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";
		if(text==null){
			insert+="<div class=\"page-desc\" contenteditable=\"true\" id=\"theText\" placeholder=\"Start writing your story here.\"></div></article></div></section>";
		}
		else{
			insert+="<div class=\"page-desc\" id=\"theText\"  contenteditable=\"true\">"+text+"</div></article></div></section>";
		}
		
		$("#create-content").html(insert);
		var element=$('#me');
		element=element[0];
		element.type="filepicker";
		filepicker.constructWidget(element); 
	}
	// Toggle layout switcher
	$("#select-frontcover-layout").click(function (e) {
		insert="";
		imageURl=$('#theImage').attr('src');
		text=$('#theText').text();
		title=$('#theTitle').text();
		insert+="<section class=\"frontcover-preview-wrapper\">";
		if(imageURl==null)
		{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		}
		else{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\""+imageURl+"\"/>";
		}
		insert+="<div class=\"button-wrapper\"><input id=\"me\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"window\" data-fp-multiple=\"true\"onchange=\"url=event.fpfile.url; console.log(url); $('#theImage').attr('src', url);\"></div>";
		if(title==null){
			insert+="<div class=\"frontcover-preview\"><article><h1 id=\"theTitle\" class=\"page-title-elem\"  placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		}
		else{
			insert+="<div class=\"frontcover-preview\"><article><h1 id=\"theTitle\" class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}
		if(text==null){
			insert+="<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div id=\"theText\" class=\"page-desc\" placeholder=\"Start writing your story here.\" contenteditable=\"true\"></div></article></div></section>";
		}
		else{
			insert+="<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div id=\"theText\" class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}
		$("#create-content").html(insert);
		templateId=0;
		var element=$('#me');
		element=element[0];
		element.type="filepicker";
		filepicker.constructWidget(element); 
		pages.page[currentPage].geotag=geotag;
		pages.page[currentPage].templateId=templateId;
		pages.page[currentPage].title=title;
		pages.page[currentPage].text=text;
		pages.page[currentPage].image=imageURl;
		pages.page[currentPage].video=videoURL;
		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");
		e.preventDefault();
	});

	$("#select-photo-layout").click(function (e) {
		var insert="";
		var imageURl=$('#theImage').attr('src');
		var text=$('#theText').text();
		var title=$('#theTitle').text();
		insert+="<section class=\"photo-preview-wrapper\">";
		if(imageURl==null)
		{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		}
		else{
			insert+="<img id=\"theImage\" class=\"page-bg\" src=\""+imageURl+"\"/>";
		}
		insert+="<div class=\"button-wrapper\"><input id=\"me\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"window\" data-fp-multiple=\"true\"onchange=\"url=event.fpfile.url; console.log(url); $('#theImage').attr('src', url);\"></div>";
		if(title==null){
			insert+="<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\"  id=\"theTitle\" placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		}
		else{
			insert+="<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" id=\"theTitle\" contenteditable=\"true\">"+title+"</h1>";
		}
		insert+="<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";
		if(text==null){
			insert+="<div class=\"page-desc\" contenteditable=\"true\" id=\"theText\" placeholder=\"Start writing your story here.\"></div></article></div></section>";
		}
		else{
			insert+="<div class=\"page-desc\" id=\"theText\"  contenteditable=\"true\">"+text+"</div></article></div></section>";
		}
		
		$("#create-content").html(insert);
		templateId=1;
		var element=$('#me');
		element=element[0];
		element.type="filepicker";
		filepicker.constructWidget(element); 
	});

	$("#select-text-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").toggle();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-horizontal-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").toggle();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");
		// $(".pac-item").css("text-align", "center");
		e.preventDefault();

	});

	$("#select-overlay-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").toggle();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-phototext-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").toggle();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-vertical-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").toggle();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-video-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").toggle();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").click(function (e) {

		$("#publish-scroller").css("right", "0");
		e.preventDefault();

	});

	$("#publish-scroller, .selectize-control").mouseleave(function() {
		$("#publish-scroller").css("right", "-200px");
	});

	$("#publish-scroller .selectize-control .item").mouseover(function() {
		// $("#publish-scroller").css("right", "0");
	});

	// Content Creation
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Hide editor controls when typing, show when mouse moves

	$("article").keyup(function () {
		setTimeout(function() {
			$("#back, #finish").fadeOut("slow");
		}, 1000);
	});

	$("body").on("mousemove", function () {
		$("#back, #finish").fadeIn("fast");
	});

	////
	// .css("color", "#999")
	// .css("color", "#191919")

	(function ($) {
		$(function () {

			$('[contenteditable="true"]').blur(function () {

				var text = $.trim($(this).text());

				var ph = $('<span/>', {
					'class': "placeholder"
				}).text($(this).data('placeholder') || '');

				if (text === '') {
					$(this).html(ph);
				}

			}).focus(function () {

				if ($(this).children('.placeholder').length > 0) {
					$(this).html('<span>&nbsp;</span>');
				}

			});

		});
	})(jQuery);



	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});

	// Live Preview
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$(document).ready(function() {

		// h1 = page-title-elem // span = livepreview-thing in page thumb
		$(".page-title-elem").keypress(function() {
			$(".livepreview-thing").text($(this).text());
		});

	});

	// Book Enjoyment
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// $("#the-book").css("height", $vH + "px");

	$(".content").css({
		"width": $vW + "px",
		"height": $vH + "px"
	});

	$(".phototext-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".text-wrapper .page-desc").css("height", $vH - 165 + "px");
	$(".vertical-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".video-wrapper .page-desc").css("height", $vH - 185 + "px");

	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-scrollbar").css({
			"display": "block",
			"height": 100 + "%"
		});
	});

	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-thumb").css("height", 10 + "px");
	});

	// Calculate half of viewport height minus half the height of the prev/next buttons
	$("#bb-nav-prev, #bb-nav-next").css("top", $vH / 2 - 32 + "px");
	
	$("#header-toggle").click(function () {

		$(this).css({
			"opacity": "0",
			"top": "-50px"
		});

		$("#next-book-toggle").css({
			"opacity": "0",
			"top": "-50px"
		});

		$(".full-book header").css("top", "0");

		$("#g-menu-toggle").css({
			"width": "30px",
			"height": "30px",
			"background-size": "30px",
			"top": "0.6rem"
		});

	});

	$(".full-book header").mouseleave(function () {

		$(this).css("top", "-50px");

		$("#header-toggle").css({
			"opacity": "1",
			"top": "0"
		});

		$("#next-book-toggle").css({
			"opacity": "1",
			"top": "0"
		});

		$("#g-menu-toggle").css({
			"width": "61px",
			"height": "61px",
			"background-size": "61px",
			"top": "1rem"
		});

	});

	// MUST FIX!!!
	/*
	$(".back-cover").mousemove(function() {
	// $(".back-cover").ready(function() {

		if ($(".back-cover").css("display")) {
			$("#header-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#next-book-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#bb-nav-next").css({
				"opacity": "0",
				"right": "-50px"
			});
		}

		// if $('.back-cover').css('display');

	});
	*/

	// MUST FIX!!!
	// $(".back-cover").mousemove(function() {

	$(function() {
		setTimeout(function() {

			if ($("#page1[style*='display:block']")) {
				// if ($("#page1").attr("style") == "block") {
				$("#bb-nav-prev").hide();
			} else {
				$("#bb-nav-prev").show();
			}

			/*
			$(".front-cover").ready(function() {

				if ($(".back-cover").css("display")) {
					$("#bb-nav-prev").css({
						"opacity": "0",
						"right": "-50px"
					});
				}

			});

			$(".back-cover").ready(function() {

				if ($(".back-cover").css("display")) {
					$("#header-toggle").css({
						"opacity": "0",
						"top": "-50px"
					});

					$("#next-book-toggle").css({
						"opacity": "0",
						"top": "-50px"
					});

					$("#bb-nav-next").css({
						"opacity": "0",
						"right": "-50px"
					});
				}

			});
			*/

		}, 30);
	});

	/*
	$(".back-cover").ready(function() {

		if ($(".back-cover").css("display")) {
			$("#header-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#next-book-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#bb-nav-next").css({
				"opacity": "0",
				"right": "-50px"
			});
		}

		// if $('.back-cover').css('display');

	});
	*/

	$(".video-preview .play-video").click(function () {

		$(this).hide();
		$(".video-player-container img").hide();
		$(".video-player-container iframe").show();

	});
