export type Role = 'user' | 'admin';

export type Session = {
  role: Role;
  email?: string;
  issuedAt: string;
};

const SESSION_KEY = 'stock_platform_session_v1';

function getLocalStorage(): Storage | null {
  // Works in browser only; avoids referencing `window` so this file type-checks under Node-only libs.
  const anyGlobal = globalThis as unknown as { localStorage?: Storage };
  return anyGlobal?.localStorage ?? null;
}

export function getSession(): Session | null {
  const storage = getLocalStorage();
  if (!storage) return null;
  const raw = storage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    if (!parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.removeItem(SESSION_KEY);
}

export function hasRole(session: Session | null, roles?: Role[]) {
  if (!roles || roles.length === 0) return !!session;
  if (!session) return false;
  return roles.includes(session.role);
}
