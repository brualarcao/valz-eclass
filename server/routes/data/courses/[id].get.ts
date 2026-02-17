import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler((event) => {
  let id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 404 })
  }
  id = id.replace(/\.json$/, '')

  const publicPath = join(process.cwd(), 'public/data/courses.json')
  let courses: { course: { id: string }; modules: unknown[] }[]
  if (existsSync(publicPath)) {
    const raw = readFileSync(publicPath, 'utf-8')
    const data = JSON.parse(raw) as { courses: { course: { id: string }; modules: unknown[] }[] }
    courses = data.courses
  } else {
    const mockPath = join(process.cwd(), 'server/mocks/courses.json')
    const raw = readFileSync(mockPath, 'utf-8')
    courses = JSON.parse(raw) as { course: { id: string }; modules: unknown[] }[]
  }

  const detail = courses.find(d => d.course.id === id)
  if (!detail) {
    throw createError({ statusCode: 404 })
  }
  return detail
})
