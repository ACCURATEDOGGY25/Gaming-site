const ADMIN_PIN_KEY = 'dgames-admin-pin'
const ADMIN_SESSION_KEY = 'dgames-admin-session'

export const DEFAULT_ADMIN_PIN = 'dgames2024'

export function getAdminPin() {
  return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN
}

export function setAdminPin(pin) {
  localStorage.setItem(ADMIN_PIN_KEY, pin)
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'
}

export function loginAdmin(pin) {
  if (pin === getAdminPin()) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
    return true
  }
  return false
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
