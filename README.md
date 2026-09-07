# RehabForge

> **Recover with confidence. Move with precision.**

RehabForge is a modern digital physical-therapy and rehabilitation
platform designed to help patients perform prescribed rehabilitation
exercises with better consistency and movement quality.

The platform combines **computer vision, movement analysis, optional
wearable sensor data, progress tracking, and light gamification** into
one patient-friendly rehabilitation experience.

It is designed as a hackathon prototype demonstrating how technology can
extend physiotherapy guidance beyond the clinic.

------------------------------------------------------------------------

## ✨ What RehabForge Does

RehabForge provides two connected experiences:

### 🧑‍🦽 Patient

Patients can:

-   View their rehabilitation plan
-   Browse prescribed exercises
-   Start guided exercise sessions
-   Use their camera for real-time pose tracking
-   See body-joint movement and joint angles
-   Receive real-time movement feedback
-   Track repetitions and sets
-   View a movement/form accuracy score
-   Earn XP and achievements
-   Track rehabilitation progress
-   View session history
-   Communicate with their physiotherapist

### 🧑‍⚕️ Physiotherapist

Therapists can:

-   View patients
-   Monitor rehabilitation adherence
-   Review exercise sessions
-   View movement-quality metrics
-   Track patient progress
-   Review form accuracy and range-of-motion trends
-   Add clinical notes
-   Communicate with patients
-   Generate/view rehabilitation reports

------------------------------------------------------------------------

# 🎯 Problem

Patients recovering from orthopedic injuries or undergoing physical
therapy are often given exercises to perform at home.

The challenge is that patients may:

-   Miss prescribed sessions
-   Perform exercises incorrectly
-   Move too quickly
-   Use poor alignment
-   Perform insufficient range of motion
-   Have no immediate feedback between clinical appointments

This can make home rehabilitation less consistent and make it difficult
for clinicians to understand how exercises are being performed outside
the clinic.

------------------------------------------------------------------------

# 💡 Solution

RehabForge acts as a **digital rehabilitation companion**.

During an exercise session:

``` text
Phone Camera
     ↓
Pose Detection
     ↓
Body Landmarks
     ↓
Joint Angle Calculation
     ↓
Exercise Analysis
     ↓
Rep + Range + Tempo + Movement Quality
     ↓
Real-Time Feedback
     ↓
Session Score
     ↓
Progress + Gamification
```

An optional wearable layer can provide additional movement signals:

``` text
Phone Camera ─────────────┐
                          ↓
                    Sensor Fusion
                          ↑
Smartwatch IMU ──────────┘
                          ↓
                Movement Analysis
```

The system is designed to provide **movement feedback**, not medical
diagnosis.

------------------------------------------------------------------------

# 🧠 Core Features

## 1. Computer Vision

RehabForge uses browser-based pose estimation to identify body landmarks
such as:

-   Shoulder
-   Elbow
-   Wrist
-   Hip
-   Knee
-   Ankle

These landmarks can be used to calculate joint angles and analyze
movement.

------------------------------------------------------------------------

## 2. Real-Time Exercise Tracking

The live session can track:

-   Exercise state
-   Repetitions
-   Sets
-   Joint angle
-   Movement range
-   Movement tempo
-   Basic alignment
-   Movement consistency

Example:

``` text
Shoulder Flexion

Set        2 / 3
Reps       7 / 10
Range      143°
Tempo      Good
Form       92%

Feedback:
"Good movement"
```

------------------------------------------------------------------------

## 3. Form / Movement Accuracy Score

RehabForge calculates a 0--100 movement-quality score based on
configurable exercise criteria.

A prototype score can consider:

-   Range of motion
-   Movement tempo
-   Alignment
-   Movement consistency

Example:

``` text
Range         95
Tempo         88
Alignment     92
Consistency   90
------------------
Overall       91%
```

This score is a **prototype movement metric** and is not a clinically
validated medical score.

------------------------------------------------------------------------

## 4. Real-Time Feedback

The system provides short, actionable feedback.

Examples:

### Good

> Good movement

### Too fast

> Slow down your return

### Insufficient range

> Gradually increase your range

### Alignment

> Keep your movement aligned

### Tracking issue

> Move into camera view

Feedback is based on exercise-analysis state rather than random
messages.

------------------------------------------------------------------------

## 5. Exercise Engine

Exercises are represented as configurable definitions rather than
hardcoded UI logic.

Example:

``` ts
{
  id: "shoulder-flexion",
  name: "Shoulder Flexion",
  bodyArea: "Shoulder",
  targetAngle: 150,
  minimumAngle: 90,
  maximumAngle: 160,
  repetitions: 10,
  sets: 3,
  targetTempo: 2.5
}
```

This architecture makes it possible to add new rehabilitation exercises
without rebuilding the entire application.

------------------------------------------------------------------------

## 6. Gamification

RehabForge uses lightweight gamification to encourage adherence.

Patients can earn:

-   XP
-   Achievements
-   Streaks
-   Session milestones
-   Form-quality achievements

Example achievements:

-   First Session
-   5 Sessions
-   90% Form
-   7 Day Streak
-   100 Quality Reps

Gamification should never encourage patients to exceed prescribed
rehabilitation limits.

------------------------------------------------------------------------

## 7. Progress Tracking

Patients can view:

-   Completed sessions
-   Exercise adherence
-   Average movement quality
-   Range trends
-   Exercise time
-   Current streak
-   Weekly progress
-   Monthly progress

Therapists can view the same information at the patient level to
understand rehabilitation progress.

------------------------------------------------------------------------

## 8. Therapist Dashboard

The therapist interface provides a clinical SaaS-style overview.

It includes:

-   Active patients
-   Sessions
-   Adherence
-   Movement quality
-   Patients requiring review
-   Patient search
-   Patient profiles
-   Session reports
-   Notes
-   Messages
-   Progress charts

The goal is to let a physiotherapist understand a patient's
rehabilitation status quickly.

------------------------------------------------------------------------

# 🏗️ Architecture

``` text
                         ┌─────────────────────┐
                         │    RehabForge UI    │
                         │ React + TypeScript  │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   │                │                │
                   ▼                ▼                ▼
              Patient UI      Live Session      Therapist UI
                   │                │                │
                   │                ▼                │
                   │          Camera API             │
                   │                │                │
                   │                ▼                │
                   │        MediaPipe Pose           │
                   │                │                │
                   │                ▼                │
                   │       Joint Angle Engine        │
                   │                │                │
                   │                ▼                │
                   │       Exercise Analyzer         │
                   │                │                │
                   │                ▼                │
                   │      Form + Movement Score      │
                   │                │                │
                   └────────────────┼────────────────┘
                                    │
                                    ▼
                              FastAPI Backend
                                    │
                                    ▼
                                Database
```

Optional wearable layer:

``` text
Smartwatch
    │
    ├── Accelerometer
    └── Gyroscope
            │
            ▼
      Movement Signals
            │
            ▼
       Fusion Engine
            │
            ▼
      Movement Analysis
```

------------------------------------------------------------------------

# 🛠️ Technology Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   Recharts
-   Lucide React

## Computer Vision

-   MediaPipe
-   Browser Camera API
-   JavaScript / TypeScript

## Backend

-   Python
-   FastAPI

## Data

-   Supabase or compatible database
-   Mock data layer for development/demo mode

##  Wearable sensor integration

-   Wear OS / Android sensor APIs
-   Apple Watch / HealthKit
-   Accelerometer
-   Gyroscope

------------------------------------------------------------------------

# 📁 Suggested Project Structure

``` text
rehabforge/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── exercise/
│   │   │   ├── session/
│   │   │   ├── progress/
│   │   │   └── therapist/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── patient/
│   │   │   └── therapist/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── data/
│   │   └── store/
│   │
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── analyzers/
│   │   ├── database/
│   │   └── core/
│   │
│   ├── requirements.txt
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

------------------------------------------------------------------------

# 🚀 Getting Started

## Prerequisites

Install:

-   Node.js 18+
-   npm
-   Python 3.10+
-   pip
-   A modern browser with camera support

Recommended browsers:

-   Google Chrome
-   Microsoft Edge
-   Firefox

Camera access generally requires a secure context such as:

-   `localhost`
-   HTTPS deployment

------------------------------------------------------------------------

# 1. Clone the Repository

``` bash
git clone <repository-url>
cd rehabforge
```

------------------------------------------------------------------------

# 2. Install Frontend Dependencies

``` bash
cd frontend
npm install
```

------------------------------------------------------------------------

# 3. Start Frontend

``` bash
npm run dev
```

The frontend will normally be available at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 4. Set Up Backend

Open another terminal:

``` bash
cd backend
python -m venv venv
```

### Windows

``` bash
venv\Scripts\activate
```

### Linux / macOS

``` bash
source venv/bin/activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Start FastAPI:

``` bash
uvicorn app.main:app --reload
```

Backend:

``` text
http://localhost:8000
```

API documentation:

``` text
http://localhost:8000/docs
```

------------------------------------------------------------------------

# 🔐 Environment Variables

Create a `.env` file where required.

Example frontend:

``` env
VITE_API_URL=http://localhost:8000
```

Example backend:

``` env
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

Do not commit secrets to Git.

Add `.env` to `.gitignore`.

------------------------------------------------------------------------

# 🎥 Camera-Based Session

The live rehabilitation experience follows:

``` text
Start Exercise
      ↓
Request Camera Permission
      ↓
Initialize Pose Detection
      ↓
Detect Person
      ↓
Track Landmarks
      ↓
Calculate Joint Angles
      ↓
Detect Exercise Phase
      ↓
Count Repetitions
      ↓
Evaluate Movement
      ↓
Display Feedback
```

The application should request camera access **only when a patient
starts a guided session**.

The dashboard should not request camera permissions.

------------------------------------------------------------------------

# 📐 Joint Angle Calculation

For three body landmarks:

``` text
A
 \
  \
   B
    \
     \
      C
```

The angle at `B` can be calculated from the landmark coordinates.

The same reusable function can support:

``` text
Hip → Knee → Ankle
Shoulder → Elbow → Wrist
Hip → Shoulder → Elbow
```

This allows the exercise engine to support multiple rehabilitation
movements.

------------------------------------------------------------------------

# 🔄 Exercise State Machine

The exercise analyzer can use states such as:

``` text
INITIAL
   ↓
START_POSITION
   ↓
MOVING
   ↓
TARGET_REACHED
   ↓
RETURNING
   ↓
REP_COMPLETE
```

Warnings can be generated when:

-   Movement is too fast
-   Range is insufficient
-   Alignment is outside the configured threshold
-   The person leaves the camera frame

------------------------------------------------------------------------

# 🧪 Demo Mode

Because computer vision can be affected by:

-   Lighting
-   Camera position
-   Internet/browser conditions
-   Device performance
-   MediaPipe initialization
-   Camera permissions

RehabForge includes a **Demo Mode** fallback.

Demo Mode simulates movement data while keeping the same UI flow.

Example:

``` text
Demo Movement
     ↓
Simulated Joint Angle
     ↓
Rep Counter
     ↓
Form Score
     ↓
Feedback
     ↓
Session Complete
```

The interface must clearly label simulated data as:

> Demo simulation

It must never present simulated wearable data as real sensor data.

------------------------------------------------------------------------

# 🧑‍⚕️ Medical Safety

RehabForge is a **hackathon prototype and assistive rehabilitation
platform**.

It is not intended to:

-   Diagnose injuries
-   Diagnose diseases
-   Replace physiotherapists
-   Determine muscle activation
-   Predict medical outcomes
-   Guarantee recovery
-   Provide emergency medical advice

The system should describe its functionality as:

-   Movement tracking
-   Exercise tracking
-   Form feedback
-   Movement-quality analysis
-   Progress monitoring
-   Clinician review

Recommended application disclaimer:

> RehabForge provides movement tracking and exercise feedback. Follow
> your clinician's prescribed plan and seek professional advice when
> needed.

------------------------------------------------------------------------

# 🔒 Privacy

Camera access should only be enabled during an active exercise session.

Where possible, pose processing should happen locally in the browser
rather than continuously uploading raw video.

Do not store camera footage unless the application explicitly implements
and discloses such functionality.

Do not claim that video is stored, deleted, or processed locally unless
that behavior is actually implemented.

------------------------------------------------------------------------

# 🎨 Design System

The application follows a calm healthcare SaaS visual language.

Primary colors:

``` text
Deep Forest     #24483F
Healthcare Green #5F8F78
Soft Sage       #DDE9E1
```

Background:

``` text
Main            #F7F8F4
Card            #FFFFFF
Secondary       #EEF2ED
```

Text:

``` text
Primary         #1F2925
Secondary       #66716C
Muted           #8B9590
```

Status:

``` text
Success         #4E8A68
Warning         #C9953C
Error           #B85C57
Information     #557B9B
```

The UI should remain:

-   Minimal
-   Professional
-   Accessible
-   Calm
-   Human-centered
-   Consistent

Avoid excessive gradients, neon colors, glassmorphism, futuristic AI
graphics, and gaming-style HUDs.

------------------------------------------------------------------------

# 📱 Responsive Design

### Patient

Mobile-first.

The live exercise experience prioritizes:

``` text
Camera
  ↓
Exercise status
  ↓
Feedback
  ↓
Metrics
```

### Therapist

Desktop-first.

Use:

-   Sidebar navigation
-   Tables
-   Charts
-   Patient detail views
-   Session reports

The application should remain usable on tablets and smaller screens.

------------------------------------------------------------------------

# 🧑‍💻 Development Guidelines

## Component-driven

Build reusable components rather than duplicating UI.

Examples:

``` text
MetricCard
ExerciseCard
FormScore
FeedbackBanner
LiveCameraPanel
SessionSummary
PatientTable
ChartCard
AchievementCard
```

------------------------------------------------------------------------

## Keep CV Processing Separate

Do not put pose-detection logic directly inside large React components.

Prefer:

``` text
hooks/
    useCamera.ts
    usePoseDetection.ts
    useExerciseSession.ts

analyzers/
    shoulderFlexion.ts
    kneeExtension.ts
    squat.ts

utils/
    calculateAngle.ts
```

This keeps the application maintainable.

------------------------------------------------------------------------

# 🧩 Adding a New Exercise

A new exercise should ideally require:

1.  Exercise configuration
2.  Relevant landmarks
3.  Angle calculation
4.  Movement-state logic
5.  Form rules
6.  Feedback messages

The rest of the application should remain unchanged.

Example:

``` text
New Exercise
     ↓
Exercise Configuration
     ↓
Analyzer
     ↓
Generic Session UI
```

------------------------------------------------------------------------

# 🏆 Hackathon Demo

Recommended presentation flow:

``` text
Patient Login
     ↓
Patient Dashboard
     ↓
Start Today's Session
     ↓
Select Exercise
     ↓
Enable Camera
     ↓
Live Pose Tracking
     ↓
Perform Correct Movement
     ↓
"Good movement"
     ↓
Perform Movement Too Quickly
     ↓
"Slow down your return"
     ↓
Complete Session
     ↓
92% Movement Quality
     ↓
+120 XP
     ↓
Achievement Unlocked
     ↓
Dashboard Updated
     ↓
Switch to Therapist
     ↓
Open Patient
     ↓
View New Session
     ↓
Review Session Report
```

The entire demonstration should take approximately **1--2 minutes**.

------------------------------------------------------------------------

# 🌟 Why RehabForge?

Traditional home rehabilitation often creates a gap between:

**Clinic guidance**

and

**At-home execution**

RehabForge aims to reduce that gap by giving patients immediate movement
feedback while providing clinicians with structured progress
information.

The core product loop is:

``` text
Prescribed Plan
      ↓
Guided Exercise
      ↓
Movement Tracking
      ↓
Real-Time Feedback
      ↓
Session Metrics
      ↓
Progress Tracking
      ↓
Clinician Review
      ↓
Better-informed Rehabilitation
```

------------------------------------------------------------------------

# 🔮 Future Roadmap

Potential future improvements include:

### Wearable Integration

Real smartwatch accelerometer and gyroscope integration.

### More Exercises

Expand exercise analyzers across:

-   Knee
-   Shoulder
-   Elbow
-   Ankle
-   Back
-   General mobility

### Personalization

Adapt exercise targets based on clinician-prescribed plans.

### Clinician Tools

-   Advanced reports
-   Exercise-plan builder
-   Remote monitoring
-   Patient alerts
-   Session comparison

### Analytics

-   Long-term movement trends
-   Adherence analytics
-   Exercise difficulty progression

### Mobile Applications

Native Android and iOS applications.

### Clinical Validation

Formal validation with physiotherapists and clinical research before
making medical claims or using the system in clinical decision-making.

------------------------------------------------------------------------

# ⚠️ Current Prototype Limitations

This hackathon version may use:

-   Browser-based pose estimation
-   Rule-based movement analysis
-   Prototype movement-quality scoring
-   Mock/demo data
-   Simulated wearable signals
-   Fictional patient records

These limitations are intentional to keep the prototype focused on
demonstrating the product concept.

------------------------------------------------------------------------

# 🤝 Team CodeMafia's

**Project:** RehabForge

**Category:** Healthcare / Digital Health / Computer Vision / Sensor
Fusion

**Core Technologies:**

Computer Vision\
Pose Estimation\
Sensor Fusion\
Web Development\
Data Visualization\
Gamification



------------------------------------------------------------------------

# ❤️ Final Note

RehabForge is built around a simple idea:

> **Rehabilitation shouldn't stop when the patient leaves the clinic.**

The platform combines movement tracking, actionable feedback, progress
visibility, and clinician oversight to make home rehabilitation more
structured, measurable, and engaging.

**Recover with confidence. Move with precision.**

## 🔗 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-RehabForge-24483F?style=for-the-badge)](https://rehabforge.vercel.app/
)

**Live Website:** https://rehabforge.vercel.app/
