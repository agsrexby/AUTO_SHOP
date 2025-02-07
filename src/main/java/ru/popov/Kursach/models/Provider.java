package ru.popov.Kursach.models;

import jakarta.persistence.*;
import jdk.jfr.Category;


public class Provider {
    private Integer id;
    private String name;

    private Categorys category;

    private String lastnameDerector;

    private String nameDerector;

    private String patronynicDerector;
    private String phoneNumber;

    private String numberOfHome;

    private Integer id_country;

    private Integer id_city;

    private Integer id_street;
    private String country;
    private String city;
    private String street;

    public Provider() {
    }

    public Provider(String name, Categorys category, String lastnameDerector, String nameDerector, String patronynicDerector, String phoneNumber, String numberOfHome, Integer id_country, Integer id_city, Integer id_street) {
        this.name = name;
        this.category = category;
        this.lastnameDerector = lastnameDerector;
        this.nameDerector = nameDerector;
        this.patronynicDerector = patronynicDerector;
        this.phoneNumber = phoneNumber;
        this.numberOfHome = numberOfHome;
        this.id_country = id_country;
        this.id_city = id_city;
        this.id_street = id_street;
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

    public Categorys getCategory() {
        return category;
    }
    public void setCategory(Categorys category){this.category = category;}

    public String getLastnameDerector() {
        return lastnameDerector;
    }

    public void setLastnameDerector(String lastnameDerector) {
        this.lastnameDerector = lastnameDerector;
    }

    public String getNameDerector() {
        return nameDerector;
    }

    public void setNameDerector(String nameDerector) {
        this.nameDerector = nameDerector;
    }

    public String getPatronynicDerector() {
        return patronynicDerector;
    }

    public void setPatronynicDerector(String patronynicDerector) {
        this.patronynicDerector = patronynicDerector;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNumberOfHome() {
        return numberOfHome;
    }

    public void setNumberOfHome(String numberOfHome) {
        this.numberOfHome = numberOfHome;
    }

    public Integer getId_country() {
        return id_country;
    }

    public void setId_country(Integer id_country) {
        this.id_country = id_country;
    }

    public Integer getId_city() {
        return id_city;
    }

    public void setId_city(Integer id_city) {
        this.id_city = id_city;
    }

    public Integer getId_street() {
        return id_street;
    }

    public void setId_street(Integer id_street) {
        this.id_street = id_street;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

}
