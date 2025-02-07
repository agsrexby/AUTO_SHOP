package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ItemInRequestInterface;
import ru.popov.Kursach.models.ItemInRequest;

import java.util.List;
import java.util.Optional;

@Repository

public class ItemInRequestRepository implements ItemInRequestInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ItemInRequestRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<ItemInRequest> clientRowMapper = (rs, rowNum) -> {
        ItemInRequest itemInRequest = new ItemInRequest();
        itemInRequest.setId(rs.getInt("id"));
        itemInRequest.setId_request(rs.getInt("id_request"));
        itemInRequest.setId_item(rs.getInt("id_item"));
        itemInRequest.setCount(rs.getInt("count"));
        return itemInRequest;
    };

    private static final RowMapper<ItemInRequest> clientRowMapperupd = (rs, rowNum) -> {
        ItemInRequest itemInRequest = new ItemInRequest();
        itemInRequest.setId(rs.getInt("id"));
        itemInRequest.setId_request(rs.getInt("id_request"));
        itemInRequest.setName(rs.getString("name"));
        itemInRequest.setCount(rs.getInt("count"));
        return itemInRequest;
    };

    @Override
    public Optional<ItemInRequest> findById(int id) {
        String sql = "SELECT * FROM \"item_in_request\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<ItemInRequest> findAll() {
        String sql = "select item_in_request.id, id_request, item.name, count from item_in_request " +
                "join item on item.id = item_in_request.id_item";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(ItemInRequest itemInRequest) {
        String sql = "INSERT INTO \"item_in_request\" (id_request, id_item, count) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                itemInRequest.getId_request(),
                itemInRequest.getId_item(),
                itemInRequest.getCount()
        );
    }

    @Override
    public void update(ItemInRequest itemInRequest, int id) {
        String sql = "UPDATE \"item_in_request\" SET id_request = ?, id_item = ?, count = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                itemInRequest.getId_request(),
                itemInRequest.getId_item(),
                itemInRequest.getCount(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"item_in_request\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}


