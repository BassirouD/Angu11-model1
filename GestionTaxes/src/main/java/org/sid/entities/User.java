package org.sid.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;
    private String username;
    private String password;
    private boolean active;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Collection<Role> roles;

    public User() {
    }

    public User(String userName, String password, boolean active) {
        this.username = userName;
        this.password = password;
        this.active = active;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}


