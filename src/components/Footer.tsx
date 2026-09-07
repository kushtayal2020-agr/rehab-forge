import React from 'react';
import { AppView } from '../types';
import { ASSETS } from '../data/assets';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-surface-container-highest bg-surface-card text-text-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-1">
                <img
                  src={ASSETS.logo}
                  alt="RehabForge"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-base text-primary">RehabForge</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-secondary-container text-primary rounded">
                Clinical Telemetry
              </span>
            </div>
            <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
              Clinical-grade digital physical therapy leveraging optical computer vision pose estimation, real-time kinematic goniometry, and asynchronous clinician triage.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Goniometric Ingest: All Systems Operational (60 Hz)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              Application Views
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="hover:text-primary transition-colors"
                >
                  Overview & Kinematic Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-primary transition-colors"
                >
                  Patient Dashboard & Routine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('live-session')}
                  className="hover:text-primary transition-colors"
                >
                  Active Pose Tracking Session
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('exercises')}
                  className="hover:text-primary transition-colors"
                >
                  Evidence-Based Protocol Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('clinician-review')}
                  className="hover:text-primary transition-colors"
                >
                  Clinician Oversight Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Regulatory Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              Clinical Standards
            </h4>
            <div className="space-y-2 text-[11px] text-text-muted">
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                <span>FDA Class II Compliant Biofeedback</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">security</span>
                <span>HIPAA & SOC 2 Type II Encrypted</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">straighten</span>
                <span>Sub-Degree Goniometric Precision</span>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="pt-6 border-t border-surface-container-highest/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-text-muted">
          <p>
            RehabForge is intended as an adjunct clinical tool under the direction of licensed physical therapists. Always follow your medical provider's specific pain and load restrictions.
          </p>
          <p className="flex-shrink-0">
            © {new Date().getFullYear()} RehabForge Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
