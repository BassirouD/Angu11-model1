package org.sid;

import org.sid.dao.EntrepriseRepository;
import org.sid.dao.TaxeRepository;
import org.sid.entities.Entreprise;
import org.sid.entities.IR;
import org.sid.entities.TVA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class TaxesApplication implements CommandLineRunner {

    @Autowired
    TaxeRepository taxeRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;

    public static void main(String[] args) {
        SpringApplication.run(TaxesApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Entreprise e1 = entrepriseRepository.save(new Entreprise(1, "R1", "r1@gmai.com", "SARL"));
        Entreprise e2 = entrepriseRepository.save(new Entreprise(2, "R2", "r2@gmai.com", "SARL"));

        taxeRepository.save(new TVA("TVA Habitation", new Date(), 900, e1));
        taxeRepository.save(new TVA("TVA Voiture", new Date(), 400, e1));
        taxeRepository.save(new IR("IR Habitation", new Date(), 652, e1));
        taxeRepository.save(new TVA("TVA Habitation", new Date(), 700, e2));

    }
}
