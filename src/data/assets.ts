import { Patient, Exercise, RepRecord } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VW7xwcLdZfdXzp896tDH30l0KBV7g-x-GNFwDI4vzMaCn9qZhOgqTjDiQ1C5zXaxbt4WHakMMrZmNVSZkL-J5jCbhUzUNgcIcLJx856gDHMpq0QnTTtabvdDPnx8BqcDyl4LsPvr0IQZfrL7nuEmKu4TidH86tpU25oBiAJfpAA_RJUd68GuM_0YXuRFfsrQeALysc5ta1Js_PiQYQMzgB9Cd50NYmAbO9cZ4ZjjPwqOBh5ZWU9wKSst0',
  heroClinic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMhJjb8opZipjyRtgp1Fdbh1JOWI-JrrgJt8D_9baknuXFuQ0eYrDCzclwPKlmzurB49lMeSrMQVUl2_uOSr_esCqyq8hJJnvIHAUSGscnAqPDMLcs3oZOnMwY1hBHFjMTVYYRpFgCX4XikP_djl8zi1JeUJX1RV3z3s9hBopGuPPyqomY67OUhakTYsoyzDEozwmR2uS1_ZJcVIoPfR5fbbTf4esSRsOX_X4gCQNN-K8hetMJtNd3',
  livePoseBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKT5nbaP-Zh6DvTtc9NAxKNvGhcwtDOhZuRhWi_2YOyu4zit--Eim9dZSCytK1bJ4E8vL2Bf7ENxU8DN3losz5CL8ZI-7hVv6F_W7IfJHOnHh5vwZD_CbwA0jowFkjz-r8Ca1laCGRCQjNEQcndM_VkcsulIIjgEawuA6FWJzSYotDgXoAI5acVAmamuy-5dKQquseGFsjCsSUQLr9JAk9PWl7Krf5cqoy8VhgApXky8YjsvEpwqhQ',
  
  avatars: {
    alexMorgan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjuudv15ZTy6t7s2kZ0b-c29ZPtTHeIYSntcggjFq8T0Nmj1sWjbmH4Et-JWzRktCmaGCdPx-rflFdnOzBTM0nMIEdLMsobxC74JAtEtOuwBECwOurGEkDNzsnEe0xGUeBNEP7UGtka1T3buPlNJoLGGEn5uSgdgAp7FsOw7XTd9-hId9lpaSW2cKLEL-rJQZqh3YqIHCPq5QBlbEMX3OdF546kWaILCnODy2t0oCoM711fDr7MYJy',
    alexMorganDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOgyzritpy59JIhmp0dwxVsHGck8kDHxyYnC8Qx3DzqDChuLseHkYG-REf2w-AEG1QVAMU9PoWLGTgGMNoiXqf0wy8dIyZQyd9GdQC5-K0K-KdrA6n-Mv85pF8cU8d6mjaePyOyFKaLMa_TimLNERUm_imo83QJnDPObAwNZh0Nn1WizTBaf_czTScq2gAFGzz3_BOuuxwqet1dh2vOu-FnwAG5Yvp9w7d4n5cbrZSCAgoOpmWqUYR',
    alexMorganReview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKCCrhiFsgdUCWRQccM6cYFsA-Wn5FJYBeX3EmWgyLVzD9C1BbrrM3IvFPfHv0R2HYoZ7CHKESAx4FPH2qObtCh-pSZr5OE2VRKaxQ6nbLA1TLog4fuN-zrmyKRWTA2ka7wz3_Ekv7u6U5-ACs_P_NCoIouvXUTdyBcp8siW5leog0cOQPuNB35_T1UJgqugDmjiEKeqFgNFZljP5oEikPpfly3t4AJF_iYl6fBz1sC2y8LY6oekbV',
    marcusVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWK3m8jOK0cxyArh5ZsT2kkl2sLSklscTQGFEhN36DANY-W_v0nVZes-GEf57VJ1LTdS5k9CAn6eO3wXWUteXxZq2sMadkxQv8lA91huWjtA57JtvFqGnB4iYd3pURVITdp3QA8ACydWS2AM9w8C85EPSm7a9a2GzAWCzmUYjh86n_DV2ICbtEv3pHT34dAKs4tEQyKZPKPnbDquZ8lBGjyXn4ZokBznfuGOKq4BbnxvF_PI57efHj',
    elenaRostova: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsj7ETuJ97Bl4tYn15ZJJIaZJCHrRPUzkwfMoicrLnAmdwNzsT2rOBC0WBuiKorBgye8jVzgbHUyX7znSDlWbCa70Ma7DTEJx7TU08AgTMlQ6Ezf0UANfSA7Y8cNmWl0S8Zi5chBQkW4Reqah0o0oS5ube57KSFRwLWtcdKSaixpx8FyOX7vVJy-lldJGIlW2yW77gM7mW54r2ZEDmilrHKwn8gsZDgMAUTHThrfsr3RpTcfpHTo6h',
    davidChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzNt3YkiT4xjeWm-Y8READxHZC_TveWtjfmCiJuSHYvA-0PLkP5GdLZtqCxfpWjcUx2WfgzgMDr61UYtmxjTrEDhiycSwY4KIWh2KGiKXayNpD4lGssPTIDbv1cLvvrK8hVddr_eGJwoFf-qNmZniPAaN6qBh4kMEGf4oldEUyORfQMJukFrvD0EnXBd_uBWduBl3oAI0UGKwL-gELCQv0NrETwI52P8weRxeIAd5auLBr6MdVtVe',
    drEleanorMorgan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwy-g6qLZVgZNvUnoPAwVDAD8J4Cm1SH8oTcduZUnCRlZJElMpUf76esXlVln4YxU2d5NNifTM45FAD_8czENX6yaG2ejowTi3167Je8FepO8ACl9L5WPZGEB0gMm2VKcTI71FCxn_7kzGceh2h10NAI0UdOLPgZdt-LKNNDJZ0IrC-u9xYA2gp2exwHUvvtZ06pD6F1h6k0n6g2r3gAFxuKrNtxynnpnkSvcBHjA4xXl-acFcag-4',
    drSarahJenkins: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZirBx7VT99FlICBBMYAJ1ePCDmb9B86tawGwVNZmIZztLAA0bjeVZJ9gNUrDXJ5-k4WZrzbWZpn02OzROfH46U0tVHS8xzt3Fy0QS-BpJqtHPO6NLtHDbzZfQu-_qZoZcvWmiplFHXmanb_p4Jfz5tgvmS1l64Ki-c1yu0h6tIkVQCrbDtBg3GCTGn9qSBxFCB9Oi5MC8hGkydPclCrN04OLTTsszVswm0I2M-YqXUn5BUT4ttqtj',
    drSarahMercer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxOdZ24XfcHCLs3SA7OOvPGO_5YwRmlDIMNHk5YdwAfqVZ0bRAO0zdXS1Szt4VkB7rnQLBi-R80P8gyBo_0ygC_ZHniio3Fqwwan-3nxhUJcVVxFY3rZaBraOrb3nb0_j1XY-_ZgwHeuDdpGB-aRJApDqrRbvWi9e_M4orYoF4Rhiy2TfXCIUJ3hqWAJnd7Gu0WvGDNC-QJwXoaTVm4PysfPQfR_zmQlIMZx8eWP1o3LQfGqbfPCx',
    markLindqvist: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAziTPszCbwp_iByfr1r_SJi47U3DGS2WdbQ-O6ecbTob6UA3vcs4nmuEdXD7wcIsH0L2zsil_v21_tmDELJo8IIOQV8dWQp8-HysckLIhrI5sqmyz-MF1Jwyv8NTCSR1dLUmLV_bMcsOY50JuNPDxcePy6qBBc6k-G1pKsDkHqcyHMcyu0UipkrpIsu3JTC1Yt_Gsnswe3twdodmU-WKzxybquJWocvxzr4QUBghChqE-cLLUep9Qx',
  },

  exercisePhotos: {
    shoulderFlexion: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbK3FEpayrqkZlYqPQLGvTd8V-r0C39uqLVAH9OSX5ABB1wRLUo2jkIIhCMrvp3hYw-jhOO1QBya_cr_zEQbXuPOaxLW1JyAPvaue0d14TlPz8DAcBlmDQAT_iq05RIOKIYQLw0Xr_UKEM953rq9sLVznU9kVHkUETp_AA2Fk_F6qXJmcsRfR6pf5YFe7yWUHgRel7rQhb_CWG6r_9GPc9PZHKgPfQxhx0RCCqocbNNKHN0kCVlaki',
    scapularRetraction: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM92X4q6sJB8dFdZfldly51rGyhGHt1sSpKXTt4ZYdCkwg97PtECDgOE6MDZxJVv47JUrQLe7dUcagmzYHMb-HEoWGD0fPjP39b_j-mJlpBEfwcfGVMT2He1WYWG0Vu3MEr5cTHj5dcwMbtTr71ZNQMTPFrAJB6JOy9imW8FXLXDmQpbD4AU2is2ClEbiQeGNOmJ5Chn2RNaDLhrXaCsZQbAavYyC10nlqTnpSmfFrDDanbJ-mPTs',
    wallSlides: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB01TcFlh9jgMHk4JXWHUybQBZ_FY8_aRVXEgKM_hOsiQgkuQXS7HN8VHCxLO-cHN6HbzVBQgxeh_unj3xg93f5nSnLjotbTIvkFcIxrcPLDKJVI1OQE7jPYzkP5mimIoeMOlZIYzfu4R7PDyqJhdlewkBop2xCORsoLUatlP1X-7udoLYUcK9ugEvBpn9NUIsTwqvLf1Q4BZr8hC9BiF9LMSkvMGh4GSdidQT7BGlSQYutsy_H0KxA',
  },

  exerciseDiagrams: {
    shoulderFlexion: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtEp9uxJrQP3afb4iVtZQKbzxhJDHOA5hVHzd6jnGq6izuEYeEgSy82SETZaRHOv3ELt466m026wBkMZsLbPG4QLxVdbQjFRrqJ72JjYTSO6yQY3_OBY0_n4Lfi1mje27o5N3MJiaFbyAZ16uXpRU_GC7CS9p27ndHSAQeJzQbcgR-jwsKj6sIRlV9JZK0IH7C6L3z5VXt42PhPJVLxJ0CRgeQ9d6nguwS6IAXOYeVpWV8J-Tmq4fr',
    scapularRetraction: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDYWTl-Mc-RRaZWrv1atiGPtqOedjhB_K1Zls_QI4NFkyNeJ4gk_m-i8-VKGS9uShWTS7vEa3N8MDiipASOwkgQa6Qk1YkKzSQxs1JCHDlbKub00vDkgk9mG6O5fL8-L3OHY0hFTwDP-WUWLv1ruaZPTbDp6GYlc7vmvuGP3iUsaJamYOCp-Oa25E1Hn3e4cXEeWvSJSBAh8co76lANsfTpdcI_2K62sfHKwYqw1K8raAFfIfu3aqN',
    wallSlides: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Kxv7xIWBzdX2HM-SAcCnQgeiV7zf_CX9t4OD6MrxapOi84Bj_yRqh-Q2IrKg3ufBOa5eouBu3c65EfX5gYVAhR6EIw27F1apwun1zzOCCwdlZoPEH461PlfwKlW8vQDDId2gqtS9z3GANfH2lDzC1zvzfeUfrudm2o6UwnUoWdxW51uhVR9Gb0FL-vWxec6mGIrxM5hyF6rVauQKeXeCttTbz3lsZ6iFWFhxeHIL1AzKilSmp57k',
    rotations: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzfQtO0cDF9buCLKzw1qogaT4qpCutvnUiJHJvT-kCwMIKe3WM6MOWOx6ZN_071VAOetkf7iqnmUUkHk32rzNXFnN5uyk7309FIYR9puN5vxjE7k3tBqtNBds-f8wlg7UN_or9FFiVx2m7kJ2IWjTqtFTsgGXxuqsYsIW6N__-5iKS8rQZVwL0cpQ0t0OWgVZP4-R_PlqXOoG7M7AW-my_MLgz-yKvdZcv1_AXJdVp9xQRQcuObv43',
  }
};

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pt-aarav',
    name: 'Aarav Sharma',
    avatar: ASSETS.avatars.alexMorganReview,
    age: 34,
    condition: 'Right Rotator Cuff Tear (Post-Op Week 4)',
    protocolId: 'RF-309',
    protocolName: 'Phase II Shoulder Flexion & Scapular Stability',
    attendingClinician: 'Dr. Kavita Deshmukh, DPT, OCS',
    clinicianAvatar: ASSETS.avatars.drEleanorMorgan,
    currentWeek: 3,
    totalWeeks: 6,
    adherenceRate: 94,
    kinematicAccuracy: 92,
    streakDays: 6,
    currentRom: 142.4,
    targetRom: 150.0,
    startingRom: 85.0,
    lastSessionDate: 'Today, 09:14 AM',
    status: 'attention_required',
    flagReason: 'Rep #8 showed 4.2° trunk lateral shift compensatory drift',
    triagePriority: 'high'
  },
  {
    id: 'pt-rohan',
    name: 'Rohan Mehra',
    avatar: ASSETS.avatars.marcusVance,
    age: 42,
    condition: 'Lumbar Disc Herniation (L4-L5)',
    protocolId: 'RF-214',
    protocolName: 'Core Stabilization & Pelvic Neutral Control',
    attendingClinician: 'Dr. Kavita Deshmukh, DPT, OCS',
    clinicianAvatar: ASSETS.avatars.drEleanorMorgan,
    currentWeek: 5,
    totalWeeks: 8,
    adherenceRate: 72,
    kinematicAccuracy: 79,
    streakDays: 1,
    currentRom: 54.0,
    targetRom: 70.0,
    startingRom: 35.0,
    lastSessionDate: 'Yesterday, 04:30 PM',
    status: 'attention_required',
    flagReason: 'Missed 2 sessions; pelvic asymmetry noted in bridge rep set',
    triagePriority: 'medium'
  },
  {
    id: 'pt-priya',
    name: 'Priya Nair',
    avatar: ASSETS.avatars.elenaRostova,
    age: 28,
    condition: 'Left ACL Reconstruction (Hamstring Autograft)',
    protocolId: 'RF-108',
    protocolName: 'Phase III Quadriceps Hypertrophy & Terminal Knee Extension',
    attendingClinician: 'Dr. Kavita Deshmukh, DPT, OCS',
    clinicianAvatar: ASSETS.avatars.drEleanorMorgan,
    currentWeek: 7,
    totalWeeks: 12,
    adherenceRate: 98,
    kinematicAccuracy: 96,
    streakDays: 19,
    currentRom: 135.0,
    targetRom: 135.0,
    startingRom: 60.0,
    lastSessionDate: 'Today, 07:45 AM',
    status: 'milestone_met',
    flagReason: 'Achieved 135° full active flexion; ready for plyometric clearance',
    triagePriority: 'normal'
  }
];

export const TODAY_EXERCISES: Exercise[] = [
  {
    id: 'ex-shoulder-flexion',
    name: 'Standing Shoulder Flexion',
    targetArea: 'Right Anterior Deltoid & Rotator Cuff',
    category: 'Mobility',
    durationMinutes: 8,
    sets: 3,
    reps: 10,
    completedSets: 2,
    targetAngleMin: 90,
    targetAngleMax: 150,
    currentBaselineAngle: 142.4,
    status: 'in_progress',
    lastAccuracyScore: 92,
    photoUrl: ASSETS.exercisePhotos.shoulderFlexion,
    diagramUrl: ASSETS.exerciseDiagrams.shoulderFlexion,
    instructions: [
      'Stand erect with feet shoulder-width apart, spine aligned, core engaged.',
      'Lead with your thumb pointed upward as you raise your right arm smoothly in the sagittal plane.',
      'Pause at peak elevation (target 140° - 150°) for 2 full seconds without arching your lumbar spine.',
      'Control the descent over a 3-second cadence to complete the rep.'
    ],
    equipmentNeeded: ['Unweighted arm', 'Neutral wall marker or mirror'],
    clinicalNote: 'Watch for compensatory shrug or trunk rotation above 135°.'
  },
  {
    id: 'ex-scapular-retraction',
    name: 'Prone Scapular Retraction',
    targetArea: 'Rhomboids & Mid/Lower Trapezius',
    category: 'Stabilization',
    durationMinutes: 6,
    sets: 3,
    reps: 12,
    completedSets: 3,
    targetAngleMin: 25,
    targetAngleMax: 45,
    currentBaselineAngle: 38.0,
    status: 'completed',
    lastAccuracyScore: 95,
    photoUrl: ASSETS.exercisePhotos.scapularRetraction,
    diagramUrl: ASSETS.exerciseDiagrams.scapularRetraction,
    instructions: [
      'Lie face down on mat or firm bed, arms at 90° abduction in a "T" posture.',
      'Squeeze shoulder blades together toward the midline without elevating shoulders to ears.',
      'Hold the contraction for 3 seconds while maintaining steady diaphragmatic breathing.',
      'Gently lower hands back to floor.'
    ],
    equipmentNeeded: ['Exercise mat', 'Head pillow for neck neutral alignment'],
    clinicalNote: 'Focus on subscapular control without upper trapezius spasm.'
  },
  {
    id: 'ex-wall-slides',
    name: 'Controlled Wall Slides with Towel',
    targetArea: 'Serratus Anterior & Thoracic Extension',
    category: 'Mobility',
    durationMinutes: 7,
    sets: 3,
    reps: 10,
    completedSets: 1,
    targetAngleMin: 80,
    targetAngleMax: 145,
    currentBaselineAngle: 139.0,
    status: 'in_progress',
    lastAccuracyScore: 89,
    photoUrl: ASSETS.exercisePhotos.wallSlides,
    diagramUrl: ASSETS.exerciseDiagrams.wallSlides,
    instructions: [
      'Stand facing a smooth wall with forearms resting vertically on a low-friction towel.',
      'Slide forearms upward in an upward "V" pattern while keeping contact with the surface.',
      'At top of reach, push chest gently toward the wall for end-range thoracic mobilization.',
      'Return with control under continuous scapular protraction.'
    ],
    equipmentNeeded: ['Smooth wall', 'Microfiber towel or slider pads'],
    clinicalNote: 'Avoid lumbar extension compensation when sliding above head height.'
  },
  {
    id: 'ex-rotations',
    name: 'Side-Lying External Rotation',
    targetArea: 'Infraspinatus & Teres Minor',
    category: 'Strength',
    durationMinutes: 6,
    sets: 3,
    reps: 12,
    completedSets: 0,
    targetAngleMin: 0,
    targetAngleMax: 45,
    currentBaselineAngle: 32.0,
    status: 'pending',
    lastAccuracyScore: 91,
    photoUrl: ASSETS.exercisePhotos.shoulderFlexion,
    diagramUrl: ASSETS.exerciseDiagrams.rotations,
    instructions: [
      'Lie on unaffected side with a rolled towel under the right elbow.',
      'Keep elbow bent at 90° pinned against the towel at your flank.',
      'Rotate forearm upward toward ceiling through pain-free range.',
      'Lower smoothly to starting horizontal position.'
    ],
    equipmentNeeded: ['1-2 lb dumbbell or resistance band', 'Rolled towel'],
    clinicalNote: 'Keep humerus perpendicular to torso without rolling backward.'
  }
];

export const AARAV_REPS_RECORD: RepRecord[] = [
  { repNumber: 1, timeOffset: '00:18', maxFlexion: 138.2, targetFlexion: 145.0, status: 'optimal', score: 94 },
  { repNumber: 2, timeOffset: '00:36', maxFlexion: 140.1, targetFlexion: 145.0, status: 'optimal', score: 96 },
  { repNumber: 3, timeOffset: '00:55', maxFlexion: 141.5, targetFlexion: 145.0, status: 'optimal', score: 95 },
  { repNumber: 4, timeOffset: '01:14', maxFlexion: 139.8, targetFlexion: 145.0, status: 'optimal', score: 93 },
  { repNumber: 5, timeOffset: '01:34', maxFlexion: 142.3, targetFlexion: 145.0, status: 'optimal', score: 95 },
  { repNumber: 6, timeOffset: '01:56', maxFlexion: 141.9, targetFlexion: 145.0, status: 'optimal', score: 94 },
  { repNumber: 7, timeOffset: '02:18', maxFlexion: 143.0, targetFlexion: 145.0, status: 'optimal', score: 93 },
  { repNumber: 8, timeOffset: '02:44', maxFlexion: 146.4, targetFlexion: 145.0, status: 'drift_detected', score: 78, compensationDetected: 'Trunk tilt left +4.2° during final 15° of flexion arc' },
  { repNumber: 9, timeOffset: '03:10', maxFlexion: 141.2, targetFlexion: 145.0, status: 'acceptable', score: 88 },
  { repNumber: 10, timeOffset: '03:32', maxFlexion: 142.4, targetFlexion: 145.0, status: 'optimal', score: 92 }
];

export const ALEX_REPS_RECORD = AARAV_REPS_RECORD;
