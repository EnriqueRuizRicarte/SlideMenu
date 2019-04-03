package com.nunsys.service.impl;

import com.nunsys.service.SubAreaService;
import com.nunsys.domain.SubArea;
import com.nunsys.repository.SubAreaRepository;
import com.nunsys.service.dto.SubAreaDTO;
import com.nunsys.service.mapper.SubAreaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing SubArea.
 */
@Service
@Transactional
public class SubAreaServiceImpl implements SubAreaService {

    private final Logger log = LoggerFactory.getLogger(SubAreaServiceImpl.class);

    private final SubAreaRepository subAreaRepository;

    private final SubAreaMapper subAreaMapper;

    public SubAreaServiceImpl(SubAreaRepository subAreaRepository, SubAreaMapper subAreaMapper) {
        this.subAreaRepository = subAreaRepository;
        this.subAreaMapper = subAreaMapper;
    }

    /**
     * Save a subArea.
     *
     * @param subAreaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubAreaDTO save(SubAreaDTO subAreaDTO) {
        log.debug("Request to save SubArea : {}", subAreaDTO);
        SubArea subArea = subAreaMapper.toEntity(subAreaDTO);
        subArea = subAreaRepository.save(subArea);
        return subAreaMapper.toDto(subArea);
    }

    /**
     * Get all the subAreas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubAreaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubAreas");
        return subAreaRepository.findAll(pageable)
            .map(subAreaMapper::toDto);
    }


    /**
     * Get one subArea by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubAreaDTO> findOne(Long id) {
        log.debug("Request to get SubArea : {}", id);
        return subAreaRepository.findById(id)
            .map(subAreaMapper::toDto);
    }

    /**
     * Delete the subArea by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubArea : {}", id);
        subAreaRepository.deleteById(id);
    }
}
