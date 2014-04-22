package com.gapelia.core.model;

import java.sql.Timestamp;
import java.sql.Date;
import java.util.Arrays;

public class Book {
	private int bookId;
    private int userId;
    private String coverPhoto;
    private String title;
    private String language;
    private String [] tags;
    private String snippet;
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

    public String getSnippet() {
        return snippet;
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Book book = (Book) o;

		if (bookId != book.bookId) return false;
		if (userId != book.userId) return false;
		if (coverPhoto != null ? !coverPhoto.equals(book.coverPhoto) : book.coverPhoto != null) return false;
		if (created != null ? !created.equals(book.created) : book.created != null) return false;
		if (isPublished != null ? !isPublished.equals(book.isPublished) : book.isPublished != null) return false;
		if (language != null ? !language.equals(book.language) : book.language != null) return false;
		if (lastUpdated != null ? !lastUpdated.equals(book.lastUpdated) : book.lastUpdated != null) return false;
		if (snippet != null ? !snippet.equals(book.snippet) : book.snippet != null) return false;
		if (!Arrays.equals(tags, book.tags)) return false;
		if (title != null ? !title.equals(book.title) : book.title != null) return false;

		return true;
	}

	@Override
	public int hashCode() {
		int result = bookId;
		result = 31 * result + userId;
		result = 31 * result + (coverPhoto != null ? coverPhoto.hashCode() : 0);
		result = 31 * result + (title != null ? title.hashCode() : 0);
		result = 31 * result + (language != null ? language.hashCode() : 0);
		result = 31 * result + (tags != null ? Arrays.hashCode(tags) : 0);
		result = 31 * result + (snippet != null ? snippet.hashCode() : 0);
		result = 31 * result + (created != null ? created.hashCode() : 0);
		result = 31 * result + (lastUpdated != null ? lastUpdated.hashCode() : 0);
		result = 31 * result + (isPublished != null ? isPublished.hashCode() : 0);
		return result;
	}
}
