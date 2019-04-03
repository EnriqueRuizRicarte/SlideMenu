package com.nunsys.service;

import com.nunsys.service.dto.SubAreaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SubArea.
 */
public interface SubAreaService {

    /**
     * Save a subArea.
     *
     * @param subAreaDTO the entity to save
     * @return the persisted entity
     */
    SubAreaDTO save(SubAreaDTO subAreaDTO);

    /**
     * Get all the subAreas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SubAreaDTO> findAll(Pageable pageable);


    /**
     * Get the "id" subArea.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubAreaDTO> findOne(Long id);

    /**
     * Delete the "id" subArea.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
