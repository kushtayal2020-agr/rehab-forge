import React, { useState } from 'react';
import { AppView, Patient, Exercise } from '../../types';
import { ASSETS, TODAY_EXERCISES } from '../../data/assets';

interface DashboardViewProps {
  patient: Patient;
  onNavigate: (view: AppView) => void;
  onSelectExercise?: (exerciseId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  patient,
  onNavigate,
  onSelectExercise
}) => {
  const [exercises, setExercises] = useState<Exercise[]>(TODAY_EXERCISES);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [sentToast, setSentToast] = useState<string | null>(null);

  const completedCount = exercises.filter((e) => e.status === 'completed').length;
  const inProgressCount = exercises.filter((e) => e.status === 'in_progress').length;
  const totalCount = exercises.length;
  const adherencePercentage = Math.round(((completedCount + inProgressCount * 0.5) / totalCount) * 100);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setShowMessageModal(false);
    setMessageText('');
    setSentToast(`Question sent to ${patient.attendingClinician}. Telemetry snapshot attached.`);
    setTimeout(() => setSentToast(null), 4000);
  };

  const handleExerciseClick = (exId: string) => {
    if (onSelectExercise) onSelectExercise(exId);
    onNavigate('exercises');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {sentToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-secondary-container/40 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="text-xs font-semibold">{sentToast}</span>
        </div>
      )}

      {/* Top Welcome & Telemetry Strip */}
      <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/15 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
                  Good morning, {patient.name.split(' ')[0]}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container/60 text-primary border border-secondary-container">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Week {patient.currentWeek} of {patient.totalWeeks}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                Protocol: <span className="font-semibold text-primary">{patient.protocolName}</span> • You are on track to hit your 150° milestone this week.
              </p>
            </div>
          </div>

          {/* Action CTAs & Telemetry quick beacons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-xs text-text-secondary">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Optical Camera Ready
              </span>
              <span className="text-text-muted">•</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-primary">watch</span>
                IMU 88%
              </span>
            </div>

            <button
              onClick={() => onNavigate('live-session')}
              id="dashboard-start-today-session"
              className="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                play_arrow
              </span>
              <span>Start Today's Session</span>
            </button>
          </div>
        </div>

        {/* Quick Diagnostic Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-surface-container-highest/70">
          <div className="bg-surface-canvas p-3 rounded-xl border border-surface-container-highest/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-medium">Active ROM</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                +7.4° this wk
              </span>
            </div>
            <p className="text-lg font-extrabold font-mono text-primary mt-1">
              {patient.currentRom}° <span className="text-xs text-text-muted font-sans font-normal">/ {patient.targetRom}°</span>
            </p>
          </div>

          <div className="bg-surface-canvas p-3 rounded-xl border border-surface-container-highest/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-medium">Kinematic Precision</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Grade A
              </span>
            </div>
            <p className="text-lg font-extrabold font-mono text-primary mt-1">
              {patient.kinematicAccuracy}%
            </p>
          </div>

          <div className="bg-surface-canvas p-3 rounded-xl border border-surface-container-highest/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-medium">Daily Streak</span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                Consistent
              </span>
            </div>
            <p className="text-lg font-extrabold font-mono text-primary mt-1">
              {patient.streakDays} Days
            </p>
          </div>

          <div className="bg-surface-canvas p-3 rounded-xl border border-surface-container-highest/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-medium">Overall Adherence</span>
              <span className="text-[10px] font-bold text-primary bg-secondary-container px-1.5 py-0.5 rounded">
                Phase II
              </span>
            </div>
            <p className="text-lg font-extrabold font-mono text-primary mt-1">
              {patient.adherenceRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Exercises on Left, Telemetry & Clinician on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Assigned Rehabilitation Routine */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-primary">
                Today's Rehabilitation Routine
              </h2>
              <p className="text-xs text-text-muted">
                3 of 4 motion blocks prescribed for today • Sagittal plane emphasis
              </p>
            </div>
            <button
              onClick={() => onNavigate('exercises')}
              className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1"
            >
              <span>View Full Protocol</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => {
              const isDone = exercise.status === 'completed';
              const isInProgress = exercise.status === 'in_progress';

              return (
                <div
                  key={exercise.id}
                  className={`bg-surface-card rounded-xl p-4 border transition-all hover:border-primary/40 shadow-sm ${
                    isDone
                      ? 'border-surface-container-highest bg-surface-canvas/50'
                      : isInProgress
                      ? 'border-secondary-container bg-surface-card ring-1 ring-secondary/20'
                      : 'border-surface-container-highest'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Thumbnail and Title */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface-subtle flex-shrink-0 border border-surface-container-highest">
                        <img
                          src={exercise.photoUrl}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isDone && (
                          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary-container text-xl">
                              check
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              exercise.category === 'Mobility'
                                ? 'bg-blue-50 text-blue-700'
                                : exercise.category === 'Stabilization'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-purple-50 text-purple-700'
                            }`}
                          >
                            {exercise.category}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {exercise.durationMinutes} min • {exercise.sets} Sets × {exercise.reps} Reps
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-primary mt-0.5">
                          {exercise.name}
                        </h3>

                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                          Target: <span className="font-medium text-primary">{exercise.targetArea}</span>
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-text-muted">
                          <span>
                            Progress:{' '}
                            <strong className="text-primary">
                              {exercise.completedSets} / {exercise.sets} Sets
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Angle: <strong className="text-primary">{exercise.currentBaselineAngle}°</strong>
                          </span>
                          {exercise.lastAccuracyScore > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-700 font-semibold">
                                Form {exercise.lastAccuracyScore}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Button */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-container-highest">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-surface-subtle text-text-muted'
                        }`}
                      >
                        {isDone ? 'Completed' : isInProgress ? 'In Progress' : 'Prescribed'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleExerciseClick(exercise.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-surface-subtle border border-surface-container-highest transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onNavigate('live-session')}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-container text-on-primary transition-all flex items-center gap-1 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[15px] text-secondary-container">
                            videocam
                          </span>
                          <span>{isDone ? 'Review' : 'Start'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assigned Motion Library Strip */}
          <div className="bg-surface-card rounded-xl p-4 border border-surface-container-highest mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              Phase II Assigned Motion Library
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Shoulder Flexion', img: ASSETS.exerciseDiagrams.shoulderFlexion, desc: 'Sagittal Arc' },
                { title: 'Scapular Retract', img: ASSETS.exerciseDiagrams.scapularRetraction, desc: 'Mid-Trap Lock' },
                { title: 'Wall Slides', img: ASSETS.exerciseDiagrams.wallSlides, desc: 'Serratus Elevation' },
                { title: 'External Rotation', img: ASSETS.exerciseDiagrams.rotations, desc: 'Infraspinatus' },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate('exercises')}
                  className="group cursor-pointer bg-surface-canvas hover:bg-surface-subtle p-2.5 rounded-lg border border-surface-container-highest transition-all text-center"
                >
                  <div className="h-20 w-full overflow-hidden rounded bg-surface-card p-1 mb-2">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-xs font-bold text-primary truncate">{item.title}</p>
                  <p className="text-[10px] text-text-muted truncate">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Analysis & Clinician Appointment Card */}
        <div className="lg:col-span-4 space-y-5">
          {/* Adherence Ring Card */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <h3 className="text-sm font-bold text-primary">Daily Adherence Ring</h3>
            <p className="text-xs text-text-muted mt-0.5">2 of 3 target exercise sets completed</p>

            <div className="my-5 flex items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#dae5df"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#0b3129"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (adherencePercentage / 100))}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black font-mono text-primary">{adherencePercentage}%</span>
                  <span className="text-[10px] font-bold text-text-muted uppercase">Today's Target</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-container-highest/60">
                <span className="text-text-secondary">Completed Reps:</span>
                <span className="font-mono font-bold text-primary">22 / 30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container-highest/60">
                <span className="text-text-secondary">Active Session Time:</span>
                <span className="font-mono font-bold text-primary">18m 42s</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Compensation Drift:</span>
                <span className="font-mono font-bold text-emerald-700">Low (0.8°)</span>
              </div>
            </div>
          </div>

          {/* Weekly Recovery Dual-Axis Trend Card */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-primary">7-Day ROM Trajectory</h3>
                <p className="text-[11px] text-text-muted">Glenohumeral elevation (degrees)</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                +14.4° overall
              </span>
            </div>

            {/* Sparkline Histogram */}
            <div className="h-28 flex items-end justify-between gap-1 pt-4 pb-2 border-b border-surface-container-highest">
              {[
                { day: 'M', rom: 128, height: 60 },
                { day: 'T', rom: 130, height: 64 },
                { day: 'W', rom: 134, height: 72 },
                { day: 'T', rom: 136, height: 76 },
                { day: 'F', rom: 139, height: 82 },
                { day: 'S', rom: 141, height: 88 },
                { day: 'S', rom: 142.4, height: 92, active: true },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-text-muted">{Math.round(bar.rom)}°</span>
                  <div
                    style={{ height: `${bar.height}%` }}
                    className={`w-full rounded-t-md transition-all ${
                      bar.active
                        ? 'bg-primary border-t-2 border-secondary-container'
                        : 'bg-surface-container-highest hover:bg-secondary/40'
                    }`}
                  />
                  <span className="text-[10px] font-bold text-text-secondary mt-1">{bar.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[11px] text-text-muted mt-2 font-mono">
              <span>Day 1: 128°</span>
              <span className="text-secondary font-bold">Goal: 150°</span>
            </div>
          </div>

          {/* Clinician Review & Direct Communication Card */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={patient.clinicianAvatar}
                alt={patient.attendingClinician}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Attending Physical Therapist
                </span>
                <h4 className="text-xs font-bold text-primary truncate">
                  {patient.attendingClinician}
                </h4>
                <p className="text-[11px] text-text-muted truncate">Apex Orthopedic Institute</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/80 text-xs">
              <div className="flex items-center gap-1.5 text-primary font-bold mb-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  event_available
                </span>
                <span>Next Telehealth Review</span>
              </div>
              <p className="text-text-secondary font-medium">Thursday, 10:30 AM (20 min)</p>
              <p className="text-[11px] text-text-muted mt-0.5">Bi-weekly ROM validation & protocol advancement</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => setShowMessageModal(true)}
                id="btn-ask-pt"
                className="py-2 px-3 text-xs font-semibold rounded-lg bg-surface-card hover:bg-surface-subtle text-primary border border-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>Ask Question</span>
              </button>
              <button
                onClick={() => setShowRescheduleModal(true)}
                id="btn-reschedule-review"
                className="py-2 px-3 text-xs font-semibold rounded-lg bg-surface-card hover:bg-surface-subtle text-primary border border-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">edit_calendar</span>
                <span>Reschedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message PT Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl max-w-md w-full p-6 border border-surface-container-highest shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">mail</span>
                Message {patient.attendingClinician}
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Describe pain, sensation, or movement concerns:
                </label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="e.g. Felt slight pinch in posterior shoulder during rep 8 of flexion..."
                  className="w-full text-xs p-3 rounded-lg border border-surface-container-highest bg-surface-canvas focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-subtle text-[11px] text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-primary">attachment</span>
                <span>Attaches current 142.4° kinematic session graph automatically</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-subtle rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl max-w-sm w-full p-6 border border-surface-container-highest shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-primary">Reschedule Review</h3>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-text-secondary">
              Select an available opening with {patient.attendingClinician}:
            </p>

            <div className="space-y-2 text-xs">
              {[
                { slot: 'Friday, Oct 25 • 09:00 AM', status: 'Available' },
                { slot: 'Friday, Oct 25 • 02:30 PM', status: 'Available' },
                { slot: 'Monday, Oct 28 • 11:15 AM', status: 'Available' },
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowRescheduleModal(false);
                    setSentToast(`Review appointment updated to ${s.slot}`);
                    setTimeout(() => setSentToast(null), 4000);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-surface-container-highest hover:border-primary hover:bg-surface-canvas text-left transition-all"
                >
                  <span className="font-semibold text-primary">{s.slot}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {s.status}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowRescheduleModal(false)}
              className="w-full py-2 text-xs font-semibold text-text-secondary hover:bg-surface-subtle rounded-lg"
            >
              Keep Current Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
