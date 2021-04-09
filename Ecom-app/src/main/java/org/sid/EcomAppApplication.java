package org.sid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.keycloak.adapters.AdapterDeploymentContext;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.spi.HttpFacade;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.client.KeycloakClientRequestFactory;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.facade.SimpleHttpFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Type;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
class Product{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
}

interface ProductRepository extends JpaRepository<Product, Long> {}

@Controller
class ProductController{
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/products")
    public String index(Model model){
        model.addAttribute("products", productRepository.findAll());
        return "products";
    }
}

@Controller
class SecurityController{

    @Autowired
    private AdapterDeploymentContext adapterDeploymentContext;

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) throws ServletException {
        request.logout();
        return "redirect:/";
    }

    @GetMapping("/change-password")
    public String cpw(HttpServletRequest request,
                                 RedirectAttributes attributes,
                                 HttpServletResponse response) throws ServletException {
        HttpFacade facade = new SimpleHttpFacade(request, response);
        KeycloakDeployment deployment = adapterDeploymentContext.resolveDeployment(facade);
        attributes.addAttribute("referrer", deployment.getResourceName());
        System.out.println(deployment.getAccountUrl());
        return "redirect:" + deployment.getAccountUrl() + "/password";
    }
}

@SpringBootApplication
public class EcomAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcomAppApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository){
        return args -> {
            productRepository.save(new Product(null, "Ord HP 564", 8000));
            productRepository.save(new Product(null, "Imprimente LX 11", 780));
            productRepository.save(new Product(null, "Smartphone Sumsung S10", 563));
            productRepository.findAll().forEach(product -> {
                System.out.println(product.getName());
            });
        };
    }
}

@Configuration
class KeycloakConfig{
    @Bean
    KeycloakSpringBootConfigResolver configResolver(){
        return new KeycloakSpringBootConfigResolver();
    }

    @Bean
    KeycloakRestTemplate keycloakRestTemplate(KeycloakClientRequestFactory keycloakClientRequestFactory){
        return new KeycloakRestTemplate(keycloakClientRequestFactory);
    }

}

@KeycloakConfiguration
class KeycloakSpringSecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(keycloakAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.authorizeRequests().antMatchers("/products/**").authenticated();
    }
}

@Controller
class SupplierController{

    @Autowired
    KeycloakRestTemplate keycloakRestTemplate;

    @GetMapping("/suppliers")
    public String index(Model model){
        ResponseEntity<PagedModel<Supplier>> responseEntity =
                keycloakRestTemplate.exchange("http://localhost:8083/suppliers",
                        HttpMethod.GET, null,
                        new ParameterizedTypeReference<PagedModel<Supplier>>() {});
       model.addAttribute("suppliers", responseEntity.getBody().getContent());
       System.out.println(responseEntity.getBody().getContent());
       return "suppliers";
    }
}

@Data
class Supplier{
    private Long id;
    private String name;
    private String email;
}

