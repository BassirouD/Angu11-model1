package org.sid.dao;

import org.sid.entities.Taxe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxeRepository extends JpaRepository<Taxe, Long> {
}
