package org.sid.projet_mvc.sec;

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

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       /* auth.inMemoryAuthentication().withUser("admin").password("{noop}1234").roles("USER", "ADMIN");
        auth.inMemoryAuthentication().withUser("user").password("{noop}1234").roles("USER");*/
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username as username, password as password, enabled from users where username=?")
                .authoritiesByUsernameQuery("select username as username, role as role from users_roles where username=?")
                .passwordEncoder(new BCryptPasswordEncoder())
                .rolePrefix("ROLE_")
        ;
    }

    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        //httpSecurity.formLogin(); //Pour utiliser le login de spring security

       /*
        httpSecurity.formLogin().loginPage("/login");
        httpSecurity.authorizeRequests().antMatchers("/user/*").hasRole("USER");
        httpSecurity.authorizeRequests().antMatchers("/admin/*").hasRole("ADMIN");
        httpSecurity.exceptionHandling().accessDeniedPage("/403");
       */

        httpSecurity.authorizeRequests()
                .antMatchers("/user/*").hasRole("USER")
                .antMatchers("/admin/*").access("hasRole('ADMIN')")
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/")
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
