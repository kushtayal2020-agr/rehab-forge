import React, { useState } from 'react';
import { AppView, Patient } from '../types';
import { ASSETS } from '../data/assets';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  currentPatient: Patient;
  onSelectPatient: (patientId: string) => void;
  patients: Patient[];
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentPatient,
  onSelectPatient,
  patients
}) => {
  const [patientMenuOpen, setPatientMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: AppView; label: string; icon: string }[] = [
    { view: 'landing', label: 'Overview', icon: 'view_quilt' },
    { view: 'dashboard', label: 'Patient Portal', icon: 'dashboard' },
    { view: 'live-session', label: 'Live Session', icon: 'videocam' },
    { view: 'exercises', label: 'My Plan', icon: 'fitness_center' },
    { view: 'clinician-review', label: 'Clinician Hub', icon: 'clinical_notes' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-card/90 backdrop-blur-md border-b border-surface-container-highest/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              id="brand-logo-btn"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
                <img
                  src={ASSETS.logo}
                  alt="RehabForge"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-primary font-sans">
                    RehabForge
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-secondary-container text-primary rounded text-center tracking-wider">
                    Clinical
                  </span>
                </div>
                <span className="text-[11px] text-text-muted hidden sm:inline -mt-0.5">
                  Kinematic Biofeedback Telemetry
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container-highest/50">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  id={`nav-link-${item.view}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-card/80'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.view === 'live-session' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            {/* Quick Live Tracking CTA */}
            {currentView !== 'live-session' && (
              <button
                onClick={() => onNavigate('live-session')}
                id="header-launch-session-btn"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary-container">
                  sensors
                </span>
                <span>Track Session</span>
              </button>
            )}

            {/* Patient Context Switcher */}
            <div className="relative">
              <button
                onClick={() => setPatientMenuOpen(!patientMenuOpen)}
                id="patient-switcher-btn"
                className="flex items-center gap-2 p-1.5 pr-2.5 bg-surface-container-low hover:bg-surface-container rounded-xl border border-surface-container-highest/60 transition-all text-left"
              >
                <img
                  src={currentPatient.avatar}
                  alt={currentPatient.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-text-primary">
                    {currentPatient.name}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {currentPatient.protocolId} • Wk {currentPatient.currentWeek}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-text-muted">
                  expand_more
                </span>
              </button>

              {/* Patient Selector Dropdown */}
              {patientMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-surface-card rounded-xl shadow-xl border border-surface-container-highest p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1.5 mb-1 border-b border-surface-container-high/70">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                      Active Patients (Triage Cohort)
                    </p>
                  </div>
                  <div className="space-y-1">
                    {patients.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPatient(p.id);
                          setPatientMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                          p.id === currentPatient.id
                            ? 'bg-surface-container-low text-primary font-bold'
                            : 'hover:bg-surface-canvas text-text-primary'
                        }`}
                      >
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-7 h-7 rounded-md object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{p.name}</p>
                          <p className="text-[10px] text-text-muted truncate">{p.condition}</p>
                        </div>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            p.triagePriority === 'high'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.adherenceRate}%
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-surface-container-high/70 px-2 flex justify-between items-center text-[11px]">
                    <span className="text-text-muted">Attending:</span>
                    <span className="font-semibold text-primary truncate max-w-[170px]">
                      {currentPatient.attendingClinician}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-container-low"
              id="mobile-nav-toggle"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-container-highest bg-surface-card px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                currentView === item.view
                  ? 'bg-primary text-on-primary'
                  : 'text-text-primary hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
