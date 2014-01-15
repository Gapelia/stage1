package com.gapelia.core.util;

import com.gapelia.core.model.*;

import java.sql.Date;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 5:21 PM
 * Copyright Gapelia Inc
 */
public class TestHelper {

	public static User getDummyUser() {
		User user = new User();
		user.setBio("This is the bio of Abhishek Tiwari");
		user.setEmail("atiwari@gapelia.com");
		user.setFacebookUrl("http://www.facebook.com/abhishektiwari23");
		user.setGooglePlusUrl("https://plus.google.com/u/0/105321590596140922599/posts/p/pub");
		user.setLastLoggedIn(Date.valueOf("1986-10-10"));
		user.setMemberSince(Date.valueOf("1986-10-10"));
		user.setName("Shit Teleported");
		user.setPhotoUrl("https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c119.50.621.621/s160x160/579824_10152695402665363_1810401541_n.jpg");
		user.setReputation(100.0);
		user.setTwitterUrl("https://twitter.com/abhicool");
		user.setUserId("11011");
		return user;
	}

	public static Library [] getDummyUserLibraries() {
		Library [] libraries = new Library[4];
		
		for (int i=0;i<4;i++) {
			Library library = new Library();
			library.setCreated(Date.valueOf("1986-10-10"));
			library.setCreatedByUserId("11011");
			library.setDescription("This is library number : " + i);
			library.setDisabled(false);
			library.setPrivate(false);
			library.setLastEdited(Date.valueOf("1986-10-10"));
			library.setTitle("A dummy library");
			library.setReputation(95.0 + i);
			library.setLibraryId("9812" + i);
			library.setBooks(getDummyBooks());
			libraries[i] = library;
		}
		return libraries;
	}
	
	public static Book[] getDummyBooks() {
		Book [] books = new Book[4];
		
		for (int i=0; i<4; i++) {
			Book book = new Book();
			book.setBookId("6778" + i);
			book.setCreatedByUserIds(new String[] { "11011" });
			book.setCreatedDate(Date.valueOf("1986-10-10"));
			book.setDimension("Pulse");
			book.setLanguage("en-us");
			book.setPublished(true);
			book.setTags("joy,love,fun");
			book.setLastEditedDate(Date.valueOf("1986-10-10"));
			book.setTitle("This is a book");
			book.setPublishedDate(Date.valueOf("1986-10-10"));
			book.setPages(getDummyPages());
			books[i] = book;
		}
		return books;
	}
	
	public static Page[] getDummyPages() {
		Page [] pages = new Page[4];
		
		for (int i=0; i<4; i++) {
			Page page = new Page();
			page.setBookId("6778" + i);
			page.setCreatedByUserId("11011");
			page.setDescription("This is a page description");
			page.setLocation("Boston");
			page.setMarginX(0.0);
			page.setMarginY(0.0);
			page.setPageId("" + i);
			page.setPageNumber(i);
			Photo photo = getDummyPhoto();
			//page.setPhoto(photo);
			page.setTitle("This is a page");
			page.setVideoUrl("http://www.youtube.com/watch?v=85eKmdX7tmI");
			page.setTemplateId(1);
			pages[i] = page;
		}
		return pages;
	}
	
	public static Photo getDummyPhoto() {
		Photo photo = new Photo();
		photo.setCreatedByUserId("11011");
		photo.setCreatedDate(Date.valueOf("1986-10-10"));
		photo.setDisabled(false);
		photo.setPageId("1");
		photo.setPhotoId("1");
		photo.setPhotoTags(getDummyPhotoTags());
		photo.setPhotoUrl("https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/1278108_10151901618636210_480309476_o.jpg");
		return photo;
	}

	public static PhotoTag[] getDummyPhotoTags() {
		PhotoTag [] photoTags = new PhotoTag[4];

		for (int i=0;i<4;i++) {
			PhotoTag photoTag = new PhotoTag();
			photoTag.setTag("This is a tag");
			photoTag.setCreatedByUserId("11011");
			photoTag.setCreatedDate(Date.valueOf("1986-10-10"));
			photoTag.setDisabled(false);
			photoTag.setPhotoId("1");
			photoTag.setPhotoTagComments(getDummyPhotoTagComments());
			photoTag.setPhotoTagId("1");
			photoTag.setX(40);
			photoTag.setY(45);
			photoTags[i] = photoTag;
		}
		return photoTags;
	}

	public static PhotoTagComment[] getDummyPhotoTagComments() {
		PhotoTagComment [] photoTagComments = new PhotoTagComment[4];

		for(int i=0;i<4;i++) {
			PhotoTagComment photoTagComment = new PhotoTagComment();
			photoTagComment.setComment("This is a comment");
			photoTagComment.setCommentedDate(Date.valueOf("1986-10-10"));
			photoTagComment.setDisabled(false);
			photoTagComment.setCommentId("1");
			photoTagComment.setCreatedByUserId("11011");
			photoTagComment.setPhotoTagId("1");
			photoTagComment.setRating(98.0);
			photoTagComments[i] = photoTagComment;
		}
		return photoTagComments;
	}

	public static Event[] getDummyNotifications() {
		Event[] events = new Event[4];
		
		for(int i=0;i<4;i++) {
			Event event = new Event();
			event.setCreatedDate(Date.valueOf("1986-10-10"));
			event.setMessage("Tommy likes it");
			event.setRead(false);
			event.setUserId("11011");
			events[i] = event;
		}
		return events;
	}
}
