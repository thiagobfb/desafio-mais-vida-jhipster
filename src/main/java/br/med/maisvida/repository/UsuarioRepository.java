package br.med.maisvida.repository;

import br.med.maisvida.domain.Usuario;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Usuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

}
