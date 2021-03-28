package org.sid.projet_mvc.web;

import org.sid.projet_mvc.dao.ProduitRepository;
import org.sid.projet_mvc.entities.Produit;
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


@Controller
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping(value = "/user/index")
    public String index(Model model,
                        @RequestParam(value = "page", defaultValue = "0") int p,
                        @RequestParam(value = "size", defaultValue = "5") int s,
                        @RequestParam(name = "mc", defaultValue = "") String mc
    ) {
        Pageable paging = PageRequest.of(p, s);
        Page<Produit> pageProduits = produitRepository.chercher("%" + mc + "%", paging);
        model.addAttribute("listProduit", pageProduits.getContent());
        int[] pages = new int[pageProduits.getTotalPages()];
        model.addAttribute("pages", pages);
        model.addAttribute("size", s);
        model.addAttribute("pageCourante", p);
        model.addAttribute("mc", mc);
        return "produits";
    }

    @GetMapping(value = "/admin/delete")
    public String delete(Long id, String mc, int page, int size) {
        produitRepository.deleteById(id);
        return "redirect:/user/index?page=" + page + "&size=" + size + "&mc" + mc;
    }

    @GetMapping(value = "/admin/form")
    public String formProduit(Model model) {
        model.addAttribute("produit", new Produit());
        return "FormProduit";
    }

    @PostMapping(value = "/admin/save")
    public String save(Model model, @Valid Produit produit, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return "FormProduit";
        produitRepository.save(produit);
        return "Corfirmation";
    }

    @GetMapping(value = "/admin/edit")
    public String edit(Model model, Long id) {
        Produit p = produitRepository.getOne(id);
        model.addAttribute("produit", p);
        return "EditProduit";
    }

    @RequestMapping(value = "/")
    public String home() {
        return "redirect:/user/index";
    }

    @RequestMapping(value = "/403")
    public String accessDenied() {
        return "403";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }


}
