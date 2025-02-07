package ru.popov.Kursach.models;

import jakarta.persistence.*;


public class Manufacturer {

    private Integer id;
    private String name;
    private String numberOfHome;
    private Integer id_street;
    private Integer id_city;
    private Integer id_country;

    private String street;
    private String city;
    private String country;

    public Manufacturer() {
    }

    public Manufacturer(String name, String numberOfHome, Integer id_street, Integer id_city, Integer id_country) {
        this.name = name;
        this.numberOfHome = numberOfHome;
        this.id_street = id_street;
        this.id_city = id_city;
        this.id_country = id_country;
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

    public String getNumberOfHome() {
        return numberOfHome;
    }

    public void setNumberOfHome(String numberOfHome) {
        this.numberOfHome = numberOfHome;
    }

    public Integer getId_street() {
        return id_street;
    }

    public void setId_street(Integer id_street) {
        this.id_street = id_street;
    }

    public Integer getId_city() {
        return id_city;
    }

    public void setId_city(Integer id_city) {
        this.id_city = id_city;
    }

    public Integer getId_country() {
        return id_country;
    }

    public void setId_country(Integer id_country) {
        this.id_country = id_country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
