package br.med.maisvida.service;

import br.med.maisvida.service.dto.UsuarioDTO;
import java.util.List;

/**
 * Service Interface for managing Usuario.
 */
public interface UsuarioService {

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    UsuarioDTO save(UsuarioDTO usuarioDTO);

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    List<UsuarioDTO> findAll();

    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UsuarioDTO findOne(String id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
