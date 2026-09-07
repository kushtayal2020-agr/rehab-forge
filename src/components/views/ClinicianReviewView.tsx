import React, { useState } from 'react';
import { AppView, Patient, RepRecord } from '../../types';
import { ALEX_REPS_RECORD } from '../../data/assets';

interface ClinicianReviewViewProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

export const ClinicianReviewView: React.FC<ClinicianReviewViewProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onNavigate
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedRep, setSelectedRep] = useState<RepRecord>(ALEX_REPS_RECORD[7]); // Rep 8 flagged
  const [clinicianNote, setClinicianNote] = useState<string>(
    'Patient demonstrated smooth glenohumeral arc through reps 1-7 (avg 141.2°). On Rep 8, fatigue induced a 4.2° contralateral trunk tilt to achieve end-range 146.4°. Prescribing a 2-second isometric pause at 138° to prevent subacromial hitching before advancing to 150° next week.'
  );
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [signToast, setSignToast] = useState<string | null>(null);

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter((p) => {
    if (filterPriority === 'flagged') return p.status === 'attention_required';
    if (filterPriority === 'milestone') return p.status === 'milestone_met';
    return true;
  });

  const handleSignProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    setSignToast(
      `Protocol modification signed and published for ${selectedPatient.name}. Push notification dispatched.`
    );
    setTimeout(() => setSignToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast */}
      {signToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-secondary-container/40 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-secondary-container">verified</span>
          <span className="text-xs font-semibold">{signToast}</span>
        </div>
      )}

      {/* Clinician Hub Top Ribbon */}
      <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-on-primary">
                Clinician Oversight Hub
              </span>
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Kinematic Telemetry Ingest
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight mt-1">
              Outpatient Triage & Telemetry Audit
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Supervising Physical Therapist: <strong className="text-primary">{selectedPatient.attendingClinician}</strong>
            </p>
          </div>

          {/* High-level Cohort Metrics */}
          <div className="flex flex-wrap items-center gap-4 bg-surface-canvas p-3 rounded-xl border border-surface-container-highest">
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold block">Cohort Load</span>
              <span className="text-base font-extrabold font-mono text-primary">124</span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest" />
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold block">Reviews Today</span>
              <span className="text-base font-extrabold font-mono text-primary">38</span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest" />
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold block">Avg Adherence</span>
              <span className="text-base font-extrabold font-mono text-emerald-700">91.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Triage List on Left, Telemetry Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Triage Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary">Patient Triage Queue</h2>
            <div className="flex gap-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'flagged', label: 'Flagged' },
                { id: 'milestone', label: 'Milestones' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterPriority(f.id)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    filterPriority === f.id
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-card text-text-secondary hover:bg-surface-subtle border border-surface-container-highest'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatient.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPatient(p.id)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                    isSelected
                      ? 'bg-surface-card border-primary ring-2 ring-primary/20 shadow-sm'
                      : 'bg-surface-card hover:bg-surface-subtle border-surface-container-highest'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-primary/15 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-primary truncate">{p.name}</h3>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            p.triagePriority === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : p.triagePriority === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.triagePriority.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-[11px] text-text-muted truncate mt-0.5">{p.condition}</p>

                      {p.flagReason && (
                        <div className="mt-2 p-2 rounded-lg bg-surface-canvas border border-surface-container-highest text-[10px] text-text-secondary flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-amber-600 flex-shrink-0 mt-0.5">
                            warning
                          </span>
                          <span className="line-clamp-2">{p.flagReason}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mt-2 pt-1 border-t border-surface-container-highest/60">
                        <span>Adherence: <strong className="text-primary">{p.adherenceRate}%</strong></span>
                        <span>ROM: <strong className="text-primary">{p.currentRom}°</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Patient Telemetry Dossier */}
        <div className="lg:col-span-8 space-y-5">
          {/* Patient Header Banner */}
          <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-primary">{selectedPatient.name}</h2>
                    <span className="text-xs text-text-muted font-mono">
                      (Age {selectedPatient.age})
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {selectedPatient.condition}
                  </p>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5">
                    {selectedPatient.protocolName} • Week {selectedPatient.currentWeek}/{selectedPatient.totalWeeks}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('live-session')}
                  className="px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">
                    videocam
                  </span>
                  <span>Mirror Live Stream</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rep-by-Rep Movement Timeline & Kinematic Drift Inspector */}
          <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Session Telemetry Audit • Set 3 of 3
                </span>
                <h3 className="text-sm font-bold text-primary mt-0.5">
                  Standing Shoulder Flexion (10 Prescribed Repetitions)
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Optimal (9)
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Kinematic Anomaly (1)
                </span>
              </div>
            </div>

            {/* Rep Beads Bar */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2">
              {ALEX_REPS_RECORD.map((rep) => {
                const isSelected = selectedRep.repNumber === rep.repNumber;
                const isAnomaly = rep.status === 'drift_detected';

                return (
                  <button
                    key={rep.repNumber}
                    onClick={() => setSelectedRep(rep)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/20 bg-surface-canvas shadow-sm'
                        : isAnomaly
                        ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-100/60'
                        : 'border-surface-container-highest bg-surface-card hover:bg-surface-canvas'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block text-text-muted">
                      R{rep.repNumber}
                    </span>
                    <span
                      className={`text-xs font-black font-mono mt-0.5 block ${
                        isAnomaly ? 'text-rose-700' : 'text-primary'
                      }`}
                    >
                      {Math.round(rep.maxFlexion)}°
                    </span>
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mt-1 ${
                        isAnomaly ? 'bg-rose-600' : 'bg-emerald-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Selected Rep Telemetry Deep Dive Card */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                selectedRep.status === 'drift_detected'
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-surface-canvas border-surface-container-highest'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">
                    Repetition #{selectedRep.repNumber} Detailed Metrics
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    (Offset: {selectedRep.timeOffset})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      selectedRep.status === 'drift_detected'
                        ? 'bg-rose-200 text-rose-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Score: {selectedRep.score}%
                  </span>
                  <button
                    onClick={() => onNavigate('live-session')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-surface-card hover:bg-surface-subtle border border-surface-container-highest rounded-lg flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">videocam</span>
                    <span>Review Video (02:44)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs font-mono">
                <div>
                  <span className="text-text-muted text-[10px] block">Max Flexion</span>
                  <span className="font-bold text-primary text-sm">{selectedRep.maxFlexion}°</span>
                </div>
                <div>
                  <span className="text-text-muted text-[10px] block">Target Flexion</span>
                  <span className="font-bold text-primary text-sm">{selectedRep.targetFlexion}°</span>
                </div>
                <div>
                  <span className="text-text-muted text-[10px] block">Trunk Tilt Drift</span>
                  <span className={`font-bold text-sm ${selectedRep.status === 'drift_detected' ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {selectedRep.status === 'drift_detected' ? '+4.2° Lateral' : '0.8° (Pass)'}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted text-[10px] block">Scapular Stability</span>
                  <span className={`font-bold text-sm ${selectedRep.status === 'drift_detected' ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {selectedRep.status === 'drift_detected' ? 'Hitch Detected' : 'Depressed'}
                  </span>
                </div>
              </div>

              {selectedRep.compensationDetected && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-100/80 border border-rose-300/80 text-xs text-rose-900 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-700 flex-shrink-0 mt-0.5">
                    report_problem
                  </span>
                  <div>
                    <strong>Kinematic Drift Analysis: </strong>
                    {selectedRep.compensationDetected}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clinician Documentation & Titration Note Editor */}
          <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-5 shadow-sm">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">clinical_notes</span>
              Clinical Titration & Electronic Progress Note
            </h3>
            <p className="text-xs text-text-secondary mb-3">
              Document kinematic findings, adjust therapeutic angle ceilings, and update the patient's active mobile protocol.
            </p>

            <form onSubmit={handleSignProtocol} className="space-y-4">
              <textarea
                rows={4}
                value={clinicianNote}
                onChange={(e) => setClinicianNote(e.target.value)}
                className="w-full text-xs p-3.5 rounded-xl border border-surface-container-highest bg-surface-canvas focus:outline-none focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                required
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyPatient}
                    onChange={(e) => setNotifyPatient(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Dispatch immediate push notification to {selectedPatient.name.split(' ')[0]}'s mobile app</span>
                </label>

                <button
                  type="submit"
                  id="btn-sign-protocol"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">
                    check_circle
                  </span>
                  <span>Update Plan & Sign Protocol</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
