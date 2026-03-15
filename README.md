# NeoConnect Complaint Management System

<div align="center">
  <img src="neconnect.png" alt="NeoConnect Logo" width="800" height="400" style="max-width:100%; height:auto;" />
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org)
  [![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com)
  [![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://postgresql.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
  [![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://prisma.io)
</div>

---

## 📋 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| ⚛️ Next.js | 🟢 Node.js | 🐘 PostgreSQL |
| ⚛️ React | 🚂 Express.js | |
| 🎨 Tailwind CSS | 🔷 Prisma (ORM) | |
| 🎯 shadcn/ui | | |

---

## ✨ Features

| | Feature | Description |
|--|---------|-------------|
| 🔐 | **User Authentication** | Secure login & registration with JWT |
| 📝 | **Complaint Submission** | File complaints with details and attachments |
| 📊 | **Case Tracking** | Monitor the status of submitted cases in real time |
| 🗳️ | **Poll Voting System** | Engage in community polls and see live results |
| 📈 | **Analytics Dashboard** | Visual insights into complaint trends and user engagement |
| 📱 | **Responsive Design** | Optimized for desktop, tablet, and mobile |

---

## 🚀 Deployment

| Platform | URL |
|----------|-----|
| 🌐 **Frontend (Vercel)** | [https://neoconnect-6ff287fbf-sunny22110010324-projects.vercel.app] |
| ⚙️ **Backend (Render)** | [https://neoconnect-5xcp.onrender.com](https://neoconnect-5xcp.onrender.com) |

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 recommended)
- npm or yarn

### Backend Setup

1. **Navigate to the backend folder**  
   ```bash
   cd backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file based on `.env.example`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/neoconnect"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

4. **Run database migrations**  
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**  
   ```bash
   node server.js
   ```

### Frontend Setup

1. **Navigate to the frontend folder**  
   ```bash
   cd frontend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000   # or your production backend URL
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

<div align="center">

| | | |
|:---:|:---:|:---:|
| **🏠 Dashboard** | **📝 Submit Case** | **📋 Cases List** |
| <img src="images/dashboard.png" alt="Dashboard" width="250" style="border-radius: 8px; border: 1px solid #e5e7eb;"> | <img src="images/submit-case.png" alt="Submit Case" width="250" style="border-radius: 8px; border: 1px solid #e5e7eb;"> | <img src="images/cases.png" alt="Cases List" width="250" style="border-radius: 8px; border: 1px solid #e5e7eb;"> |
| *Overview & Navigation* | *Complaint Submission Form* | *Track Your Cases* |
| **🗳️ Polls** | **📢 Public Hub** | **🔍 Case Details** |
| <img src="images/poll.png" alt="Polls" width="250" style="border-radius: 8px; border: 1px solid #e5e7eb;"> | <img src="images/hub.png" alt="Public Hub" width="250" style="border-radius: 8px; border: 1px solid #e5e7eb;"> | <div style="padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;"><strong>6 Screenshots Total</strong><br>Each demonstrating a key feature of NeoConnect</div> |
| *Vote on Community Polls* | *Resolved Cases & Updates* | *Complete Case Management* |

</div>

*(Create a `screenshots` folder in your repository and add images.)*

