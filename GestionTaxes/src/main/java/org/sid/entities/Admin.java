package org.sid.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends Role {
    public Admin() {
    }

    public Admin(String username) {
        super(username);
    }

    public Admin(String username, User user) {
        super(username, user);
    }
}
