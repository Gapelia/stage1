package com.gapelia.core.model;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 4:08 PM
 * Copyright Gapelia Inc
 */
public class Page {
	private String pageId;
	private String createdByUserId;
	private String bookId;
	private String title;
	private String description;
	private String location;
	private String photo;
	private String videoUrl;
	private String templateId;
	private Double marginX;
	private Double marginY;
	private Integer pageNumber;

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getCreatedByUserId() {
		return createdByUserId;
	}

	public void setCreatedByUserId(String createdByUserId) {
		this.createdByUserId = createdByUserId;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public Double getMarginX() {
		return marginX;
	}

	public void setMarginX(Double marginX) {
		this.marginX = marginX;
	}

	public Double getMarginY() {
		return marginY;
	}

	public void setMarginY(Double marginY) {
		this.marginY = marginY;
	}

	public Integer getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}
}
