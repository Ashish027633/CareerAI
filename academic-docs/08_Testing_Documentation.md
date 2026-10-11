# Testing Documentation & Test Cases
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Testing Strategy
CareerAI employs a multi-tiered testing strategy:
1. **Automated Unit & Integration Tests**: Executed locally using JUnit 5 (Java) and Pytest (Python) to ensure functional correctness.
2. **API & End-to-End (E2E) Tests**: Python-based synthetic testing scripts running against the live production deployment.
3. **Manual UI/UX Testing**: Visual validation across desktop and mobile form factors.

---

## 2. Automated Test Suite Results (Baseline)
The following automated tests were executed successfully against the local codebase before production deployment:

### Backend (Java/Maven)
- **Command**: `mvnw test`
- **Result**: `PASS`
- **Metrics**: Tests run: 19, Failures: 0, Errors: 0, Skipped: 0.
- **Coverage**: Authentication logic, JWT validation, Resume blob persistence, Database constraints.

### AI Microservice (Python/Pytest)
- **Command**: `python -m pytest`
- **Result**: `PASS`
- **Metrics**: Tests run: 16, Failures: 0, Errors: 0.
- **Coverage**: PyMuPDF extraction, JSON payload validation, `x-api-key` header verification, File extension validation.

---

## 3. End-to-End (Live Deployment) Test Cases

*These test cases were executed against the live Vercel frontend and Render backend endpoints.*

| Test ID | Module | Scenario | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Frontend | Load Vercel UI home page. | Homepage renders HTTP 200 OK without errors. | Renders perfectly with Tailwind styling. | **PASS** |
| **TC-02** | Auth | Register a new student account. | HTTP 200 OK + JWT returned. | Success. | **PASS** |
| **TC-03** | Auth | Register duplicate email. | HTTP 400 "Email is already in use". | Success. | **PASS** |
| **TC-04** | Auth | Login with valid credentials. | HTTP 200 OK + JWT returned. | Success. | **PASS** |
| **TC-05** | Database | Verify data persistence after server restart. | Registered user can still log in after Render cold-start. | User login successful against Aiven MySQL. | **PASS** |
| **TC-06** | Vault | Upload 2MB PDF Resume via Dashboard. | HTTP 200 OK, saved to DB. | Success. | **PASS** |
| **TC-07** | Security | Access protected `/api/admin` route with Student JWT. | HTTP 403 Forbidden. | Success. | **PASS** |
| **TC-08** | Integration | **Live AI Resume Analysis Flow** | Backend routes PDF to AI service, returning JSON intelligence. | **HTTP 500 "Resume analysis service is currently unavailable"** | **FAIL** (See Note) |

### Note on TC-08 (Live AI Resume Analysis Flow)
**Status: BLOCKED / FAIL**
During the final live deployment tests on Render, the Java backend encountered an HTTP 500 error when attempting to route the PDF to the Python AI service. 
- **Diagnosis**: The Python AI service is healthy and responding to direct `/health` pings. However, because it was deployed slightly after the backend, the backend did not successfully receive the dynamic `RENDER_EXTERNAL_URL` and `API_KEY` via the Render Blueprint. 
- **Resolution Plan**: A manual redeploy of the Java backend on the Render dashboard is required to sync the environment variables. **Do not mark this test as PASS until the redeploy is executed and verified.**
