package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ItemInterface;
import ru.popov.Kursach.models.Item;

import java.util.List;
import java.util.Optional;

@Repository
public class ItemRepository implements ItemInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Item> clientRowMapper = (rs, rowNum) -> {
        Item item = new Item();
        item.setId(rs.getInt("id"));
        item.setName(rs.getString("name"));
        item.setCaseOfItem(rs.getInt("case_of_item"));
        item.setCost(rs.getFloat("cost"));
        return item;
    };
    @Override
    public Optional<Item> findById(int id) {
        String sql = "SELECT * FROM \"item\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<Item> findAll() {
        String sql = "SELECT * FROM \"item\"";
        return jdbcTemplate.query(sql, clientRowMapper);
    }

    @Override
    public void save(Item item) {
        String sql = "INSERT INTO \"item\" (name, case_of_item, cost) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                item.getName(),
                item.getCaseOfItem(),
                item.getCost()
        );
    }

    @Override
    public void update(Item item, int id) {
        String sql = "UPDATE \"item\" SET name = ?, case_of_item = ?, cost = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                item.getName(),
                item.getCaseOfItem(),
                item.getCost(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"item\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}



