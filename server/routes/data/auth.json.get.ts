import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(() => {
  const publicPath = join(process.cwd(), 'public/data/auth.json')
  if (existsSync(publicPath)) {
    const raw = readFileSync(publicPath, 'utf-8')
    return JSON.parse(raw) as { loginEmail: string; loginPassword: string }
  }
  return {
    loginEmail: process.env.NUXT_PUBLIC_LOGIN_EMAIL ?? '',
    loginPassword: process.env.NUXT_PUBLIC_LOGIN_PASSWORD ?? '',
  }
})
