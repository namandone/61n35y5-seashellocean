/**
 * nav.js — Shared navigation behaviour
 * assets/js/nav.js
 *
 * Provides:
 *   - Avatar dropdown (open/close/outside-click)
 *   - Logout confirmation modal
 *   - Convenience: goTo(url) for same-page SPA screens
 *
 * Usage: include after your topbar HTML.
 * Call initNav() once the DOM is ready if using DOMContentLoaded,
 * or place the <script> tag at end of <body>.
 */

/* ─────────────────────────────
   AVATAR DROPDOWN
───────────────────────────── */

/**
 * Toggle an avatar dropdown by its element ID.
 * @param {MouseEvent} e
 * @param {string} dropdownId - id of the .av-dropdown element
 */
function toggleAvDropdown(e, dropdownId) {
  e.stopPropagation();
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  const isOpen = dropdown.classList.contains('open');
  closeAllAvDropdowns();
  if (!isOpen) dropdown.classList.add('open');
}

/**
 * Close a specific dropdown by ID.
 * @param {string} dropdownId
 */
function closeAvDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) dropdown.classList.remove('open');
}

/**
 * Close every open .av-dropdown on the page.
 */
function closeAllAvDropdowns() {
  document.querySelectorAll('.av-dropdown.open')
    .forEach(el => el.classList.remove('open'));
}

// Close on outside click
document.addEventListener('click', () => closeAllAvDropdowns());

// Prevent clicks inside a dropdown from closing it
document.querySelectorAll('.av-dropdown').forEach(el => {
  el.addEventListener('click', e => e.stopPropagation());
});


/* ─────────────────────────────
   LOGOUT MODAL
───────────────────────────── */

/**
 * Show the logout confirmation overlay.
 * Expects an element with id="logoutOverlay" in the DOM.
 */
function showLogoutModal() {
  const overlay = document.getElementById('logoutOverlay');
  if (overlay) overlay.classList.add('open');
}

/**
 * Hide the logout confirmation overlay.
 */
function hideLogoutModal() {
  const overlay = document.getElementById('logoutOverlay');
  if (overlay) overlay.classList.remove('open');
}

/**
 * Confirm logout: navigate to the given URL (defaults to root).
 * @param {string} [redirectUrl='/']
 */
function confirmLogout(redirectUrl) {
  hideLogoutModal();
  window.location.href = redirectUrl || '/';
}

// Close modal on overlay backdrop click
document.addEventListener('click', e => {
  const overlay = document.getElementById('logoutOverlay');
  if (overlay && e.target === overlay) hideLogoutModal();
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideLogoutModal();
});


/* ─────────────────────────────
   SCREEN NAVIGATION (SPA pages)
   Only relevant for pages that use the
   multi-screen pattern from the SSO prototype.
───────────────────────────── */

/**
 * Switch to a named screen within a single-page app.
 * Adds the 'active' class to the target, removes it from all others.
 * @param {string} screenId - id of the target .screen element
 */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}


/* ─────────────────────────────
   LAUNCH TOAST
───────────────────────────── */
let _toastTimer = null;

/**
 * Show a brief "launching…" toast notification.
 * Expects an element with id="launchToast" and a child with id="launchToastText".
 * @param {string} appName
 * @param {number} [duration=2800] - ms before auto-hide
 */
function showLaunchToast(appName, duration) {
  clearTimeout(_toastTimer);
  const toast    = document.getElementById('launchToast');
  const toastTxt = document.getElementById('launchToastText');
  if (!toast) return;
  if (toastTxt) toastTxt.textContent = `Launching ${appName}…`;
  toast.classList.add('show');
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration || 2800);
}
