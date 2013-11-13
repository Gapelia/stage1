package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari 
 * Date: 26/10/13 
 * Time: 4:30 PM 
 * Copyright Gapelia Inc
 */
public class PhotoTagComment {
	private String commentId;
	private String photoTagId;
	private String createdByUserId;
	private String comment;
	private Double rating;
	private Date commentedDate;
	private Boolean isDisabled;

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getPhotoTagId() {
		return photoTagId;
	}

	public void setPhotoTagId(String photoTagId) {
		this.photoTagId = photoTagId;
	}

	public String getCreatedByUserId() {
		return createdByUserId;
	}

	public void setCreatedByUserId(String createdByUserId) {
		this.createdByUserId = createdByUserId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Date getCommentedDate() {
		return commentedDate;
	}

	public void setCommentedDate(Date commentedDate) {
		this.commentedDate = commentedDate;
	}

	public Boolean getDisabled() {
		return isDisabled;
	}

	public void setDisabled(Boolean disabled) {
		isDisabled = disabled;
	}
}
