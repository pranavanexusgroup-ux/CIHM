import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
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
} from './src/data/initialData.ts';
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
} from './src/types.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory data store initialized with verified CIHM data
  let courses: Course[] = [...INITIAL_COURSES];
  let fellowships: FellowshipCourse[] = [...INITIAL_FELLOWSHIPS];
  let placements: PlacementRecord[] = [...INITIAL_PLACEMENTS];
  let topStudents: TopStudent[] = [...INITIAL_TOP_STUDENTS];
  let forumPosts: ForumPost[] = [...INITIAL_FORUM_POSTS];
  let studyRooms: StudyRoom[] = [...INITIAL_STUDY_ROOMS];
  let notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
  let headerSlides: HeaderSlide[] = [...INITIAL_HEADER_SLIDES];
  let googleReviews: GoogleReview[] = [...INITIAL_GOOGLE_REVIEWS];
  let googleReviewsConfig: GoogleReviewsConfig = { ...INITIAL_GOOGLE_CONFIG };
  let placementTrends: PlacementTrendMonth[] = [...INITIAL_PLACEMENT_TRENDS];
  let categoryStats: CategoryPlacementStat[] = [...INITIAL_CATEGORY_STATS];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Header Slides endpoints
  app.get('/api/header-slides', (req, res) => {
    res.json(headerSlides);
  });

  app.post('/api/header-slides', (req, res) => {
    const newSlide: HeaderSlide = {
      id: `slide-${Date.now()}`,
      title: req.body.title || 'CIHM Excellence',
      subtitle: req.body.subtitle || 'Healthcare education',
      badge: req.body.badge || 'ADMISSION OPEN',
      image:
        req.body.image ||
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format&fit=crop&q=85',
      tagline: req.body.tagline || 'CIHM Kolkata Center',
      ctaText: req.body.ctaText || 'Learn More',
      targetSection: req.body.targetSection || 'courses',
    };
    headerSlides = [...headerSlides, newSlide];
    res.status(201).json(newSlide);
  });

  app.delete('/api/header-slides/:id', (req, res) => {
    const { id } = req.params;
    headerSlides = headerSlides.filter((s) => s.id !== id);
    res.json({ success: true, removedId: id });
  });

  // Courses endpoints (List, Add, Delete, Launch New Course)
  app.get('/api/courses', (req, res) => {
    res.json(courses);
  });

  app.post('/api/courses', (req, res) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: req.body.title || 'Untitled Course',
      code: req.body.code || `CIHM-${Math.floor(100 + Math.random() * 900)}`,
      category: req.body.category || 'Paramedical',
      duration: req.body.duration || '1 Year',
      eligibility: req.body.eligibility || '10+2 Passed',
      description: req.body.description || '',
      syllabus: Array.isArray(req.body.syllabus) ? req.body.syllabus : ['Module 1', 'Module 2'],
      practicalHours: Number(req.body.practicalHours) || 300,
      internshipHospitals: Array.isArray(req.body.internshipHospitals)
        ? req.body.internshipHospitals
        : ['Apollo Multispeciality Hospitals', 'Suraksha Diagnostics'],
      careerRoles: Array.isArray(req.body.careerRoles)
        ? req.body.careerRoles
        : ['Healthcare Professional'],
      image:
        req.body.image ||
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
      featured: Boolean(req.body.featured),
      fees: req.body.fees || 'Subsidized Merit Structure (Scholarship Eligible)',
      scholarshipAvailable: Boolean(req.body.scholarshipAvailable),
      isNewLaunch: Boolean(req.body.isNewLaunch),
      launchYear: req.body.launchYear || '2026 Batch',
    };

    courses = [newCourse, ...courses];
    res.status(201).json(newCourse);
  });

  // Dedicated endpoint to "Launch New Course"
  app.post('/api/courses/launch-new', (req, res) => {
    const newCourse: Course = {
      id: `course-launch-${Date.now()}`,
      title: req.body.title || 'Newly Launched Course',
      code: req.body.code || `CIHM-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category: req.body.category || 'Paramedical',
      duration: req.body.duration || '1 Year + 6 Months Clinical Internship',
      eligibility: req.body.eligibility || '10+2 Passed (Science/Any Stream)',
      description: req.body.description || 'Newly launched accredited clinical program with practical hospital rotations.',
      syllabus: Array.isArray(req.body.syllabus)
        ? req.body.syllabus
        : ['Clinical Diagnostic Foundation', 'Practical Equipment Protocols', 'Hospital Internship Rotations'],
      practicalHours: Number(req.body.practicalHours) || 350,
      internshipHospitals: Array.isArray(req.body.internshipHospitals) && req.body.internshipHospitals.length > 0
        ? req.body.internshipHospitals
        : ['Apollo Multispeciality Hospital Kolkata', 'Fortis Healthcare', 'Medica Superspecialty'],
      careerRoles: Array.isArray(req.body.careerRoles) && req.body.careerRoles.length > 0
        ? req.body.careerRoles
        : ['Certified Healthcare Specialist', 'Clinical Technologist'],
      image:
        req.body.image ||
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
      featured: true,
      fees: req.body.fees || 'Subsidized Merit Structure (Scholarship Eligible)',
      scholarshipAvailable: true,
      isNewLaunch: true,
      launchYear: '2026–27 Batch (Newly Launched)',
    };

    courses = [newCourse, ...courses];

    // Auto-broadcast a notification about the new course launch!
    const launchNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New Course Launch: ${newCourse.title}!`,
      message: `CIHM Kolkata has launched ${newCourse.title} (${newCourse.category}) for the 2026-27 academic session. 50% merit scholarship seats open!`,
      type: 'course',
      timestamp: 'Just now',
      read: false,
    };
    notifications = [launchNotif, ...notifications];

    res.status(201).json({ course: newCourse, notification: launchNotif });
  });

  app.delete('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = courses.length;
    courses = courses.filter((c) => c.id !== id);
    if (courses.length === initialLength) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ success: true, removedId: id });
  });

  // Fellowships endpoints (from the attached Virtued Eduversity London UK brochure)
  app.get('/api/fellowships', (req, res) => {
    res.json(fellowships);
  });

  app.post('/api/fellowships', (req, res) => {
    const newFel: FellowshipCourse = {
      id: `fel-${Date.now()}`,
      title: req.body.title || 'Fellowship Program',
      shortCode: req.body.shortCode || 'F.Med. (London)',
      specialty: req.body.specialty || 'General Medicine',
      duration: '1 Year Online',
      deliveryMode: '100% Online with Clinical Case Reviews',
      actualFee: Number(req.body.actualFee) || 120000,
      offerFee: Number(req.body.offerFee) || 59000,
      currency: '',
      awardingBody: 'Virtued Eduversity (London, UK)',
      collaborator: 'Virtued Academy International',
      authorisedCenter: 'CIHM DumDum, Kolkata',
      eligibility: req.body.eligibility || 'Doctors & Healthcare Professionals',
      emiAvailable: true,
      featured: true,
      image:
        req.body.image ||
        'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80',
      keyModules: Array.isArray(req.body.keyModules) ? req.body.keyModules : ['Module 1', 'Module 2'],
    };

    fellowships = [newFel, ...fellowships];
    res.status(201).json(newFel);
  });

  app.delete('/api/fellowships/:id', (req, res) => {
    const { id } = req.params;
    fellowships = fellowships.filter((f) => f.id !== id);
    res.json({ success: true, removedId: id });
  });

  // Google Reviews endpoints & Admin Config
  app.get('/api/google-reviews', (req, res) => {
    res.json(googleReviews);
  });

  app.post('/api/google-reviews', (req, res) => {
    const newReview: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: req.body.author || 'Google User',
      rating: Number(req.body.rating) || 5,
      date: 'Just now',
      text: req.body.text || 'Great educational experience at CIHM Kolkata!',
      photo:
        req.body.photo ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: req.body.role || 'Student',
      courseStudied: req.body.courseStudied || 'CIHM Alumni',
      verified: true,
      likes: 1,
    };
    googleReviews = [newReview, ...googleReviews];
    res.status(201).json(newReview);
  });

  app.delete('/api/google-reviews/:id', (req, res) => {
    const { id } = req.params;
    googleReviews = googleReviews.filter((r) => r.id !== id);
    res.json({ success: true, removedId: id });
  });

  app.get('/api/google-reviews/config', (req, res) => {
    res.json(googleReviewsConfig);
  });

  app.put('/api/google-reviews/config', (req, res) => {
    googleReviewsConfig = {
      ...googleReviewsConfig,
      ...req.body,
    };
    res.json(googleReviewsConfig);
  });

  // Placement Dashboard & Recharts Trends
  app.get('/api/dashboard/placement-trends', (req, res) => {
    res.json(placementTrends);
  });

  app.get('/api/dashboard/category-stats', (req, res) => {
    res.json(categoryStats);
  });

  // Placements records endpoints
  app.get('/api/placements', (req, res) => {
    res.json(placements);
  });

  app.post('/api/placements', (req, res) => {
    const newPlacement: PlacementRecord = {
      id: `pl-${Date.now()}`,
      studentName: req.body.studentName || 'Student Name',
      rollNo: req.body.rollNo || `CIHM/${new Date().getFullYear()}/001`,
      course: req.body.course || 'Paramedical Course',
      hospital: req.body.hospital || 'Apollo Multispeciality Hospitals',
      hospitalType: req.body.hospitalType || 'Super-Specialty Hospital',
      role: req.body.role || 'Paramedical Specialist',
      packageLPA: req.body.packageLPA || 'Super-Specialty Hospital Grade',
      year: Number(req.body.year) || new Date().getFullYear(),
      photo:
        req.body.photo ||
        'https://images.unsplash.com/photo-1594824813688-6dbbc6a1fa7c?w=400&auto=format&fit=crop&q=80',
      quote: req.body.quote || 'Thanks to CIHM for outstanding placement support!',
      verified: true,
      location: req.body.location || 'Kolkata, WB',
    };

    placements = [newPlacement, ...placements];
    res.status(201).json(newPlacement);
  });

  // Top Students endpoints
  app.get('/api/top-students', (req, res) => {
    res.json(topStudents);
  });

  app.post('/api/top-students', (req, res) => {
    const newTopStudent: TopStudent = {
      id: `top-${Date.now()}`,
      name: req.body.name || 'CIHM Scholar',
      course: req.body.course || 'DMLT',
      badge: req.body.badge || 'Academic Star',
      score: req.body.score || '95%',
      batch: req.body.batch || 'Batch 2024-2025',
      achievement: req.body.achievement || 'Outstanding practical lab performance',
      currentPosition: req.body.currentPosition || 'Healthcare Specialist',
      photo:
        req.body.photo ||
        'https://images.unsplash.com/photo-1594824813688-6dbbc6a1fa7c?w=400&auto=format&fit=crop&q=80',
      testimonial: req.body.testimonial || 'CIHM changed my career trajectory.',
    };

    topStudents = [newTopStudent, ...topStudents];
    res.status(201).json(newTopStudent);
  });

  // Interactive Community Forum
  app.get('/api/forum', (req, res) => {
    res.json(forumPosts);
  });

  app.post('/api/forum', (req, res) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: req.body.title || 'Discussion Topic',
      author: req.body.author || 'CIHM Member',
      authorRole: req.body.authorRole || 'Student',
      category: req.body.category || 'Paramedical Techniques',
      content: req.body.content || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : ['CIHM', 'Healthcare'],
      upvotes: 1,
      createdAt: 'Just now',
      replies: [],
    };

    forumPosts = [newPost, ...forumPosts];
    res.status(201).json(newPost);
  });

  app.post('/api/forum/:id/reply', (req, res) => {
    const { id } = req.params;
    const post = forumPosts.find((p) => p.id === id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const newReply = {
      id: `reply-${Date.now()}`,
      postId: id,
      author: req.body.author || 'CIHM Member',
      authorRole: req.body.authorRole || 'Student',
      content: req.body.content || '',
      createdAt: 'Just now',
      upvotes: 0,
    };

    post.replies = [...post.replies, newReply];
    res.status(201).json(newReply);
  });

  app.post('/api/forum/:id/upvote', (req, res) => {
    const { id } = req.params;
    const post = forumPosts.find((p) => p.id === id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    post.upvotes = (post.upvotes || 0) + 1;
    res.json({ upvotes: post.upvotes });
  });

  // Study Connect & Peer Rooms
  app.get('/api/study-rooms', (req, res) => {
    res.json(studyRooms);
  });

  app.post('/api/study-rooms', (req, res) => {
    const newRoom: StudyRoom = {
      id: `room-${Date.now()}`,
      title: req.body.title || 'Study Discussion',
      topic: req.body.topic || 'Clinical Project Review',
      courseCategory: req.body.courseCategory || 'Paramedical Studies',
      hostName: req.body.hostName || 'Senior Fellow',
      activeMembersCount: 1,
      maxMembers: Number(req.body.maxMembers) || 15,
      status: 'active',
      summaryNotes: req.body.summaryNotes || 'Discussion board active.',
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: req.body.hostName || 'Room Host',
          text: `Welcome to ${req.body.title || 'the study room'}! Feel free to ask questions or share case findings.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFaculty: true,
        },
      ],
    };

    studyRooms = [newRoom, ...studyRooms];
    res.status(201).json(newRoom);
  });

  app.post('/api/study-rooms/:id/message', (req, res) => {
    const { id } = req.params;
    const room = studyRooms.find((r) => r.id === id);
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      author: req.body.author || 'Student',
      text: req.body.text || '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFaculty: Boolean(req.body.isFaculty),
    };

    room.messages = [...room.messages, newMsg];
    res.status(201).json(newMsg);
  });

  // Push Notifications API
  app.get('/api/notifications', (req, res) => {
    res.json(notifications);
  });

  app.post('/api/notifications/send', (req, res) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: req.body.title || 'CIHM Alert',
      message: req.body.message || 'New update from CIHM Kolkata.',
      type: req.body.type || 'admission',
      timestamp: 'Just now',
      read: false,
      link: req.body.link || '/',
    };

    notifications = [newNotif, ...notifications];
    res.status(201).json(newNotif);
  });

  // Real-time batch sync for offline queue
  app.post('/api/sync', (req, res) => {
    const queue = req.body.queue || [];
    const syncedIds: string[] = [];

    for (const item of queue) {
      if (item.type === 'forum_post' && item.payload) {
        const p = item.payload;
        forumPosts = [
          {
            id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            title: p.title,
            author: p.author || 'Offline Student',
            authorRole: p.authorRole || 'Student',
            category: p.category || 'Paramedical Techniques',
            content: p.content,
            tags: p.tags || ['OfflineSync'],
            upvotes: 1,
            createdAt: 'Synced just now',
            replies: [],
          },
          ...forumPosts,
        ];
        syncedIds.push(item.id);
      } else if (item.type === 'forum_reply' && item.payload) {
        const { postId, content, author, authorRole } = item.payload;
        const post = forumPosts.find((p) => p.id === postId);
        if (post) {
          post.replies.push({
            id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            postId,
            author: author || 'Offline Student',
            authorRole: authorRole || 'Student',
            content,
            createdAt: 'Synced just now',
            upvotes: 0,
          });
        }
        syncedIds.push(item.id);
      } else if (item.type === 'study_message' && item.payload) {
        const { roomId, author, text, isFaculty } = item.payload;
        const room = studyRooms.find((r) => r.id === roomId);
        if (room) {
          room.messages.push({
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            author: author || 'Offline Student',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFaculty: Boolean(isFaculty),
          });
        }
        syncedIds.push(item.id);
      } else if (item.type === 'course_add' && item.payload) {
        courses = [item.payload, ...courses];
        syncedIds.push(item.id);
      }
    }

    res.json({
      success: true,
      syncedCount: syncedIds.length,
      syncedIds,
      serverTime: new Date().toISOString(),
    });
  });

  // Vite middleware setup for dev, static serving for production
  const distPath = path.join(process.cwd(), 'dist');
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    !process.argv[1]?.endsWith('server.ts');

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CIHM Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
