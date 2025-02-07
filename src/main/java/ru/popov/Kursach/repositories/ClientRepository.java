package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ClientInterface;
import ru.popov.Kursach.models.Client;

import java.util.List;
import java.util.Optional;

@Repository
public class ClientRepository implements ClientInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ClientRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Client> clientRowMapper = (rs, rowNum) -> {
        Client client = new Client();
        client.setId(rs.getInt("id"));
        client.setLastname(rs.getString("lastname"));
        client.setName(rs.getString("name"));
        client.setPatronynic(rs.getString("patronynic"));
        client.setId_counry(rs.getInt("id_counry"));
        client.setId_city(rs.getInt("id_city"));
        client.setId_street(rs.getInt("id_street"));
        client.setNumber_of_home(rs.getString("number_of_home"));
        return client;
    };

    private static final RowMapper<Client> clientRowMapperupd = (rs, rowNum) -> {
        Client client = new Client();
        client.setId(rs.getInt("id"));
        client.setLastname(rs.getString("lastname"));
        client.setName(rs.getString("name"));
        client.setPatronynic(rs.getString("patronynic"));
        client.setCountry(rs.getString("country"));
        client.setCity(rs.getString("city"));
        client.setStreet(rs.getString("street"));
        client.setNumber_of_home(rs.getString("number_of_home"));
        return client;
    };

    @Override
    public Optional<Client> findById(int id) {
        String sql = "SELECT * FROM \"client\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, clientRowMapper, id));
    }

    @Override
    public List<Client> findAll() {
        String sql = "select client.id, client.lastname, client.name, client.patronynic, country.name as country, city.name as city, street.name as street, client.number_of_home from client " +
                "join country on client.id_counry = country.id " +
                "join city on client.id_city = city.id " +
                "join street on client.id_street = street.id";
        return jdbcTemplate.query(sql, clientRowMapperupd);
    }

    @Override
    public void save(Client client) {
        String sql = "INSERT INTO \"client\" (lastname, name, patronynic, id_counry, id_city, id_street, number_of_home) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                client.getLastname(),
                client.getName(),
                client.getPatronynic(),
                client.getId_counry(),
                client.getId_city(),
                client.getId_street(),
                client.getNumber_of_home()
        );
    }

    @Override
    public void update(Client client, int id) {
        String sql = "UPDATE \"client\" SET lastname = ?, name = ?, patronynic = ?, id_counry = ?, id_city = ?, id_street = ?, number_of_home = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                client.getLastname(),
                client.getName(),
                client.getPatronynic(),
                client.getId_counry(),
                client.getId_city(),
                client.getId_street(),
                client.getNumber_of_home(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"client\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
