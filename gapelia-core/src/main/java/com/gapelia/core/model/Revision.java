package com.gapelia.core.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;

public class Revision {
	private int revisionId;
	private int bookId;

	private Timestamp created;

	private ArrayList<Page> pages;


	public int getRevisionId() {
		return revisionId;
	}

	public void setRevisionId(int revisionId) {
		this.revisionId = revisionId;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

	public ArrayList<Page> getPages() {
		return pages;
	}

	public void setPages(ArrayList<Page> pages) {
		this.pages = pages;
	}
	public Revision(){
		pages = new ArrayList<Page>();
	}
}
