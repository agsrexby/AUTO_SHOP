package ru.popov.Kursach.models;

import jakarta.persistence.*;

public class ItemInOrder {
    private Integer id;
    private Integer id_order;
    private Integer id_item;
    private String name;
    private Integer count;

    public ItemInOrder() {
    }

    public ItemInOrder(Integer id_order, Integer id_item, Integer count) {
        this.id_order = id_order;
        this.id_item = id_item;
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_order() {
        return id_order;
    }

    public void setId_order(Integer id_order) {
        this.id_order = id_order;
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
