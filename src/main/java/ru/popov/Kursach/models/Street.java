package ru.popov.Kursach.models;

import jakarta.persistence.*;

public class Street {
    private Integer id;
    private String name;

    public Street() {
    }

    public Street(String name) {
        this.name = name;
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
}
