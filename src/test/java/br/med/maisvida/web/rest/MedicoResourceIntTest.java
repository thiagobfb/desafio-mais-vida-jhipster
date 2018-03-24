package br.med.maisvida.web.rest;

import br.med.maisvida.DesafioMaisVidaApp;

import br.med.maisvida.domain.Medico;
import br.med.maisvida.repository.MedicoRepository;
import br.med.maisvida.service.MedicoService;
import br.med.maisvida.service.dto.MedicoDTO;
import br.med.maisvida.service.mapper.MedicoMapper;
import br.med.maisvida.web.rest.errors.ExceptionTranslator;

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

import java.util.List;

import static br.med.maisvida.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.med.maisvida.domain.enumeration.StatusMedicoEnum;
/**
 * Test class for the MedicoResource REST controller.
 *
 * @see MedicoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DesafioMaisVidaApp.class)
public class MedicoResourceIntTest {

    private static final String DEFAULT_PRIMEIRO_NOME = "AAAAAAAAAA";
    private static final String UPDATED_PRIMEIRO_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ULTIMO_NOME = "AAAAAAAAAA";
    private static final String UPDATED_ULTIMO_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ESPECIALIDADE = "AAAAAAAAAA";
    private static final String UPDATED_ESPECIALIDADE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ATIVO = false;
    private static final Boolean UPDATED_ATIVO = true;

    private static final StatusMedicoEnum DEFAULT_STATUS = StatusMedicoEnum.OCUPADO;
    private static final StatusMedicoEnum UPDATED_STATUS = StatusMedicoEnum.DISPONIVEL;

    private static final String DEFAULT_CIDADE = "AAAAAAAAAA";
    private static final String UPDATED_CIDADE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private MedicoMapper medicoMapper;

    @Autowired
    private MedicoService medicoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMedicoMockMvc;

    private Medico medico;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedicoResource medicoResource = new MedicoResource(medicoService);
        this.restMedicoMockMvc = MockMvcBuilders.standaloneSetup(medicoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medico createEntity() {
        Medico medico = new Medico()
            .primeiroNome(DEFAULT_PRIMEIRO_NOME)
            .ultimoNome(DEFAULT_ULTIMO_NOME)
            .especialidade(DEFAULT_ESPECIALIDADE)
            .email(DEFAULT_EMAIL)
            .ativo(DEFAULT_ATIVO)
            .status(DEFAULT_STATUS)
            .cidade(DEFAULT_CIDADE)
            .estado(DEFAULT_ESTADO);
        return medico;
    }

    @Before
    public void initTest() {
        medicoRepository.deleteAll();
        medico = createEntity();
    }

    @Test
    public void createMedico() throws Exception {
        int databaseSizeBeforeCreate = medicoRepository.findAll().size();

        // Create the Medico
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);
        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isCreated());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeCreate + 1);
        Medico testMedico = medicoList.get(medicoList.size() - 1);
        assertThat(testMedico.getPrimeiroNome()).isEqualTo(DEFAULT_PRIMEIRO_NOME);
        assertThat(testMedico.getUltimoNome()).isEqualTo(DEFAULT_ULTIMO_NOME);
        assertThat(testMedico.getEspecialidade()).isEqualTo(DEFAULT_ESPECIALIDADE);
        assertThat(testMedico.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testMedico.isAtivo()).isEqualTo(DEFAULT_ATIVO);
        assertThat(testMedico.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testMedico.getCidade()).isEqualTo(DEFAULT_CIDADE);
        assertThat(testMedico.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    public void createMedicoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicoRepository.findAll().size();

        // Create the Medico with an existing ID
        medico.setId("existing_id");
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkPrimeiroNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setPrimeiroNome(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUltimoNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setUltimoNome(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEspecialidadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setEspecialidade(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setEmail(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAtivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setAtivo(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicoRepository.findAll().size();
        // set the field null
        medico.setStatus(null);

        // Create the Medico, which fails.
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        restMedicoMockMvc.perform(post("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isBadRequest());

        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMedicos() throws Exception {
        // Initialize the database
        medicoRepository.save(medico);

        // Get all the medicoList
        restMedicoMockMvc.perform(get("/api/medicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medico.getId())))
            .andExpect(jsonPath("$.[*].primeiroNome").value(hasItem(DEFAULT_PRIMEIRO_NOME.toString())))
            .andExpect(jsonPath("$.[*].ultimoNome").value(hasItem(DEFAULT_ULTIMO_NOME.toString())))
            .andExpect(jsonPath("$.[*].especialidade").value(hasItem(DEFAULT_ESPECIALIDADE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].cidade").value(hasItem(DEFAULT_CIDADE.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }

    @Test
    public void getMedico() throws Exception {
        // Initialize the database
        medicoRepository.save(medico);

        // Get the medico
        restMedicoMockMvc.perform(get("/api/medicos/{id}", medico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medico.getId()))
            .andExpect(jsonPath("$.primeiroNome").value(DEFAULT_PRIMEIRO_NOME.toString()))
            .andExpect(jsonPath("$.ultimoNome").value(DEFAULT_ULTIMO_NOME.toString()))
            .andExpect(jsonPath("$.especialidade").value(DEFAULT_ESPECIALIDADE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.cidade").value(DEFAULT_CIDADE.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    public void getNonExistingMedico() throws Exception {
        // Get the medico
        restMedicoMockMvc.perform(get("/api/medicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMedico() throws Exception {
        // Initialize the database
        medicoRepository.save(medico);
        int databaseSizeBeforeUpdate = medicoRepository.findAll().size();

        // Update the medico
        Medico updatedMedico = medicoRepository.findOne(medico.getId());
        updatedMedico
            .primeiroNome(UPDATED_PRIMEIRO_NOME)
            .ultimoNome(UPDATED_ULTIMO_NOME)
            .especialidade(UPDATED_ESPECIALIDADE)
            .email(UPDATED_EMAIL)
            .ativo(UPDATED_ATIVO)
            .status(UPDATED_STATUS)
            .cidade(UPDATED_CIDADE)
            .estado(UPDATED_ESTADO);
        MedicoDTO medicoDTO = medicoMapper.toDto(updatedMedico);

        restMedicoMockMvc.perform(put("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isOk());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeUpdate);
        Medico testMedico = medicoList.get(medicoList.size() - 1);
        assertThat(testMedico.getPrimeiroNome()).isEqualTo(UPDATED_PRIMEIRO_NOME);
        assertThat(testMedico.getUltimoNome()).isEqualTo(UPDATED_ULTIMO_NOME);
        assertThat(testMedico.getEspecialidade()).isEqualTo(UPDATED_ESPECIALIDADE);
        assertThat(testMedico.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testMedico.isAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testMedico.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testMedico.getCidade()).isEqualTo(UPDATED_CIDADE);
        assertThat(testMedico.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    public void updateNonExistingMedico() throws Exception {
        int databaseSizeBeforeUpdate = medicoRepository.findAll().size();

        // Create the Medico
        MedicoDTO medicoDTO = medicoMapper.toDto(medico);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMedicoMockMvc.perform(put("/api/medicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicoDTO)))
            .andExpect(status().isCreated());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteMedico() throws Exception {
        // Initialize the database
        medicoRepository.save(medico);
        int databaseSizeBeforeDelete = medicoRepository.findAll().size();

        // Get the medico
        restMedicoMockMvc.perform(delete("/api/medicos/{id}", medico.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medico.class);
        Medico medico1 = new Medico();
        medico1.setId("id1");
        Medico medico2 = new Medico();
        medico2.setId(medico1.getId());
        assertThat(medico1).isEqualTo(medico2);
        medico2.setId("id2");
        assertThat(medico1).isNotEqualTo(medico2);
        medico1.setId(null);
        assertThat(medico1).isNotEqualTo(medico2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicoDTO.class);
        MedicoDTO medicoDTO1 = new MedicoDTO();
        medicoDTO1.setId("id1");
        MedicoDTO medicoDTO2 = new MedicoDTO();
        assertThat(medicoDTO1).isNotEqualTo(medicoDTO2);
        medicoDTO2.setId(medicoDTO1.getId());
        assertThat(medicoDTO1).isEqualTo(medicoDTO2);
        medicoDTO2.setId("id2");
        assertThat(medicoDTO1).isNotEqualTo(medicoDTO2);
        medicoDTO1.setId(null);
        assertThat(medicoDTO1).isNotEqualTo(medicoDTO2);
    }
}
