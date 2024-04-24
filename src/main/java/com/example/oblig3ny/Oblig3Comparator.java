package com.example.oblig3ny;
import java.util.Comparator;

public class Oblig3Comparator implements Comparator<Oblig3> {

    public int compare(Oblig3 k1, Oblig3 k2) {
        return k1.getEtternavn().compareTo(k2.getEtternavn());
    }
}

