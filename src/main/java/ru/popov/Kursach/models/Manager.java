package ru.popov.Kursach.models;

import jakarta.persistence.*;


public class Manager {

    private Integer id;

    private String lastname;

    private String name;
    private String patronymic;

    public Manager() {
    }

    public Manager(String lastname, String name, String patronymic) {
        this.lastname = lastname;
        this.name = name;
        this.patronymic = patronymic;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }
}
