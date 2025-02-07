package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ManufacturerInterface;
import ru.popov.Kursach.models.Manufacturer;

import java.util.List;
import java.util.Optional;

@Repository
public class ManufacturerRepository implements ManufacturerInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ManufacturerRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Manufacturer> clientRowMapper = (rs, rowNum) -> {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setId(rs.getInt("id"));
        manufacturer.setName(rs.getString("name"));
        manufacturer.setNumberOfHome(rs.getString("number_of_home"));
        manufacturer.setId_street(rs.getInt("id_street"));
        manufacturer.setId_city(rs.getInt("id_city"));
        manufacturer.setId_country(rs.getInt("id_country"));
        return manufacturer;
    };

    private static final RowMapper<Manufacturer> clientRowMapperupd = (rs, rowNum) -> {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setId(rs.getInt("id"));
        manufacturer.setName(rs.getString("name"));
        manufacturer.setNumberOfHome(rs.getString("number_of_home"));
        manufacturer.setStreet(rs.getString("street"));
        manufacturer.setCity(rs.getString("city"));
        manufacturer.setCountry(rs.getString("country"));
        return manufacturer;
    };

    @Override
    public Optional<Manufacturer> findById(int id) {
        String sql = "SELECT * FROM \"manufacturer\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<Manufacturer> findAll() {
        String sql = "select manufacturer.id, manufacturer.name, manufacturer.number_of_home, street.name as street, city.name as city, country.name as country " +
                "from manufacturer " +
                "join street on manufacturer.id_street = street.id " +
                "join city on manufacturer.id_city = city.id " +
                "join country on manufacturer.id_country = country.id";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(Manufacturer manufacturer) {
        String sql = "INSERT INTO \"manufacturer\" (name, number_of_home, id_street, id_city, id_country) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                manufacturer.getName(),
                manufacturer.getNumberOfHome(),
                manufacturer.getId_street(),
                manufacturer.getId_city(),
                manufacturer.getId_country()
        );
    }

    @Override
    public void update(Manufacturer manufacturer, int id) {
        String sql = "UPDATE \"manufacturer\" SET name = ?, number_of_home = ?, id_street = ?, id_city = ?, id_country = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                manufacturer.getName(),
                manufacturer.getNumberOfHome(),
                manufacturer.getId_street(),
                manufacturer.getId_city(),
                manufacturer.getId_country(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"manufacturer\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}


