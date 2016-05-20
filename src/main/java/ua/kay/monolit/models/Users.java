package ua.kay.monolit.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "users", schema = "", catalog = "monolit")
public class Users implements Serializable{

    private static final long serialVersionUID = -3973131338862519382L;

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id_user", nullable = false, insertable = true, updatable = true)
    private int idUser;

    @Basic
    @Column(name = "username", nullable = false, insertable = true, updatable = true, length = 45)
    private String username;

    @Basic
    @Column(name = "password", nullable = false, insertable = true, updatable = true, length = 45)
    private String password;

    @Basic
    @Column(name = "enabled", nullable = false, insertable = true, updatable = true, length = 4)
    private int enabled;

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, username, password, enabled);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final Users other = (Users) obj;
        return Objects.equals(this.idUser, other.idUser)
                && Objects.equals(this.username, other.username)
                && Objects.equals(this.password, other.password)
                && Objects.equals(this.enabled, other.enabled);
    }

}
