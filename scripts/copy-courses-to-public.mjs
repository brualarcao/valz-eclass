import 'dotenv/config'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const mockPath = join(root, 'server', 'mocks', 'courses.json')
const publicData = join(root, 'public', 'data')
const publicCourses = join(publicData, 'courses')

const raw = readFileSync(mockPath, 'utf-8')
const courses = JSON.parse(raw)

if (!existsSync(publicData)) {
  mkdirSync(publicData, { recursive: true })
}
if (!existsSync(publicCourses)) {
  mkdirSync(publicCourses, { recursive: true })
}

const loginEmail = process.env.NUXT_PUBLIC_LOGIN_EMAIL ?? ''
const loginPassword = process.env.NUXT_PUBLIC_LOGIN_PASSWORD ?? ''
writeFileSync(
  join(publicData, 'auth.json'),
  JSON.stringify({ loginEmail, loginPassword }),
  'utf-8',
)

writeFileSync(
  join(publicData, 'courses.json'),
  JSON.stringify({ courses }),
  'utf-8',
)

for (const item of courses) {
  const id = item.course?.id
  if (!id) continue
  writeFileSync(
    join(publicCourses, `${id}.json`),
    JSON.stringify(item),
    'utf-8',
  )
}

console.log('Copied courses and auth to public/data: courses.json, courses/<id>.json, auth.json')
