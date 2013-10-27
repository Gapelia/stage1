package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari 
 * Date: 26/10/13 
 * Time: 4:29 PM 
 * Copyright Gapelia Inc
 */
public class PhotoTag {
	private String photoTagId;
	private String photoId;
	private String createdByUserId;
	private String tag;
	private Integer x;
	private Integer y;
	private PhotoTagComment[] photoTagComments;
	private Date createdDate;
	private Boolean isDisabled;

	public String getPhotoTagId() {
		return photoTagId;
	}

	public void setPhotoTagId(String photoTagId) {
		this.photoTagId = photoTagId;
	}

	public String getPhotoId() {
		return photoId;
	}

	public void setPhotoId(String photoId) {
		this.photoId = photoId;
	}

	public String getCreatedByUserId() {
		return createdByUserId;
	}

	public void setCreatedByUserId(String createdByUserId) {
		this.createdByUserId = createdByUserId;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Integer getX() {
		return x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	public PhotoTagComment[] getPhotoTagComments() {
		return photoTagComments;
	}

	public void setPhotoTagComments(PhotoTagComment[] photoTagComments) {
		this.photoTagComments = photoTagComments;
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
