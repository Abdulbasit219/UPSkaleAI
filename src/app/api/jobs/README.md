# Job Search Backend API Documentation

## Overview
Complete backend API for the job search feature with authentication, validation, and comprehensive CRUD operations.

## Database Models

### Job Model
- **Fields**: title, company, logo, location, remote, type, experience, salary, description, requirements, responsibilities, skills, featured, urgent, category, status, applicants, postedBy, companyWebsite, applicationDeadline, benefits
- **Indexes**: Text search on title/company/description, category+status, remote, createdAt

### JobApplication Model
- **Fields**: job, user, coverLetter, resume, status, answers, notes, appliedAt
- **Unique Index**: job + user (prevents duplicate applications)

### SavedJob Model
- **Fields**: job, user, notes
- **Unique Index**: job + user (prevents duplicate saves)

## API Endpoints

### 1. GET /api/jobs
Fetch jobs with filtering and pagination.

**Query Parameters:**
- `search` (string): Text search across title, company, description
- `category` (enum): all, tech, intern, remote, design, marketing, sales, other
- `type` (enum): Full-time, Part-time, Contract, Internship
- `remote` (boolean): true/false
- `featured` (boolean): true/false
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `sortBy` (enum): recent, salary, match

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 2. GET /api/jobs/[id]
Get single job details by ID.

**Response:**
```json
{
  "success": true,
  "data": { /* job object */ }
}
```

### 3. POST /api/jobs/create
Create new job posting (requires authentication).

**Request Body:**
```json
{
  "title": "Senior React Developer",
  "company": "TechCorp",
  "location": "San Francisco, CA",
  "remote": true,
  "type": "Full-time",
  "experience": "5+ years",
  "salary": "$120K - $160K",
  "description": "...",
  "skills": ["React", "TypeScript", "Node.js"],
  "category": "tech",
  "featured": false,
  "urgent": false
}
```

### 4. PUT /api/jobs/update/[id]
Update job posting (requires authentication and ownership).

**Request Body:** Same as create

### 5. DELETE /api/jobs/update/[id]
Delete job posting (requires authentication and ownership).

### 6. POST /api/jobs/apply
Submit job application (requires authentication).

**Request Body:**
```json
{
  "jobId": "...",
  "coverLetter": "...",
  "resume": "https://...",
  "answers": {
    "question1": "answer1"
  },
  "notes": "..."
}
```

### 7. GET /api/jobs/applications
Get user's job applications (requires authentication).

**Query Parameters:**
- `status` (enum): all, pending, reviewing, shortlisted, rejected, accepted

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "job": { /* populated job object */ },
      "status": "pending",
      "coverLetter": "...",
      "appliedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 8. GET /api/jobs/saved
Get user's saved jobs (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "job": { /* populated job object */ },
      "notes": "...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 9. POST /api/jobs/saved
Save/bookmark a job (requires authentication).

**Request Body:**
```json
{
  "jobId": "...",
  "notes": "Interesting opportunity"
}
```

### 10. DELETE /api/jobs/saved/[id]
Remove saved job (requires authentication).

### 11. GET /api/jobs/match
Get AI-matched jobs for user (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      /* job object */
      "matchScore": 95,
      "matchReasons": [
        "Skills match your profile",
        "Experience level fits"
      ]
    }
  ],
  "message": "AI matching is currently in beta..."
}
```

### 12. GET /api/company/jobs
Get all jobs posted by the logged-in company user (requires authentication).

**Query Parameters:**
- `status` (enum): active, closed, draft, all

**Response:**
```json
{
  "success": true,
  "data": [
    {
      /* job object */
      "posted": "2 days ago",
      "applicants": 15
    }
  ]
}
```

### 13. GET /api/company/applications
Get all applications submitted to jobs posted by the company (requires authentication).

**Query Parameters:**
- `status` (enum): all, pending, reviewing, shortlisted, rejected, accepted

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "job": { /* populated job object */ },
      "user": { /* populated user object */ },
      "status": "pending",
      "coverLetter": "...",
      "appliedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": { /* validation errors if applicable */ }
}
```

**Common Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (not logged in)
- 403: Forbidden (no permission)
- 404: Not Found
- 500: Internal Server Error

## Authentication

Most endpoints require authentication using NextAuth session. The session must contain:
- `session.user.id`: User's database ID

## Validation

All request bodies are validated using Zod schemas defined in `/src/schemas/jobSchema.js`.

## Usage Examples

### Fetch all remote tech jobs:
```
GET /api/jobs?category=tech&remote=true&page=1&limit=20
```

### Search for React jobs:
```
GET /api/jobs?search=React&sortBy=recent
```

### Apply for a job:
```
POST /api/jobs/apply
{
  "jobId": "65abc123...",
  "coverLetter": "I am excited to apply...",
  "resume": "https://example.com/resume.pdf"
}
```

### Save a job:
```
POST /api/jobs/saved
{
  "jobId": "65abc123...",
  "notes": "Great company culture"
}
```

## Notes

- As of now AI matching endpoint (`/api/jobs/match`) currently uses placeholder logic. we will Implement actual ML/AI matching based on user profile in production.
- Job creation/update/delete endpoints should be restricted to admin users. Add admin role checking as needed.
- Consider implementing rate limiting for API endpoints in production.
- Add file upload handling for resume uploads in the application endpoint.
