package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.CityInterface;
import ru.popov.Kursach.models.City;

import java.util.List;
import java.util.Optional;

@Repository
public class CityRepository implements CityInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public CityRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<City> clientRowMapper = (rs, rowNum) -> {
        City city = new City();
        city.setId(rs.getInt("id"));
        city.setName(rs.getString("name"));
        return city;
    };
    @Override
    public Optional<City> findById(int id) {
        String sql = "SELECT * FROM \"city\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<City> findAll() {
        String sql = "SELECT * FROM \"city\"";
        return jdbcTemplate.query(sql, clientRowMapper);
    }

    @Override
    public void save(City city) {
        String sql = "INSERT INTO \"city\" (name) " +
                "VALUES (?)";
        jdbcTemplate.update(
                sql,
                city.getName());
    }

    @Override
    public void update(City city, int id) {
        String sql = "UPDATE \"city\" SET name = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                city.getName(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"city\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
