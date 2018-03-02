package br.med.maisvida.service.impl;

import br.med.maisvida.service.MedicoService;
import br.med.maisvida.domain.Medico;
import br.med.maisvida.repository.MedicoRepository;
import br.med.maisvida.service.dto.MedicoDTO;
import br.med.maisvida.service.mapper.MedicoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


/**
 * Service Implementation for managing Medico.
 */
@Service
public class MedicoServiceImpl implements MedicoService {

    private final Logger log = LoggerFactory.getLogger(MedicoServiceImpl.class);

    private final MedicoRepository medicoRepository;

    private final MedicoMapper medicoMapper;

    public MedicoServiceImpl(MedicoRepository medicoRepository, MedicoMapper medicoMapper) {
        this.medicoRepository = medicoRepository;
        this.medicoMapper = medicoMapper;
    }

    /**
     * Save a medico.
     *
     * @param medicoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedicoDTO save(MedicoDTO medicoDTO) {
        log.debug("Request to save Medico : {}", medicoDTO);
        Medico medico = medicoMapper.toEntity(medicoDTO);
        medico = medicoRepository.save(medico);
        return medicoMapper.toDto(medico);
    }

    /**
     * Get all the medicos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<MedicoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Medicos");
        return medicoRepository.findAll(pageable)
            .map(medicoMapper::toDto);
    }

    /**
     * Get one medico by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public MedicoDTO findOne(String id) {
        log.debug("Request to get Medico : {}", id);
        Medico medico = medicoRepository.findOne(id);
        return medicoMapper.toDto(medico);
    }

    /**
     * Delete the medico by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Medico : {}", id);
        medicoRepository.delete(id);
    }
}
