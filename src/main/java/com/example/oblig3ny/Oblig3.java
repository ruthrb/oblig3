package com.example.oblig3ny;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

@Getter
@Setter
@NoArgsConstructor
@AllArgeConstructor
@Entity
@Table(name = "Billett")

public class Oblig3 {
            @Id
            @GeneratedValue (strategy = GenerationType.IDENTITY)

            private int id;
            private String film;
            private int antall;
            private String fornavn;
            private String etternavn;
            private String telefonNr;
            private String epost;

            @Override
            public String toString(){
                return "Oblig3{" +
                        "id=" + id +
                        ", film='" + film + '\'' +
                        ", antall='" + antall + '\'' +
                        ", fornavn='" + fornavn + '\'' +
                        ", etternavn='" + etternavn + '\'' +
                        ", telefonNr='" + telefonNr + '\'' +
                        ", epost='" + epost + '\'' +
                        '}';
                }

}

