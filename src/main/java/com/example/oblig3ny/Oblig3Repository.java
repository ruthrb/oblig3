package com.example.oblig3ny;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class Oblig3Repository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private JdbcTemplate db;

    public void lagreOblig3(Oblig3 innOblig3) {
        String sql = "INSERT INTO Billett (film, antall,fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innOblig3.getFilm(), innOblig3.getAntall(), innOblig3.getFornavn(), innOblig3.getEtternavn(), innOblig3.getTelefonNr(), innOblig3.getEpost());
    }

    public List<Oblig3> hentAlleBilletter() {
        String sql = "SELECT * FROM Oblig3";
        List<Oblig3> alleKunder=db.query(sql, new BeanPropertyRowMapper(Oblig3.class));
        alleKunder.sort(new Oblig3Comparator());
        return alleKunder;
    }

    public void slettAlleBillettene() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}


