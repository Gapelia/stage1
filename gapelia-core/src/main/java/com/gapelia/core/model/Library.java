package com.gapelia.core.model;


import java.sql.Timestamp;

public class Library {
    private int libraryId;
    private int userId;
    private int featuredBook;
    private String title;
    private String [] tags;
    private String coverPhoto;
    private String description;
    private Timestamp created;

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

    public int getFeaturedBook() {
        return featuredBook;
    }

    public void setFeaturedBook(int featuredBook) {
        this.featuredBook = featuredBook;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }
}
