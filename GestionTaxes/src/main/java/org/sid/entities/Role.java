package org.sid.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "Roles")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
public abstract class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRole;
    private String username;
    @ManyToOne
    @JoinColumn(name = "IDUSER")
    private User user;

    public Role() {
    }

    public Role(String username) {
        this.username = username;
    }

    public Role(String username, User user) {
        this.username = username;
        this.user = user;
    }
}
