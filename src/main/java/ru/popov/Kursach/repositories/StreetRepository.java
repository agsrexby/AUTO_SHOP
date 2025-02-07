package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.StreetInterface;
import ru.popov.Kursach.models.Street;

import java.util.List;
import java.util.Optional;

@Repository
public class StreetRepository implements StreetInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public StreetRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Street> countryRowMapper = (rs, rowNum) -> {
        Street street = new Street();
        street.setId(rs.getInt("id"));
        street.setName(rs.getString("name"));
        return street;
    };
    @Override
    public Optional<Street> findById(int id) {
        String sql = "SELECT * FROM \"street\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, countryRowMapper, id));
    }

    @Override
    public List<Street> findAll() {
        String sql = "SELECT * FROM \"street\"";
        return jdbcTemplate.query(sql, countryRowMapper);
    }

    @Override
    public void save(Street street) {
        String sql = "INSERT INTO \"street\" (name) " +
                "VALUES (?)";
        jdbcTemplate.update(
                sql,
                street.getName()
        );
    }

    @Override
    public void update(Street street, int id) {
        String sql = "UPDATE \"street\" SET name = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                street.getName(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"street\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}

