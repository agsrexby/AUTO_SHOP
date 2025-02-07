package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.CountryInterface;
import ru.popov.Kursach.models.Country;

import java.util.List;
import java.util.Optional;

@Repository
public class CountryRepository implements CountryInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public CountryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Country> countryRowMapper = (rs, rowNum) -> {
        Country country = new Country();
        country.setId(rs.getInt("id"));
        country.setName(rs.getString("name"));
        return country;
    };
    @Override
    public Optional<Country> findById(int id) {
        String sql = "SELECT * FROM \"country\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, countryRowMapper, id));
    }

    @Override
    public List<Country> findAll() {
        String sql = "SELECT * FROM \"country\"";
        return jdbcTemplate.query(sql, countryRowMapper);
    }

    @Override
    public void save(Country country) {
        String sql = "INSERT INTO \"country\" (name) " +
                "VALUES (?)";
        jdbcTemplate.update(
                sql,
                country.getName()
        );
    }

    @Override
    public void update(Country country, int id) {
        String sql = "UPDATE \"country\" SET name = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                country.getName(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"country\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}

