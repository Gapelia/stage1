package com.gapelia.core.model;
import java.sql.Timestamp;

public class  SystemNotifications {

    private int recipientUserId;
    private int senderUserID;
    private String message;
    private Timestamp dateSend;

    public int getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(int recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public int getSenderUserID() {
        return senderUserID;
    }

    public void setSenderUserID(int senderUserID) {
        this.senderUserID = senderUserID;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp  getDateSend() {
        return dateSend;
    }

    public void setDateSend(Timestamp  dateSend) {
        this.dateSend = dateSend;
    }
}

