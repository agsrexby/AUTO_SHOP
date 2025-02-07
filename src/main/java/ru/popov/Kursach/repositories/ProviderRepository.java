package ru.popov.Kursach.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import ru.popov.Kursach.interfaces.ProviderInterface;
import ru.popov.Kursach.models.Categorys;
import ru.popov.Kursach.models.Provider;

import java.util.List;
import java.util.Optional;


@Repository
public class ProviderRepository implements ProviderInterface {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ProviderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private static final RowMapper<Provider> countryRowMapper = (rs, rowNum) -> {
        Provider provider = new Provider();
        provider.setId(rs.getInt("id"));
        provider.setName(rs.getString("name"));

        String categoryString = rs.getString("category").toUpperCase().replace(" ", "_");
        provider.setCategory(Categorys.valueOf(categoryString));

        provider.setLastnameDerector(rs.getString("lastname_derector"));
        provider.setNameDerector(rs.getString("name_derector"));
        provider.setPatronynicDerector(rs.getString("patronynic_derector"));
        provider.setPhoneNumber(rs.getString("phone_number"));
        provider.setNumberOfHome(rs.getString("number_of_home"));
        provider.setId_country(rs.getInt("id_country"));
        provider.setId_city(rs.getInt("id_city"));
        provider.setId_street(rs.getInt("id_street"));
        return provider;
    };

    private static final RowMapper<Provider> countryRowMapperupd = (rs, rowNum) -> {
        Provider provider = new Provider();
        provider.setId(rs.getInt("id"));
        provider.setName(rs.getString("name"));

        String categoryString = rs.getString("category").toUpperCase().replace(" ", "_");
        provider.setCategory(Categorys.valueOf(categoryString));

        provider.setLastnameDerector(rs.getString("lastname_derector"));
        provider.setNameDerector(rs.getString("name_derector"));
        provider.setPatronynicDerector(rs.getString("patronynic_derector"));
        provider.setPhoneNumber(rs.getString("phone_number"));
        provider.setNumberOfHome(rs.getString("number_of_home"));
        provider.setCountry(rs.getString("country"));
        provider.setCity(rs.getString("city"));
        provider.setStreet(rs.getString("street"));
        return provider;
    };

    @Override
    public Optional<Provider> findById(int id) {
        String sql = "SELECT * FROM \"provider\" WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, countryRowMapper, id));
    }

    @Override
    public List<Provider> findAll() {
        String sql = "select provider.id, provider.name, provider.category, provider.lastname_derector, provider.name_derector, provider.patronynic_derector, provider.phone_number, provider.number_of_home, country.name as country, city.name as city, street.name as street " +
                "from provider " +
                "join country on provider.id_country = country.id " +
                "join city on provider.id_city = city.id " +
                "join street on provider.id_street = street.id";
        return jdbcTemplate.query(sql, countryRowMapperupd);
    }

    @Override
    public void save(Provider provider) {
        String sql = "INSERT INTO \"provider\" (name, category, lastname_derector, name_derector, patronynic_derector, phone_number, number_of_home, id_country, id_city, id_street) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                provider.getName(),
                provider.getCategory(),
                provider.getLastnameDerector(),
                provider.getNameDerector(),
                provider.getPatronynicDerector(),
                provider.getPhoneNumber(),
                provider.getNumberOfHome(),
                provider.getId_country(),
                provider.getId_city(),
                provider.getId_street()
        );
    }

    @Override
    public void update(Provider provider, int id) {
        String sql = "UPDATE \"provider\" SET name = ?, category = ?, lastname_derector = ?, name_derector = ?, patronynic_derector = ?, phone_number = ?, number_of_home = ?, id_country = ?, id_city = ?, id_street = ?" +
                " WHERE id = ?";
        jdbcTemplate.update(
                sql,
                provider.getName(),
                provider.getCategory(),
                provider.getLastnameDerector(),
                provider.getNameDerector(),
                provider.getPatronynicDerector(),
                provider.getPhoneNumber(),
                provider.getNumberOfHome(),
                provider.getId_country(),
                provider.getId_city(),
                provider.getId_street(),
                id
        );
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM \"provider\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}