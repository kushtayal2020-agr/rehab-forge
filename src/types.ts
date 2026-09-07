export type AppView = 'landing' | 'dashboard' | 'live-session' | 'exercises' | 'clinician-review';

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  condition: string;
  protocolId: string;
  protocolName: string;
  attendingClinician: string;
  clinicianAvatar: string;
  currentWeek: number;
  totalWeeks: number;
  adherenceRate: number; // percentage
  kinematicAccuracy: number; // percentage
  streakDays: number;
  currentRom: number; // degrees
  targetRom: number; // degrees
  startingRom: number; // degrees
  lastSessionDate: string;
  status: 'active' | 'attention_required' | 'milestone_met' | 'pending_review';
  flagReason?: string;
  triagePriority: 'high' | 'medium' | 'normal';
}

export interface Exercise {
  id: string;
  name: string;
  targetArea: string;
  category: 'Mobility' | 'Strength' | 'Stabilization' | 'Flexibility';
  durationMinutes: number;
  sets: number;
  reps: number;
  completedSets: number;
  targetAngleMin: number;
  targetAngleMax: number;
  currentBaselineAngle: number;
  status: 'completed' | 'in_progress' | 'pending';
  lastAccuracyScore: number;
  photoUrl: string;
  diagramUrl: string;
  instructions: string[];
  equipmentNeeded: string[];
  clinicalNote: string;
}

export interface RepRecord {
  repNumber: number;
  timeOffset: string;
  maxFlexion: number;
  targetFlexion: number;
  status: 'optimal' | 'acceptable' | 'drift_detected';
  score: number;
  compensationDetected?: string;
}

export interface ClinicianReviewItem {
  id: string;
  patientId: string;
  date: string;
  time: string;
  exerciseName: string;
  flaggedReps: number[];
  flagDescription: string;
  recommendedAdjustment: string;
  isAddressed: boolean;
}
