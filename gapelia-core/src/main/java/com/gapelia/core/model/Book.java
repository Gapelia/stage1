package com.gapelia.core.model;

import java.sql.Timestamp;
import java.sql.Date;

public class Book {
	private int bookId;
    private int userId;
    private String coverPhoto;
    private String title;
    private String language;
    private String [] tags;
    private Timestamp created;
    private Timestamp lastUpdated;
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

    public static final String COMMA = ",";
    public String getTags() {

        StringBuilder strb = new StringBuilder();
        for(String s : tags){
            strb.append(s + COMMA);
        }
        return strb.substring(0,strb.length()-1);
    }

    public void setTags(String tags) {
        if (tags != null) {
            this.tags = tags.split(COMMA);
        }
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public Timestamp getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Timestamp lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
}
