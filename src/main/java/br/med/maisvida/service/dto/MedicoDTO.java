package br.med.maisvida.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import br.med.maisvida.domain.enumeration.StatusMedicoEnum;

/**
 * A DTO for the Medico entity.
 */
public class MedicoDTO implements Serializable {

    private String id;

    @NotNull
    private String primeiroNome;

    @NotNull
    private String ultimoNome;

    @NotNull
    private String especialidade;

    @NotNull
    private String email;

    @NotNull
    private Boolean ativo;

    @NotNull
    private StatusMedicoEnum status;

    private String cidade;

    private String estado;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public void setPrimeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
    }

    public String getUltimoNome() {
        return ultimoNome;
    }

    public void setUltimoNome(String ultimoNome) {
        this.ultimoNome = ultimoNome;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public StatusMedicoEnum getStatus() {
        return status;
    }

    public void setStatus(StatusMedicoEnum status) {
        this.status = status;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MedicoDTO medicoDTO = (MedicoDTO) o;
        if(medicoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medicoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedicoDTO{" +
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
