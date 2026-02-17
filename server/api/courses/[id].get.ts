import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 404 })
  }

  const path = join(process.cwd(), 'server/mocks/courses.json')
  const raw = readFileSync(path, 'utf-8')
  const courses = JSON.parse(raw) as { course: { id: string }; modules: unknown[] }[]
  const detail = courses.find(d => d.course.id === id)

  if (!detail) {
    throw createError({ statusCode: 404 })
  }

  await new Promise(r => setTimeout(r, 200 + Math.random() * 200))
  return detail
})
