const SESSION_KEY = 'Binco_demo_session';

export function saveSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession() {
  try {
    const storedSession = sessionStorage.getItem(SESSION_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
