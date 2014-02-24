package com.gapelia.core.model;

import java.sql.Date;

public class Book {
	private int bookId;
    private int userId;
    private String coverPhoto;
    private String title;
    private String language;
    private String [] tags;
    private Date created;
    private Date lastUpdated;
    private Boolean isPublished;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLanguague() {
        return language;
    }

    public void setLanguague(String Languague) {
        this.language = language;
    }

    public String [] getTags() {
        return tags;
    }

    public void setTags(String [] tags) {
        this.tags = tags;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
}
