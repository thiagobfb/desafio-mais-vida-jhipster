package br.med.maisvida.repository;

import br.med.maisvida.domain.Medico;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Medico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicoRepository extends MongoRepository<Medico, String> {

}
