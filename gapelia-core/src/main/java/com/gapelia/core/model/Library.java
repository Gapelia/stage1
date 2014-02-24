package com.gapelia.core.model;

import java.sql.Date;

public class Library {
	private int libraryId;
    private int userId;
    private int numSubscribers;
    private int featutedBook;
    private String title;
    private String [] tags;
    private String coverPhoto;
    private String description;
    private Date created;

	public int getLibraryId() {
		return libraryId;
	}

    public void setLibraryId(int libraryId) {
        this.libraryId = libraryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public  int getNumSubscribers() {
        return numSubscribers;
    }

    public void setNumSubscribers(int numSubscribers) {
        this.numSubscribers = numSubscribers;
    }

    public int getFeatutedBook() {
        return featutedBook;
    }

    public void setFeatutedBook(int featutedBook) {
        this.featutedBook = featutedBook;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String [] getTags() {
        return tags;
    }

    public void setTags(String [] tags) {
        this.tags = tags;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}
