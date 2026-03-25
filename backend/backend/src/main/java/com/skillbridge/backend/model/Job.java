package com.skillbridge.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "skill_required")
    @JsonProperty("skillRequired")
    private String skillRequired;

    @Column(name = "location")
    private String location;

    @Column(name = "budget")
    private String budget;

    @Column(name = "hirer_id")
    @JsonProperty("hirerId")
    private int hirerId;

    public Job() {
    }

    public Job(String title, String skillRequired, String location, String budget, int hirerId) {
        this.title = title;
        this.skillRequired = skillRequired;
        this.location = location;
        this.budget = budget;
        this.hirerId = hirerId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSkillRequired() {
        return skillRequired;
    }

    public void setSkillRequired(String skillRequired) {
        this.skillRequired = skillRequired;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public int getHirerId() {
        return hirerId;
    }

    public void setHirerId(int hirerId) {
        this.hirerId = hirerId;
    }
}