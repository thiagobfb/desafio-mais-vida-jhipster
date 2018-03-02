package br.med.maisvida.service.mapper;

import br.med.maisvida.domain.*;
import br.med.maisvida.service.dto.MedicoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Medico and its DTO MedicoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MedicoMapper extends EntityMapper<MedicoDTO, Medico> {


}
