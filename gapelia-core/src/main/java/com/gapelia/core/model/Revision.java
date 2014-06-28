package com.gapelia.core.model;

import java.util.Date;

public class Revision {
	private int id;
	private int revisionBookId;
	private int bookId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	private Date created;

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}


	public int getRevisionBookId() {
		return revisionBookId;
	}

	public void setRevisionBookId(int revisionBookId) {
		this.revisionBookId = revisionBookId;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public Revision(){}
}
