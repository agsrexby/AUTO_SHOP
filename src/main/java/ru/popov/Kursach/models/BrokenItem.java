package ru.popov.Kursach.models;

import jakarta.persistence.*;

import java.util.Date;

public class BrokenItem {
    private Integer id;
    private Date dateOfFind;
    private String info;
    private Integer id_item;

    private Integer id_manufacturer;

    private Integer id_provider;

    private String itemName;
    private String manufacturerName;
    private String providerName;

    public BrokenItem() {
    }

    public BrokenItem(Date dateOfFind, String info, Integer id_item, Integer id_manufacturer, Integer id_provider) {
        this.dateOfFind = dateOfFind;
        this.info = info;
        this.id_item = id_item;
        this.id_manufacturer = id_manufacturer;
        this.id_provider = id_provider;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateOfFind() {
        return dateOfFind;
    }

    public void setDateOfFind(Date dateOfFind) {
        this.dateOfFind = dateOfFind;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Integer getId_item() {
        return id_item;
    }

    public void setId_item(Integer id_item) {
        this.id_item = id_item;
    }

    public Integer getId_manufacturer() {
        return id_manufacturer;
    }

    public void setId_manufacturer(Integer id_manufacturer) {
        this.id_manufacturer = id_manufacturer;
    }

    public Integer getId_provider() {
        return id_provider;
    }

    public void setId_provider(Integer id_provider) {
        this.id_provider = id_provider;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

}
