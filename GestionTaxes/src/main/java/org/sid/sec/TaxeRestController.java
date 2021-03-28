package org.sid.sec;

import org.sid.dao.EntrepriseRepository;
import org.sid.entities.Entreprise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TaxeRestController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @RequestMapping(value = "/entrepriseList")
    public Page<Entreprise> entrepriseList(@RequestParam(name = "motCle", defaultValue = "") String motCle,
                                           @RequestParam(name = "page", defaultValue = "0") int page,
                                           @RequestParam(name = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return entrepriseRepository.findByName("%" + motCle + "%", pageable);
    }
}
