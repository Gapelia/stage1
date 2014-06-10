package com.gapelia.core.model;

public class CommentNotification {
    private int notificationId;
    private int commenterUserId;
    private int referencedBookId;

    public int getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(int notificationId) {
        this.notificationId = notificationId;
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
