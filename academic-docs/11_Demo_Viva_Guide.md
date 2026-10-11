# Demo & Viva Guide
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Live Demonstration Script (5-8 Minutes)

### Prerequisites & Cold-Start Recovery
Because the application is hosted on free tiers (Render), the backend and AI service may "sleep" after 15 minutes of inactivity.
- **Action**: At least 3 minutes before the demo, visit `https://careerai-backend-4soo.onrender.com/api/health` and `https://careerai-ai-service.onrender.com/health` in your browser to wake up the servers.
- **Backup**: Always keep the screenshots (from `05_UI_Design.md`) open in a separate tab in case the live environment fails due to network issues.

### The Flow
1. **Introduction**: Open the public Vercel homepage. Explain the objective briefly.
2. **Student Flow**:
   - Register a new student (or log in as an existing student).
   - Navigate to **Resume Vault**.
   - Upload a sample PDF resume.
   - Click **Analyze**. Show the returned JSON parsed data rendered nicely on the frontend (ATS Score, extracted skills).
3. **Company Flow**:
   - Open an incognito window. Log in as a Company recruiter.
   - Navigate to **Post Job**. Create a dummy job (e.g., "Software Engineer - Java").
   - View the candidates list and point out the "Match Percentage".
4. **Admin Flow** (If time permits):
   - Log in as Admin to show the system metrics and user tables.

---

## 2. Viva Preparation (30 Questions & Answers)

### A. Java, Spring Boot, & MVC
1. **What is Spring Boot and why did you choose it over JSP/Servlet?**
   *Answer*: Spring Boot provides rapid application development by auto-configuring embedded Tomcat servers and dependencies, allowing us to focus on building RESTful APIs rather than boilerplate XML configuration.
2. **Explain the MVC architecture as implemented in your project.**
   *Answer*: Our architecture separates concerns. Model = JPA Entities (e.g., `User`, `Job`). View = React.js frontend. Controller = Spring `@RestController` classes handling HTTP requests and returning JSON.
3. **What is Dependency Injection in Spring?**
   *Answer*: It is a design pattern where Spring's Inversion of Control (IoC) container automatically creates and injects required objects (beans) into classes, like injecting `UserRepository` into `AuthService` using `@RequiredArgsConstructor`.
4. **How do you handle global exceptions?**
   *Answer*: We use a `@RestControllerAdvice` class (`GlobalExceptionHandler`) to catch exceptions like `UsernameNotFoundException` and format them into consistent JSON responses.

### B. Database & JPA (Aiven MySQL)
5. **Why use MySQL over NoSQL for this project?**
   *Answer*: Placements require highly structured, relational data (e.g., A student *has* a resume which *applies* to a job). MySQL ensures ACID compliance and referential integrity.
6. **What is Spring Data JPA?**
   *Answer*: It's an abstraction layer over Hibernate that allows us to interact with the database using Java interfaces (like `CrudRepository`) instead of writing raw SQL.
7. **How is the PDF resume stored in the database?**
   *Answer*: It is stored as a `LONGBLOB` in the `resumes` table. This prevents unauthorized public URL access and allows us to enforce strict RBAC checks before serving the file bytes.
8. **What does `ddl-auto=update` do?**
   *Answer*: It tells Hibernate to automatically update the MySQL database schema to match our Java entities upon startup, without destroying existing data.

### C. Security, JWT & Sessions
9. **The PBL guidelines mention "Sessions". How did you implement this?**
   *Answer*: Instead of traditional stateful server-side HTTP sessions (which don't scale well with React/Microservices), we used **JSON Web Tokens (JWT)** for stateless, secure session management.
10. **What is JWT?**
    *Answer*: A digitally signed token containing user claims (like user ID and role). The frontend stores it and sends it in the `Authorization` header with every request.
11. **How are passwords stored?**
    *Answer*: Passwords are never stored in plaintext. They are hashed using **BCrypt**, a computationally expensive hashing algorithm with a built-in salt, making it resilient to rainbow-table attacks.
12. **How is Role-Based Access Control (RBAC) enforced?**
    *Answer*: Using Spring Security's `@PreAuthorize("hasRole('STUDENT')")` annotations on controller methods.

### D. AI Microservice (Python & NLP)
13. **Why use Python for the AI service instead of Java?**
    *Answer*: Python has superior libraries for Natural Language Processing (NLTK, Scikit-Learn) and PDF parsing (PyMuPDF) compared to Java.
14. **How does the Java backend communicate with the Python service?**
    *Answer*: Through REST API HTTP POST requests using Spring's `RestClient`, secured via an environment-based `x-api-key` header.
15. **How is text extracted from the PDF?**
    *Answer*: We use `PyMuPDF` (fitz) to read the binary PDF data and extract the raw text blocks.
16. **Is this a generative AI or LLM?**
    *Answer*: No. It is an extractive, NLP rule-based engine. It uses predefined taxonomies and pattern matching to extract entities, ensuring predictable and fast results without high compute costs.
17. **How does the TF-IDF Job Matching work?**
    *Answer*: TF-IDF (Term Frequency-Inverse Document Frequency) transforms the resume text and the job description into mathematical vectors. We then calculate the **Cosine Similarity** between these vectors to generate a match percentage.

### E. Frontend (React & Tailwind)
18. **Why React instead of HTML/CSS/JS?**
    *Answer*: React allows us to build a Single Page Application (SPA) with reusable components, providing a much smoother, dynamic user experience without page reloads.
19. **What is Tailwind CSS?**
    *Answer*: A utility-first CSS framework that allows us to rapidly style components directly in the JSX using classes like `flex`, `pt-4`, and `text-center`, making it highly responsive.
20. **How do you handle API calls in React?**
    *Answer*: We use `axios` with interceptors to automatically attach the JWT token to outgoing requests and catch 401 Unauthorized errors to redirect the user to login.

### F. Testing & Deployment
21. **What is a Unit Test?**
    *Answer*: Testing a single class or method in isolation. We used JUnit 5 for Java and Pytest for Python.
22. **What is Docker and why is it used?**
    *Answer*: Docker containerizes the application and its dependencies, ensuring that "if it works on my machine, it works in the cloud."
23. **How is the app deployed?**
    *Answer*: The frontend is deployed statically on Vercel. The Java backend and Python AI service are deployed as Docker web services on Render. The database is hosted on Aiven Cloud.

*(Questions 24-30: Prepare to answer general questions about your specific module and code contributions as listed in the Team Module Plan).*
