package com.gapelia.core.model;

import java.sql.Date;
import java.sql.Timestamp;

public class LibraryNotifications {
    private int recipientUserId;
    private int libraryId;
    private int senderUserID;
    private int bookId;
    private Timestamp dateSend;
    private Boolean accepted;

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

    public int getSenderUserID() {
        return senderUserID;
    }

    public void setSenderUserID(int senderUserID) {
        this.senderUserID = senderUserID;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

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
}
