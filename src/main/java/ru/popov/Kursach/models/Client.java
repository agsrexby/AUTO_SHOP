package ru.popov.Kursach.models;

import jakarta.persistence.*;

public class Client {

    private Integer id;
    private String lastname;
    private String name;
    private String patronynic;
    private Integer id_counry;
    private Integer id_city;
    private Integer id_street;
    private String country;
    private String city;
    private String street;
    private String number_of_home;

    public Client() {
    }

    public Client(String lastname, String name, String patronynic, Integer id_counry, Integer id_city, Integer id_street, String number_of_home) {
        this.lastname = lastname;
        this.name = name;
        this.patronynic = patronynic;
        this.id_counry = id_counry;
        this.id_city = id_city;
        this.id_street = id_street;
        this.number_of_home = number_of_home;
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

    public String getPatronynic() {
        return patronynic;
    }

    public void setPatronynic(String patronynic) {
        this.patronynic = patronynic;
    }

    public Integer getId_counry() {
        return id_counry;
    }

    public void setId_counry(Integer id_counry) {
        this.id_counry = id_counry;
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

    public String getNumber_of_home() {
        return number_of_home;
    }

    public void setNumber_of_home(String number_of_home) {
        this.number_of_home = number_of_home;
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
