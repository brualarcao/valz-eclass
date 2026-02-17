import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(() => {
  const publicPath = join(process.cwd(), 'public/data/courses.json')
  if (existsSync(publicPath)) {
    const raw = readFileSync(publicPath, 'utf-8')
    return JSON.parse(raw) as { courses: unknown[] }
  }
  const mockPath = join(process.cwd(), 'server/mocks/courses.json')
  const raw = readFileSync(mockPath, 'utf-8')
  const courses = JSON.parse(raw) as { course: unknown; modules: unknown[] }[]
  return { courses }
})
