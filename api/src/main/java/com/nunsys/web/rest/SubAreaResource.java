package com.nunsys.web.rest;
import com.nunsys.service.SubAreaService;
import com.nunsys.web.rest.errors.BadRequestAlertException;
import com.nunsys.web.rest.util.HeaderUtil;
import com.nunsys.web.rest.util.PaginationUtil;
import com.nunsys.service.dto.SubAreaDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SubArea.
 */
@RestController
@RequestMapping("/api")
public class SubAreaResource {

    private final Logger log = LoggerFactory.getLogger(SubAreaResource.class);

    private static final String ENTITY_NAME = "subArea";

    private final SubAreaService subAreaService;

    public SubAreaResource(SubAreaService subAreaService) {
        this.subAreaService = subAreaService;
    }

    /**
     * POST  /sub-areas : Create a new subArea.
     *
     * @param subAreaDTO the subAreaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subAreaDTO, or with status 400 (Bad Request) if the subArea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-areas")
    public ResponseEntity<SubAreaDTO> createSubArea(@Valid @RequestBody SubAreaDTO subAreaDTO) throws URISyntaxException {
        log.debug("REST request to save SubArea : {}", subAreaDTO);
        if (subAreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new subArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubAreaDTO result = subAreaService.save(subAreaDTO);
        return ResponseEntity.created(new URI("/api/sub-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-areas : Updates an existing subArea.
     *
     * @param subAreaDTO the subAreaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subAreaDTO,
     * or with status 400 (Bad Request) if the subAreaDTO is not valid,
     * or with status 500 (Internal Server Error) if the subAreaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-areas")
    public ResponseEntity<SubAreaDTO> updateSubArea(@Valid @RequestBody SubAreaDTO subAreaDTO) throws URISyntaxException {
        log.debug("REST request to update SubArea : {}", subAreaDTO);
        if (subAreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubAreaDTO result = subAreaService.save(subAreaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subAreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-areas : get all the subAreas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subAreas in body
     */
    @GetMapping("/sub-areas")
    public ResponseEntity<List<SubAreaDTO>> getAllSubAreas(Pageable pageable) {
        log.debug("REST request to get a page of SubAreas");
        Page<SubAreaDTO> page = subAreaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sub-areas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /sub-areas/:id : get the "id" subArea.
     *
     * @param id the id of the subAreaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subAreaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-areas/{id}")
    public ResponseEntity<SubAreaDTO> getSubArea(@PathVariable Long id) {
        log.debug("REST request to get SubArea : {}", id);
        Optional<SubAreaDTO> subAreaDTO = subAreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subAreaDTO);
    }

    /**
     * DELETE  /sub-areas/:id : delete the "id" subArea.
     *
     * @param id the id of the subAreaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-areas/{id}")
    public ResponseEntity<Void> deleteSubArea(@PathVariable Long id) {
        log.debug("REST request to delete SubArea : {}", id);
        subAreaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
