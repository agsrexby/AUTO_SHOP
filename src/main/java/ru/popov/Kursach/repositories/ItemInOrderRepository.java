package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ItemInOrderInterface;
import ru.popov.Kursach.models.Item;
import ru.popov.Kursach.models.ItemInOrder;

import java.util.List;
import java.util.Optional;

@Repository
public class ItemInOrderRepository implements ItemInOrderInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ItemInOrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<ItemInOrder> clientRowMapper = (rs, rowNum) -> {
        ItemInOrder itemInOrder = new ItemInOrder();
        itemInOrder.setId(rs.getInt("id"));
        itemInOrder.setId_order(rs.getInt("id_order"));
        itemInOrder.setId_item(rs.getInt("id_item"));
        itemInOrder.setCount(rs.getInt("count"));
        return itemInOrder;
    };

    private static final RowMapper<ItemInOrder> clientRowMapperupd = (rs, rowNum) -> {
        ItemInOrder itemInOrder = new ItemInOrder();
        itemInOrder.setId(rs.getInt("id"));
        itemInOrder.setId_order(rs.getInt("id_order"));
        itemInOrder.setName(rs.getString("name"));
        itemInOrder.setCount(rs.getInt("count"));
        return itemInOrder;
    };

    @Override
    public Optional<ItemInOrder> findById(int id) {
        String sql = "SELECT * FROM \"item_in_order\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<ItemInOrder> findAll() {
        String sql = "select item_in_order.id, id_order, item.name, count from item_in_order " +
                "join item on item.id = item_in_order.id_item";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(ItemInOrder itemInOrder) {
        String sql = "INSERT INTO \"item_in_order\" (id_order, id_item, count) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                itemInOrder.getId_order(),
                itemInOrder.getId_item(),
                itemInOrder.getCount()
        );
    }

    @Override
    public void update(ItemInOrder itemInOrder, int id) {
        String sql = "UPDATE \"item_in_order\" SET id_order = ?, id_item = ?, count = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                itemInOrder.getId_order(),
                itemInOrder.getId_item(),
                itemInOrder.getCount(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"item_in_order\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}

