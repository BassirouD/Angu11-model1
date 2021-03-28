package org.sid;
import org.sid.dao.CategoryRepository;
import org.sid.dao.ProductRepository;
import org.sid.entities.Category;
import org.sid.entities.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.util.ArrayList;
import java.util.stream.Stream;

@SpringBootApplication
public class CatalogueServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CatalogueServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository, CategoryRepository categoryRepository){
        return args -> {
            categoryRepository.deleteAll();
            Stream.of("C1 Ordinateur", "C2 Imprimante").forEach(c->{
                categoryRepository.save(new Category(c.split(" ")[0],c.split(" ")[1 ], new ArrayList<>()));
            });
            categoryRepository.findAll().forEach(System.out::println);

            productRepository.deleteAll();
            Category category1 = categoryRepository.findById("C1").get();
            Stream.of("P1", "P2", "P3", "P4").forEach(p->{
                Product product = productRepository.save(new Product(null, p, Math.random()*100, category1));
                category1.getProducts().add(product);
                categoryRepository.save(category1);
            });

            Category category2 = categoryRepository.findById("C2").get();
            Stream.of("P5", "P6").forEach(p->{
                Product product = productRepository.save(new Product(null, p, Math.random()*100, category2));
                category2.getProducts().add(product);
                categoryRepository.save(category2);
            });
            productRepository.findAll().forEach(p->{
                System.out.println(p.toString());
            });
        };
    }
}
