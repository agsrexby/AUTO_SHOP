package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.BrokenItemInterface;
import ru.popov.Kursach.models.BrokenItem;
import ru.popov.Kursach.models.Order;

import java.util.List;
import java.util.Optional;

@Repository
public class BrokenItemRepository implements BrokenItemInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public BrokenItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<BrokenItem> clientRowMapper = (rs, rowNum) -> {
        BrokenItem brokenItem = new BrokenItem();
        brokenItem.setId(rs.getInt("id"));
        brokenItem.setDateOfFind(rs.getDate("date_of_find"));
        brokenItem.setInfo(rs.getString("info"));
        brokenItem.setId_item(rs.getInt("id_item"));
        brokenItem.setId_manufacturer(rs.getInt("id_manufacturer"));
        brokenItem.setId_provider(rs.getInt("id_provider"));
        return brokenItem;
    };

    private static final RowMapper<BrokenItem> clientRowMapperupd = (rs, rowNum) -> {
        BrokenItem brokenItem = new BrokenItem();
        brokenItem.setId(rs.getInt("id"));
        brokenItem.setDateOfFind(rs.getDate("date_of_find"));
        brokenItem.setInfo(rs.getString("info"));
        brokenItem.setItemName(rs.getString("itemName"));
        brokenItem.setManufacturerName(rs.getString("manufacturerName"));
        brokenItem.setProviderName(rs.getString("providerName"));
        return brokenItem;
    };

    @Override
    public Optional<BrokenItem> findById(int id) {
        String sql = "SELECT * FROM \"broken_item\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<BrokenItem> findAll() {
        String sql = "select broken_item.id, broken_item.date_of_find, broken_item.info, item.name as itemName, manufacturer.name as manufacturerName, provider.name as providerName " +
                "from broken_item " +
                "join item on broken_item.id_item = item.id " +
                "join manufacturer on broken_item.id_manufacturer = manufacturer.id " +
                "join provider on broken_item.id_provider = provider.id";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(BrokenItem brokenItem) {
        String sql = "INSERT INTO \"broken_item\" (date_of_find, info, id_item, id_manufacturer ,id_provider) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                brokenItem.getDateOfFind(),
                brokenItem.getInfo(),
                brokenItem.getId_item(),
                brokenItem.getId_manufacturer(),
                brokenItem.getId_provider()
        );
    }

    @Override
    public void update(BrokenItem brokenItem, int id) {
        String sql = "UPDATE \"broken_item\" SET date_of_find = ?, info = ? ,id_item = ?, id_manufacturer = ?,id_provider = ? " +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                brokenItem.getDateOfFind(),
                brokenItem.getInfo(),
                brokenItem.getId_item(),
                brokenItem.getId_manufacturer(),
                brokenItem.getId_provider(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"broken_item\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
