package ru.popov.Kursach.models;

import jakarta.persistence.*;

public class ItemInRequest {

    private Integer id;
    private Integer id_request;
    private Integer id_item;
    private String name;
    private Integer count;

    public ItemInRequest() {
    }

    public ItemInRequest(Integer id_request, Integer id_item, Integer count) {
        this.id_request = id_request;
        this.id_item = id_item;
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_request() {
        return id_request;
    }

    public void setId_request(Integer id_request) {
        this.id_request = id_request;
    }

    public Integer getId_item() {
        return id_item;
    }

    public void setId_item(Integer id_item) {
        this.id_item = id_item;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
