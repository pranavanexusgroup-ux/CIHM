import { CourseCategory } from '../types';

export interface CareerMilestone {
  stageNumber: number;
  stageName: string;
  timeline: string;
  roleTitle: string;
  roleCategory: 'Student' | 'Intern' | 'Junior Professional' | 'Senior Professional' | 'Leadership';
  workplace: string;
  growthTier: string;
  growthIndex: number; // Baseline 100 up to 380
  growthDescription: string;
  clinicalCompetencies: string[];
  certificationsUnlocked: string[];
  keyHighlight: string;
}

export interface CourseCareerPath {
  id: string;
  courseName: string;
  code: string;
  category: CourseCategory;
  duration: string;
  description: string;
  icon: string; // lucide icon identifier
  startingRole: string;
  targetPeakRole: string;
  growthIndexMax: number;
  stages: CareerMilestone[];
  topHospitalRecruiters: string[];
  internationalMobility: string;
  fellowshipAdvancement: string;
}

export const CAREER_ROADMAPS: CourseCareerPath[] = [
  {
    id: 'dmlt',
    courseName: 'Diploma in Medical Laboratory Technology (DMLT)',
    code: 'CIHM-DMLT-01',
    category: 'Paramedical',
    duration: '2 Years + 6 Months Hospital Internship',
    description:
      'Structured clinical journey from student apprentice to Chief Medical Laboratory Technologist and NABL Quality Lead.',
    icon: 'TestTube2',
    startingRole: 'Student Lab Trainee',
    targetPeakRole: 'Chief Technologist & Lab Director',
    growthIndexMax: 380,
    topHospitalRecruiters: [
      'Apollo Multispeciality Hospitals',
      'Suraksha Diagnostics',
      'Medica Superspecialty',
      'Dr. Lal PathLabs',
      'Peerless Hospital',
    ],
    internationalMobility: 'Eligible for NHS UK Biomedical Scientist Band 5/6 & Gulf MOH/DHA Licensing',
    fellowshipAdvancement: 'Path to Fellowship in Clinical Biochemistry & Advanced Hematology',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Student & Clinical Apprentice',
        timeline: 'Months 0 – 6 (Year 1)',
        roleTitle: 'Student Lab Apprentice',
        roleCategory: 'Student',
        workplace: 'CIHM Dumdum Campus NABL Practical Labs',
        growthTier: 'Foundation Phase (Scholarship Assisted)',
        growthIndex: 100,
        growthDescription:
          'Subsidized educational phase with 100% tuition scholarship opportunities. Focus on core diagnostic theory, biosafety, and specimen processing.',
        clinicalCompetencies: [
          'Phlebotomy & Venipuncture Techniques',
          'Automated Hematology 5-Part Cell Counter Calibration',
          'Clinical Biochemistry Specimen Aliquoting',
          'NABL Biosafety Level 2 Laboratory Protocols',
        ],
        certificationsUnlocked: [
          'CIHM Clinical Biosafety & Phlebotomy Certificate',
          'Basic Diagnostic Laboratory Competency Badge',
        ],
        keyHighlight: '300+ simulation hours mastering automated analyzers before touching patient samples.',
      },
      {
        stageNumber: 2,
        stageName: 'Hospital Resident Intern',
        timeline: 'Months 6 – 12 (Year 1)',
        roleTitle: 'Diagnostic Laboratory Resident Intern',
        roleCategory: 'Intern',
        workplace: 'Apollo, Fortis & Medica Diagnostic Wings',
        growthTier: 'Trainee Honorarium Grade',
        growthIndex: 145,
        growthDescription:
          'Hospital-sponsored clinical rotation tier with shift honorarium. Hands-on diagnostic shifts with real patient blood and body fluids.',
        clinicalCompetencies: [
          'Emergency Blood Cross-Matching & Grouping',
          'Microbiology Culture Plating & Gram Staining',
          'High-Throughput Biochemistry Analyzer Operation',
          'Laboratory Information System (LIS) Electronic Reporting',
        ],
        certificationsUnlocked: [
          'Hospital Clinical Rotation Logbook Verification',
          'Apollo / Medica Clinical Training Endorsement',
        ],
        keyHighlight: '350+ live patient rotation hours and Pre-Placement Offer (PPO) evaluation.',
      },
      {
        stageNumber: 3,
        stageName: 'Certified Healthcare Professional',
        timeline: 'Years 1 – 2',
        roleTitle: 'Medical Laboratory Technologist (MLT)',
        roleCategory: 'Junior Professional',
        workplace: 'Super-Specialty Hospitals & Diagnostic Chains',
        growthTier: 'Standard Healthcare Professional Grade',
        growthIndex: 215,
        growthDescription:
          'Full independent clinical appointment with standard institutional grade, night duty allowances, performance bonuses, and medical benefits.',
        clinicalCompetencies: [
          'Autonomous Routine & Stat Diagnostic Reporting',
          'Critical Value Alert Communication with Attending Physicians',
          'Automated Coagulation & Immunoassay Systems',
          'Daily Multi-Rule Westgard Quality Control Tracking',
        ],
        certificationsUnlocked: [
          'Registered Medical Laboratory Technologist Credential',
          'Hospital Infection Control & Quality Assurance Endorsement',
        ],
        keyHighlight: '100% placement track record with permanent hospital appointment.',
      },
      {
        stageNumber: 4,
        stageName: 'Senior Specialist & Shift Lead',
        timeline: 'Years 3 – 4',
        roleTitle: 'Senior Technologist & Section Supervisor',
        roleCategory: 'Senior Professional',
        workplace: 'Tertiary Care Pathology Labs & Corporate Centers',
        growthTier: 'Senior Specialist Grade',
        growthIndex: 290,
        growthDescription:
          'Accelerated compensation tier with supervisory allowance. Direct supervision of section benches (Hematology/Biochemistry) and junior technical staff.',
        clinicalCompetencies: [
          'Department Shift Scheduling & Emergency Escalations',
          'NABL Audit Preparedness & Documentation',
          'Advanced Flow Cytometry & Molecular Diagnostics',
          'Method Validation & Diagnostic Reagent Verification',
        ],
        certificationsUnlocked: [
          'NABL Internal Auditor Certification (ISO 15189)',
          'Senior Diagnostic Clinical Specialist Badge',
        ],
        keyHighlight: 'Substantial promotion in clinical hierarchy with administrative authority.',
      },
      {
        stageNumber: 5,
        stageName: 'Department Head & International Leader',
        timeline: 'Years 5+',
        roleTitle: 'Chief Laboratory Technologist / Lab Director',
        roleCategory: 'Leadership',
        workplace: 'International Diagnostic Networks / NHS UK / Corporate Chains',
        growthTier: 'Executive & Global Practice Tier',
        growthIndex: 380,
        growthDescription:
          'Premier healthcare executive compensation with international practice eligibility, profit-sharing or consulting incentives, and global institutional prestige.',
        clinicalCompetencies: [
          'Total Laboratory Automation (TLA) System Governance',
          'Multi-Center Diagnostic Operations & Budgeting',
          'Clinical Research & Epidemiological Trial Oversight',
          'National & International Accreditation Management',
        ],
        certificationsUnlocked: [
          'Chief Healthcare Technical Officer Fellowship',
          'Virtued Eduversity London UK Post-Graduate Fellowship',
        ],
        keyHighlight: 'Global mobility across UK NHS trusts, Gulf healthcare ministries, and academic faculty roles.',
      },
    ],
  },
  {
    id: 'ott',
    courseName: 'Diploma in Operation Theatre Technology (OTT)',
    code: 'CIHM-DOTT-03',
    category: 'Critical Care',
    duration: '2 Years + 6 Months Hospital Internship',
    description:
      'High-impact surgical trajectory from student assistant to Chief Surgical Technologist and Operating Room Director.',
    icon: 'Stethoscope',
    startingRole: 'Surgical Suite Cadet',
    targetPeakRole: 'Chief Surgical Technologist & OT Director',
    growthIndexMax: 375,
    topHospitalRecruiters: [
      'Medica Superspecialty Hospital',
      'Apollo Multispeciality Hospitals',
      'Peerless Hospital',
      'Fortis Healthcare Anandapur',
    ],
    internationalMobility: 'Direct Pathway to UK NHS Surgical Care Practitioner & Gulf DHA OT Tech',
    fellowshipAdvancement: 'Pathway to Fellowship in Emergency & Trauma Care / Minimally Invasive Surgery',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Student & Surgical Simulation Apprentice',
        timeline: 'Months 0 – 6 (Year 1)',
        roleTitle: 'OT Student Trainee',
        roleCategory: 'Student',
        workplace: 'CIHM Simulation Operation Theatre',
        growthTier: 'Foundation Phase (Scholarship Assisted)',
        growthIndex: 100,
        growthDescription:
          'Zero-debt foundation covered by merit scholarships. Comprehensive training on surgical instruments, sterilization, and OT zoning.',
        clinicalCompetencies: [
          'Surgical Scrubbing, Gowning & Gloving Protocol',
          'Autoclave & Plasma Sterilization Monitoring',
          'Identification of 200+ General & Orthopedic Instruments',
          'Basic Life Support (BLS) & Emergency Resuscitation',
        ],
        certificationsUnlocked: [
          'Aseptic Surgical Techniques Certificate',
          'BLS & Hospital Emergency Response Credential',
        ],
        keyHighlight: 'Practice in full-scale mock operating theatres prior to patient scrub-in.',
      },
      {
        stageNumber: 2,
        stageName: 'Clinical Scrub Intern',
        timeline: 'Months 6 – 12 (Year 1)',
        roleTitle: 'Junior Scrub & Circulating Intern',
        roleCategory: 'Intern',
        workplace: 'Apollo & Fortis Multi-Specialty Surgical Wings',
        growthTier: 'Trainee Honorarium Grade',
        growthIndex: 150,
        growthDescription:
          'Hospital-sponsored clinical tier with surgery shift allowances. Assisting active surgeons during elective and emergency procedures.',
        clinicalCompetencies: [
          'Anesthesia Workstation Setup & Gas Cylinder Safety',
          'Laparoscopic Tower & Electrocautery Management',
          'Patient Surgical Positioning & Draping',
          'Surgical Swab, Needle & Instrument Counting Verification',
        ],
        certificationsUnlocked: [
          'Hospital Surgical Assistant Rotation Logbook',
          'Pre-Placement Surgical Readiness Certificate',
        ],
        keyHighlight: 'Scrubbed in for 150+ general, laparoscopic, and orthopedic surgical cases.',
      },
      {
        stageNumber: 3,
        stageName: 'Certified OT Technologist',
        timeline: 'Years 1 – 2',
        roleTitle: 'Operation Theatre Technologist (Staff Grade)',
        roleCategory: 'Junior Professional',
        workplace: 'Super-Specialty Cardiac & Neuro Surgery Units',
        growthTier: 'Standard Healthcare Professional Grade',
        growthIndex: 220,
        growthDescription:
          'Full clinical staff grade with critical surgery incentives, night duty allowances, and annual appraisal increments.',
        clinicalCompetencies: [
          'Cardiac & Neuro Surgery Scrub Coordination',
          'C-Arm Fluoroscopy Machine Positioning in Ortho OT',
          'Intraoperative Crisis & Cardiac Arrest Protocol Execution',
          'Post-Operative Recovery Room (PACU) Handoff',
        ],
        certificationsUnlocked: [
          'Certified Operation Theatre Technologist (COTT)',
          'Advanced Cardiac Life Support (ACLS) Provider',
        ],
        keyHighlight: 'Permanent appointment in super-specialty operating theatre complexes.',
      },
      {
        stageNumber: 4,
        stageName: 'Senior OT Specialist & Coordinator',
        timeline: 'Years 3 – 4',
        roleTitle: 'Senior Surgical Technologist & OT In-Charge',
        roleCategory: 'Senior Professional',
        workplace: 'Multi-Theater Complex / Organ Transplant Centers',
        growthTier: 'Senior Specialist Grade',
        growthIndex: 295,
        growthDescription:
          'Senior professional compensation with multi-theatre supervision tier, transplant call-in bonuses, and mentoring bonuses.',
        clinicalCompetencies: [
          'Robotic & Organ Transplant Surgery Protocol Management',
          'OT Inventory, Implant Logistics & Consumables Control',
          'Surgeon Scheduling & Surgical Table Turnaround Optimization',
          'NABH OT Infection Rate Auditing & Control Protocols',
        ],
        certificationsUnlocked: [
          'Surgical Suite Manager Endorsement',
          'Transplant Support Technologist Specialist',
        ],
        keyHighlight: 'Supervising 10+ surgical suites and mentoring junior scrub technicians.',
      },
      {
        stageNumber: 5,
        stageName: 'Chief Surgical Technologist / OT Director',
        timeline: 'Years 5+',
        roleTitle: 'Head of Surgical Services / OT Operations Manager',
        roleCategory: 'Leadership',
        workplace: 'Corporate Healthcare Chains & International Hospitals',
        growthTier: 'Executive & Global Practice Tier',
        growthIndex: 375,
        growthDescription:
          'Executive clinical leadership package with international consulting options, hospital operations management allowances, and global hospital standing.',
        clinicalCompetencies: [
          'Surgical Suite Strategic Planning & Equipment Acquisition',
          'Hospital-Wide Sterile Processing Department (CSSD) Leadership',
          'Clinical Governance & Legal Compliance in Surgical Services',
          'International Surgical Protocol Harmonization (NHS/JCI Standards)',
        ],
        certificationsUnlocked: [
          'Director of Perioperative Technical Services',
          'UK Virtued Eduversity Surgical Care Fellowship',
        ],
        keyHighlight: 'Leadership authority over hospital-wide perioperative and surgical operations.',
      },
    ],
  },
  {
    id: 'dialysis',
    courseName: 'Diploma in Dialysis Technology (DDT)',
    code: 'CIHM-DDT-04',
    category: 'Paramedical',
    duration: '2 Years + 6 Months Hospital Internship',
    description:
      'Nephrology care progression from clinical student to Chief Hemodialysis Specialist and Renal Care Director.',
    icon: 'Activity',
    startingRole: 'Nephrology Student Trainee',
    targetPeakRole: 'Chief Dialysis Specialist & Renal Center Head',
    growthIndexMax: 360,
    topHospitalRecruiters: [
      'Apollo Renal Sciences',
      'Medica Nephrology & Dialysis',
      'Suraksha Renal Units',
      'Fortis Healthcare',
    ],
    internationalMobility: 'Recognized for European Renal Care & Gulf Healthcare Licensing',
    fellowshipAdvancement: 'Pathway to Fellowship in Critical Care Nephrology',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Student & Renal Anatomy Trainee',
        timeline: 'Months 0 – 6 (Year 1)',
        roleTitle: 'Dialysis Trainee Cadet',
        roleCategory: 'Student',
        workplace: 'CIHM Dialysis Simulation Center',
        growthTier: 'Foundation Phase (Scholarship Assisted)',
        growthIndex: 100,
        growthDescription:
          'Subsidized institutional tuition with merit scholarship. Comprehensive understanding of renal physiology, hemodialysis machines, and dialyzer reprocessing.',
        clinicalCompetencies: [
          'Principles of Diffusion, Osmosis & Ultrafiltration',
          'Dialysis Machine Priming & Heparinization Protocols',
          'Water Treatment Plant (RO System) Basics & Testing',
          'Arteriovenous (AV) Fistula Assessment & Palpation',
        ],
        certificationsUnlocked: [
          'Hemodialysis Basics & Machine Priming Credential',
          'Renal Care Safety & Aseptic Protocol Badge',
        ],
        keyHighlight: 'Hands-on practice on real dialysis machine models and simulator circuits.',
      },
      {
        stageNumber: 2,
        stageName: 'Hospital Dialysis Intern',
        timeline: 'Months 6 – 12 (Year 1)',
        roleTitle: 'Dialysis Unit Clinical Intern',
        roleCategory: 'Intern',
        workplace: 'Apollo & Medica Superspecialty Dialysis Units',
        growthTier: 'Trainee Honorarium Grade',
        growthIndex: 140,
        growthDescription:
          'Live hospital training tier with shift allowances. Assisting registered nephrologists and senior technologists during live dialysis runs.',
        clinicalCompetencies: [
          'Cannulation of Mature AV Fistula / AV Graft',
          'Central Venous Catheter (Internal Jugular / Femoral) Dressing',
          'Monitoring Vital Signs & Dialysate Flow Rates during Sessions',
          'Management of Intradialytic Hypotension & Muscle Cramps',
        ],
        certificationsUnlocked: [
          'Clinical Dialysis Hours Endorsement (350+ Hours)',
          'Pre-Placement Renal Unit Readiness Badge',
        ],
        keyHighlight: 'Direct clinical experience managing acute and chronic renal failure patients.',
      },
      {
        stageNumber: 3,
        stageName: 'Certified Dialysis Technologist',
        timeline: 'Years 1 – 2',
        roleTitle: 'Hemodialysis Technologist (Staff Grade)',
        roleCategory: 'Junior Professional',
        workplace: 'Hospital Nephrology Wings & Standalone Dialysis Hubs',
        growthTier: 'Standard Healthcare Professional Grade',
        growthIndex: 210,
        growthDescription:
          'Independent technologist grade with session incentive differentials, night shift allowances, and permanent healthcare benefits.',
        clinicalCompetencies: [
          'Autonomous Initiation & Termination of Hemodialysis Sessions',
          'Automated Dialyzer Reprocessing & Fiber Bundle Volume Check',
          'Continuous Renal Replacement Therapy (CRRT) in ICU',
          'Peritoneal Dialysis Exchange & Patient Counseling',
        ],
        certificationsUnlocked: [
          'Certified Hemodialysis Technologist (CHT)',
          'ICU Critical Care Dialysis Provider',
        ],
        keyHighlight: 'High industry demand across corporate hospitals and standalone dialysis chains.',
      },
      {
        stageNumber: 4,
        stageName: 'Senior Dialysis In-Charge',
        timeline: 'Years 3 – 4',
        roleTitle: 'Senior Dialysis Specialist & Floor Supervisor',
        roleCategory: 'Senior Professional',
        workplace: 'Multi-Bed Hospital Dialysis Complexes',
        growthTier: 'Senior Specialist Grade',
        growthIndex: 280,
        growthDescription:
          'Supervisory clinical grade with unit coordination allowances, water plant oversight bonuses, and emergency standby benefits.',
        clinicalCompetencies: [
          'Daily Supervision of 20+ Bed Dialysis Complex',
          'Reverse Osmosis (RO) Chemical Disinfection & Endotoxin Testing',
          'Kidney Transplant Pre- & Post-Dialysis Protocol Monitoring',
          'Renal Quality Indicators & Patient Outcome Auditing',
        ],
        certificationsUnlocked: [
          'Renal Unit Safety & RO Plant Supervisor',
          'Senior Clinical Nephrology Specialist',
        ],
        keyHighlight: 'Managing dialysis floor operations and leading clinical response teams.',
      },
      {
        stageNumber: 5,
        stageName: 'Head of Dialysis Services / Dialysis Operations Manager',
        timeline: 'Years 5+',
        roleTitle: 'Chief Dialysis Specialist & Dialysis Center Head',
        roleCategory: 'Leadership',
        workplace: 'National Dialysis Chains, Corporate Chains & International Centers',
        growthTier: 'Executive & Global Practice Tier',
        growthIndex: 360,
        growthDescription:
          'Executive scale with regional center oversight, equipment manufacturer consulting partnerships, and international healthcare mobility.',
        clinicalCompetencies: [
          'Multi-Unit Dialysis Operations Strategy & Setup',
          'Biomedical Machine Procurement & Vendor Negotiations',
          'Nephrology Nursing & Technologist Training Leadership',
          'International Protocol Compliance (European Renal Standards)',
        ],
        certificationsUnlocked: [
          'Fellow of Dialysis Technology & Renal Management',
          'International Renal Care Practice License',
        ],
        keyHighlight: 'Overseeing multi-center renal facilities with top-tier healthcare leadership compensation.',
      },
    ],
  },
  {
    id: 'imaging',
    courseName: 'Diploma in Medical Radiography & Imaging (X-Ray, CT, USG)',
    code: 'CIHM-DMRI-02',
    category: 'Diagnostic Imaging',
    duration: '2 Years + 6 Months Hospital Internship',
    description:
      'Diagnostic imaging progression from student radiographer to Chief Imaging Technologist and Radiology Center Director.',
    icon: 'Eye',
    startingRole: 'Radiology Student Trainee',
    targetPeakRole: 'Chief Imaging Technologist & Radiology Director',
    growthIndexMax: 370,
    topHospitalRecruiters: [
      'Fortis Healthcare Anandapur',
      'Woodlands Multispeciality Hospital',
      'Pulse Diagnostics',
      'Suraksha Diagnostics',
    ],
    internationalMobility: 'Eligible for NHS Radiographer Band 5/6 & Australian/Gulf Radiation Licensing',
    fellowshipAdvancement: 'Pathway to Fellowship in Advanced Diagnostic Radiology & Neuroimaging',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Student & Radiation Physics Trainee',
        timeline: 'Months 0 – 6 (Year 1)',
        roleTitle: 'Radiology Trainee Cadet',
        roleCategory: 'Student',
        workplace: 'CIHM AERB-Aligned Simulation Suite',
        growthTier: 'Foundation Phase (Scholarship Assisted)',
        growthIndex: 100,
        growthDescription:
          'Subsidized tuition backed by institutional merit scholarships. Intensive training on radiation safety, anatomy, and digital X-ray mechanics.',
        clinicalCompetencies: [
          'AERB Radiation Safety & ALARA Principles',
          'Digital Radiography (DR) Exposure Factor Calculations',
          'Patient Radiographic Positioning (Chest, Extremities, Spine)',
          'Radiation Dosimetry (TLD Badge) Protocol Handling',
        ],
        certificationsUnlocked: [
          'Radiation Protection & Safety Officer Basic Certification',
          'Digital Radiography Fundamental Badge',
        ],
        keyHighlight: 'Hands-on practice with lead-shielded simulation rooms and positioning phantoms.',
      },
      {
        stageNumber: 2,
        stageName: 'Hospital Imaging Intern',
        timeline: 'Months 6 – 12 (Year 1)',
        roleTitle: 'Junior Radiographer Intern',
        roleCategory: 'Intern',
        workplace: 'Fortis & Woodlands Hospital Radiology Departments',
        growthTier: 'Trainee Honorarium Grade',
        growthIndex: 145,
        growthDescription:
          'Clinical hospital rotation tier with imaging shift allowances. Performing bedside portable X-rays, trauma imaging, and darkroom PACs workflow.',
        clinicalCompetencies: [
          'Emergency Room (ER) Mobile X-Ray Deployments',
          'Special Radiographic Contrast Procedures (Barium / IVU)',
          'Picture Archiving & Communication System (PACS) Routing',
          'Assisting Radiologists during Ultrasound (USG) Guiding',
        ],
        certificationsUnlocked: [
          'Hospital Diagnostic Imaging Clinical Logbook Endorsement',
          'Pre-Placement Radiography Competency Certificate',
        ],
        keyHighlight: 'Operating digital imaging systems across busy hospital trauma wards.',
      },
      {
        stageNumber: 3,
        stageName: 'Certified Radiographer / CT Technologist',
        timeline: 'Years 1 – 2',
        roleTitle: 'Diagnostic Radiographer & CT Scan Technologist',
        roleCategory: 'Junior Professional',
        workplace: 'Super-Specialty Hospital Diagnostic Centers',
        growthTier: 'Standard Healthcare Professional Grade',
        growthIndex: 215,
        growthDescription:
          'Full professional healthcare scale with contrast procedure incentives, emergency on-call allowances, and permanent healthcare benefits.',
        clinicalCompetencies: [
          'Independent Multi-Slice Computed Tomography (CT) Scanning',
          'CT Angiography & 3D Volume Rendering Protocols',
          'Contrast Extravasation & Adverse Reaction Protocol Execution',
          'C-Arm Live Fluoroscopy Assistance in Operating Theatres',
        ],
        certificationsUnlocked: [
          'AERB Registered Radiographer Certification',
          'Multi-Slice CT Scan Specialist Endorsement',
        ],
        keyHighlight: 'High industry demand in multi-slice CT and digital diagnostic suites.',
      },
      {
        stageNumber: 4,
        stageName: 'Senior MRI & Imaging Supervisor',
        timeline: 'Years 3 – 4',
        roleTitle: 'Senior Imaging Specialist & MRI Technologist',
        roleCategory: 'Senior Professional',
        workplace: 'Tertiary Care Diagnostic Hubs & Medical Colleges',
        growthTier: 'Senior Specialist Grade',
        growthIndex: 290,
        growthDescription:
          'Senior professional tier with MRI specialty premium, supervisory allowances, and equipment calibration bonuses.',
        clinicalCompetencies: [
          'High-Field Magnetic Resonance Imaging (MRI 1.5T / 3T)',
          'MRI Safety Zone IV Screening & Quench Protocol Readiness',
          'Quality Assurance (QA) Phantom Audits for AERB Compliance',
          'Department Scheduling & Contrast Reagent Procurement',
        ],
        certificationsUnlocked: [
          'Certified MRI Clinical Specialist',
          'Radiation Safety Officer (RSO Level-II)',
        ],
        keyHighlight: 'Mastering advanced multi-sequence MRI and supervising imaging teams.',
      },
      {
        stageNumber: 5,
        stageName: 'Chief Imaging Technologist / Radiology Director',
        timeline: 'Years 5+',
        roleTitle: 'Chief Radiographer & Diagnostic Operations Head',
        roleCategory: 'Leadership',
        workplace: 'Corporate Diagnostic Chains & International Hospital Groups',
        growthTier: 'Executive & Global Practice Tier',
        growthIndex: 370,
        growthDescription:
          'Executive clinical package with international NHS/Gulf licensing, diagnostic center partnership profit shares, and institutional governance.',
        clinicalCompetencies: [
          'Hospital-Wide Radiology Information System (RIS) Governance',
          'Multi-Crore Imaging Equipment Selection & Vendor Audits',
          'AERB & NABH Regulatory Inspection Leadership',
          'International Teleradiology Workflow Management',
        ],
        certificationsUnlocked: [
          'Fellow of Medical Radiation Technology (UK Virtued Pathway)',
          'International Radiologic Technologist Credential',
        ],
        keyHighlight: 'Directing full hospital imaging complexes with premier compensation and international mobility.',
      },
    ],
  },
  {
    id: 'mha',
    courseName: 'Hospital Administration & Healthcare Management',
    code: 'CIHM-DHA-06',
    category: 'Hospital Management',
    duration: '1 Year Full-Time + 3 Months Hospital Internship',
    description:
      'Executive healthcare trajectory from administrative coordinator to Hospital Chief Operating Officer (COO).',
    icon: 'Building2',
    startingRole: 'Hospital Admin Executive',
    targetPeakRole: 'Hospital Chief Operating Officer (COO)',
    growthIndexMax: 390,
    topHospitalRecruiters: [
      'Charnock Hospital Kolkata',
      'Belle Vue Clinic',
      'Medica Superspecialty',
      'Fortis Corporate Desk',
    ],
    internationalMobility: 'Direct Pathway to Healthcare Management roles in UK NHS, UAE, and Singapore',
    fellowshipAdvancement: 'Pathway to Fellowship in Healthcare Leadership & Clinical Governance',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Student & Healthcare Operations Trainee',
        timeline: 'Months 0 – 3',
        roleTitle: 'Management Trainee Cadet',
        roleCategory: 'Student',
        workplace: 'CIHM Campus Healthcare Management Wing',
        growthTier: 'Foundation Phase (Scholarship Assisted)',
        growthIndex: 100,
        growthDescription:
          'Subsidized institutional structure with scholarship support. Grounding in hospital information systems (HIS), medical ethics, and patient billing.',
        clinicalCompetencies: [
          'Hospital Information System (HIS) Front Desk & Admissions',
          'TPA & Health Insurance Empanelment Cashless Workflows',
          'NABH 5th Edition Quality Standards Overview',
          'Medical Records Department (MRD) ICD-10 Coding Basics',
        ],
        certificationsUnlocked: [
          'Hospital Administration Fundamentals Certificate',
          'Healthcare Customer Experience & TPA Workflow Badge',
        ],
        keyHighlight: 'Classroom simulations of patient admission, billing, and triage administration.',
      },
      {
        stageNumber: 2,
        stageName: 'Hospital Floor Coordinator Intern',
        timeline: 'Months 3 – 6',
        roleTitle: 'Junior Patient Care Coordinator',
        roleCategory: 'Intern',
        workplace: 'Charnock & Belle Vue Hospital Administrative Wings',
        growthTier: 'Trainee Honorarium Grade',
        growthIndex: 140,
        growthDescription:
          'Hospital-based residency with administrative stipend. Hands-on management of patient admission desks, billing disputes, and emergency triage.',
        clinicalCompetencies: [
          'Emergency Floor Bed Allocation & Triage Coordination',
          'Billing Audit & Package Reconciliation with Insurance TPAs',
          'Patient Grievance Redressal & Service Recovery',
          'Biomedical Waste & Hospital Housekeeping Monitoring',
        ],
        certificationsUnlocked: [
          'Hospital Operations Residency Endorsement',
          'Pre-Placement Administrative Assessment Certificate',
        ],
        keyHighlight: 'Direct interaction with hospital chief administrators and floor superintendents.',
      },
      {
        stageNumber: 3,
        stageName: 'Hospital Operations Executive',
        timeline: 'Years 1 – 2',
        roleTitle: 'Hospital Operations Officer / TPA Manager',
        roleCategory: 'Junior Professional',
        workplace: 'Multi-Specialty Private Hospitals & Clinic Chains',
        growthTier: 'Standard Healthcare Professional Grade',
        growthIndex: 210,
        growthDescription:
          'Full executive employment grade with performance revenue bonuses, health insurance perks, and institutional allowances.',
        clinicalCompetencies: [
          'End-to-End Cashless Insurance Claims Resolution',
          'Outpatient Department (OPD) Footfall & Wait-Time Optimization',
          'Doctors Consultation Roster & Medical Records Archival',
          'Statutory Health Authority Returns & Licensing Compliance',
        ],
        certificationsUnlocked: [
          'Certified Healthcare Operations Professional (CHOP)',
          'TPA & Health Insurance Specialist Credential',
        ],
        keyHighlight: 'Managing key hospital departments with measurable operational impact.',
      },
      {
        stageNumber: 4,
        stageName: 'Senior Assistant Medical Superintendent / Operations Manager',
        timeline: 'Years 3 – 4',
        roleTitle: 'Senior Operations Manager & Quality Coordinator',
        roleCategory: 'Senior Professional',
        workplace: 'Tertiary Care Corporate Hospitals',
        growthTier: 'Senior Specialist Grade',
        growthIndex: 295,
        growthDescription:
          'Senior management tier with departmental P&L oversight, hospital performance incentive bonuses, and senior leadership perks.',
        clinicalCompetencies: [
          'Hospital P&L Statement Analysis & Cost Rationalization',
          'NABH & JCI Hospital Accreditation Lead Auditor',
          'Supply Chain & Pharmaceutical Purchase Negotiations',
          'Crisis Management & Hospital Disaster Preparedness',
        ],
        certificationsUnlocked: [
          'NABH Principal Quality Coordinator Endorsement',
          'Senior Hospital Operations Executive Badge',
        ],
        keyHighlight: 'Leading hospital NABH accreditation committees and department heads.',
      },
      {
        stageNumber: 5,
        stageName: 'Hospital Chief Operating Officer (COO) / General Manager',
        timeline: 'Years 5+',
        roleTitle: 'Hospital COO / Vice President (Operations)',
        roleCategory: 'Leadership',
        workplace: 'National Hospital Groups & International Health Systems',
        growthTier: 'Executive & Global Practice Tier',
        growthIndex: 390,
        growthDescription:
          'Top-tier executive corporate compensation with board-level equity incentives, international hospital leadership, and regional authority.',
        clinicalCompetencies: [
          'Multi-Hospital Network Expansion & Greenfield Projects',
          'Clinical Governance & Legal Risk Mitigation',
          'C-Suite Strategic Planning & Board Reporting',
          'Digital Healthcare Transformation (AI & Telehealth Deployments)',
        ],
        certificationsUnlocked: [
          'Executive Fellow in Healthcare Leadership (Virtued UK)',
          'Board-Certified Healthcare Executive Credential',
        ],
        keyHighlight: 'Directing full hospital ecosystems and steering hundreds of clinical staff.',
      },
    ],
  },
];
