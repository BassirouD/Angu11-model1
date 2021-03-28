package org.sid.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("USER")
public class Employe extends Role {
    public Employe() {
    }

    public Employe(String username) {
        super(username);
    }

    public Employe(String username, User user) {
        super(username, user);
    }
}
