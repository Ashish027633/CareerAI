# UML Design
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Use-Case Diagram

```mermaid
usecaseDiagram
    actor Student
    actor Company
    actor Admin

    package "CareerAI System" {
        usecase "Register & Login" as UC1
        usecase "Upload Resume" as UC2
        usecase "Get AI Resume Analysis" as UC3
        usecase "Apply for Jobs" as UC4
        
        usecase "Post Job Openings" as UC5
        usecase "View Candidate Matches" as UC6
        usecase "Schedule Interviews" as UC7
        
        usecase "View System Metrics" as UC8
        usecase "Manage Users" as UC9
    }

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4

    Company --> UC1
    Company --> UC5
    Company --> UC6
    Company --> UC7

    Admin --> UC1
    Admin --> UC8
    Admin --> UC9
```

## 2. Class Diagram (Core Entities)

```mermaid
classDiagram
    class User {
        +Long id
        +String email
        +String passwordHash
        +Role role
    }

    class StudentProfile {
        +Long id
        +String fullName
        +String branch
        +BigDecimal cgpa
        +List~String~ skills
    }

    class CompanyProfile {
        +Long id
        +String companyName
        +String industry
        +String location
        +Boolean isVerified
    }

    class Resume {
        +Long id
        +String fileName
        +byte[] fileData
        +Long fileSizeBytes
        +String contentType
    }

    class Job {
        +Long id
        +String title
        +String description
        +List~String~ requiredSkills
        +String location
    }

    class JobApplication {
        +Long id
        +Integer matchPercentage
        +ApplicationStatus status
    }

    User "1" -- "1" StudentProfile : has
    User "1" -- "1" CompanyProfile : has
    StudentProfile "1" -- "*" Resume : owns
    CompanyProfile "1" -- "*" Job : posts
    StudentProfile "1" -- "*" JobApplication : submits
    Job "1" -- "*" JobApplication : receives
    Resume "1" -- "*" JobApplication : attachedTo
```

## 3. Sequence Diagram: Authentication (JWT Flow)

```mermaid
sequenceDiagram
    participant Client as React Frontend
    participant AuthCtrl as AuthController
    participant AuthService as AuthService
    participant DB as MySQL DB
    participant JWT as JwtService

    Client->>AuthCtrl: POST /api/auth/login {email, password}
    AuthCtrl->>AuthService: login(request)
    AuthService->>DB: findByEmail(email)
    DB-->>AuthService: User Entity
    AuthService->>AuthService: BCrypt Verify Password
    AuthService->>JWT: generateToken(UserDetails)
    JWT-->>AuthService: Token String
    AuthService-->>AuthCtrl: AuthResponse(token)
    AuthCtrl-->>Client: 200 OK + JWT
```

## 4. Sequence Diagram: AI Resume Analysis

```mermaid
sequenceDiagram
    participant Client as React Frontend
    participant ResumeCtrl as ResumeController
    participant DB as MySQL DB
    participant AiClient as AiServiceClient
    participant AiApp as Python FastAPI

    Client->>ResumeCtrl: POST /api/resumes/{id}/analyze (Requires JWT)
    ResumeCtrl->>DB: fetch Resume blob
    DB-->>ResumeCtrl: byte[] pdfData
    ResumeCtrl->>AiClient: analyzeResume(pdfData)
    AiClient->>AiApp: POST /api/v1/analyze-resume (x-api-key)
    activate AiApp
    AiApp->>AiApp: PyMuPDF Text Extraction
    AiApp->>AiApp: Clean & Detect Sections
    AiApp->>AiApp: Rule-based Scoring
    AiApp-->>AiClient: 200 OK + JSON Analysis
    deactivate AiApp
    AiClient-->>ResumeCtrl: Map<String, Object> response
    ResumeCtrl-->>Client: 200 OK + AI Feedback
```

## 5. Deployment Diagram

```mermaid
graph TD
    subgraph "Client Tier"
        Browser[Web Browser]
    end

    subgraph "Vercel (Frontend Hosting)"
        React[React + Tailwind SPA]
    end

    subgraph "Render (Backend Hosting)"
        Spring[Java Spring Boot Application]
        Python[FastAPI AI Microservice]
    end

    subgraph "Aiven (Cloud Database)"
        MySQL[(MySQL 8+ Database)]
    end

    Browser -->|HTTPS| React
    Browser -->|REST / JSON| Spring
    Spring -->|JDBC / TLS| MySQL
    Spring -->|HTTP POST| Python
```
