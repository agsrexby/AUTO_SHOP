package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ManagerInterface;
import ru.popov.Kursach.models.Manager;

import java.util.List;
import java.util.Optional;

@Repository
public class ManagerRepository implements ManagerInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ManagerRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Manager> clientRowMapper = (rs, rowNum) -> {
        Manager manager = new Manager();
        manager.setId(rs.getInt("id"));
        manager.setLastname(rs.getString("lastname"));
        manager.setName(rs.getString("name"));
        manager.setPatronymic(rs.getString("patronymic"));
        return manager;
    };
    @Override
    public Optional<Manager> findById(int id) {
        String sql = "SELECT * FROM \"manager\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<Manager> findAll() {
        String sql = "SELECT * FROM \"manager\"";
        return jdbcTemplate.query(sql, clientRowMapper);
    }

    @Override
    public void save(Manager manager) {
        String sql = "INSERT INTO \"manager\" (lastname, name, patronymic) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                manager.getLastname(),
                manager.getName(),
                manager.getPatronymic()
        );
    }

    @Override
    public void update(Manager manager, int id) {
        String sql = "UPDATE \"manager\" SET lastname = ?, name = ?, patronymic = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                manager.getLastname(),
                manager.getName(),
                manager.getPatronymic(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"manager\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}

