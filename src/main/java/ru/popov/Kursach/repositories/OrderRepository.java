package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.OrderInterface;
import ru.popov.Kursach.models.Order;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository implements OrderInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Order> clientRowMapper = (rs, rowNum) -> {
        Order order = new Order();
        order.setId(rs.getInt("id"));
        order.setDateOfOrder(rs.getDate("date_of_order"));
        order.setId_manager(rs.getInt("id_manager"));
        order.setId_provider(rs.getInt("id_provider"));
        return order;
    };

    private static final RowMapper<Order> clientRowMapperupd = (rs, rowNum) -> {
        Order order = new Order();
        order.setId(rs.getInt("id"));
        order.setDateOfOrder(rs.getDate("date_of_order"));
        order.setManagerName(rs.getString("managerName"));
        order.setProviderName(rs.getString("providerName"));
        return order;
    };

    @Override
    public Optional<Order> findById(int id) {
        String sql = "SELECT * FROM \"order\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<Order> findAll() {
        String sql = "select \"order\".id, \"order\".date_of_order, manager.name as managerName,provider.name as providerName " +
                "from \"order\" " +
                "join manager on \"order\".id_manager = manager.id " +
                "join provider on \"order\".id_provider = provider.id";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(Order order) {
        String sql = "INSERT INTO \"order\" (date_of_order, id_manager, id_provider) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                order.getDateOfOrder(),
                order.getId_manager(),
                order.getId_provider());
    }

    @Override
    public void update(Order order, int id) {
        String sql = "UPDATE \"order\" SET date_of_order = ?, id_manager = ?, id_provider = ? " +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                order.getDateOfOrder(),
                order.getId_manager(),
                order.getId_provider(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"order\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
