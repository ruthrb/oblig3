import com.example.oblig3ny.Oblig3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public class Oblig3Repository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void lagreBillett(Oblig3 innOblig3) {
        String sql = "INSERT INTO BILLETT (film, antall,fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        jdbcTemplate.update(sql, innOblig3.getFilm(), innOblig3.getAntall(), innOblig3.getFornavn(), innOblig3.getEtternavn(), innOblig3.getTelefonNr(), innOblig3.getEpost());
    }

    public List<Oblig3> hentAlle() {
        String sql = "SELECT * FROM Billett";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper(Oblig3.class));
    }

    public void slettAlle() {
        String sql = "DELETE FROM Billett";
        jdbcTemplate.update(sql);
    }
}


