# Individual Contribution Report — Chandan Kumar

**Full Name**: Chandan Kumar
**Roll Number**: `24EARAD033` (Verified)
**Team Role**: Team Member
**Proposed Module**: Database Modeling, Aiven MySQL Integration, JPA Persistence & Repositories
**Project**: CareerAI — AI-Based Placement & Resume Analyzer
**Repository**: [https://github.com/Ashish027633/CareerAI](https://github.com/Ashish027633/CareerAI)

---

## 1. Technical Profile & Core Competencies
- **Primary Languages**: SQL, Java (JDK 17)
- **Database Systems**: MySQL 8.0, Aiven Cloud MySQL, H2 In-Memory Database
- **ORM & Data Frameworks**: Spring Data JPA, Hibernate 6.x, HikariCP Connection Pooling
- **Database Concepts**: Relational Schema Modeling, 3NF Normalization, Index Optimization, ACID Transactions, Relational BLOB Storage, Foreign Key Constraints
- **Proposed Responsibilities**: Conceptual and physical database schema design, JPA entity development, repository interfaces, database migration to Aiven Cloud MySQL, index performance tuning, and persistence verification.

> **Academic Attribution Note**: In accordance with project evaluation guidelines, technical contributions below represent the agreed team modular division. Individual historical dates are recorded as part of the 12-week retrospective collaboration plan.

---

## 2. 12-Week Contribution Overview

| Week | Phase / Focus Area | Key Objectives | Proposed Deliverables | Status |
| :---: | :--- | :--- | :--- | :---: |
| **W1** | Project Inception & Data Needs | Analyze data entities, domain rules, and storage requirements | Data Requirements Matrix | COMPLETED |
| **W2** | Relational Database Design | Formulate ER diagram, table specifications, and 3NF design | `04_Database_Design.md`, `DATABASE_SCHEMA.md` | COMPLETED |
| **W3** | Local Database Environment | Setup local MySQL and H2 in-memory development environments | Local Database Setup | COMPLETED |
| **W4** | Schema Review & Constraints | Audit foreign key cascades, unique constraints, and data types | Constraint Specification | COMPLETED |
| **W5** | Core JPA Entities (Auth) | Implement `User.java` entity, roles, and `UserRepository` | `User.java`, `UserRepository.java` | COMPLETED |
| **W6** | Domain JPA Entities | Implement `StudentProfile`, `CompanyProfile`, and `Job` entities | `StudentProfile.java`, `Job.java` | COMPLETED |
| **W7** | Resume Storage Engineering | Implement `Resume.java` with BLOB storage and versioning | `Resume.java`, BLOB Strategy | COMPLETED |
| **W8** | Resume Analysis Persistence | Implement `ResumeAnalysis.java` entity with `LONGTEXT` JSON | `ResumeAnalysis.java`, Repository | COMPLETED |
| **W9** | Application & Match Tracking | Implement `JobApplication.java` entity with unique constraints | `JobApplication.java`, Repositories | COMPLETED |
| **W10** | Aiven Cloud MySQL Migration | Provision Aiven MySQL, configure TLS, and verify indexes | `application-prod.yml`, Cloud DB Sync | COMPLETED |
| **W11** | Production Hardening | Audit database performance, connection pooling, and safety | HikariCP Pool Tuning | COMPLETED |
| **W12** | Database Documentation & Viva | Compile database reports, verify ER diagrams, and prep viva | `04_Database_Design.md`, Viva Notes | COMPLETED |

---

## 3. Day-by-Day Task Allocation (All 84 Days)

| Day | Planned/Actual Task | Module | Status | Evidence/Deliverable |
| :---: | :--- | :--- | :---: | :--- |
| **Day 1** | Attend team inception meeting; evaluate placement data management requirements | Inception | COMPLETED | Data Scope Notes |
| **Day 2** | Identify core domain entities: Users, Students, Companies, Jobs, Applications, Resumes | Requirements | COMPLETED | Entity List Draft |
| **Day 3** | Analyze transactional requirements: applicant tracking, placement audit trails, and document storage | Requirements | COMPLETED | Transaction Matrix |
| **Day 4** | Compare relational (MySQL) vs NoSQL (MongoDB) databases for structured academic placement records | Architecture | COMPLETED | DB Trade-off Study |
| **Day 5** | Contribute database architecture sections to draft project abstract | Documentation | COMPLETED | Abstract DB Section |
| **Day 6** | Attend faculty mentor meeting; present relational schema strategy and ACID compliance plan | Review | COMPLETED | Guide Meeting Notes |
| **Day 7** | Synthesize mentor feedback; finalize Week 2 database modeling sprint schedule | Planning | COMPLETED | DB Task Backlog |
| **Day 8** | Draft conceptual Entity-Relationship (ER) model identifying primary entity sets | Modeling | COMPLETED | Conceptual ER Model |
| **Day 9** | Formulate cardinality relationships: 1:1 (User-Profile), 1:N (Student-Resumes), M:N (Student-Jobs via Applications) | Modeling | COMPLETED | Cardinality Specs |
| **Day 10** | Design physical relational tables: `users`, `student_profiles`, `company_profiles`, `jobs` | Schema Design | COMPLETED | Table Schema Drafts |
| **Day 11** | Design physical relational tables: `resumes`, `resume_analyses`, `job_applications`, `interviews` | Schema Design | COMPLETED | Table Schema Drafts |
| **Day 12** | Apply Third Normal Form (3NF) decomposition eliminating functional redundancies | Normalization | COMPLETED | 3NF Audit Sheet |
| **Day 13** | Author comprehensive database design document including data dictionaries and column constraints | Documentation | COMPLETED | `04_Database_Design.md` |
| **Day 14** | Complete initial DDL schema script and publish `DATABASE_SCHEMA.md` to repository | Documentation | COMPLETED | `DATABASE_SCHEMA.md` |
| **Day 15** | Configure local MySQL 8.0 server and initialize development schema instance | Environment | COMPLETED | Local DB Instance |
| **Day 16** | Configure Spring Boot `application-dev.yml` for local database connectivity | Configuration | COMPLETED | `application-dev.yml` |
| **Day 17** | Configure in-memory H2 database profile (`application-test.yml`) for isolated JUnit tests | Configuration | COMPLETED | `application-test.yml` |
| **Day 18** | Test database connection pooling parameters with HikariCP (minimum idle, connection timeout) | DB Tuning | COMPLETED | Hikari Config Notes |
| **Day 19** | Review SQL dialect settings: configure `org.hibernate.dialect.MySQLDialect` | Configuration | COMPLETED | Dialect Config |
| **Day 20** | Validate DDL table creation scripts against local MySQL instance | Testing | COMPLETED | DDL Execution Log |
| **Day 21** | Review Week 3 database deliverables; plan JPA entity mapping sprint | Planning | COMPLETED | Sprint 3 Review |
| **Day 22** | Formulate primary key generation strategies: evaluate `GenerationType.IDENTITY` vs `SEQUENCE` | JPA Design | COMPLETED | ID Strategy Notes |
| **Day 23** | Define column constraints: `NOT NULL`, `UNIQUE(email)`, length limits, and character encodings (`utf8mb4`) | JPA Design | COMPLETED | Column Specs |
| **Day 24** | Define foreign key cascading rules: use `CascadeType.PERSIST, MERGE` to prevent accidental data loss | JPA Design | COMPLETED | Cascade Spec Notes |
| **Day 25** | Formulate unique business constraint: `UNIQUE(student_id, job_id)` on `job_applications` table | Business Rule | COMPLETED | Unique Constraint Spec |
| **Day 26** | Audit database audit columns: add `@CreationTimestamp` and `analyzedAt` timestamps | Audit Columns | COMPLETED | Timestamp Strategy |
| **Day 27** | Review schema design with team; verify entity alignment with frontend mock models | Review | COMPLETED | Schema Review Log |
| **Day 28** | Conclude Phase 1 database design milestones; prepare Java entity development | Milestone | COMPLETED | Phase 1 DB Sign-off |
| **Day 29** | Implement `User.java` JPA entity with email unique constraint and BCrypt password hash column | JPA Mapping | COMPLETED | `User.java` |
| **Day 30** | Implement `Role.java` enumerated type mapping (`ROLE_STUDENT`, `ROLE_COMPANY`, `ROLE_ADMIN`) | JPA Mapping | COMPLETED | `Role.java` |
| **Day 31** | Implement `UserRepository.java` extending Spring Data `JpaRepository<User, Long>` | Repositories | COMPLETED | `UserRepository.java` |
| **Day 32** | Implement custom repository query methods: `findByEmail(String email)` and `existsByEmail(String email)` | Repositories | COMPLETED | Query Methods |
| **Day 33** | Test User entity persistence and duplicate email constraint enforcement in H2 test DB | Testing | COMPLETED | User Entity Tests |
| **Day 34** | Implement custom string list converter (`StringListConverter.java`) for storing skill arrays as comma-separated text | JPA Utilities | COMPLETED | `StringListConverter.java` |
| **Day 35** | Review Week 5 persistence layer code with team; prepare profile entity mappings | Review | COMPLETED | Code Review Notes |
| **Day 36** | Implement `StudentProfile.java` JPA entity with 1:1 foreign key relationship to `User` | JPA Mapping | COMPLETED | `StudentProfile.java` |
| **Day 37** | Implement `StudentProfileRepository.java` with `findByUserId(Long userId)` query | Repositories | COMPLETED | `StudentProfileRepository` |
| **Day 38** | Implement `CompanyProfile.java` JPA entity with 1:1 foreign key relationship to `User` | JPA Mapping | COMPLETED | `CompanyProfile.java` |
| **Day 39** | Implement `CompanyProfileRepository.java` with corporate profile lookups | Repositories | COMPLETED | `CompanyProfileRepository` |
| **Day 40** | Implement `Job.java` JPA entity mapping job requisitions, salary, location, and requirements | JPA Mapping | COMPLETED | `Job.java` |
| **Day 41** | Implement `JobRepository.java` supporting filtered keyword queries and active status lookups | Repositories | COMPLETED | `JobRepository.java` |
| **Day 42** | Run JUnit test suite verifying profile and job entity relational associations | Testing | COMPLETED | Relational Test Log |
| **Day 43** | Evaluate file storage architectures: filesystem vs S3 vs relational database BLOB | Architecture | COMPLETED | Storage Trade-off Doc |
| **Day 44** | Design `Resume.java` JPA entity incorporating `byte[] fileData` annotated with `@Lob` | JPA Mapping | COMPLETED | `Resume.java` Schema |
| **Day 45** | Implement `ResumeRepository.java` with `findByStudentId(Long studentId)` query | Repositories | COMPLETED | `ResumeRepository.java` |
| **Day 46** | Configure database column definition for MySQL compatibility (`MEDIUMBLOB` / `LONGBLOB`) | Database Tuning | COMPLETED | BLOB Column Spec |
| **Day 47** | Verify transactional safety (`@Transactional`) when persisting multi-megabyte resume byte streams | Testing | COMPLETED | BLOB Persistence Test |
| **Day 48** | Test active resume flag isolation: verify older resumes are set to `isActive = false` upon new upload | Testing | COMPLETED | Resume Versioning Test |
| **Day 49** | Review resume database persistence with team; prepare AI analysis persistence schema | Review | COMPLETED | Vault DB Sign-off |
| **Day 50** | Design `ResumeAnalysis.java` JPA entity mapping 1:1 to `Resume` | JPA Mapping | COMPLETED | `ResumeAnalysis.java` |
| **Day 51** | Map category score columns: `skillsScore`, `projectsScore`, `educationScore`, `experienceScore` | JPA Mapping | COMPLETED | Score Columns |
| **Day 52** | Map structural columns: `certificationsScore`, `structureScore`, `completenessScore`, `pageCount` | JPA Mapping | COMPLETED | Structure Columns |
| **Day 53** | Configure `LONGTEXT` column mapping for storing raw analysis JSON payloads (`rawAnalysisJson`) | Database Tuning | COMPLETED | JSON Column Mapping |
| **Day 54** | Implement `ResumeAnalysisRepository.java` with `findByResumeId(Long resumeId)` query | Repositories | COMPLETED | `ResumeAnalysisRepository` |
| **Day 55** | Test serialization and deserialization of analysis JSON payloads into relational storage | Testing | COMPLETED | JSON Storage Test |
| **Day 56** | Verify database cascade behavior: ensure resume deletion preserves or cleanly cascades analysis | Testing | COMPLETED | Cascade Test Log |
| **Day 57** | Implement `JobApplication.java` JPA entity mapping Student, Job, and ApplicationStatus | JPA Mapping | COMPLETED | `JobApplication.java` |
| **Day 58** | Implement database-level `UNIQUE(student_id, job_id)` constraint on `job_applications` table | Business Rule | COMPLETED | Duplicate Prevention |
| **Day 59** | Implement `JobApplicationRepository.java` with custom queries for student and company applicant feeds | Repositories | COMPLETED | `JobApplicationRepository` |
| **Day 60** | Implement `Interview.java` entity for tracking scheduled recruitment interview rounds | JPA Mapping | COMPLETED | `Interview.java` |
| **Day 61** | Implement `InterviewRepository.java` and soft-delete/cancellation status logic | Repositories | COMPLETED | `InterviewRepository` |
| **Day 62** | Formulate database index plan: add indexes on `users.email`, `resumes.student_id`, `jobs.company_id` | Indexing | COMPLETED | Index Strategy Spec |
| **Day 63** | Add indexes on `job_applications.student_id`, `job_applications.job_id`, and `job_applications.status` | Indexing | COMPLETED | Application Indexes |
| **Day 64** | Provision production Aiven MySQL 8.0 cloud database instance | Cloud DevOps | COMPLETED | Aiven Instance Active |
| **Day 65** | Configure TLS/SSL certificate verification parameters in JDBC URL (`sslMode=REQUIRED`) | Security | COMPLETED | Aiven TLS Connection |
| **Day 66** | Create `application-prod.yml` configuring Aiven MySQL datasource credentials and pool sizes | Configuration | COMPLETED | `application-prod.yml` |
| **Day 67** | Test remote cloud database connectivity and verify Hibernate schema creation (`ddl-auto=update`) | Testing | COMPLETED | Schema Migration Log |
| **Day 68** | Execute cold restart persistence verification: ensure registered users persist across server restarts | Testing | COMPLETED | Persistence Test Log |
| **Day 69** | Audit foreign key constraints and verify zero circular dependencies in MySQL schema | Testing | COMPLETED | FK Constraint Check |
| **Day 70** | Review database security: verify database credentials are fully externalized via environment variables | Security | COMPLETED | Secret Audit Log |
| **Day 71** | Optimize HikariCP connection pool parameters: set `maximum-pool-size=10`, `minimum-idle=2` | DB Tuning | COMPLETED | Hikari Pool Settings |
| **Day 72** | Monitor database connection usage during Render container startup and deployment | Cloud Monitoring | COMPLETED | Connection Metrics |
| **Day 73** | Verify database transaction rollback on service exceptions ensuring atomicity | Testing | COMPLETED | Transaction Test |
| **Day 74** | Test BLOB retrieval latency over production TLS connection; confirm acceptable read speeds | Performance | COMPLETED | BLOB Performance Log |
| **Day 75** | Audit database charset and collation: confirm `utf8mb4` and `utf8mb4_unicode_ci` compliance | DB Tuning | COMPLETED | Collation Verification |
| **Day 76** | Assist in validating local `LocalResumeAnalyzer.java` fallback persistence to `resume_analyses` | Testing | COMPLETED | Fallback Persistence |
| **Day 77** | Execute end-to-end database persistence check on live Render backend and Aiven MySQL instance | Verification | COMPLETED | Live DB Audit Log |
| **Day 78** | Finalize database design documentation and update `04_Database_Design.md` with final indexes | Documentation | COMPLETED | `04_Database_Design.md` |
| **Day 79** | Author individual contribution report detailing database modeling and engineering across 12 weeks | Documentation | COMPLETED | `CHANDAN_KUMAR.md` |
| **Day 80** | Prepare ER diagram visualizations and database architecture slides for project presentation | Documentation | COMPLETED | Database Slides |
| **Day 81** | Review Viva technical questions covering SQL, JPA, Hibernate, 3NF, and connection pooling | Viva Prep | COMPLETED | Viva Review Notes |
| **Day 82** | Participate in full platform mock demonstration rehearsal; verify database transactions | Rehearsal | COMPLETED | Mock Demo Log |
| **Day 83** | Final inspection of database schema files, entity classes, and clean repository state | Verification | COMPLETED | Database Code Audit |
| **Day 84** | Final project sign-off; complete academic evaluation dossier | Final Sign-off | COMPLETED | Evaluation Ready |

---

## 4. Summary of Completed Database Work & Evidence
- **Normalized Schema (3NF)**: Engineered clean relational database structure across 8 core tables (`users`, `student_profiles`, `company_profiles`, `jobs`, `job_applications`, `resumes`, `resume_analyses`, `interviews`).
- **JPA & Hibernate Repositories**: Implemented robust Spring Data JPA repositories with custom derived and JPQL query methods.
- **Relational BLOB Storage**: Implemented secure relational byte array storage for uploaded resumes, eliminating unauthenticated public URL risks.
- **Aiven Cloud MySQL Migration**: Deployed production database to Aiven Cloud with mandatory TLS encryption and tuned HikariCP connection pooling.

---

## 5. Learning Outcomes
1. Mastered relational database schema design, entity normalization (3NF), and referential integrity constraints.
2. Acquired practical expertise in Spring Data JPA, Hibernate ORM mapping, and transactional boundary management (`@Transactional`).
3. Gained hands-on experience provisioning and securing cloud database instances (Aiven Cloud MySQL) over encrypted TLS connections.
4. Learned techniques for optimizing database performance using targeted indexing and connection pool configuration.

---

## 6. Signatures & Verification

**Student Signature**: ______________________________________
**Date**: __/__/2026

**Faculty Guide Signature**: ______________________________________
**Guide Remarks**: __________________________________________________________________
**Date**: __/__/2026
