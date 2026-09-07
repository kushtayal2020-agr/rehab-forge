import React, { useState, useEffect, useRef } from 'react';
import { AppView, Patient } from '../../types';
import { ASSETS } from '../../data/assets';

interface LiveSessionViewProps {
  patient: Patient;
  onNavigate: (view: AppView) => void;
}

export const LiveSessionView: React.FC<LiveSessionViewProps> = ({ patient, onNavigate }) => {
  const [seconds, setSeconds] = useState(222); // 03:42
  const [isRunning, setIsRunning] = useState(true);
  const [currentReps, setCurrentReps] = useState(7);
  const targetReps = 10;
  const [currentSet, setCurrentSet] = useState(3);
  const totalSets = 3;
  
  // Real-time fluctuating angle simulation
  const [currentAngle, setCurrentAngle] = useState(142.4);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationCountdown, setCalibrationCountdown] = useState(3);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagNote, setFlagNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        // Small realistic micro-jitter for live tracking simulation (+/- 0.3°)
        setCurrentAngle((prev) => {
          const jitter = (Math.random() - 0.5) * 0.6;
          const next = prev + jitter;
          return Number(Math.max(139, Math.min(145, next)).toFixed(1));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setCalibrationCountdown(3);
    const calInterval = setInterval(() => {
      setCalibrationCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(calInterval);
          setIsCalibrating(false);
          setCurrentAngle(140.0);
          setToastMessage('Kinematic baseline recalibrated to neutral anatomical position.');
          setTimeout(() => setToastMessage(null), 4000);
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  };

  const handleNextRep = () => {
    if (currentReps < targetReps) {
      setCurrentReps((r) => r + 1);
      setToastMessage(`Rep #${currentReps + 1} logged with 94% kinematic form score.`);
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setToastMessage('Target reps completed for Set 3! Protocol milestone achieved.');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleFlagDiscomfort = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFlagModal(false);
    setToastMessage('Discomfort event flagged at 03:42. Clinician notified in triage queue.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-secondary-container/40 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Live Session Top Header */}
      <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl text-secondary animate-pulse">
              sensors
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-primary">
                Standing Shoulder Flexion
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                LIVE RECORDING
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Protocol #{patient.protocolId} • Attending: {patient.attendingClinician}
            </p>
          </div>
        </div>

        {/* Stopwatch & End Session */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-canvas border border-surface-container-highest font-mono text-sm font-bold text-primary">
            <span className="material-symbols-outlined text-[18px] text-text-muted">timer</span>
            <span>{formatTime(seconds)}</span>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            id="btn-complete-session"
            className="px-4 py-2 bg-surface-canvas hover:bg-surface-subtle text-primary border border-surface-container-highest rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">stop_circle</span>
            <span>End Set</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Camera Viewport + Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Pose Estimation Viewport */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-primary/95 border border-surface-container-highest shadow-lg aspect-[16/10] flex items-center justify-center">
            {/* Real Background Pose Image */}
            <img
              src={ASSETS.livePoseBg}
              alt="Live Kinematic Pose Viewport"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />

            {/* Dark overlay with grid lines for clinical measurement */}
            <div className="absolute inset-0 bg-primary/40" />

            {/* Dynamic Skeleton Vector Simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500">
              {/* Spine Axis */}
              <line x1="390" y1="180" x2="385" y2="340" stroke="#90b6aa" strokeWidth="3" strokeDasharray="4 2" />
              {/* Torso to Right Shoulder */}
              <line x1="390" y1="180" x2="430" y2="185" stroke="#b8ebd0" strokeWidth="4" />
              {/* Right Upper Arm (Flexion vector) */}
              <line x1="430" y1="185" x2="480" y2="120" stroke="#b8ebd0" strokeWidth="4" />
              {/* Right Forearm */}
              <line x1="480" y1="120" x2="520" y2="65" stroke="#ffffff" strokeWidth="4" />

              {/* Goniometer Protractor Arc around Glenohumeral Joint */}
              <circle cx="430" cy="185" r="36" fill="none" stroke="#24483f" strokeWidth="2" strokeDasharray="3 3" />
              <path
                d="M 430 149 A 36 36 0 0 1 458 162"
                fill="none"
                stroke="#b8ebd0"
                strokeWidth="4"
              />

              {/* Joint Keypoint Vertices */}
              <circle cx="390" cy="140" r="7" fill="#ffffff" stroke="#0b3129" strokeWidth="2" /> {/* Head */}
              <circle cx="390" cy="180" r="5" fill="#90b6aa" /> {/* Neck */}
              <circle cx="430" cy="185" r="8" fill="#b8ebd0" stroke="#0b3129" strokeWidth="2" /> {/* Right Shoulder */}
              <circle cx="480" cy="120" r="6" fill="#b8ebd0" stroke="#0b3129" strokeWidth="2" /> {/* Right Elbow */}
              <circle cx="520" cy="65" r="6" fill="#ffffff" stroke="#0b3129" strokeWidth="2" /> {/* Right Wrist */}
              <circle cx="385" cy="340" r="6" fill="#90b6aa" /> {/* Pelvis */}
            </svg>

            {/* Overlaid Floating Joint Angle Badge near the arm */}
            <div className="absolute top-[22%] right-[28%] bg-primary/90 text-on-primary backdrop-blur-md px-3 py-1.5 rounded-xl border border-secondary-container/60 shadow-xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
              <div className="font-mono">
                <span className="text-xs text-secondary-container uppercase block text-[9px] font-bold">Glenohumeral Arc</span>
                <span className="text-lg font-black">{currentAngle}°</span>
              </div>
            </div>

            {/* Top HUD Diagnostics */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <div className="bg-surface-card/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-surface-container-highest/60 text-[10px] font-bold font-mono text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>SAGITTAL PLANE VALIDATED</span>
              </div>
              <div className="bg-surface-card/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-surface-container-highest/60 text-[10px] font-mono text-text-secondary">
                CONFIDENCE: 98.4%
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-surface-card/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-surface-container-highest/60 text-[10px] font-mono text-text-secondary">
              60 FPS • CAM #01
            </div>

            {/* Calibration Overlay */}
            {isCalibrating && (
              <div className="absolute inset-0 bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center text-on-primary z-20 animate-in fade-in">
                <span className="material-symbols-outlined text-5xl text-secondary-container animate-spin">
                  sync
                </span>
                <h3 className="text-xl font-bold mt-4">Recalibrating Anatomical Zero</h3>
                <p className="text-xs text-secondary-container mt-1">Stand erect with arms resting naturally at side</p>
                <span className="text-5xl font-black font-mono mt-4 text-secondary-container">
                  {calibrationCountdown}
                </span>
              </div>
            )}

            {/* Bottom Real-time Biofeedback Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-surface-card/95 backdrop-blur-md p-3.5 rounded-xl border border-surface-container-highest/90 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">
                    Optimal Form Maintained
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Hold peak elevation for 2 seconds. Scapular depression steady, no trunk tilt detected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handleNextRep}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-container text-on-primary transition-all active:scale-95 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px] text-secondary-container">add_task</span>
                  <span>Count Rep</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Session Controls Bar */}
          <div className="bg-surface-card rounded-xl p-3 border border-surface-container-highest flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                id="btn-pause-session"
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-surface-canvas hover:bg-surface-subtle text-primary border border-surface-container-highest flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isRunning ? 'pause' : 'play_arrow'}
                </span>
                <span>{isRunning ? 'Pause Tracking' : 'Resume Tracking'}</span>
              </button>

              <button
                onClick={handleRecalibrate}
                id="btn-recalibrate"
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-surface-canvas hover:bg-surface-subtle text-text-secondary hover:text-primary border border-surface-container-highest flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Recalibrate 0° Baseline</span>
              </button>

              <button
                onClick={() => setAudioFeedback(!audioFeedback)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                  audioFeedback
                    ? 'bg-secondary-container/40 text-primary border-secondary-container'
                    : 'bg-surface-canvas text-text-muted border-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {audioFeedback ? 'volume_up' : 'volume_off'}
                </span>
                <span>Voice Cues {audioFeedback ? 'On' : 'Muted'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowFlagModal(true)}
              id="btn-flag-discomfort"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span>Flag Discomfort</span>
            </button>
          </div>
        </div>

        {/* Right: Live Telemetry Metrics Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Rep Progress Card */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Repetition Counter
              </span>
              <span className="text-xs font-mono font-bold text-primary">
                Set {currentSet} of {totalSets}
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-black font-mono text-primary">
                {String(currentReps).padStart(2, '0')}
              </span>
              <span className="text-lg font-bold text-text-muted">/ {targetReps} Reps</span>
            </div>

            {/* Rep beads strip */}
            <div className="grid grid-cols-10 gap-1.5 my-3">
              {Array.from({ length: targetReps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    i < currentReps
                      ? 'bg-primary'
                      : i === currentReps
                      ? 'bg-secondary-container animate-pulse ring-2 ring-primary/20'
                      : 'bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-text-muted pt-2 border-t border-surface-container-highest/60">
              <span>Cadence: <strong>2.4s</strong></span>
              <span>Form Accuracy: <strong className="text-emerald-700">92%</strong></span>
            </div>
          </div>

          {/* Active Range of Motion Target Window */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              Target Arc Compliance
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-1">
                  <span className="text-text-secondary">Current Flexion</span>
                  <span className="text-primary text-base">{currentAngle}°</span>
                </div>

                {/* Progress Bar with Safe Window Highlight */}
                <div className="relative w-full h-4 bg-surface-canvas rounded-full overflow-hidden border border-surface-container-highest">
                  {/* Prescribed Target Arc Zone (90° to 150° out of 180° = 50% to 83%) */}
                  <div
                    className="absolute top-0 bottom-0 bg-emerald-100/70 border-x border-emerald-400"
                    style={{ left: '50%', width: '33.3%' }}
                  />
                  {/* Current Pointer Fill */}
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(100, (currentAngle / 180) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
                  <span>0°</span>
                  <span className="text-emerald-700 font-bold">Rx 90°-150°</span>
                  <span>180°</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-canvas border border-surface-container-highest text-xs space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-text-muted">Target Max:</span>
                  <span className="font-bold text-primary">150.0°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Starting Baseline:</span>
                  <span className="font-bold text-primary">85.0°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Trunk Lateral Tilt:</span>
                  <span className="font-bold text-emerald-700">0.8° (Pass)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tri-Sensor Telemetry Status */}
          <div className="bg-surface-card rounded-xl p-5 border border-surface-container-highest shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              Hardware & Pipeline Telemetry
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-canvas">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">videocam</span>
                  <span className="font-medium text-text-primary">Optical Camera</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">60 FPS • 1080p</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-canvas">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">watch</span>
                  <span className="font-medium text-text-primary">Apple Watch IMU</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">Connected • 88%</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-canvas">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
                  <span className="font-medium text-text-primary">Pose Pipeline Latency</span>
                </div>
                <span className="font-mono text-[11px] text-primary font-bold">16 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discomfort Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl max-w-md w-full p-6 border border-surface-container-highest shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600">flag</span>
                Flag Kinematic Discomfort
              </h3>
              <button
                onClick={() => setShowFlagModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Tagging this repetition will bookmark current time offset (03:42) and attach your goniometer readings to {patient.attendingClinician}'s triage review dashboard.
            </p>

            <form onSubmit={handleFlagDiscomfort} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Pain / Discomfort Level:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      className="flex-1 py-1.5 rounded-lg border border-surface-container-highest hover:bg-rose-50 text-xs font-bold text-primary focus:bg-rose-100 focus:border-rose-400"
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>Mild Pinch</span>
                  <span>Severe Pain</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Notes on sensation:
                </label>
                <input
                  type="text"
                  value={flagNote}
                  onChange={(e) => setFlagNote(e.target.value)}
                  placeholder="e.g. Sharp pinch at peak 144° reach..."
                  className="w-full text-xs p-2.5 rounded-lg border border-surface-container-highest bg-surface-canvas focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFlagModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-subtle rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white rounded-lg transition-all"
                >
                  Submit Discomfort Flag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
