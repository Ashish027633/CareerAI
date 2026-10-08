package com.careerai.domain.repository;

import com.careerai.domain.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByStudentId(Long studentId);
    List<JobApplication> findByJobId(Long jobId);
    List<JobApplication> findByJob_Company_Id(Long companyId);
    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);
}
