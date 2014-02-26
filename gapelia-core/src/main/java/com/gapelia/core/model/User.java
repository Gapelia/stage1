package com.gapelia.core.model;

import java.sql.Date;

public class User {
    private String userId;
    private String name;
    private String email;
    private String fullName;
    private Date dob;
    private String gender;
    private String location;
    private String avatarImage;
    private String coverImage;
    private String displayName;
    private String validateId;
    private String providerId;
    private String personalWebsite;
    private String bio;
    private String [] tags;
    private String fb;
    private String gp;
    private String twt;
    private Date memeberSince;
    private Date lastLogin;
    private Date lastUpdated;
    private Boolean isPublic;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvatarImage() {
        return  avatarImage;
    }

    public void setAvatarImage(String avatarImage) {
        this.avatarImage = avatarImage;
    }

    public String getCoverImage() {
        return  coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getValidateId() {
        return validateId;
    }

    public void setValidateId(String validateId) {
        this.validateId = validateId;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getPersonalWebsite() {
        return personalWebsite;
    }

    public void setPersonalWebsite(String personalWebsite) {
        this.personalWebsite = personalWebsite;
    }

    public String getBio() {
        return  bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String [] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public String getFb() {
        return fb;
    }

    public void setFb(String fb) {
        this.fb = fb;
    }

    public String getGp() {
        return gp;
    }

    public void setGp(String gp) {
        this.gp = gp;
    }

    public String getTwt() {
        return twt;
    }

    public void setTwt(String twt) {
        this.twt = twt;
    }

    public Date getMemeberSince() {
        return memeberSince;
    }

    public void setMemeberSince(Date memeberSince) {
        this.memeberSince = memeberSince;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }
}
