/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppView, Patient } from './types';
import { INITIAL_PATIENTS } from './data/assets';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { LiveSessionView } from './components/views/LiveSessionView';
import { ExercisesView } from './components/views/ExercisesView';
import { ClinicianReviewView } from './components/views/ClinicianReviewView';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [currentPatientId, setCurrentPatientId] = useState<string>('pt-aarav');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>();

  const currentPatient =
    patients.find((p) => p.id === currentPatientId) || patients[0];

  const handleSelectPatient = (patientId: string) => {
    setCurrentPatientId(patientId);
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExercise = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
  };

  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary flex flex-col font-sans selection:bg-secondary-container selection:text-primary">
      {/* Primary Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentPatient={currentPatient}
        onSelectPatient={handleSelectPatient}
        patients={patients}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingView onNavigate={handleNavigate} />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            patient={currentPatient}
            onNavigate={handleNavigate}
            onSelectExercise={handleSelectExercise}
          />
        )}

        {currentView === 'live-session' && (
          <LiveSessionView
            patient={currentPatient}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'exercises' && (
          <ExercisesView
            patient={currentPatient}
            onNavigate={handleNavigate}
            initialExerciseId={selectedExerciseId}
          />
        )}

        {currentView === 'clinician-review' && (
          <ClinicianReviewView
            patients={patients}
            selectedPatientId={currentPatientId}
            onSelectPatient={handleSelectPatient}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Application Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
