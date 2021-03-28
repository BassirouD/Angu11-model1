package org.sid.dao;

import org.sid.entities.Entreprise;
import org.sid.entities.Taxe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxeRepository extends JpaRepository<Taxe, Long> {
    public List<Taxe> findByEntreprise(Entreprise entreprise);
}
