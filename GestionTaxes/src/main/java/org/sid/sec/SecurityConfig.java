package org.sid.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication().withUser("admin").password("{noop}1234").roles("ADMIN", "USER");
//        auth.inMemoryAuthentication().withUser("user").password("{noop}1234").roles("USER");
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username as username, password as password, active from users where username=?")
                .authoritiesByUsernameQuery("select username as username, role as role from roles where username=?")
                .rolePrefix("ROLE_")
                .passwordEncoder(new BCryptPasswordEncoder())
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.formLogin().loginPage("/login");
        //     http.authorizeRequests().anyRequest(); //ttes les requetes necessite une autorisation
//        http.authorizeRequests().antMatchers("/saveEntreprise", "/formEntreprise").hasRole("ADMIN");
//        http.authorizeRequests().antMatchers("/entrprises", "/taxes").hasRole("USER");

        http.authorizeRequests()
                .antMatchers("/entreprises", "/taxes").access("hasRole('USER')")
                .antMatchers("/saveEntreprise", "/formEntreprise").access("hasRole('ADMIN')")
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .failureUrl("/login?error")
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .exceptionHandling()
                .accessDeniedPage("/403")
        ;
    }
}
