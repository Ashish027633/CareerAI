package com.careerai.domain.repository;

import com.careerai.domain.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByApplicationId(Long applicationId);
    List<Interview> findByApplication_Student_Id(Long studentId);
    List<Interview> findByApplication_Job_Company_Id(Long companyId);
}
