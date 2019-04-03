package com.nunsys.service.mapper;

import com.nunsys.domain.*;
import com.nunsys.service.dto.SubAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubArea and its DTO SubAreaDTO.
 */
@Mapper(componentModel = "spring", uses = {AreaMapper.class})
public interface SubAreaMapper extends EntityMapper<SubAreaDTO, SubArea> {

    @Mapping(source = "area.id", target = "areaId")
    @Mapping(source = "area.descripcion", target = "areaDescripcion")
    SubAreaDTO toDto(SubArea subArea);

    @Mapping(source = "areaId", target = "area")
    SubArea toEntity(SubAreaDTO subAreaDTO);

    default SubArea fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubArea subArea = new SubArea();
        subArea.setId(id);
        return subArea;
    }
}
