import { cookies } from "next/headers"

export const getAdminPassword = (): string => {
  return (process.env.ADMIN_PASSWORD || "admin123").trim()
}

const SESSION_COOKIE_NAME = "portfolio_admin_session"

export function verifyPassword(password: string): boolean {
  if (!password) return false
  // Only matches the active ADMIN_PASSWORD (defaults to admin123 only if ADMIN_PASSWORD is not set)
  return password.trim() === getAdminPassword()
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  if (!sessionCookie) return false

  const expectedToken = Buffer.from(getAdminPassword()).toString("base64")
  return sessionCookie.value === expectedToken
}

export function createSessionToken(password: string): string | null {
  if (verifyPassword(password)) {
    return Buffer.from(getAdminPassword()).toString("base64")
  }
  return null
}

export function isTokenValid(token: string | null | undefined): boolean {
  if (!token) return false
  const cleanToken = token.replace("Bearer ", "").trim()
  const expectedToken = Buffer.from(getAdminPassword()).toString("base64")
  return cleanToken === expectedToken
}

export { SESSION_COOKIE_NAME }
