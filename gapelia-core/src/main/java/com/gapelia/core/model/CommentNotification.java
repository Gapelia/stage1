package com.gapelia.core.model;

import java.sql.Timestamp;

public class CommentNotification {
	private int pendingId;
	private int commenterUserId;
	private int referencedBookId;
	private int commentId;
	private String hash;
	private String type;
	private String comment;
	private Timestamp time;
	private boolean bookOwnedByMe;

	public boolean isBookOwnedByMe() {
		return bookOwnedByMe;
	}

	public void setBookOwnedByMe(boolean bookOwnedByMe) {
		this.bookOwnedByMe = bookOwnedByMe;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}


	public int getPendingId() {
		return pendingId;
	}

	public void setPendingId(int pendingId) {
		this.pendingId = pendingId;
	}

	public int getCommenterUserId() {
		return commenterUserId;
	}

	public void setCommenterUserId(int commenterUserId) {
		this.commenterUserId = commenterUserId;
	}

	public int getReferencedBookId() {
		return referencedBookId;
	}

	public void setReferencedBookId(int referencedBookId) {
		this.referencedBookId = referencedBookId;
	}

}
