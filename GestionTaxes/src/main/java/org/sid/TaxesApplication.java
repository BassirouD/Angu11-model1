package org.sid;

import org.sid.dao.EntrepriseRepository;
import org.sid.dao.RoleRepository;
import org.sid.dao.TaxeRepository;
import org.sid.dao.UserRepository;
import org.sid.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class TaxesApplication implements CommandLineRunner {

    @Autowired
    EntrepriseRepository entrepriseRepository;

    @Autowired
    TaxeRepository taxeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    public static void main(String[] args) {

        SpringApplication.run(TaxesApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Entreprise e1 = entrepriseRepository.save(new Entreprise("R1", "r1@mail.com", "SARL"));
        Entreprise e2 = entrepriseRepository.save(new Entreprise("R2", "r2@mail.com", "BTS"));
        Entreprise e4 = entrepriseRepository.save(new Entreprise("R3", "r3@mail.com", "KAL"));
        Entreprise e3 = entrepriseRepository.save(new Entreprise("R4", "r4@mail.com", "MBN"));
        Entreprise e5 = entrepriseRepository.save(new Entreprise("R5", "r5@mail.com", "SBGZ"));
        Entreprise e6 = entrepriseRepository.save(new Entreprise("R6", "r6@mail.com", "SARL"));
        Entreprise e7 = entrepriseRepository.save(new Entreprise("R7", "r7@mail.com", "SARL"));
        Entreprise e8 = entrepriseRepository.save(new Entreprise("R8", "r8@mail.com", "MON"));
        Entreprise e9 = entrepriseRepository.save(new Entreprise("R9", "r9@mail.com", "DKKD"));
        Entreprise e10 = entrepriseRepository.save(new Entreprise("R10", "r10@mail.com", "SARL"));
        Entreprise e11 = entrepriseRepository.save(new Entreprise("R11", "r11@mail.com", "BTS"));
        Entreprise e12 = entrepriseRepository.save(new Entreprise("R12", "r12@mail.com", "SBGZ"));

        Entreprise e13 = entrepriseRepository.save(new Entreprise("R1", "r1@mail.com", "SARL"));
        Entreprise e14 = entrepriseRepository.save(new Entreprise("R1", "r1@mail.com", "BTS"));
        Entreprise e15 = entrepriseRepository.save(new Entreprise("R2", "r2@mail.com", "KAL"));


        taxeRepository.save(new TVA("TVA Habitation", new Date(), 900, e1));
        taxeRepository.save(new TVA("TVA Voiture", new Date(), 400, e1));
        taxeRepository.save(new IR("IR 2016", new Date(), 900, e1));
        taxeRepository.save(new TVA("TVA Habitation", new Date(), 4000, e2));


        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPasswordA = "4321";
        String encodePasswordAdmin = encoder.encode(rawPasswordA);

        String rawPasswordE = "1234";
        String encodePasswordUser = encoder.encode(rawPasswordE);


        User admin = userRepository.save(new User("admin", encodePasswordAdmin, true));
        User employe1 = userRepository.save(new User("user", encodePasswordUser, true));

        roleRepository.save(new Admin("ADMIN", admin));
        roleRepository.save(new Employe("USER", employe1));

        roleRepository.save(new Employe("ADMIN", admin));

    }
}
