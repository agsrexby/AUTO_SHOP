package ru.popov.Kursach.models;

import jakarta.persistence.*;

import java.util.Date;


public class Request {
    private Integer id;
    private Date dateOfRequest;
    private Integer id_client;
    private Integer id_manager;

    private String clientName;
    private String managerName;

    public Request() {
    }

    public Request(Date dateOfRequest, Integer id_client, Integer id_manager) {
        this.dateOfRequest = dateOfRequest;
        this.id_client = id_client;
        this.id_manager = id_manager;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateOfRequest() {
        return dateOfRequest;
    }

    public void setDateOfRequest(Date dateOfRequest) {
        this.dateOfRequest = dateOfRequest;
    }

    public Integer getId_client() {
        return id_client;
    }

    public void setId_client(Integer id_client) {
        this.id_client = id_client;
    }

    public Integer getId_manager() {
        return id_manager;
    }

    public void setId_manager(Integer id_manager) {
        this.id_manager = id_manager;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
}
