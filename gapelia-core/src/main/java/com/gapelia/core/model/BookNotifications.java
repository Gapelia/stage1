package com.gapelia.core.model;

import java.sql.Date;
import java.sql.Timestamp;

public class BookNotifications {
    private int recipientUserId;
    private int bookId;
    private int senderUserId;
    private Timestamp dateSend;
    private Boolean accepted;

    public int getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(int recipientUserId) {
        this.recipientUserId = recipientUserId;
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
