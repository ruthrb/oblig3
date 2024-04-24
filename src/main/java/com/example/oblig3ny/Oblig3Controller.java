package com.example.oblig3ny;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Oblig3Controller {
    @Autowired
    private Oblig3Repository rep;
    private final List<Oblig3> alleKunder=new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreOblig3(Oblig3 innOblig3){
        rep.lagreOblig3(innOblig3);
    }
    @GetMapping("/hentAlle")
    public List<Oblig3> hentAlle(){
        return rep.hentAlleBilletter();
    }
    @GetMapping("/nullstill")
    public void nullstill(){
        rep.slettAlleBillettene();
    }
}
