package br.med.maisvida.service.mapper;

import br.med.maisvida.domain.*;
import br.med.maisvida.service.dto.UsuarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {


}
