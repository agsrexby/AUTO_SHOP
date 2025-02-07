package ru.popov.Kursach.models;

import jakarta.persistence.*;


public class Item {
    private Integer id;
    private String name;
    private Integer caseOfItem;
    private Float cost;

    public Item() {
    }

    public Item(String name, Integer caseOfItem, Float cost) {
        this.name = name;
        this.caseOfItem = caseOfItem;
        this.cost = cost;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCaseOfItem() {
        return caseOfItem;
    }

    public void setCaseOfItem(Integer caseOfItem) {
        this.caseOfItem = caseOfItem;
    }

    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }
}
