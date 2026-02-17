import type { Course } from '../types/course'

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Vue 3 Patterns',
    shortDescription: 'Master composition API, reusability techniques, and state management with Vue 3.',
    coverImage: 'https://placehold.co/400x200/141414/1A9E6B?text=Vue+3',
    category: { name: 'DEVELOPMENT', icon: 'heroicons:code-bracket' },
    lessonsCount: 12,
    duration: '4h 30m',
    progress: 45,
    statusBadge: 'Advanced',
  },
  {
    id: '2',
    title: 'UI/UX Principles 101',
    shortDescription: 'Understanding visual hierarchy, color theory, and user-centered design.',
    coverImage: 'https://placehold.co/400x200/141414/6366f1?text=UI+UX',
    category: { name: 'DESIGN', icon: 'heroicons:paint-brush' },
    lessonsCount: 8,
    duration: '2h 15m',
    progress: 100,
  },
  {
    id: '3',
    title: 'Node.js Microservices',
    shortDescription: 'Building scalable and resilient backend systems using modern Node.js.',
    coverImage: 'https://placehold.co/400x200/141414/7c3aed?text=Node',
    category: { name: 'BACKEND', icon: 'heroicons:server' },
    lessonsCount: 24,
    duration: '8h 45m',
    progress: 20,
    statusBadge: 'New',
  },
  {
    id: '4',
    title: 'Digital Marketing 2024',
    shortDescription: 'Strategies for SEO, social media, and content marketing in the current landscape.',
    coverImage: 'https://placehold.co/400x200/141414/ec4899?text=Marketing',
    category: { name: 'MARKETING', icon: 'heroicons:rocket-launch' },
    lessonsCount: 15,
    duration: '5h 00m',
    progress: 0,
  },
  {
    id: '5',
    title: 'Python for Data Analysis',
    shortDescription: 'Data manipulation, visualization, and statistical analysis with Python.',
    coverImage: 'https://placehold.co/400x200/141414/1A9E6B?text=Data',
    category: { name: 'DATA SCIENCE', icon: 'heroicons:chart-bar' },
    lessonsCount: 18,
    duration: '6h 30m',
    progress: 75,
  },
  {
    id: '6',
    title: 'Intro to Cybersecurity',
    shortDescription: 'Fundamentals of security, threat modeling, and secure coding practices.',
    coverImage: 'https://placehold.co/400x200/141414/ef4444?text=Security',
    category: { name: 'SECURITY', icon: 'heroicons:lock-closed' },
    lessonsCount: 10,
    duration: '3h 45m',
    progress: 10,
  },
]

export function useMockCourses() {
  return ref<Course[]>(MOCK_COURSES)
}
