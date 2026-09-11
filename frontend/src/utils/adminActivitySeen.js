const storageKey = (userId) => `bitex:admin-seen:${userId}`;

/**
 * Reads this admin's full "last seen" map — one ISO timestamp per badge section
 * (see useAdminActivityBadges's BADGE_SECTIONS). Shared between that hook, which
 * writes it, and each list page's initial "flash the rows that arrived since I was
 * last here" check, which only reads it.
 */
export const readAdminSeenMap = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId))) || {};
  } catch {
    // A private window, cleared site data, or hand-edited JSON — treat as "nothing
    // seen yet".
    return {};
  }
};

export const writeAdminSeenMap = (userId, seen) => {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(seen));
  } catch {
    // Storage full or blocked — badges/highlights just won't persist across reloads.
  }
};

/** The ISO timestamp this admin last saw one badge section, or null if never recorded. */
export const getAdminSectionSeenAt = (userId, section) => {
  if (!userId) return null;
  return readAdminSeenMap(userId)[section] || null;
};
