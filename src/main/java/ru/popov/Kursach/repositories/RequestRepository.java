package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.RequestInterface;
import ru.popov.Kursach.models.Request;

import java.util.List;
import java.util.Optional;

@Repository
public class RequestRepository implements RequestInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public RequestRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Request> countryRowMapper = (rs, rowNum) -> {
        Request request = new Request();
        request.setId(rs.getInt("id"));
        request.setDateOfRequest(rs.getDate("date_of_request"));
        request.setId_client(rs.getInt("id_client"));
        request.setId_manager(rs.getInt("id_manager"));
        return request;
    };

    private static final RowMapper<Request> countryRowMapperupd = (rs, rowNum) -> {
        Request request = new Request();
        request.setId(rs.getInt("id"));
        request.setDateOfRequest(rs.getDate("date_of_request"));
        request.setClientName(rs.getString("clientName"));
        request.setManagerName(rs.getString("managerName"));
        return request;
    };

    @Override
    public Optional<Request> findById(int id) {
        String sql = "SELECT * FROM \"request\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, countryRowMapper, id));
    }

    @Override
    public List<Request> findAll() {
        String sql = "select request.id, request.date_of_request,client.name as clientName, manager.name as managerName " +
                "from request " +
                "join client on request.id_client = client.id " +
                "join manager on request.id_manager = manager.id";
        return jdbcTemplate.query(sql, countryRowMapperupd);
    }

    @Override
    public void save(Request request) {
        String sql = "INSERT INTO \"request\" (date_of_request, id_client, id_manager) " +
                "VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getDateOfRequest(),
                request.getId_client(),
                request.getId_manager()
        );
    }

    @Override
    public void update(Request request, int id) {
        String sql = "UPDATE \"request\" SET date_of_request = ?, id_client = ?, id_manager = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                request.getDateOfRequest(),
                request.getId_client(),
                request.getId_manager(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"request\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
