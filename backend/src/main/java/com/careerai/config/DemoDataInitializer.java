package com.careerai.config;

import com.careerai.domain.entity.*;
import com.careerai.domain.enums.*;
import com.careerai.domain.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DemoDataInitializer implements CommandLineRunner {

    @Value("${app.seed-demo-data:false}")
    private boolean seedDemoData;

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedDemoData) {
            log.info("Demo data seeding is disabled.");
            return;
        }

        if (userRepository.count() > 0) {
            log.info("Database already contains data, skipping demo seeding.");
            return;
        }

        log.info("Seeding demo data into H2 Database...");

        // 1. Admin
        User admin = new User();
        admin.setEmail("admin@careerai.com");
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ROLE_ADMIN);
        userRepository.save(admin);

        // 2. Company
        User companyUser = new User();
        companyUser.setEmail("recruiter@techcorp.com");
        companyUser.setPasswordHash(passwordEncoder.encode("company123"));
        companyUser.setRole(Role.ROLE_COMPANY);
        
        CompanyProfile company = new CompanyProfile();
        company.setUser(companyUser);
        company.setCompanyName("TechCorp Global");
        company.setIndustry("Software Engineering");
        company.setLocation("Bangalore, India");
        company.setIsVerified(true);
        companyUser.setCompanyProfile(company);
        
        userRepository.save(companyUser);

        // 3. Students
        User student1 = createStudent("ashish@student.com", "Ashish Sharma", "Computer Science", 
                new BigDecimal("8.5"), List.of("Java", "Spring Boot", "React"));
        User student2 = createStudent("priya@student.com", "Priya Patel", "Information Technology", 
                new BigDecimal("9.2"), List.of("Python", "Machine Learning", "SQL"));
        User student3 = createStudent("rahul@student.com", "Rahul Verma", "Electronics", 
                new BigDecimal("7.8"), List.of("C++", "Embedded Systems"));

        // 4. Jobs
        Job job1 = createJob(company, "Backend Developer", "Java, Spring Boot, Microservices", 
                List.of("Java", "Spring Boot", "SQL"));
        Job job2 = createJob(company, "Frontend Engineer", "React, Tailwind, UI/UX", 
                List.of("React", "JavaScript", "CSS"));
        Job job3 = createJob(company, "Data Scientist", "Python, ML, Data Analytics", 
                List.of("Python", "Machine Learning", "SQL"));

        jobRepository.saveAll(List.of(job1, job2, job3));

        // 5. Applications & Interviews
        JobApplication app1 = createApplication(job1, student1.getStudentProfile(), 85, ApplicationStatus.INTERVIEW);
        JobApplication app2 = createApplication(job2, student1.getStudentProfile(), 60, ApplicationStatus.REJECTED);
        JobApplication app3 = createApplication(job3, student2.getStudentProfile(), 92, ApplicationStatus.SHORTLISTED);

        applicationRepository.saveAll(List.of(app1, app2, app3));

        // Add Interview to app1
        Interview interview = new Interview();
        interview.setApplication(app1);
        interview.setInterviewType(InterviewType.TECHNICAL_ROUND_1);
        interview.setScheduledTime(LocalDateTime.now().plusDays(2));
        interview.setMeetingLink("https://meet.google.com/abc-xyz");
        interview.setStatus("Scheduled");
        app1.getInterviews().add(interview);
        applicationRepository.save(app1);

        log.info("Demo data seeding completed successfully.");
    }

    private User createStudent(String email, String name, String branch, BigDecimal cgpa, List<String> skills) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode("student123"));
        user.setRole(Role.ROLE_STUDENT);

        StudentProfile profile = new StudentProfile();
        profile.setUser(user);
        profile.setFullName(name);
        profile.setBranch(branch);
        profile.setCgpa(cgpa);
        profile.setSkills(skills);
        
        // Add mock resume
        Resume resume = new Resume();
        resume.setFileName(name.replace(" ", "_") + "_Resume.pdf");
        resume.setFileSizeBytes(1024500L);
        resume.setContentType("application/pdf");
        resume.setFileData("Mock PDF Content".getBytes());
        resume.setStudent(profile);
        profile.getResumes().add(resume);

        user.setStudentProfile(profile);
        return userRepository.save(user);
    }

    private Job createJob(CompanyProfile company, String title, String desc, List<String> skills) {
        Job job = new Job();
        job.setCompany(company);
        job.setTitle(title);
        job.setDescription(desc);
        job.setLocation("Remote");
        job.setSalaryRange("10 LPA - 15 LPA");
        job.setJobType(JobType.FULL_TIME);
        job.setExperienceLevel("Entry Level");
        job.setRequiredSkills(skills);
        return job;
    }

    private JobApplication createApplication(Job job, StudentProfile student, int matchPercentage, ApplicationStatus status) {
        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setStudent(student);
        app.setResume(student.getResumes().get(0));
        app.setMatchPercentage(matchPercentage);
        app.setStatus(status);
        return app;
    }
}
