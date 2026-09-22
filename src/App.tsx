import React, { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_PLACEMENTS,
  INITIAL_TOP_STUDENTS,
  INITIAL_FORUM_POSTS,
  INITIAL_STUDY_ROOMS,
  INITIAL_NOTIFICATIONS,
  INITIAL_HEADER_SLIDES,
  INITIAL_FELLOWSHIPS,
  INITIAL_GOOGLE_REVIEWS,
  INITIAL_GOOGLE_CONFIG,
  INITIAL_PLACEMENT_TRENDS,
  INITIAL_CATEGORY_STATS,
} from './data/initialData';
import {
  Course,
  PlacementRecord,
  TopStudent,
  ForumPost,
  StudyRoom,
  NotificationItem,
  HeaderSlide,
  FellowshipCourse,
  GoogleReview,
  GoogleReviewsConfig,
  PlacementTrendMonth,
  CategoryPlacementStat,
} from './types';
import {
  getSyncQueue,
  addToSyncQueue,
  removeSyncedItems,
} from './lib/offlineSync';
import { Navbar } from './components/Navbar';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';
import { HeaderSlider } from './components/HeaderSlider';
import { HeroBanner } from './components/HeroBanner';
import { CoursesSection } from './components/CoursesSection';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LaunchNewCourseModal } from './components/LaunchNewCourseModal';
import { FellowshipsSection } from './components/FellowshipsSection';
import { PlacementDashboard } from './components/PlacementDashboard';
import { PlacementsSection } from './components/PlacementsSection';
import { TopStudentsSection } from './components/TopStudentsSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { CommunityForumSection } from './components/CommunityForumSection';
import { StudyConnectSection } from './components/StudyConnectSection';
import { AdminPanel } from './components/AdminPanel';
import { SocialShareModal } from './components/SocialShareModal';
import { NotificationsModal } from './components/NotificationsModal';
import { CareerRoadmapSection } from './components/CareerRoadmapSection';
import { Footer } from './components/Footer';

export default function App() {
  // Application Data States
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [headerSlides, setHeaderSlides] = useState<HeaderSlide[]>(INITIAL_HEADER_SLIDES);
  const [fellowships, setFellowships] = useState<FellowshipCourse[]>(INITIAL_FELLOWSHIPS);
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>(INITIAL_GOOGLE_REVIEWS);
  const [googleReviewsConfig, setGoogleReviewsConfig] = useState<GoogleReviewsConfig>(INITIAL_GOOGLE_CONFIG);
  const [placementTrends, setPlacementTrends] = useState<PlacementTrendMonth[]>(INITIAL_PLACEMENT_TRENDS);
  const [categoryStats, setCategoryStats] = useState<CategoryPlacementStat[]>(INITIAL_CATEGORY_STATS);
  const [placements, setPlacements] = useState<PlacementRecord[]>(INITIAL_PLACEMENTS);
  const [topStudents, setTopStudents] = useState<TopStudent[]>(INITIAL_TOP_STUDENTS);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>(INITIAL_STUDY_ROOMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedRoadmapCourseId, setSelectedRoadmapCourseId] = useState<string | undefined>('course-1');

  // Connectivity & Offline States
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Active Multi-Page Section State
  // Values: 'home' | 'courses' | 'fellowships' | 'dashboard' | 'placements' | 'toppers' | 'reviews' | 'forum' | 'study-connect' | 'admin'
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileDeviceMode, setIsMobileDeviceMode] = useState<boolean>(false);

  // Modals
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isLaunchCourseModalOpen, setIsLaunchCourseModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareModalData, setShareModalData] = useState<{
    title: string;
    subtitle: string;
    badge: string;
    image?: string;
    quote?: string;
  }>({
    title: 'Paramedical Graduate',
    subtitle: 'Central Institute of Healthcare & Management',
    badge: '100% Placement Verified',
  });

  // Check sync queue count on mount
  useEffect(() => {
    const queue = getSyncQueue();
    setPendingSyncCount(queue.length);
  }, []);

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('CIHM ServiceWorker registered:', reg.scope))
        .catch((err) => console.warn('CIHM ServiceWorker registration failed:', err));
    }
  }, []);

  // Fetch initial data from server API with local fallback
  const loadDataFromServer = useCallback(async () => {
    try {
      const [
        coursesRes,
        slidesRes,
        fellowshipsRes,
        reviewsRes,
        reviewConfigRes,
        trendsRes,
        statsRes,
        placementsRes,
        topRes,
        forumRes,
        studyRes,
        notifRes,
      ] = await Promise.allSettled([
        fetch('/api/courses'),
        fetch('/api/header-slides'),
        fetch('/api/fellowships'),
        fetch('/api/google-reviews'),
        fetch('/api/google-reviews/config'),
        fetch('/api/dashboard/placement-trends'),
        fetch('/api/dashboard/category-stats'),
        fetch('/api/placements'),
        fetch('/api/top-students'),
        fetch('/api/forum'),
        fetch('/api/study-rooms'),
        fetch('/api/notifications'),
      ]);

      if (coursesRes.status === 'fulfilled' && coursesRes.value.ok) {
        const data = await coursesRes.value.json();
        if (Array.isArray(data) && data.length > 0) setCourses(data);
      }
      if (slidesRes.status === 'fulfilled' && slidesRes.value.ok) {
        const data = await slidesRes.value.json();
        if (Array.isArray(data) && data.length > 0) setHeaderSlides(data);
      }
      if (fellowshipsRes.status === 'fulfilled' && fellowshipsRes.value.ok) {
        const data = await fellowshipsRes.value.json();
        if (Array.isArray(data) && data.length > 0) setFellowships(data);
      }
      if (reviewsRes.status === 'fulfilled' && reviewsRes.value.ok) {
        const data = await reviewsRes.value.json();
        if (Array.isArray(data) && data.length > 0) setGoogleReviews(data);
      }
      if (reviewConfigRes.status === 'fulfilled' && reviewConfigRes.value.ok) {
        const data = await reviewConfigRes.value.json();
        if (data) setGoogleReviewsConfig(data);
      }
      if (trendsRes.status === 'fulfilled' && trendsRes.value.ok) {
        const data = await trendsRes.value.json();
        if (Array.isArray(data) && data.length > 0) setPlacementTrends(data);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const data = await statsRes.value.json();
        if (Array.isArray(data) && data.length > 0) setCategoryStats(data);
      }
      if (placementsRes.status === 'fulfilled' && placementsRes.value.ok) {
        const data = await placementsRes.value.json();
        if (Array.isArray(data) && data.length > 0) setPlacements(data);
      }
      if (topRes.status === 'fulfilled' && topRes.value.ok) {
        const data = await topRes.value.json();
        if (Array.isArray(data) && data.length > 0) setTopStudents(data);
      }
      if (forumRes.status === 'fulfilled' && forumRes.value.ok) {
        const data = await forumRes.value.json();
        if (Array.isArray(data) && data.length > 0) setForumPosts(data);
      }
      if (studyRes.status === 'fulfilled' && studyRes.value.ok) {
        const data = await studyRes.value.json();
        if (Array.isArray(data) && data.length > 0) setStudyRooms(data);
      }
      if (notifRes.status === 'fulfilled' && notifRes.value.ok) {
        const data = await notifRes.value.json();
        if (Array.isArray(data) && data.length > 0) setNotifications(data);
      }

      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.log('Operating in cached/offline mode:', err);
    }
  }, []);

  useEffect(() => {
    loadDataFromServer();
  }, [loadDataFromServer]);

  // Flush sync queue to server
  const flushSyncQueue = useCallback(async () => {
    const queue = getSyncQueue();
    if (queue.length === 0 || !navigator.onLine) return;

    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queue }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.syncedIds?.length) {
          removeSyncedItems(result.syncedIds);
          setPendingSyncCount(getSyncQueue().length);
          await loadDataFromServer();
        }
      }
    } catch (err) {
      console.error('Failed to sync queue:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [loadDataFromServer]);

  // Listen to network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushSyncQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [flushSyncQueue]);

  // Navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Add Course (Online or Offline Queued)
  const handleAddCourse = async (newCourseData: Partial<Course>) => {
    if (isOnline) {
      try {
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCourseData),
        });
        if (res.ok) {
          const created = await res.json();
          setCourses((prev) => [created, ...prev]);
          return;
        }
      } catch (err) {
        console.warn('Network error adding course, falling back to local:', err);
      }
    }

    const localCourse: Course = {
      id: `course-${Date.now()}`,
      title: newCourseData.title || 'Untitled Course',
      code: newCourseData.code || 'CIHM-100',
      category: newCourseData.category || 'Paramedical',
      duration: newCourseData.duration || '1 Year',
      eligibility: newCourseData.eligibility || '10+2 Passed',
      description: newCourseData.description || '',
      syllabus: newCourseData.syllabus || ['Clinical Basics'],
      practicalHours: newCourseData.practicalHours || 300,
      internshipHospitals: newCourseData.internshipHospitals || ['Apollo Multispeciality Hospitals'],
      careerRoles: newCourseData.careerRoles || ['Healthcare Specialist'],
      image:
        newCourseData.image ||
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
      featured: true,
      fees: newCourseData.fees || 'Scholarship Scheme Supported (Zero-Interest Installments)',
      scholarshipAvailable: Boolean(newCourseData.scholarshipAvailable),
      isNewLaunch: Boolean(newCourseData.isNewLaunch),
    };

    setCourses((prev) => [localCourse, ...prev]);
    addToSyncQueue({ type: 'course_add', payload: localCourse });
    setPendingSyncCount(getSyncQueue().length);
  };

  // Handler: Delete Course
  const handleDeleteCourse = async (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    if (isOnline) {
      try {
        await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Delete course error on server:', err);
      }
    }
  };

  // Handler: Add Header Slide
  const handleAddHeaderSlide = async (slide: Partial<HeaderSlide>) => {
    if (isOnline) {
      try {
        const res = await fetch('/api/header-slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slide),
        });
        if (res.ok) {
          const created = await res.json();
          setHeaderSlides((prev) => [...prev, created]);
          return;
        }
      } catch (err) {
        console.warn('Add slide error:', err);
      }
    }
    const localSlide: HeaderSlide = {
      id: `slide-${Date.now()}`,
      title: slide.title || 'CIHM Excellence',
      subtitle: slide.subtitle || 'Kolkata Campus',
      badge: slide.badge || 'Admissions Open',
      image: slide.image || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format&fit=crop&q=80',
      tagline: slide.tagline || '100% Placement Record',
      ctaText: slide.ctaText || 'Apply Now',
      targetSection: slide.targetSection || 'courses',
    };
    setHeaderSlides((prev) => [...prev, localSlide]);
  };

  // Handler: Delete Header Slide
  const handleDeleteHeaderSlide = async (id: string) => {
    setHeaderSlides((prev) => prev.filter((s) => s.id !== id));
    if (isOnline) {
      try {
        await fetch(`/api/header-slides/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Delete slide error:', err);
      }
    }
  };

  // Handler: Add Google Review
  const handleAddGoogleReview = async (reviewData: Partial<GoogleReview>) => {
    const newRev: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || 'Verified Student',
      rating: reviewData.rating || 5,
      date: 'Just now',
      text: reviewData.text || '',
      photo: reviewData.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: reviewData.role || 'Student',
      courseStudied: reviewData.courseStudied || 'CIHM Paramedical',
      verified: true,
      likes: 0,
    };

    setGoogleReviews((prev) => [newRev, ...prev]);

    if (isOnline) {
      try {
        await fetch('/api/google-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRev),
        });
      } catch (err) {
        console.warn('Error saving review to server:', err);
      }
    }
  };

  // Handler: Delete Google Review
  const handleDeleteGoogleReview = async (id: string) => {
    setGoogleReviews((prev) => prev.filter((r) => r.id !== id));
    if (isOnline) {
      try {
        await fetch(`/api/google-reviews/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Error deleting review on server:', err);
      }
    }
  };

  // Handler: Update Google Reviews Config
  const handleUpdateGoogleReviewConfig = async (config: GoogleReviewsConfig) => {
    setGoogleReviewsConfig(config);
    if (isOnline) {
      try {
        await fetch('/api/google-reviews/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        });
      } catch (err) {
        console.warn('Error updating google review config:', err);
      }
    }
  };

  // Handler: Add Forum Post
  const handleAddForumPost = async (newPostData: Partial<ForumPost>) => {
    if (isOnline) {
      try {
        const res = await fetch('/api/forum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPostData),
        });
        if (res.ok) {
          const created = await res.json();
          setForumPosts((prev) => [created, ...prev]);
          return;
        }
      } catch (err) {
        console.warn('Network error posting forum topic:', err);
      }
    }

    const localPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostData.title || '',
      author: newPostData.author || 'CIHM Member',
      authorRole: newPostData.authorRole || 'Student',
      category: newPostData.category || 'Paramedical Techniques',
      content: newPostData.content || '',
      tags: newPostData.tags || ['Paramedical'],
      upvotes: 1,
      createdAt: 'Queued offline',
      replies: [],
    };

    setForumPosts((prev) => [localPost, ...prev]);
    addToSyncQueue({ type: 'forum_post', payload: localPost });
    setPendingSyncCount(getSyncQueue().length);
  };

  // Handler: Reply to Forum Post
  const handleAddForumReply = async (postId: string, content: string, author: string) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      postId,
      author,
      authorRole: 'Student' as const,
      content,
      createdAt: isOnline ? 'Just now' : 'Queued offline',
      upvotes: 0,
    };

    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, replies: [...(p.replies || []), newReply] };
        }
        return p;
      })
    );

    if (isOnline) {
      try {
        await fetch(`/api/forum/${postId}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, author, authorRole: 'Student' }),
        });
      } catch (err) {
        console.warn('Reply sync error:', err);
      }
    } else {
      addToSyncQueue({
        type: 'forum_reply',
        payload: { postId, content, author, authorRole: 'Student' },
      });
      setPendingSyncCount(getSyncQueue().length);
    }
  };

  // Handler: Upvote Forum Post
  const handleUpvotePost = async (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, upvotes: p.upvotes + 1 };
        }
        return p;
      })
    );

    if (isOnline) {
      try {
        await fetch(`/api/forum/${postId}/upvote`, { method: 'POST' });
      } catch (err) {
        console.warn('Upvote error:', err);
      }
    }
  };

  // Handler: Create Study Room
  const handleCreateStudyRoom = async (newRoomData: Partial<StudyRoom>) => {
    if (isOnline) {
      try {
        const res = await fetch('/api/study-rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRoomData),
        });
        if (res.ok) {
          const created = await res.json();
          setStudyRooms((prev) => [created, ...prev]);
          return;
        }
      } catch (err) {
        console.warn('Error creating study room:', err);
      }
    }

    const localRoom: StudyRoom = {
      id: `room-${Date.now()}`,
      title: newRoomData.title || 'Study Room',
      topic: newRoomData.topic || 'Clinical Discussion',
      courseCategory: newRoomData.courseCategory || 'Paramedical',
      hostName: newRoomData.hostName || 'Fellow',
      activeMembersCount: 1,
      maxMembers: 15,
      status: 'active',
      summaryNotes: newRoomData.summaryNotes || 'Discussion active.',
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: newRoomData.hostName || 'Host',
          text: 'Welcome to this study group!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFaculty: true,
        },
      ],
    };

    setStudyRooms((prev) => [localRoom, ...prev]);
  };

  // Handler: Send Message in Study Room
  const handleSendStudyMessage = async (roomId: string, text: string, author: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      author,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFaculty: false,
    };

    setStudyRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return { ...r, messages: [...r.messages, newMsg] };
        }
        return r;
      })
    );

    if (isOnline) {
      try {
        await fetch(`/api/study-rooms/${roomId}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, author }),
        });
      } catch (err) {
        console.warn('Study room message sync error:', err);
      }
    } else {
      addToSyncQueue({
        type: 'study_message',
        payload: { roomId, text, author, isFaculty: false },
      });
      setPendingSyncCount(getSyncQueue().length);
    }
  };

  // Handler: Send Custom Push Notification
  const handleSendCustomNotification = async (title: string, message: string, type: any) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    if (isOnline) {
      try {
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, message, type }),
        });
      } catch (err) {
        console.warn('Error sending notification:', err);
      }
    }
  };

  // Trigger Share Modal
  const openShareForPlacement = (placement: PlacementRecord) => {
    setShareModalData({
      title: `${placement.studentName} secured ${placement.role}`,
      subtitle: `${placement.hospital} (${placement.packageLPA})`,
      badge: 'Hospital Placement Verified',
      image: placement.photo,
      quote: placement.quote,
    });
    setIsShareModalOpen(true);
  };

  const openShareForStudent = (student: TopStudent) => {
    setShareModalData({
      title: `${student.name} - ${student.badge}`,
      subtitle: `${student.course} • ${student.score}`,
      badge: 'CIHM Academic Topper',
      image: student.photo,
      quote: student.achievement,
    });
    setIsShareModalOpen(true);
  };

  const openShareForCourse = (course: Course) => {
    setShareModalData({
      title: course.title,
      subtitle: `${course.category} • ${course.duration}`,
      badge: 'CIHM Accredited Course',
      image: course.image,
      quote: course.description,
    });
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c163b] flex flex-col items-center justify-start antialiased text-slate-800">
      {/* Container Wrapper - Responsive or Simulated Native Mobile Frame */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileDeviceMode
            ? 'max-w-md my-6 rounded-[42px] border-[10px] border-[#14245c] shadow-2xl overflow-hidden ring-4 ring-blue-500/50 min-h-[92vh] bg-white'
            : 'max-w-full bg-white'
        }`}
      >
        {/* Mobile Device Notch Simulation (Strictly No Black) */}
        {isMobileDeviceMode && (
          <div className="bg-[#0f1f4b] py-1.5 px-6 flex items-center justify-between text-blue-100 text-[10px] select-none border-b border-blue-900">
            <span className="font-bold">09:41</span>
            <div className="w-16 h-3 bg-[#14245c] rounded-full border border-blue-600/50" />
            <div className="flex items-center gap-1.5 font-bold">
              <span>5G</span>
              <span className="font-mono text-amber-300">100%</span>
            </div>
          </div>
        )}

        {/* Global Navigation Header with CIHM Palette */}
        <Navbar
          isOnline={isOnline}
          pendingSyncCount={pendingSyncCount}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
          isMobileDeviceMode={isMobileDeviceMode}
          onToggleMobileMode={() => setIsMobileDeviceMode(!isMobileDeviceMode)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenLaunchCourse={() => setIsLaunchCourseModalOpen(true)}
        />

        {/* Offline & Real-time Sync Monitor Banner */}
        <OfflineSyncBanner
          isOnline={isOnline}
          pendingCount={pendingSyncCount}
          isSyncing={isSyncing}
          onManualSync={flushSyncQueue}
          lastSyncTime={lastSyncTime}
        />

        {/* Multi-Page Views Rendering Engine */}
        <main className="flex-1">
          {/* PAGE: HOME */}
          {activeSection === 'home' && (
            <div>
              {/* Sliding Each Header Actual Realistic Images with Stats & Controls */}
              <HeaderSlider
                slides={headerSlides}
                onNavigate={handleNavigate}
                onOpenLaunchCourse={() => setIsLaunchCourseModalOpen(true)}
              />

              {/* Comprehensive Campus Hero Banner */}
              <HeroBanner
                onExploreCourses={() => handleNavigate('courses')}
                onViewPlacements={() => handleNavigate('placements')}
                onJoinCommunity={() => handleNavigate('forum')}
                onOpenStudyConnect={() => handleNavigate('study-connect')}
                onViewRoadmap={() => handleNavigate('roadmap')}
              />

              {/* Courses Showcase Preview */}
              <CoursesSection
                courses={courses}
                isAdminMode={true}
                onAddCourse={handleAddCourse}
                onDeleteCourse={handleDeleteCourse}
                onSelectCourseForDetails={(c) => setSelectedCourseForModal(c)}
                onOpenLaunchCourseModal={() => setIsLaunchCourseModalOpen(true)}
                onViewRoadmap={(courseId) => {
                  if (courseId) setSelectedRoadmapCourseId(courseId);
                  handleNavigate('roadmap');
                }}
              />

              {/* Career Roadmap Progression Visualization (Student to Professional) */}
              <CareerRoadmapSection
                initialCourseId={selectedRoadmapCourseId}
                onSelectCourse={(cId) => setSelectedRoadmapCourseId(cId)}
              />

              {/* Placement Trends Dashboard Preview (Recharts) */}
              <PlacementDashboard
                trendData={placementTrends}
                categoryStats={categoryStats}
              />

              {/* UK Fellowships Program Strip */}
              <FellowshipsSection
                fellowships={fellowships.slice(0, 4)}
              />

              {/* Actual Google Reviews Verified Showcase */}
              <GoogleReviewsSection
                reviews={googleReviews}
                config={googleReviewsConfig}
              />

              {/* Placements & Top Students Preview */}
              <PlacementsSection
                placements={placements.slice(0, 6)}
                onSharePlacement={openShareForPlacement}
              />
            </div>
          )}

          {/* PAGE: COURSES */}
          {activeSection === 'courses' && (
            <CoursesSection
              courses={courses}
              isAdminMode={true}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              onSelectCourseForDetails={(c) => setSelectedCourseForModal(c)}
              onOpenLaunchCourseModal={() => setIsLaunchCourseModalOpen(true)}
              onViewRoadmap={(courseId) => {
                if (courseId) setSelectedRoadmapCourseId(courseId);
                handleNavigate('roadmap');
              }}
            />
          )}

          {/* PAGE: CAREER ROADMAP (STUDENT TO PROFESSIONAL) */}
          {activeSection === 'roadmap' && (
            <CareerRoadmapSection
              initialCourseId={selectedRoadmapCourseId}
              onSelectCourse={(cId) => setSelectedRoadmapCourseId(cId)}
            />
          )}

          {/* PAGE: UK FELLOWSHIPS */}
          {activeSection === 'fellowships' && (
            <FellowshipsSection
              fellowships={fellowships}
            />
          )}

          {/* PAGE: PLACEMENT DASHBOARD (RECHARTS) */}
          {activeSection === 'dashboard' && (
            <PlacementDashboard
              trendData={placementTrends}
              categoryStats={categoryStats}
            />
          )}

          {/* PAGE: PLACEMENTS & RECRUITERS */}
          {activeSection === 'placements' && (
            <PlacementsSection
              placements={placements}
              onSharePlacement={openShareForPlacement}
            />
          )}

          {/* PAGE: TOP STUDENTS & TOPPERS */}
          {activeSection === 'toppers' && (
            <TopStudentsSection
              topStudents={topStudents}
              onShareStudentAchievement={openShareForStudent}
            />
          )}

          {/* PAGE: ACTUAL GOOGLE REVIEWS */}
          {activeSection === 'reviews' && (
            <GoogleReviewsSection
              reviews={googleReviews}
              config={googleReviewsConfig}
            />
          )}

          {/* PAGE: COMMUNITY FORUM */}
          {activeSection === 'forum' && (
            <CommunityForumSection
              posts={forumPosts}
              isOnline={isOnline}
              onAddPost={handleAddForumPost}
              onAddReply={handleAddForumReply}
              onUpvotePost={handleUpvotePost}
            />
          )}

          {/* PAGE: STUDY CONNECT LIVE ROOMS */}
          {activeSection === 'study-connect' && (
            <StudyConnectSection
              rooms={studyRooms}
              onCreateRoom={handleCreateStudyRoom}
              onSendMessage={handleSendStudyMessage}
            />
          )}

          {/* PAGE: ADMIN CONTROL PANEL */}
          {activeSection === 'admin' && (
            <AdminPanel
              courses={courses}
              headerSlides={headerSlides}
              googleReviews={googleReviews}
              googleConfig={googleReviewsConfig}
              fellowships={fellowships}
              placements={placements}
              onUpdateGoogleConfig={handleUpdateGoogleReviewConfig}
              onAddReview={handleAddGoogleReview}
              onDeleteReview={handleDeleteGoogleReview}
              onAddSlide={handleAddHeaderSlide}
              onDeleteSlide={handleDeleteHeaderSlide}
              onDeleteCourse={handleDeleteCourse}
              onOpenLaunchCourse={() => setIsLaunchCourseModalOpen(true)}
            />
          )}
        </main>

        {/* Footer with FB, Insta, YouTube & Kolkata Campus Address */}
        <Footer onNavigate={handleNavigate} />

        {/* Modal: Course Detail Modal */}
        <CourseDetailModal
          course={selectedCourseForModal}
          onClose={() => setSelectedCourseForModal(null)}
          onShare={openShareForCourse}
        />

        {/* Modal: Launch New Course (Admin & Quick Launch) */}
        <LaunchNewCourseModal
          isOpen={isLaunchCourseModalOpen}
          onClose={() => setIsLaunchCourseModalOpen(false)}
          onLaunchSuccess={(newCourse: Course) => {
            setCourses((prev) => [newCourse, ...prev]);
            setActiveSection('courses');
          }}
        />

        {/* Modal: Social Media Sharing Modal */}
        <SocialShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          title={shareModalData.title}
          subtitle={shareModalData.subtitle}
          badge={shareModalData.badge}
          image={shareModalData.image}
          quote={shareModalData.quote}
        />

        {/* Modal: Personalized Push Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
          notifications={notifications}
          onMarkAllRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          onSendCustomNotification={handleSendCustomNotification}
        />
      </div>
    </div>
  );
}
