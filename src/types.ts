export type CourseCategory =
  | 'Paramedical'
  | 'Diagnostic Imaging'
  | 'Critical Care'
  | 'Hospital Management'
  | 'Therapy & Rehab'
  | 'Fellowship & Certificates';

export interface Course {
  id: string;
  title: string;
  code: string;
  category: CourseCategory;
  duration: string;
  eligibility: string;
  description: string;
  syllabus: string[];
  practicalHours: number;
  internshipHospitals: string[];
  careerRoles: string[];
  image: string;
  featured: boolean;
  fees: string;
  scholarshipAvailable: boolean;
  isNewLaunch?: boolean;
  launchYear?: string;
  awardingBody?: string;
}

export interface FellowshipCourse {
  id: string;
  title: string;
  shortCode: string;
  specialty: string;
  duration: string;
  deliveryMode: '100% Online with Clinical Case Reviews' | 'Blended';
  actualFee?: number;
  offerFee?: number;
  currency?: string;
  scholarshipScheme?: string;
  awardingBody: string;
  collaborator: string;
  authorisedCenter: string;
  eligibility: string;
  emiAvailable: boolean;
  featured: boolean;
  image: string;
  keyModules: string[];
}

export type HospitalCategory =
  | 'Super-Specialty Hospital'
  | 'Diagnostic Chain'
  | 'Multispeciality Clinic';

export interface PlacementRecord {
  id: string;
  studentName: string;
  rollNo: string;
  course: string;
  hospital: string;
  hospitalType: HospitalCategory;
  role: string;
  packageLPA: string;
  year: number;
  photo: string;
  quote: string;
  verified: boolean;
  location: string;
}

export interface TopStudent {
  id: string;
  name: string;
  course: string;
  badge: string;
  score: string;
  batch: string;
  achievement: string;
  currentPosition: string;
  photo: string;
  testimonial: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  author: string;
  authorRole: 'Student' | 'Faculty' | 'Alumni' | 'Clinical Intern';
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorRole: 'Student' | 'Faculty' | 'Alumni' | 'Clinical Intern';
  category:
    | 'Paramedical Techniques'
    | 'Internship Experiences'
    | 'Hospital Management'
    | 'Exam Preparation'
    | 'Clinical Case Studies';
  content: string;
  tags: string[];
  upvotes: number;
  createdAt: string;
  replies: ForumReply[];
  userUpvoted?: boolean;
}

export interface StudyMessage {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  isFaculty?: boolean;
}

export interface StudyRoom {
  id: string;
  title: string;
  topic: string;
  courseCategory: string;
  hostName: string;
  activeMembersCount: number;
  maxMembers: number;
  status: 'active' | 'scheduled';
  summaryNotes: string;
  messages: StudyMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'placement' | 'course' | 'forum' | 'study' | 'admission' | 'review';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface SyncQueueItem {
  id: string;
  type: 'forum_post' | 'forum_reply' | 'course_add' | 'study_message';
  payload: any;
  timestamp: number;
  status: 'pending' | 'synced';
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  text: string;
  photo: string;
  role: 'Student' | 'Parent' | 'Hospital Recruiter' | 'Doctor Fellow';
  courseStudied?: string;
  verified: boolean;
  likes: number;
}

export interface GoogleReviewsConfig {
  enabled: boolean;
  googleReviewUrl: string;
  averageRating: number;
  totalReviewsCount: number;
  institutionName: string;
  location: string;
}

export interface HeaderSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  tagline: string;
  ctaText: string;
  targetSection: string;
}

export interface PlacementTrendMonth {
  month: string;
  totalPlaced: number;
  avgSalaryLPA: number;
  paramedicalSuccess: number; // %
  imagingSuccess: number; // %
  criticalCareSuccess: number; // %
  hospitalMgmtSuccess: number; // %
  fellowshipsSuccess: number; // %
}

export interface CategoryPlacementStat {
  category: CourseCategory;
  placementRate: number;
  placedStudents: number;
  totalGraduates: number;
  averagePackageLPA: string;
  topRecruiters: string[];
  color: string;
}

export type FellowshipProgram = FellowshipCourse;
export type PlacementTrendPoint = PlacementTrendMonth;
