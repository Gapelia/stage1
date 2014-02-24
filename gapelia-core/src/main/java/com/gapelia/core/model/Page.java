package com.gapelia.core.model;

import java.sql.Date;

public class Page {

    private int pageId;
    private int bookId;
    private int userId;
    private int templateId;
    private int pageNumber;
    private String title;
    private String content;
    private String videoUrl;
    private String photoUrl
    private String photoId;
    private String creativeCommons;
    private Date created;
    private Date lastUpdated;

    public int getPageId() {
        return pageId;
    }

    public void setPageId(int pageId) {
        this.pageId = pageId;
    }

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

    public int getTemplateId() {
        return templateId;
    }

    public void setTemplateId(int templateId) {
        this.templateId = templateId;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoURl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getPhotoId() {
        return  photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }

    public String getCreativeCommons() {
        return creativeCommons;
    }

    public void setCreativeCommons(String creativeCommons) {
        this.creativeCommons = creativeCommons;
    }

    public Date getCreated() {
        return created;
    }

    public void setContent(Date created) {
        this.created = created;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
