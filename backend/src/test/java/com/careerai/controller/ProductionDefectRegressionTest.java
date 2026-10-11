package com.careerai.controller;

import com.careerai.domain.entity.*;
import com.careerai.domain.enums.ApplicationStatus;
import com.careerai.domain.enums.JobType;
import com.careerai.domain.enums.Role;
import com.careerai.domain.repository.*;
import com.careerai.security.JwtService;
import com.careerai.security.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import org.springframework.mock.web.MockMultipartFile;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ProductionDefectRegressionTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ResumeAnalysisRepository resumeAnalysisRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        interviewRepository.deleteAll();
        jobApplicationRepository.deleteAll();
        resumeAnalysisRepository.deleteAll();
        resumeRepository.deleteAll();
        jobRepository.deleteAll();
        companyProfileRepository.deleteAll();
        studentProfileRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("Defect 1 & 2: Company registration persists all fields and returns companyName in AuthResponse")
    void testCompanyRegistrationPayloadAndAuthResponse() throws Exception {
        String payload = """
            {
                "companyName": "Acme Innovations Ltd",
                "email": "careers@acmeinnovations.com",
                "password": "SecurePassword123!",
                "industry": "Fintech & Cloud",
                "website": "https://acmeinnovations.com"
            }
            """;

        mockMvc.perform(post("/api/auth/register/company")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.user.companyName").value("Acme Innovations Ltd"))
                .andExpect(jsonPath("$.data.user.role").value("ROLE_COMPANY"))
                .andExpect(jsonPath("$.data.token").isNotEmpty());

        CompanyProfile profile = companyProfileRepository.findAll().stream()
                .filter(c -> "Acme Innovations Ltd".equals(c.getCompanyName()))
                .findFirst()
                .orElseThrow();

        assertEquals("Fintech & Cloud", profile.getIndustry());
        assertEquals("https://acmeinnovations.com", profile.getWebsite());
    }

    @Test
    @DisplayName("Defect 2: Student registration maps student-specific fields and returns fullName")
    void testStudentRegistrationPayloadAndAuthResponse() throws Exception {
        String payload = """
            {
                "fullName": "Alex Mercer",
                "email": "alex.mercer@univ.edu",
                "password": "SecurePassword123!",
                "phone": "+1-555-0199",
                "college": "Apex Institute of Technology",
                "branch": "Computer Science",
                "graduationYear": "2026"
            }
            """;

        mockMvc.perform(post("/api/auth/register/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.user.fullName").value("Alex Mercer"))
                .andExpect(jsonPath("$.data.user.role").value("ROLE_STUDENT"))
                .andExpect(jsonPath("$.data.token").isNotEmpty());

        StudentProfile profile = studentProfileRepository.findAll().stream()
                .filter(s -> "Alex Mercer".equals(s.getFullName()))
                .findFirst()
                .orElseThrow();

        assertEquals("+1-555-0199", profile.getPhone());
        assertEquals("Apex Institute of Technology", profile.getCollege());
        assertEquals("Computer Science", profile.getBranch());
        assertEquals(2026, profile.getGraduationYear());
    }

    @Test
    @DisplayName("Defect 2: Company registration validation fails with 400 Bad Request if email is missing")
    void testCompanyRegistrationValidationFailsWithoutEmail() throws Exception {
        String payload = """
            {
                "companyName": "Acme Innovations Ltd",
                "password": "SecurePassword123!"
            }
            """;

        mockMvc.perform(post("/api/auth/register/company")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Auth: Student login authenticates valid credentials and returns populated UserDto with fullName")
    void testStudentLoginSuccessful() throws Exception {
        // Register student first
        String regPayload = """
            {
                "fullName": "Maya Lin",
                "email": "maya.lin@univ.edu",
                "password": "SecurePassword123!"
            }
            """;
        mockMvc.perform(post("/api/auth/register/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(regPayload))
                .andExpect(status().isOk());

        // Login with registered credentials
        String loginPayload = """
            {
                "email": "maya.lin@univ.edu",
                "password": "SecurePassword123!"
            }
            """;
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").isNotEmpty())
                .andExpect(jsonPath("$.data.user.email").value("maya.lin@univ.edu"))
                .andExpect(jsonPath("$.data.user.fullName").value("Maya Lin"))
                .andExpect(jsonPath("$.data.user.role").value("ROLE_STUDENT"));
    }

    @Test
    @DisplayName("Auth: Company login authenticates valid credentials and returns populated UserDto with companyName")
    void testCompanyLoginSuccessful() throws Exception {
        // Register company first
        String regPayload = """
            {
                "companyName": "Stark Industries",
                "email": "hr@stark.com",
                "password": "SecurePassword123!"
            }
            """;
        mockMvc.perform(post("/api/auth/register/company")
                .contentType(MediaType.APPLICATION_JSON)
                .content(regPayload))
                .andExpect(status().isOk());

        // Login with registered credentials
        String loginPayload = """
            {
                "email": "hr@stark.com",
                "password": "SecurePassword123!"
            }
            """;
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").isNotEmpty())
                .andExpect(jsonPath("$.data.user.email").value("hr@stark.com"))
                .andExpect(jsonPath("$.data.user.companyName").value("Stark Industries"))
                .andExpect(jsonPath("$.data.user.role").value("ROLE_COMPANY"));
    }

    @Test
    @DisplayName("Auth: Login rejects wrong password or non-existent user with 401 Unauthorized")
    void testLoginFailureHandling() throws Exception {
        String wrongPassPayload = """
            {
                "email": "nonexistent@test.com",
                "password": "WrongPassword123!"
            }
            """;
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(wrongPassPayload))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value(containsString("Bad credentials")));
    }

    @Test
    @DisplayName("Defect 3: Company dashboard stats returns genuine 0s when no jobs or applicants exist")
    void testCompanyDashboardStatsReturnsTruthfulEmptyState() throws Exception {
        User companyUser = new User();
        companyUser.setEmail("recruiter@brandnewcompany.com");
        companyUser.setPasswordHash(passwordEncoder.encode("password"));
        companyUser.setRole(Role.ROLE_COMPANY);
        companyUser.setIsActive(true);
        userRepository.save(companyUser);

        CompanyProfile company = new CompanyProfile();
        company.setUser(companyUser);
        company.setCompanyName("Brand New Company");
        companyProfileRepository.save(company);

        String token = jwtService.generateToken(new UserDetailsImpl(companyUser));

        mockMvc.perform(get("/api/company/dashboard/stats")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.activeJobs").value(0))
                .andExpect(jsonPath("$.data.totalApplicants").value(0))
                .andExpect(jsonPath("$.data.shortlisted").value(0))
                .andExpect(jsonPath("$.data.interviews").value(0))
                .andExpect(jsonPath("$.data.selected").value(0));
    }

    @Test
    @DisplayName("Defect 4: Company applications endpoint provides strict tenant isolation across companies")
    void testCompanyApplicationsTenantIsolation() throws Exception {
        // Company 1
        User compUser1 = new User();
        compUser1.setEmail("comp1@test.com");
        compUser1.setPasswordHash(passwordEncoder.encode("password"));
        compUser1.setRole(Role.ROLE_COMPANY);
        compUser1.setIsActive(true);
        userRepository.save(compUser1);

        CompanyProfile comp1 = new CompanyProfile();
        comp1.setUser(compUser1);
        comp1.setCompanyName("Company One");
        companyProfileRepository.save(comp1);

        // Company 2
        User compUser2 = new User();
        compUser2.setEmail("comp2@test.com");
        compUser2.setPasswordHash(passwordEncoder.encode("password"));
        compUser2.setRole(Role.ROLE_COMPANY);
        compUser2.setIsActive(true);
        userRepository.save(compUser2);

        CompanyProfile comp2 = new CompanyProfile();
        comp2.setUser(compUser2);
        comp2.setCompanyName("Company Two");
        companyProfileRepository.save(comp2);

        // Student
        User studentUser = new User();
        studentUser.setEmail("applicant@test.com");
        studentUser.setPasswordHash(passwordEncoder.encode("password"));
        studentUser.setRole(Role.ROLE_STUDENT);
        studentUser.setIsActive(true);
        userRepository.save(studentUser);

        StudentProfile student = new StudentProfile();
        student.setUser(studentUser);
        student.setFullName("Applicant Student");
        studentProfileRepository.save(student);

        Resume resume = new Resume();
        resume.setStudent(student);
        resume.setFileName("student_resume.pdf");
        resume.setFileSizeBytes(1024L);
        resume.setContentType("application/pdf");
        resume.setFileData(new byte[]{1, 2, 3});
        resume.setIsActive(true);
        resumeRepository.save(resume);

        // Job under Company 1
        Job job1 = new Job();
        job1.setCompany(comp1);
        job1.setTitle("Backend Engineer");
        job1.setDescription("Build scalable services");
        job1.setLocation("Remote");
        job1.setSalaryRange("$100k - $120k");
        job1.setJobType(JobType.FULL_TIME);
        job1.setExperienceLevel("ENTRY");
        job1.setIsActive(true);
        jobRepository.save(job1);

        // Application to Job 1
        JobApplication app1 = new JobApplication();
        app1.setJob(job1);
        app1.setStudent(student);
        app1.setResume(resume);
        app1.setStatus(ApplicationStatus.APPLIED);
        app1.setMatchPercentage(85);
        jobApplicationRepository.save(app1);

        String token1 = jwtService.generateToken(new UserDetailsImpl(compUser1));
        String token2 = jwtService.generateToken(new UserDetailsImpl(compUser2));

        // Company 1 should see the application
        mockMvc.perform(get("/api/company/applications")
                .header("Authorization", "Bearer " + token1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].studentName").value("Applicant Student"))
                .andExpect(jsonPath("$.data[0].studentEmail").value("applicant@test.com"))
                .andExpect(jsonPath("$.data[0].jobTitle").value("Backend Engineer"))
                .andExpect(jsonPath("$.data[0].matchPercentage").value(85));

        // Company 2 should NOT see Company 1's application
        mockMvc.perform(get("/api/company/applications")
                .header("Authorization", "Bearer " + token2))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    @DisplayName("Defect 5: Unanalyzed student resume returns 404 instead of fabricated score")
    void testResumeAnalysisNotFoundWhenUnanalyzed() throws Exception {
        User studentUser = new User();
        studentUser.setEmail("unanalyzed.student@test.com");
        studentUser.setPasswordHash(passwordEncoder.encode("password"));
        studentUser.setRole(Role.ROLE_STUDENT);
        studentUser.setIsActive(true);
        userRepository.save(studentUser);

        StudentProfile student = new StudentProfile();
        student.setUser(studentUser);
        student.setFullName("Unanalyzed Student");
        studentProfileRepository.save(student);

        String token = jwtService.generateToken(new UserDetailsImpl(studentUser));

        // Without resume, 404
        mockMvc.perform(get("/api/resumes/analysis")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Defect 4: Successive resume uploads deactivate older resumes and isolate the active one")
    void testMultipleResumeUploadsIsolateActiveResume() throws Exception {
        User studentUser = new User();
        studentUser.setEmail("upload.student@test.com");
        studentUser.setPasswordHash(passwordEncoder.encode("password"));
        studentUser.setRole(Role.ROLE_STUDENT);
        studentUser.setIsActive(true);
        userRepository.save(studentUser);

        StudentProfile student = new StudentProfile();
        student.setUser(studentUser);
        student.setFullName("Upload Student");
        studentProfileRepository.save(student);

        String token = jwtService.generateToken(new UserDetailsImpl(studentUser));

        MockMultipartFile file1 = new MockMultipartFile(
                "file",
                "resume_v1.pdf",
                "application/pdf",
                "%PDF-1.4 synthetic pdf version 1".getBytes()
        );

        mockMvc.perform(multipart("/api/resumes/upload")
                .file(file1)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.fileName").value("resume_v1.pdf"))
                .andExpect(jsonPath("$.data.isActive").value(true));

        MockMultipartFile file2 = new MockMultipartFile(
                "file",
                "resume_v2.pdf",
                "application/pdf",
                "%PDF-1.4 synthetic pdf version 2".getBytes()
        );

        mockMvc.perform(multipart("/api/resumes/upload")
                .file(file2)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.fileName").value("resume_v2.pdf"))
                .andExpect(jsonPath("$.data.isActive").value(true));

        // Verify my-resume endpoint returns the latest active resume
        mockMvc.perform(get("/api/resumes/my-resume")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.fileName").value("resume_v2.pdf"))
                .andExpect(jsonPath("$.data.isActive").value(true));

        var resumes = resumeRepository.findByStudentId(student.getId());
        assertEquals(2, resumes.size());
        Resume v1 = resumes.stream().filter(r -> "resume_v1.pdf".equals(r.getFileName())).findFirst().orElseThrow();
        Resume v2 = resumes.stream().filter(r -> "resume_v2.pdf".equals(r.getFileName())).findFirst().orElseThrow();
        assertFalse(v1.getIsActive(), "Older resume must be deactivated");
        assertTrue(v2.getIsActive(), "Latest resume must be active");
    }

    @Test
    @DisplayName("Defect 5: Resume upload automatically analyzes document and serves intelligence on /analysis and /analyze without errors")
    void testResumeUploadAndAnalysisResilientFlow() throws Exception {
        User studentUser = new User();
        studentUser.setEmail("ashish.demo@college.edu");
        studentUser.setPasswordHash(passwordEncoder.encode("password"));
        studentUser.setRole(Role.ROLE_STUDENT);
        studentUser.setIsActive(true);
        userRepository.save(studentUser);

        StudentProfile student = new StudentProfile();
        student.setUser(studentUser);
        student.setFullName("Ashish Sharma");
        student.setCollege("National Institute of Technology");
        student.setBranch("Computer Science");
        student.setGraduationYear(2026);
        studentProfileRepository.save(student);

        String token = jwtService.generateToken(new UserDetailsImpl(studentUser));

        // Create a valid synthetic PDF with content
        byte[] pdfContent = ("%PDF-1.4\n" +
                "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n" +
                "2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n" +
                "3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\n" +
                "xref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\n" +
                "trailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF\n" +
                "EDUCATION: B.Tech Computer Science\n" +
                "SKILLS: Java, Spring Boot, React, MySQL, Docker, REST API, Git\n" +
                "PROJECTS: CareerAI Placement Portal\n" +
                "EXPERIENCE: Software Developer Intern\n" +
                "CERTIFICATIONS: Oracle Java Certified\n").getBytes();

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "Ashish_Resume.pdf",
                "application/pdf",
                pdfContent
        );

        // 1. Upload resume
        mockMvc.perform(multipart("/api/resumes/upload")
                .file(file)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.fileName").value("Ashish_Resume.pdf"))
                .andExpect(jsonPath("$.data.isActive").value(true));

        // 2. GET /analysis immediately returns analysis
        mockMvc.perform(get("/api/resumes/analysis")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.overallScore", greaterThan(0)))
                .andExpect(jsonPath("$.data.categoryScores.skills", greaterThan(0)))
                .andExpect(jsonPath("$.data.categoryScores.education", greaterThan(0)))
                .andExpect(jsonPath("$.data.categoryScores.projects", greaterThan(0)))
                .andExpect(jsonPath("$.data.skills", hasItem("Java")))
                .andExpect(jsonPath("$.data.recommendations", not(empty())));

        // 3. POST /analyze triggers re-analysis without 500 error even if external AI is down
        mockMvc.perform(post("/api/resumes/analyze")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.overallScore", greaterThan(0)))
                .andExpect(jsonPath("$.data.categoryScores.structure", greaterThan(0)))
                .andExpect(jsonPath("$.data.recommendations", not(empty())));
    }
}
