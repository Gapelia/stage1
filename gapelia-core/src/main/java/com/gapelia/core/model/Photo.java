package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari 
 * Date: 26/10/13 
 * Time: 4:27 PM 
 * Copyright Gapelia Inc
 */
public class Photo {
	private String photoId;
	private String pageId;
	private String createdByUserId;
	private String photoUrl;
	private PhotoTag [] photoTags;
	private Date createdDate;
	private Boolean isDisabled;

	public String getPhotoId() {
		return photoId;
	}

	public void setPhotoId(String photoId) {
		this.photoId = photoId;
	}

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

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public PhotoTag[] getPhotoTags() {
		return photoTags;
	}

	public void setPhotoTags(PhotoTag[] photoTags) {
		this.photoTags = photoTags;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Boolean getDisabled() {
		return isDisabled;
	}

	public void setDisabled(Boolean disabled) {
		isDisabled = disabled;
	}
}
