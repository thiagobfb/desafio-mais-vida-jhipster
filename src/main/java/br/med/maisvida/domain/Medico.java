package br.med.maisvida.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import br.med.maisvida.domain.enumeration.StatusMedicoEnum;

/**
 * Generated by JHipster IDE plugin
 */
@ApiModel(description = "Generated by JHipster IDE plugin")
@Document(collection = "medico")
public class Medico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("primeiro_nome")
    private String primeiroNome;

    @NotNull
    @Field("ultimo_nome")
    private String ultimoNome;

    @NotNull
    @Field("especialidade")
    private String especialidade;

    @NotNull
    @Field("email")
    private String email;

    @NotNull
    @Field("ativo")
    private Boolean ativo;

    @NotNull
    @Field("status")
    private StatusMedicoEnum status;

    @Field("cidade")
    private String cidade;

    @Field("estado")
    private String estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public Medico primeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
        return this;
    }

    public void setPrimeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
    }

    public String getUltimoNome() {
        return ultimoNome;
    }

    public Medico ultimoNome(String ultimoNome) {
        this.ultimoNome = ultimoNome;
        return this;
    }

    public void setUltimoNome(String ultimoNome) {
        this.ultimoNome = ultimoNome;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public Medico especialidade(String especialidade) {
        this.especialidade = especialidade;
        return this;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getEmail() {
        return email;
    }

    public Medico email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isAtivo() {
        return ativo;
    }

    public Medico ativo(Boolean ativo) {
        this.ativo = ativo;
        return this;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public StatusMedicoEnum getStatus() {
        return status;
    }

    public Medico status(StatusMedicoEnum status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusMedicoEnum status) {
        this.status = status;
    }

    public String getCidade() {
        return cidade;
    }

    public Medico cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public Medico estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Medico medico = (Medico) o;
        if (medico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medico{" +
            "id=" + getId() +
            ", primeiroNome='" + getPrimeiroNome() + "'" +
            ", ultimoNome='" + getUltimoNome() + "'" +
            ", especialidade='" + getEspecialidade() + "'" +
            ", email='" + getEmail() + "'" +
            ", ativo='" + isAtivo() + "'" +
            ", status='" + getStatus() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
