import com.example.oblig3ny.Oblig3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Oblig3Controller {
    @Autowired
    private Oblig3Repository billetterRepository;

    @PostMapping("/setBillett")
    public void setBillett(@RequestBody Oblig3 billett){
        billetterRepository.addBestilling(billett);
    }
    @GetMapping("/fåAlleBilletter")
    public List<Oblig3> getBilletter(){
        return billetterRepository.hentAlleBilletter();
    }
    @GetMapping("/slettTickets")
    public void slettBilletter(){
        billetterRepository.slettBestillinger();
    }
    @GetMapping("/sjekkBilletterTom")
    public boolean sjekkBillettTom(){
        List<Oblig3> alleBilletter=billetterRepository.hentAlleBilletter();
        return alleBilletter.isEmpty();
    }
}
