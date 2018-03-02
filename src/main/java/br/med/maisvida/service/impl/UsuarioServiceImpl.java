package br.med.maisvida.service.impl;

import br.med.maisvida.service.UsuarioService;
import br.med.maisvida.domain.Usuario;
import br.med.maisvida.repository.UsuarioRepository;
import br.med.maisvida.service.dto.UsuarioDTO;
import br.med.maisvida.service.mapper.UsuarioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Usuario.
 */
@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    private final UsuarioRepository usuarioRepository;

    private final UsuarioMapper usuarioMapper;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        log.debug("Request to save Usuario : {}", usuarioDTO);
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        usuario = usuarioRepository.save(usuario);
        return usuarioMapper.toDto(usuario);
    }

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    @Override
    public List<UsuarioDTO> findAll() {
        log.debug("Request to get all Usuarios");
        return usuarioRepository.findAll().stream()
            .map(usuarioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one usuario by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public UsuarioDTO findOne(String id) {
        log.debug("Request to get Usuario : {}", id);
        Usuario usuario = usuarioRepository.findOne(id);
        return usuarioMapper.toDto(usuario);
    }

    /**
     * Delete the usuario by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Usuario : {}", id);
        usuarioRepository.delete(id);
    }
}
