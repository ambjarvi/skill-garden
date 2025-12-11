# Garden Learning App — Final Project Report

## GitHub Repository

Backend Repo: 
**https://github.com/ambjarvi/skill-garden-backend**

## Summary of the Project

This project is an educational gardening application that teaches users core plant-care principles through interactive lessons. As users learn concepts and complete quizzes, they unlock plants that appear in a virtual garden, blending education with gamification. The app uses a full-stack architecture with a React frontend deployed on Vercel, a Node/Express backend deployed on Render, and Firebase for authentication and data persistence.

---

## Designs, Architecture, and Demo

### System Architecture

```
Frontend (React, Vercel)  
     ↓ (HTTPS requests with Firebase ID Token)
Backend API (Node.js/Express, Render)
     ↓
Firebase Admin SDK
     ↓
Firestore Database (User progress, lessons, plants)
```

### App Flow Diagram

```
Login → Learn Lessons → Take Quiz → Unlock Plant → Garden Updates → Progress Saved
```

## What I Learned

This project taught me how to design and deploy a full-stack application from scratch. I learned how to structure a project with separate frontend and backend deployments, implement Firebase authentication, verify tokens on the backend using Firebase Admin, and store user progress securely in Firestore. I also learned how to design data models, create scalable folder structures, and plan UI flows for future features. I was able to develop this entire application for free using free-tiers of software, meeting my goal of creating a full-stack application for free. 

---

## AI Integration

This project integrates AI in meaningful ways.

### AI Used *within* the Project

* AI-generated pixel-style plant artwork for the virtual garden.
* AI-designed outlines and lesson structures for plant-care concepts.

### How AI Assisted Development

AI was used throughout the build process for:

* Writing boilerplate code for Firebase Auth, Express API routes, and token verification.
* Debugging deployment issues between Vercel and Render.
* Clarifying technologies, and explaining unfamiliar tools (e.g., Firebase Admin SDK).

---

## Why This Project Is Interesting to Me

Gardening and sustainability are personally meaningful to me, and I wanted to build something that makes learning plant-care fun and accessible. This project also pushed my skills in full-stack development, backend design, authentication systems, and app architecture. The idea of a “virtual garden that grows as the user learns” feels creative, visually engaging, and technically challenging.

---

## Key Learnings

### 1. Full-stack deployment and architecture

I learned how to deploy a frontend on Vercel and a backend on Render, set up environment variables, and connect them securely.

### 2. Firebase authentication and backend verification

I learned how Firebase issues ID tokens, how to retrieve them on the frontend, and how to verify them using Firebase Admin before allowing database access.

### 3. Designing scalable application structures

I learned how to separate screens, components, hooks, context, and data into a maintainable folder structure, which will make future features significantly easier.

### 4. Creating and consuming REST API routes

I learned how to structure API endpoints to read/write Firestore, merge user progress safely, and avoid exposing private keys or credentials.

### 5. Applying gamification to educational content

I learned how to design user progression in a way that motivates continued learning through unlocks, achievements, and visual rewards.

---

## Backend Characteristics

### Authentication

* Firebase Authentication handles sign-up and log-in.
* Frontend obtains an ID token and sends it in `Authorization: Bearer <token>`.
* Backend uses Firebase Admin SDK to verify the token.
* Only authenticated users can read or write progress data.

### Failover

* Firestore has built-in replication and failover.
* Firebase handles token refresh automatically.
* If the backend becomes unavailable, the frontend can still display cached UI while retrying requests.

### Scaling

* Render backend autoscaling supports increased API traffic.
* Firestore is serverless and automatically scales with demand.
* Each user has their own document, reducing contention and improving concurrency.

### Performance

* Backend handles authentication and database operations.
* Firestore provides low-latency reads and efficient document merges.
* Frontend remains fast because it loads data asynchronously and only retrieves what is needed.

### Concurrency

* Firestore supports high-concurrency writes at the document level.
* Progress updates are merged using `{ merge: true }` to avoid overwriting.
* No shared-state concurrency issues since each user writes only to their own document.

---

## Conclusion

This project serves as the foundation for an interactive gardening education platform. With a deployed frontend, deployed backend, and the beginnings of Firebase integration, the core system architecture is now in place. Future work will expand lessons, quizzes, the virtual garden visual system, and more advanced gamification features. Building this project strengthened my skills in full-stack development, authentication, API design, and architectural planning, and I’m excited to continue enhancing it.

---
