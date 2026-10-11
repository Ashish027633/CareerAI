# CareerAI Academic Documentation
**Java PBL (Problem Based Learning) – A.Y. 2026–27**

This directory contains the complete, editable academic documentation package for the **CareerAI — AI-Based Placement & Resume Analyzer** project, tailored to fulfill the 100-mark college PBL evaluation rubric.

## Master Index

### 1. Planning & Requirements
- [`01_Project_Abstract.md`](./01_Project_Abstract.md): The core abstract, problem statement, and scope.
- [`02_SRS.md`](./02_SRS.md): Software Requirements Specification including FRs, NFRs, and User Classes.

### 2. Design & Architecture
- [`03_UML_Design.md`](./03_UML_Design.md): Mermaid-rendered diagrams for Use-case, Class, Auth Sequence, AI Sequence, and Deployment.
- [`04_Database_Design.md`](./04_Database_Design.md): Aiven MySQL Entity-Relationship schema and Data Dictionary.
- [`05_UI_Design.md`](./05_UI_Design.md): Frontend architectural notes and a checklist for capturing live screenshots.

### 3. Team & Progress Tracking
- [`06_Team_Module_Plan.md`](./06_Team_Module_Plan.md): Distribution of the 5 core modules among team members.
- [`07_Weekly_Progress_Plan.md`](./07_Weekly_Progress_Plan.md): The 10-week execution timeline, work-log templates, and meeting minutes.

### 4. Testing & Delivery
- [`08_Testing_Documentation.md`](./08_Testing_Documentation.md): Multi-tiered testing strategy and live End-to-End test outcomes.
- [`09_Final_Project_Report.md`](./09_Final_Project_Report.md): The comprehensive master report encompassing all phases, complete with certificate and declaration templates.
- [`10_Presentation_Outline.md`](./10_Presentation_Outline.md): A 15-slide structural guide for the final PowerPoint presentation.
- [`11_Demo_Viva_Guide.md`](./11_Demo_Viva_Guide.md): Live demo script and 30 curated viva Q&A spanning Java, React, MySQL, and NLP.

---

## Action Items for the Team
Before submitting these documents to your Project Guide, you MUST complete the following:

1. **Fill Placeholders**: Search for brackets like `[Student 1 Name]` or `[Guide Name]` across all documents and replace them with actual details.
2. **Capture Screenshots**: Follow the checklist in `05_UI_Design.md` to capture images from the live URL and insert them into your Final Project Report.
3. **Verify AI Integration Status**: `08_Testing_Documentation.md` notes that the live AI Resume Analysis flow is currently blocked pending a manual Render sync. Once the backend is redeployed and tested, update the test result to `PASS`.
4. **Mentor Confirmation**: Confirm with your mentor that the modern variations used in this project (React + Tailwind instead of Bootstrap 5, and JWT instead of Stateful Sessions) meet the academic rubric requirements.

## Document Export Options
These Markdown documents are designed to be highly readable on GitHub. To submit them as Word Documents (DOCX) or PDFs:
- **VS Code**: Install an extension like `Markdown PDF` or `Markdown All in One` to print the files directly.
- **Online Tools**: Copy the markdown text into an editor like [Dillinger.io](https://dillinger.io/) or [StackEdit.io](https://stackedit.io/) to export as PDF.
- **Pandoc**: If you have Pandoc installed, run `pandoc 09_Final_Project_Report.md -o Final_Report.docx`.
