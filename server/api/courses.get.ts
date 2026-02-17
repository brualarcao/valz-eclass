import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const path = join(process.cwd(), 'server/mocks/courses.json')
  const raw = readFileSync(path, 'utf-8')
  const courses = JSON.parse(raw) as { course: unknown; modules: unknown[] }[]
  const config = useRuntimeConfig()

  await new Promise(r => setTimeout(r, 400 + Math.random() * 400))

  const returnEmpty = config.emptyState ?? false
  return {
    courses: returnEmpty ? [] : courses,
  }
})
