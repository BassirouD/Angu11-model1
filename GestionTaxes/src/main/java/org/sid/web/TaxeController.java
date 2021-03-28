package org.sid.web;

import org.sid.dao.EntrepriseRepository;
import org.sid.dao.TaxeRepository;
import org.sid.entities.Entreprise;
import org.sid.entities.Taxe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.ArrayList;


@Controller
public class TaxeController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    TaxeRepository taxeRepository;

    @GetMapping(value = "/entreprises")
    public String index(Model model,
                        @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "4") int size,
                        @RequestParam(name = "motCle", defaultValue = "") String motCle
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Entreprise> entreprisePage = entrepriseRepository.findByName("%" + motCle + "%", pageable);
        model.addAttribute("entreprisePage", entreprisePage.getContent());
        int[] pages = new int[entreprisePage.getTotalPages()];
        model.addAttribute("pages", pages);
        model.addAttribute("pageCourante", page);
        model.addAttribute("motCle", motCle);
        return "entreprises";
    }

    @RequestMapping(value = "/formEntreprise")
    public String formEntrprise(Model model) {
        model.addAttribute("entreprise", new Entreprise());
        return "formEntreprise";
    }

    @PostMapping(value = "/saveEntreprise")
    public String saveEntreprise(Model model, @Valid Entreprise entreprise, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return "formEntreprise";
        entrepriseRepository.save(entreprise);
        return "redirect:/entreprises";
    }

    @RequestMapping(value = "/taxes")
    public String taxes(Model model,
                        @RequestParam(name = "code", defaultValue = "-1") int code) {
        model.addAttribute("entreprises", entrepriseRepository.findAll());
        if (code == -1) model.addAttribute("taxes", new ArrayList<Taxe>());
        else {
            Entreprise entreprise = new Entreprise();
            entreprise.setCode(code);
            model.addAttribute("taxes", taxeRepository.findByEntreprise(entreprise));
        }
        return "taxes";
    }

}
