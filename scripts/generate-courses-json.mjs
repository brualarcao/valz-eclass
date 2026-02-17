/**
 * Generates server/mocks/courses.json with 10 CourseDetail entries.
 * Run: node scripts/generate-courses-json.mjs
 */

const MOCK_COURSES = [
  { id: '1', title: 'Advanced Vue 3 Patterns', shortDescription: 'Master composition API, reusability techniques, and state management with Vue 3.', coverImage: 'https://placehold.co/400x200/141414/1A9E6B?text=Vue+3', category: { name: 'DEVELOPMENT', icon: 'heroicons:code-bracket' }, lessonsCount: 12, duration: '4h 30m', progress: 45, statusBadge: 'Advanced' },
  { id: '2', title: 'UI/UX Principles 101', shortDescription: 'Understanding visual hierarchy, color theory, and user-centered design.', coverImage: 'https://placehold.co/400x200/141414/6366f1?text=UI+UX', category: { name: 'DESIGN', icon: 'heroicons:paint-brush' }, lessonsCount: 8, duration: '2h 15m', progress: 100 },
  { id: '3', title: 'Node.js Microservices', shortDescription: 'Building scalable and resilient backend systems using modern Node.js.', coverImage: 'https://placehold.co/400x200/141414/7c3aed?text=Node', category: { name: 'BACKEND', icon: 'heroicons:server' }, lessonsCount: 24, duration: '8h 45m', progress: 20, statusBadge: 'New' },
  { id: '4', title: 'Digital Marketing 2024', shortDescription: 'Strategies for SEO, social media, and content marketing in the current landscape.', coverImage: 'https://placehold.co/400x200/141414/ec4899?text=Marketing', category: { name: 'MARKETING', icon: 'heroicons:rocket-launch' }, lessonsCount: 15, duration: '5h 00m', progress: 0 },
  { id: '5', title: 'Python for Data Analysis', shortDescription: 'Data manipulation, visualization, and statistical analysis with Python.', coverImage: 'https://placehold.co/400x200/141414/1A9E6B?text=Data', category: { name: 'DATA SCIENCE', icon: 'heroicons:chart-bar' }, lessonsCount: 18, duration: '6h 30m', progress: 75 },
  { id: '6', title: 'Intro to Cybersecurity', shortDescription: 'Fundamentals of security, threat modeling, and secure coding practices.', coverImage: 'https://placehold.co/400x200/141414/ef4444?text=Security', category: { name: 'SECURITY', icon: 'heroicons:lock-closed' }, lessonsCount: 10, duration: '3h 45m', progress: 10 },
  { id: '7', title: 'React & TypeScript Mastery', shortDescription: 'Build type-safe React applications with TypeScript, hooks, and modern patterns.', coverImage: 'https://placehold.co/400x200/141414/61dafb?text=React+TS', category: { name: 'DEVELOPMENT', icon: 'heroicons:code-bracket' }, lessonsCount: 14, duration: '5h 20m', progress: 30, statusBadge: 'New' },
  { id: '8', title: 'Mobile Development with Flutter', shortDescription: 'Create cross-platform mobile apps with Flutter and Dart.', coverImage: 'https://placehold.co/400x200/141414/02569B?text=Flutter', category: { name: 'MOBILE', icon: 'heroicons:device-phone-mobile' }, lessonsCount: 20, duration: '7h 15m', progress: 50 },
  { id: '9', title: 'DevOps & CI/CD Pipelines', shortDescription: 'Automate builds, tests, and deployments with modern DevOps tools.', coverImage: 'https://placehold.co/400x200/141414/f05032?text=DevOps', category: { name: 'DEVOPS', icon: 'heroicons:cpu-chip' }, lessonsCount: 16, duration: '6h 00m', progress: 15, statusBadge: 'Popular' },
  { id: '10', title: 'AWS Cloud Fundamentals', shortDescription: 'Learn core AWS services, architecture, and cloud best practices.', coverImage: 'https://placehold.co/400x200/141414/ff9900?text=AWS', category: { name: 'CLOUD', icon: 'heroicons:cloud' }, lessonsCount: 22, duration: '9h 30m', progress: 0 },
]

const ELABORATE_MODULE_TITLES = [
  ['Módulo 1: Fundamentos e Boas Práticas', 'Módulo 2: Conceitos Avançados e Projeto Final'],
  ['Parte 1: Do zero à entrega', 'Parte 2: Prática e aprofundamento'],
]

function buildLessonsForCourse(course, half, completedCount, videoOrder = null) {
  const count = course.lessonsCount
  const lessons1 = Array.from({ length: half }, (_, i) => {
    const order = i + 1
    const completed = order <= completedCount
    const locked = order > completedCount + 1
    return {
      id: `l-${order}`,
      title: `Lesson ${order}`,
      duration: `${5 + i}:${String(10 + i * 2).padStart(2, '0')}`,
      description: `Description for lesson ${order}.`,
      level: 'Beginner',
      updatedAt: 'Jan 2024',
      completed,
      locked,
      order,
      materials: [
        { id: `mat-${order}-1`, name: `Lesson_${order}_Slides.pdf`, size: '2.4 MB', url: `/api/download/materials/Lesson_${order}_Slides.pdf` },
        { id: `mat-${order}-2`, name: `Source_Code_${order}.zip`, size: '156 KB', url: `/api/download/materials/Source_Code_${order}.zip` },
      ],
    }
  })
  const lessons2 = Array.from({ length: count - half }, (_, i) => {
    const order = half + i + 1
    const completed = order <= completedCount
    const locked = order > completedCount + 1
    const lesson = {
      id: `l-${order}`,
      title: `Lesson ${order}`,
      duration: `${10 + i}:${String(i * 3).padStart(2, '0')}`,
      description: `Description for lesson ${order}.`,
      level: 'Advanced',
      updatedAt: 'Mar 2024',
      completed,
      locked,
      order,
      materials: [
        { id: `mat-${order}-1`, name: `Lesson_${order}_Slides.pdf`, size: '1.8 MB', url: `/api/download/materials/Lesson_${order}_Slides.pdf` },
        { id: `mat-${order}-2`, name: `Source_Code_${order}.zip`, size: '89 KB', url: `/api/download/materials/Source_Code_${order}.zip` },
      ],
    }
    if (videoOrder !== null && order === videoOrder) lesson.videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    return lesson
  })
  return [...lessons1, ...lessons2]
}

function buildCourseDetail(course, idx) {
  const count = course.lessonsCount
  const half = Math.max(1, Math.floor(count / 2))
  const completedCount = Math.floor((course.progress / 100) * count)
  const firstUnlocked = completedCount + 1
  const videoOrder = firstUnlocked <= count ? firstUnlocked : 1
  const titles = ELABORATE_MODULE_TITLES[idx % ELABORATE_MODULE_TITLES.length]
  const lessons = buildLessonsForCourse(course, half, completedCount, videoOrder)
  const lessons1 = lessons.slice(0, half)
  const lessons2 = lessons.slice(half)
  return {
    course,
    modules: [
      { id: 'm1', title: titles[0], lessons: lessons1 },
      { id: 'm2', title: titles[1], lessons: lessons2 },
    ],
  }
}

const courseDetails = MOCK_COURSES.map((c, i) => buildCourseDetail(c, i))
console.log(JSON.stringify(courseDetails, null, 2))
