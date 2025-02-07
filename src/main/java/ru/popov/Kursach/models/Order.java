package ru.popov.Kursach.models;

import jakarta.persistence.*;

import java.util.Date;

public class Order {
    private Integer id;
    private Date dateOfOrder;
    private Integer id_manager;
    private Integer id_provider;

    private String managerName;
    private String providerName;

    public Order() {
    }

    public Order(Date dateOfOrder, Integer id_manager, Integer id_provider) {
        this.dateOfOrder = dateOfOrder;
        this.id_manager = id_manager;
        this.id_provider = id_provider;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public Integer getId_manager() {
        return id_manager;
    }

    public void setId_manager(Integer id_manager) {
        this.id_manager = id_manager;
    }

    public Integer getId_provider() {
        return id_provider;
    }

    public void setId_provider(Integer id_provider) {
        this.id_provider = id_provider;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }
}
