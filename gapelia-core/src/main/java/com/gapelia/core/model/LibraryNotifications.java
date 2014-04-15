package com.gapelia.core.model;

import java.sql.Date;
import java.sql.Timestamp;

public class LibraryNotifications {
    private int notificationId;
    private int recipientUserId;
    private int libraryId;
    private int senderUserId;
    private int bookId;
    private String message;
    private Timestamp dateSend;
    private Boolean accepted;
    private Boolean read;

    public int getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(int notificationId) {
        this.notificationId = notificationId;
    }

    public int getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(int recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public int getLibraryId() {
        return libraryId;
    }

    public void setLibraryId(int libraryId) {
        this.libraryId = libraryId;
    }

    public int getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(int senderUserId) {
        this.senderUserId = senderUserId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getMessage() { return message;}

    public void setMessage(String message) { this.message = message;}

    public Timestamp  getDateSend() {
        return dateSend;
    }

    public void setDateSend(Timestamp  dateSend) {
        this.dateSend = dateSend;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }
}
