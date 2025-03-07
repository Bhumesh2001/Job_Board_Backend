# Backend Documentation

## Overview

This backend serves both **Recruiters** and **Users** for job postings, applications and authentication. It is built using **Node.js, Express, MongoDB**, and **JWT authentication**.

---

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database & ORM
- **JSON Web Token (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Axios** - API requests (e.g., Resume Parsing)

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/Bhumesh2001/Job_Board_Backend.git
cd Job_Board_Backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file and configure the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EDENAI_API_KEY=your_edenai_key
```

### 4. Run the server:

```bash
npm start || npm run dev
```

---

## API Endpoints

### **Authentication**

| Method | Endpoint                | Description               | Headers | Body                                                                                                  | Params |
| ------ | ----------------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------- | ------ |
| POST   | `/auth/login`           | User login                | None    | `{ "email": "user@example.com", "password": "password123" }`                                          | None   |
| POST   | `/auth/recruiter/login` | Recruiter login           | None    | `{ "email": "user@example.com", "password": "password123" }`                                          | None   |
| POST   | `/auth/register`        | Register a recruiter/user | None    | `{ "name": "John Doe", "email": "user@example.com", "password": "password123", "role": "recruiter" }` | None   |

### **Jobs (Recruiters Only)**

| Method | Endpoint                  | Description          | Headers                               | Body                                                                                                                   | Params        |
| ------ | ------------------------- | -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| GET    | `/jobs/my-jobs`           | Get all jobs         | `{ Authorization: "Bearer <token>" }` | None                                                                                                                   | None          |
| GET    | `/jobs/applications/view` | Get all Applications | `{ Authorization: "Bearer <token>" }` | None                                                                                                                   | None          |
| POST   | `/jobs`                   | Create a job         | `{ Authorization: "Bearer <token>" }` | `{ "title": "Frontend Developer", "description": "React developer needed", "company": "Tech Corp", "status": "Open" }` | None          |
| PUT    | `/jobs/:id`               | Update job           | `{ Authorization: "Bearer <token>" }` | `{ "title": "Frontend Developer", "description": "React developer needed", "company": "Tech Corp", "status": "Open" }` | `id` (Job ID) |
| DELETE | `/jobs/:id`               | Delete job           | `{ Authorization: "Bearer <token>" }` | None                                                                                                                   | `id` (Job ID) |

### **Applications (Candidates Only)**

| Method | Endpoint             | Description       | Headers                               | Body                                      | Params |
| ------ | -------------------- | ----------------- | ------------------------------------- | ----------------------------------------- | ------ |
| POST   | `/applications`      | Apply for a job   | `{ Authorization: "Bearer <token>" }` | `{ "jobId": "job_id", "resume": "file" }` | None   |
| GET    | `/applications/view` | View applications | `{ Authorization: "Bearer <token>" }` | None                                      | None   |
| GET    | `/jobs`              | Get All Jobs      | None                                  | None                                      | None   |

## Authentication Flow

1. **Users** can log in via `/auth/login` to receive a JWT token.
2. Tokens are stored in **localStorage** and sent in **Authorization headers** for protected routes.
3. If the token expires, users are **automatically logged out**.

1. **Recruiters** can log in via `/auth/recruiter/login` to receive a JWT token.
2. Tokens are stored in **localStorage** and sent in **Authorization headers** for protected routes.
3. If the token expires, users are **automatically logged out**.

---

## Recruiter Features

1. **Recruiters** can post, update, and delete jobs.
2. Jobs have **title, description, company, and status (Open/Closed)**.
3. Secure APIs ensure only **authenticated recruiters** can manage jobs.

---

## Candidate Features

1. **Candidates** can apply for jobs by uploading a **resume**.
2. Resumes are stored in **Cloudinary**, and the **EdenAI API** extracts skills.
3. Candidates can track their applications via `/applications/view`.

---

## Error Handling & Security

- **Centralized Error Handling** - Custom error responses.
- **JWT Expiration Handling** - Logs out users when the token expires.
- **Validation Middleware** - Ensures required fields in requests.
- **Rate Limiting & Helmet** - Security enhancements.

---

## Deployment
### **Deploying on Vercel**

#### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Initialize Vercel Project
```bash
vercel
```
- Set up and deploy? → **Yes**
- Which scope do you want to deploy? → **Select your account**
- Link to an existing project? → **No**
- What’s your project’s name? → **Enter a name**
- Which framework? → **Other**
- What’s your build command? → `npm install && npm run build`
- What’s your output directory? → Leave blank

#### 4. Add Environment Variables
```bash
vercel env add MONGO_URI your_mongo_connection_string
vercel env add JWT_SECRET your_jwt_secret
vercel env add CLOUDINARY_CLOUD_NAME your_cloud_name
vercel env add CLOUDINARY_API_KEY your_api_key
vercel env add CLOUDINARY_API_SECRET your_api_secret
```

#### 5. Deploy the Project
```bash
vercel --prod
```
Your backend will be deployed and return a **Live URL** like:
```
https://your-backend.vercel.app
```

#### 6. Set Up `vercel.json` (Optional)
Create a **`vercel.json`** file in the root directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```
Replace `server.js` with your entry file (`app.js` or `index.js`).

#### 7. Test Your API
Use **Postman** or your frontend by replacing `http://localhost:5000` with `https://your-backend.vercel.app`.

#### 8. Redeploying Updates
If you make changes, redeploy with:
```bash
vercel --prod
```

✅ **Your Express backend is now deployed on Vercel!** 🚀

---

## Contributors

- **Your Name** - Bhumesh Kewat

For any issues, contact [bhumeshkewat10@gmail.com](mailto:bhumeshkewat10@gmail.com).

