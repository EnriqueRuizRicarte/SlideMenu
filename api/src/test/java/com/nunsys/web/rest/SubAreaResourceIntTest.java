package com.nunsys.web.rest;

import com.nunsys.NavApp;

import com.nunsys.domain.SubArea;
import com.nunsys.repository.SubAreaRepository;
import com.nunsys.service.SubAreaService;
import com.nunsys.service.dto.SubAreaDTO;
import com.nunsys.service.mapper.SubAreaMapper;
import com.nunsys.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.nunsys.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubAreaResource REST controller.
 *
 * @see SubAreaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NavApp.class)
public class SubAreaResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private SubAreaRepository subAreaRepository;

    @Autowired
    private SubAreaMapper subAreaMapper;

    @Autowired
    private SubAreaService subAreaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSubAreaMockMvc;

    private SubArea subArea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubAreaResource subAreaResource = new SubAreaResource(subAreaService);
        this.restSubAreaMockMvc = MockMvcBuilders.standaloneSetup(subAreaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubArea createEntity(EntityManager em) {
        SubArea subArea = new SubArea()
            .descripcion(DEFAULT_DESCRIPCION);
        return subArea;
    }

    @Before
    public void initTest() {
        subArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubArea() throws Exception {
        int databaseSizeBeforeCreate = subAreaRepository.findAll().size();

        // Create the SubArea
        SubAreaDTO subAreaDTO = subAreaMapper.toDto(subArea);
        restSubAreaMockMvc.perform(post("/api/sub-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subAreaDTO)))
            .andExpect(status().isCreated());

        // Validate the SubArea in the database
        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeCreate + 1);
        SubArea testSubArea = subAreaList.get(subAreaList.size() - 1);
        assertThat(testSubArea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createSubAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subAreaRepository.findAll().size();

        // Create the SubArea with an existing ID
        subArea.setId(1L);
        SubAreaDTO subAreaDTO = subAreaMapper.toDto(subArea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubAreaMockMvc.perform(post("/api/sub-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubArea in the database
        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = subAreaRepository.findAll().size();
        // set the field null
        subArea.setDescripcion(null);

        // Create the SubArea, which fails.
        SubAreaDTO subAreaDTO = subAreaMapper.toDto(subArea);

        restSubAreaMockMvc.perform(post("/api/sub-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subAreaDTO)))
            .andExpect(status().isBadRequest());

        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubAreas() throws Exception {
        // Initialize the database
        subAreaRepository.saveAndFlush(subArea);

        // Get all the subAreaList
        restSubAreaMockMvc.perform(get("/api/sub-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getSubArea() throws Exception {
        // Initialize the database
        subAreaRepository.saveAndFlush(subArea);

        // Get the subArea
        restSubAreaMockMvc.perform(get("/api/sub-areas/{id}", subArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subArea.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubArea() throws Exception {
        // Get the subArea
        restSubAreaMockMvc.perform(get("/api/sub-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubArea() throws Exception {
        // Initialize the database
        subAreaRepository.saveAndFlush(subArea);

        int databaseSizeBeforeUpdate = subAreaRepository.findAll().size();

        // Update the subArea
        SubArea updatedSubArea = subAreaRepository.findById(subArea.getId()).get();
        // Disconnect from session so that the updates on updatedSubArea are not directly saved in db
        em.detach(updatedSubArea);
        updatedSubArea
            .descripcion(UPDATED_DESCRIPCION);
        SubAreaDTO subAreaDTO = subAreaMapper.toDto(updatedSubArea);

        restSubAreaMockMvc.perform(put("/api/sub-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subAreaDTO)))
            .andExpect(status().isOk());

        // Validate the SubArea in the database
        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeUpdate);
        SubArea testSubArea = subAreaList.get(subAreaList.size() - 1);
        assertThat(testSubArea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingSubArea() throws Exception {
        int databaseSizeBeforeUpdate = subAreaRepository.findAll().size();

        // Create the SubArea
        SubAreaDTO subAreaDTO = subAreaMapper.toDto(subArea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubAreaMockMvc.perform(put("/api/sub-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubArea in the database
        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubArea() throws Exception {
        // Initialize the database
        subAreaRepository.saveAndFlush(subArea);

        int databaseSizeBeforeDelete = subAreaRepository.findAll().size();

        // Delete the subArea
        restSubAreaMockMvc.perform(delete("/api/sub-areas/{id}", subArea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubArea> subAreaList = subAreaRepository.findAll();
        assertThat(subAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubArea.class);
        SubArea subArea1 = new SubArea();
        subArea1.setId(1L);
        SubArea subArea2 = new SubArea();
        subArea2.setId(subArea1.getId());
        assertThat(subArea1).isEqualTo(subArea2);
        subArea2.setId(2L);
        assertThat(subArea1).isNotEqualTo(subArea2);
        subArea1.setId(null);
        assertThat(subArea1).isNotEqualTo(subArea2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubAreaDTO.class);
        SubAreaDTO subAreaDTO1 = new SubAreaDTO();
        subAreaDTO1.setId(1L);
        SubAreaDTO subAreaDTO2 = new SubAreaDTO();
        assertThat(subAreaDTO1).isNotEqualTo(subAreaDTO2);
        subAreaDTO2.setId(subAreaDTO1.getId());
        assertThat(subAreaDTO1).isEqualTo(subAreaDTO2);
        subAreaDTO2.setId(2L);
        assertThat(subAreaDTO1).isNotEqualTo(subAreaDTO2);
        subAreaDTO1.setId(null);
        assertThat(subAreaDTO1).isNotEqualTo(subAreaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subAreaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subAreaMapper.fromId(null)).isNull();
    }
}
