import com.example.oblig3ny.Oblig3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.List;

@Repository
public class Oblig3Repository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addBestilling(Oblig3 billett) {
        String sql = "INSERT INTO Billett (film, antall,fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        jdbcTemplate.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonNr(), billett.getEpost());
    }

    public List<Oblig3> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper(Oblig3.class));
    }

    public void slettBestillinger() {
        String sql = "DELETE FROM Billett";
        jdbcTemplate.update(sql);
    }
}


