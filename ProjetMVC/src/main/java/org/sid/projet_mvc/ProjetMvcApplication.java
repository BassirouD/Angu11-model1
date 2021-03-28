package org.sid.projet_mvc;

import org.sid.projet_mvc.dao.ProduitRepository;
import org.sid.projet_mvc.entities.Produit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjetMvcApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(ProjetMvcApplication.class, args);
        ProduitRepository produitRepository = ctx.getBean(ProduitRepository.class);
//        produitRepository.save(new Produit("LX 4562", 670, 90));
//        produitRepository.save(new Produit("HP 9621", 203, 20));
//        produitRepository.save(new Produit("Imprimente Epso,", 720, 75));
//        produitRepository.save(new Produit("Je ne sais quoi mettre", 670, 960));
/*
        produitRepository.findAll().forEach(p->System.out.println(p.getDescription()));
    */
        /*
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String rawPassword = "1234";
            String encodePassword = encoder.encode(rawPassword);

            System.out.println(encodePassword);
        */
    }


}
