import React, { useState } from 'react';
import { AppView } from '../../types';
import { ASSETS } from '../../data/assets';

interface LandingViewProps {
  onNavigate: (view: AppView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [simAngle, setSimAngle] = useState(138);
  const [activeProtocolTab, setActiveProtocolTab] = useState<'shoulder' | 'knee' | 'spine'>('shoulder');

  // Calculate status for interactive ROM demo
  const getSimStatus = (angle: number) => {
    if (angle < 90) return { label: 'Warm-Up Arc', color: 'text-amber-600 bg-amber-50 border-amber-200', note: 'Gradual loading within safe baseline' };
    if (angle <= 150) return { label: 'Prescribed Target Arc', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'Optimal therapeutic stimulus without impingement' };
    return { label: 'Subacromial Caution', color: 'text-rose-700 bg-rose-50 border-rose-200', note: 'Upper trapezius elevation or lumbar extension risk' };
  };

  const simStatus = getSimStatus(simAngle);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/60 border border-secondary-container text-primary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>FDA Listed Class II Compliant Biofeedback • Computer Vision AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.1]">
              Precision Digital Physical Therapy with Kinematic Telemetry.
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Turn any smartphone or webcam into a sub-degree goniometric lab. Patients perform prescribed rehabilitation protocols with real-time pose biofeedback, while attending physical therapists monitor compensatory drift.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('live-session')}
                id="hero-start-session-btn"
                className="px-6 py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-container">
                  videocam
                </span>
                <span>Launch Live Tracking Session</span>
              </button>

              <button
                onClick={() => onNavigate('clinician-review')}
                id="hero-clinician-portal-btn"
                className="px-5 py-3.5 bg-surface-card hover:bg-surface-subtle text-primary border border-surface-container-highest rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-text-secondary">
                  medical_services
                </span>
                <span>Clinician Oversight Hub</span>
              </button>
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-surface-container-highest/80">
              <div>
                <p className="text-2xl font-extrabold text-primary font-mono">&lt;0.4°</p>
                <p className="text-xs text-text-muted mt-0.5">Goniometric Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-primary font-mono">91.4%</p>
                <p className="text-xs text-text-muted mt-0.5">Patient Adherence</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-primary font-mono">2.8x</p>
                <p className="text-xs text-text-muted mt-0.5">Faster Milestone Clearance</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-primary font-mono">87k+</p>
                <p className="text-xs text-text-muted mt-0.5">Supervised Clinical Reps</p>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-surface-card border border-surface-container-highest shadow-xl p-1.5">
              {/* Image with HUD Overlays */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-subtle">
                <img
                  src={ASSETS.heroClinic}
                  alt="Clinical Telemetry Session"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/30" />

                {/* Live Overlaid Telemetry Pill */}
                <div className="absolute top-3 left-3 bg-surface-card/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-surface-container-highest/80 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-bold text-primary font-mono">
                    POSE_ESTIMATE: 30 FPS • SAGITTAL
                  </span>
                </div>

                {/* Overlaid Joint Angle Reading */}
                <div className="absolute bottom-3 left-3 right-3 bg-surface-card/95 backdrop-blur-md p-3 rounded-xl border border-surface-container-highest/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                        Active Joint: Glenohumeral Flexion
                      </p>
                      <p className="text-xl font-extrabold text-primary font-mono">
                        142.4° <span className="text-xs text-emerald-700 font-sans font-medium">/ 150° Target</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Form 94%
                      </span>
                      <p className="text-[10px] text-text-muted mt-1 font-mono">Trunk Tilt: 0.8° (Normal)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Clinician Note Card */}
              <div className="p-3.5 bg-surface-card flex items-center gap-3">
                <img
                  src={ASSETS.avatars.drEleanorMorgan}
                  alt="Dr. Kavita Deshmukh"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-xs">
                  <p className="font-bold text-primary">Dr. Kavita Deshmukh, DPT</p>
                  <p className="text-text-muted text-[11px]">
                    "RehabForge eliminates guesswork. I can see exactly when compensatory scapular hitch occurs."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROM Simulator Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-surface-card rounded-2xl border border-surface-container-highest p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Try Kinematic Biofeedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Real-Time Goniometric Feedback Engine
            </h2>
            <p className="text-sm text-text-secondary mt-1.5">
              Drag the interactive joint angle slider below to simulate how the computer vision tracking classifies motion safety, target range of motion, and flags compensatory drift.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Control */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-text-secondary">Simulated Arm Elevation Angle:</span>
                  <span className="text-lg font-extrabold font-mono text-primary">{simAngle}°</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="180"
                  value={simAngle}
                  onChange={(e) => setSimAngle(Number(e.target.value))}
                  id="rom-simulator-slider"
                  className="w-full h-3 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-text-muted font-mono">
                  <span>45° (Rest)</span>
                  <span>90° (Mid-Arc)</span>
                  <span className="text-emerald-700 font-bold">140°-150° (Rx Target)</span>
                  <span>180° (Max)</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border transition-all ${simStatus.color}`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    {simAngle <= 150 && simAngle >= 90 ? 'check_circle' : 'info'}
                  </span>
                  <span>{simStatus.label}</span>
                </div>
                <p className="text-xs mt-1 opacity-90">{simStatus.note}</p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-text-muted self-center mr-1">Presets:</span>
                {[
                  { label: 'Starting Point', val: 70 },
                  { label: 'Prescribed Peak', val: 142 },
                  { label: 'Overextension Drift', val: 168 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setSimAngle(preset.val)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-text-primary border border-surface-container-highest transition-colors"
                  >
                    {preset.label} ({preset.val}°)
                  </button>
                ))}
              </div>
            </div>

            {/* Goniometer Visualization Gauge */}
            <div className="lg:col-span-5 bg-surface-canvas rounded-xl p-6 border border-surface-container-highest/80 text-center">
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                {/* SVG Protractor Arc */}
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
                    stroke={simAngle > 150 ? '#b85c57' : simAngle >= 90 ? '#4e8a68' : '#c9953c'}
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (simAngle / 180))}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-150"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black font-mono text-primary">
                    {simAngle}°
                  </span>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Goniometer
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container-highest/60 flex justify-around text-xs">
                <div>
                  <span className="text-text-muted block text-[10px]">Sampling Rate</span>
                  <span className="font-bold font-mono text-text-primary">60 Hz</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">Confidence</span>
                  <span className="font-bold font-mono text-emerald-700">99.2%</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">Latency</span>
                  <span className="font-bold font-mono text-text-primary">18 ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Closed Loop Architecture */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Clinical Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
            The Continuous Kinematic Feedback Loop
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Bridging the gap between weekly in-clinic appointments and home exercise programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: '01',
              title: 'Rx & Range Calibration',
              icon: 'settings_accessibility',
              desc: 'Physical therapist sets exact allowable sagittal angles, velocity ceilings, and rep sets specific to pathology.',
              metric: 'Custom Prescriptions'
            },
            {
              step: '02',
              title: 'Vision Pose Guidance',
              icon: 'videocam',
              desc: 'Patient mounts phone or laptop. Spatial skeleton vectors track joint vertices without wearable harness.',
              metric: '33 Keypoint Tracking'
            },
            {
              step: '03',
              title: 'Real-time Biofeedback',
              icon: 'graphic_eq',
              desc: 'Immediate auditory chimes and visual cues instruct patient before compensatory bad habits solidify.',
              metric: '<50ms Response'
            },
            {
              step: '04',
              title: 'Clinician Triage & Titration',
              icon: 'clinical_notes',
              desc: 'Kinematic telemetry flags outlier reps so PTs can intervene asynchronously and advance recovery protocols.',
              metric: 'Daily Review Dashboard'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="bg-surface-card rounded-xl p-5 border border-surface-container-highest relative flex flex-col justify-between hover:border-primary/30 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-text-muted">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-base text-primary mb-2">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container-highest/60">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  {item.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protocol Library Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-surface-subtle rounded-2xl p-6 sm:p-8 border border-surface-container-highest">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary">
                Evidence-Based Protocol Library
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Clinician-validated kinematic routines for common orthopedic indications.
              </p>
            </div>

            {/* Protocol Tabs */}
            <div className="flex items-center bg-surface-card p-1 rounded-xl border border-surface-container-highest">
              <button
                onClick={() => setActiveProtocolTab('shoulder')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProtocolTab === 'shoulder'
                    ? 'bg-primary text-on-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Rotator Cuff
              </button>
              <button
                onClick={() => setActiveProtocolTab('knee')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProtocolTab === 'knee'
                    ? 'bg-primary text-on-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                ACL Reconstruction
              </button>
              <button
                onClick={() => setActiveProtocolTab('spine')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProtocolTab === 'spine'
                    ? 'bg-primary text-on-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Lumbar Stabilization
              </button>
            </div>
          </div>

          {/* Active Tab Content */}
          {activeProtocolTab === 'shoulder' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <img
                  src={ASSETS.exercisePhotos.shoulderFlexion}
                  alt="Standing Shoulder Flexion"
                  className="w-full h-36 object-cover rounded-lg mb-3"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Phase II Mobility</span>
                <h3 className="font-bold text-sm text-primary mt-1">Standing Shoulder Flexion</h3>
                <p className="text-xs text-text-secondary mt-1">Sagittal arm elevation with active subacromial clearance monitor.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Target: 140°-150°</span>
                  <span className="font-bold text-primary">3 × 10 Reps</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <img
                  src={ASSETS.exercisePhotos.scapularRetraction}
                  alt="Prone Scapular Retraction"
                  className="w-full h-36 object-cover rounded-lg mb-3"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Scapular Dynamics</span>
                <h3 className="font-bold text-sm text-primary mt-1">Prone Scapular Retraction</h3>
                <p className="text-xs text-text-secondary mt-1">Rhomboid recruitment with upper trapezius spasm suppression.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Hold: 3 sec</span>
                  <span className="font-bold text-primary">3 × 12 Reps</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <img
                  src={ASSETS.exercisePhotos.wallSlides}
                  alt="Controlled Wall Slides"
                  className="w-full h-36 object-cover rounded-lg mb-3"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Serratus Activation</span>
                <h3 className="font-bold text-sm text-primary mt-1">Controlled Wall Slides</h3>
                <p className="text-xs text-text-secondary mt-1">Thoracic upward rotation tracking along the vertical surface plane.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Target: 145°</span>
                  <span className="font-bold text-primary">3 × 10 Reps</span>
                </div>
              </div>
            </div>
          )}

          {activeProtocolTab === 'knee' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">airline_seat_legroom_extra</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Phase III Knee</span>
                <h3 className="font-bold text-sm text-primary mt-1">Terminal Knee Extension</h3>
                <p className="text-xs text-text-secondary mt-1">Vastus medialis oblique (VMO) isolated quad lock to 0° hyperextension.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Target: 0° Ext</span>
                  <span className="font-bold text-primary">3 × 15 Reps</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">directions_run</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Frontal Plane</span>
                <h3 className="font-bold text-sm text-primary mt-1">Single-Leg Step Downs</h3>
                <p className="text-xs text-text-secondary mt-1">Dynamic knee valgus collapse angle alert during eccentric descent.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Valgus Limit: &lt;5°</span>
                  <span className="font-bold text-primary">3 × 10 Reps</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">accessibility_new</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Hamstring Control</span>
                <h3 className="font-bold text-sm text-primary mt-1">Prone Active Heel Slides</h3>
                <p className="text-xs text-text-secondary mt-1">Gradual progression toward full 135° anatomical knee flexion.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Target: 135°</span>
                  <span className="font-bold text-primary">3 × 12 Reps</span>
                </div>
              </div>
            </div>
          )}

          {activeProtocolTab === 'spine' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">self_improvement</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Pelvic Neutral</span>
                <h3 className="font-bold text-sm text-primary mt-1">Quadruped Bird-Dog</h3>
                <p className="text-xs text-text-secondary mt-1">Transverse abdominis hold with pelvic rotation tilt monitoring.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Tilt Alert: &gt;3°</span>
                  <span className="font-bold text-primary">3 × 10 / side</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">fitness_center</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Spinal Hygiene</span>
                <h3 className="font-bold text-sm text-primary mt-1">Supported Dead Bug</h3>
                <p className="text-xs text-text-secondary mt-1">Maintenance of flat lumbar lordosis during alternating contralateral limb reach.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Gap Warning: Active</span>
                  <span className="font-bold text-primary">3 × 12 Reps</span>
                </div>
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-surface-container-highest">
                <div className="w-full h-36 bg-surface-container-low rounded-lg mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">straighten</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Glute Drive</span>
                <h3 className="font-bold text-sm text-primary mt-1">Supine Glute Bridges</h3>
                <p className="text-xs text-text-secondary mt-1">Verifying full hip extension without compensatory lumbar hyperextension.</p>
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-text-muted">
                  <span>Target: 180° Flat</span>
                  <span className="font-bold text-primary">3 × 15 Reps</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clinician Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-card p-6 rounded-2xl border border-surface-container-highest shadow-sm flex flex-col justify-between">
            <p className="text-sm text-text-secondary italic leading-relaxed">
              "The biggest failure point in outpatient orthopedics is patient compensation at home. Patients do 100 reps with terrible form, reinforcing faulty biomechanics. RehabForge alerts them instantly when their trunk drifts or scapula hitches."
            </p>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-surface-container-highest/60">
              <img
                src={ASSETS.avatars.drSarahJenkins}
                alt="Dr. Pooja Menon"
                className="w-11 h-11 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-primary">Dr. Pooja Menon, PT, DPT, SCS</p>
                <p className="text-[11px] text-text-muted">Director of Sports Rehabilitation, Apex Health</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-card p-6 rounded-2xl border border-surface-container-highest shadow-sm flex flex-col justify-between">
            <p className="text-sm text-text-secondary italic leading-relaxed">
              "With the Clinician Hub, I review 20 patient sessions in 10 minutes. I don't need to watch hours of video—I just scan the flagged telemetry reps, see exactly where the compensatory spike occurred, and adjust their target angles."
            </p>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-surface-container-highest/60">
              <img
                src={ASSETS.avatars.drEleanorMorgan}
                alt="Dr. Kavita Deshmukh"
                className="w-11 h-11 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-primary">Dr. Kavita Deshmukh, DPT, OCS</p>
                <p className="text-[11px] text-text-muted">Board-Certified Orthopedic Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Action Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-primary text-on-primary rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience Clinical-Grade Recovery?
            </h2>
            <p className="text-sm sm:text-base text-secondary-container/90 leading-relaxed">
              Explore your personalized daily protocol, launch an active optical tracking session, or review clinical telemetry data in the clinician portal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={() => onNavigate('dashboard')}
                id="cta-open-dashboard"
                className="px-6 py-3 bg-secondary-container hover:bg-secondary-fixed text-primary rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md"
              >
                Go to Patient Dashboard
              </button>
              <button
                onClick={() => onNavigate('live-session')}
                id="cta-start-live"
                className="px-6 py-3 bg-primary-container hover:bg-opacity-90 text-on-primary border border-secondary-container/30 rounded-xl font-bold text-sm transition-all"
              >
                Launch Pose Tracking
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
