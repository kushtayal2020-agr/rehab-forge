import React, { useState } from 'react';
import { AppView, Patient, Exercise } from '../../types';
import { TODAY_EXERCISES } from '../../data/assets';

interface ExercisesViewProps {
  patient: Patient;
  onNavigate: (view: AppView) => void;
  initialExerciseId?: string;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  patient,
  onNavigate,
  initialExerciseId
}) => {
  const [exercises] = useState<Exercise[]>(TODAY_EXERCISES);
  const [selectedExId, setSelectedExId] = useState<string>(
    initialExerciseId || TODAY_EXERCISES[0].id
  );
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedExercise =
    exercises.find((e) => e.id === selectedExId) || exercises[0];

  const filteredExercises = exercises.filter((ex) => {
    const matchesCat =
      filterCategory === 'All' || ex.category === filterCategory;
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Protocol Header Card */}
      <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-primary">
                Protocol #{patient.protocolId}
              </span>
              <span className="text-xs text-text-muted">
                Prescribed by {patient.attendingClinician}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight mt-1">
              {patient.protocolName}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Week {patient.currentWeek} of {patient.totalWeeks} • 4 Exercises Assigned • 5 Sessions / Week • Adherence: {patient.adherenceRate}%
            </p>
          </div>

          <button
            onClick={() => onNavigate('live-session')}
            className="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start lg:self-center active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary-container">
              videocam
            </span>
            <span>Resume Daily Tracking</span>
          </button>
        </div>

        {/* Doctor Clinical Guideline Note */}
        <div className="mt-4 p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest flex items-start gap-3">
          <img
            src={patient.clinicianAvatar}
            alt={patient.attendingClinician}
            className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="text-xs flex-1">
            <p className="font-bold text-primary">Clinician Note (Updated 2 days ago):</p>
            <p className="text-text-secondary mt-0.5">
              "Focus this week on maintaining full scapular depression at terminal 140° elevation. If you notice shoulder hiking or lower back arching, pause at 130°."
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Mobility', 'Stabilization', 'Strength'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-card text-text-secondary hover:bg-surface-subtle border border-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-surface-container-highest bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Two-Column: Catalog on Left, Sticky Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Exercises Catalog */}
        <div className="lg:col-span-6 space-y-3">
          {filteredExercises.map((exercise) => {
            const isSelected = exercise.id === selectedExId;
            return (
              <div
                key={exercise.id}
                onClick={() => setSelectedExId(exercise.id)}
                className={`cursor-pointer bg-surface-card rounded-xl p-4 border transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-surface-card'
                    : 'border-surface-container-highest hover:border-primary/40'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={exercise.photoUrl}
                    alt={exercise.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-surface-container-highest"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-subtle text-secondary">
                        {exercise.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          exercise.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : exercise.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-surface-subtle text-text-muted'
                        }`}
                      >
                        {exercise.status === 'completed'
                          ? 'Completed'
                          : exercise.status === 'in_progress'
                          ? 'In Progress'
                          : 'Prescribed'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-primary mt-1 truncate">
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {exercise.targetArea}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-text-secondary">
                      <span>{exercise.sets} Sets × {exercise.reps} Reps</span>
                      <span>•</span>
                      <span>Target: {exercise.targetAngleMin}°-{exercise.targetAngleMax}°</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Detail Inspector */}
        <div className="lg:col-span-6 bg-surface-card rounded-2xl border border-surface-container-highest p-6 shadow-sm sticky top-24 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                Selected Protocol Block
              </span>
              <h2 className="text-lg font-bold text-primary mt-0.5">
                {selectedExercise.name}
              </h2>
            </div>

            <button
              onClick={() => onNavigate('live-session')}
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary-container">
                videocam
              </span>
              <span>Launch Live Tracking</span>
            </button>
          </div>

          {/* Kinematic Diagram & Sagittal Arc Guidance */}
          <div className="bg-surface-canvas rounded-xl p-4 border border-surface-container-highest flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-44 h-36 bg-surface-card rounded-lg p-2 border border-surface-container-highest/60 flex items-center justify-center flex-shrink-0">
              <img
                src={selectedExercise.diagramUrl}
                alt={selectedExercise.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-text-muted block">
                Target Angle Window
              </span>
              <p className="text-base font-extrabold font-mono text-primary">
                {selectedExercise.targetAngleMin}° — {selectedExercise.targetAngleMax}°
              </p>
              <p className="text-text-secondary text-[11px] leading-relaxed">
                Optical goniometer triggers visual biofeedback chimes when reaching this therapeutic zone.
              </p>
              <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Last Accuracy: {selectedExercise.lastAccuracyScore}%
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
              Step-by-Step Execution
            </h3>
            <ol className="space-y-2">
              {selectedExercise.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                  <span className="w-5 h-5 rounded-full bg-surface-subtle border border-surface-container-highest flex items-center justify-center font-mono font-bold text-[10px] text-primary flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Clinical Compensation Watch-Out */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <span className="material-symbols-outlined text-[16px] text-amber-700">warning</span>
              <span>Compensation Watch-Out:</span>
            </div>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              {selectedExercise.clinicalNote}
            </p>
          </div>

          {/* Equipment Needed */}
          <div>
            <span className="text-[10px] uppercase font-bold text-text-muted block mb-1.5">
              Equipment Needed:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedExercise.equipmentNeeded.map((eq, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-surface-canvas border border-surface-container-highest text-xs font-medium text-text-primary"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
