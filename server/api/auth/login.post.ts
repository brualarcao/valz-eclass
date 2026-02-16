export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event)
  const config = useRuntimeConfig()

  const email = body?.email?.trim() ?? ''
  const password = body?.password ?? ''

  const validEmail = (config.loginEmail ?? '').trim()
  const validPassword = config.loginPassword ?? ''

  if (!validEmail || !validPassword) {
    return { success: false }
  }

  const success =
    email === validEmail &&
    String(password) === String(validPassword)
  return { success }
})
