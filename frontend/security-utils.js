/**
 * SkillBridge Security Utilities
 * Handles password hashing, validation, sanitization, and session management
 */

// ==================== PASSWORD HASHING ====================
/**
 * Hash password using SHA-256
 */
async function hashPassword(password) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
}

// ==================== PASSWORD VALIDATION ====================
/**
 * Validate password strength
 * Requirements: 8+ chars, 1 uppercase, 1 number, 1 special char
 */
function validatePasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    const allValid = Object.values(requirements).every(val => val === true);
    const score = Object.values(requirements).filter(val => val === true).length;
    
    return {
        valid: allValid,
        score: score, // 0-4
        requirements: requirements,
        level: score <= 1 ? 'weak' : score <= 2 ? 'medium' : 'strong'
    };
}

/**
 * Get password strength color
 */
function getPasswordStrengthColor(level) {
    switch(level) {
        case 'weak': return '#dc3545';
        case 'medium': return '#ffc107';
        case 'strong': return '#28a745';
        default: return '#ddd';
    }
}

// ==================== INPUT SANITIZATION ====================
/**
 * Sanitize input to prevent XSS and injection attacks
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    // Remove HTML tags and dangerous patterns
    let sanitized = input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/onclick|onerror|onload|onmouseover|onchange/gi, '');
    
    return sanitized.trim();
}

/**
 * Validate input for dangerous patterns
 */
function validateInputSafety(input) {
    const dangerousPatterns = [
        /script/i,
        /javascript:/i,
        /onclick|onerror|onload|onmouseover|onchange/i,
        /<[^>]+>/
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(input));
}

// ==================== SESSION MANAGEMENT ====================
/**
 * Generate random session token
 */
function generateSessionToken() {
    return crypto.randomUUID();
}

/**
 * Create session with token
 */
function createSession(userId, userType) {
    const token = generateSessionToken();
    const sessionData = {
        token: token,
        userId: userId,
        userType: userType,
        createdAt: Date.now(),
        lastActivity: Date.now()
    };
    
    sessionStorage.setItem('skillbridge_session', JSON.stringify(sessionData));
    sessionStorage.setItem('skillbridge_token', token);
    
    return sessionData;
}

/**
 * Get current session
 */
function getSession() {
    try {
        const session = sessionStorage.getItem('skillbridge_session');
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error('Error retrieving session:', error);
        return null;
    }
}

/**
 * Verify session exists and is valid
 */
function verifySession() {
    const session = getSession();
    if (!session || !session.token) {
        return false;
    }
    
    const token = sessionStorage.getItem('skillbridge_token');
    return session.token === token;
}

/**
 * Check if session expired due to inactivity (15 minutes)
 */
function checkSessionInactivity() {
    const session = getSession();
    if (!session) return null;
    
    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
    const timeSinceLastActivity = Date.now() - session.lastActivity;
    
    if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        clearSession();
        return true; // Session expired
    }
    
    return false;
}

/**
 * Update last activity time
 */
function updateSessionActivity() {
    try {
        const session = getSession();
        if (session) {
            session.lastActivity = Date.now();
            sessionStorage.setItem('skillbridge_session', JSON.stringify(session));
        }
    } catch (error) {
        console.error('Error updating session activity:', error);
    }
}

/**
 * Clear session
 */
function clearSession() {
    sessionStorage.removeItem('skillbridge_session');
    sessionStorage.removeItem('skillbridge_token');
}

// ==================== LOGIN RATE LIMITING ====================
/**
 * Record failed login attempt
 */
function recordFailedLogin(email) {
    const key = `login_attempts_${email}`;
    let attempts = JSON.parse(localStorage.getItem(key)) || {
        count: 0,
        lockedUntil: null
    };
    
    attempts.count += 1;
    
    if (attempts.count >= 3) {
        attempts.lockedUntil = Date.now() + 30000; // Lock for 30 seconds
    }
    
    localStorage.setItem(key, JSON.stringify(attempts));
    return attempts;
}

/**
 * Check if login is rate limited
 */
function isLoginLimited(email) {
    const key = `login_attempts_${email}`;
    const attempts = JSON.parse(localStorage.getItem(key));
    
    if (!attempts) return false;
    
    if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
        return {
            limited: true,
            remainingTime: Math.ceil((attempts.lockedUntil - Date.now()) / 1000)
        };
    }
    
    return { limited: false };
}

/**
 * Clear login attempts
 */
function clearLoginAttempts(email) {
    const key = `login_attempts_${email}`;
    localStorage.removeItem(key);
}

// ==================== PROTECTED PAGE CHECKS ====================
/**
 * Check session on protected pages and redirect if needed
 */
function protectPage() {
    if (!verifySession()) {
        window.location.href = 'worker-login.html';
        return false;
    }
    
    // Setup inactivity timer
    setupInactivityTimer();
    return true;
}

/**
 * Setup inactivity auto-logout
 */
function setupInactivityTimer() {
    let inactivityTimer;
    
    function resetTimer() {
        clearTimeout(inactivityTimer);
        updateSessionActivity();
        
        inactivityTimer = setTimeout(() => {
            clearSession();
            alert('Session expired due to inactivity. Please login again.');
            window.location.href = 'worker-login.html';
        }, 15 * 60 * 1000); // 15 minutes
    }
    
    // Reset timer on user activity
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);
    document.addEventListener('click', resetTimer);
    document.addEventListener('scroll', resetTimer);
    
    // Initial timer
    resetTimer();
}

// ==================== HTTPS REDIRECT ====================
/**
 * Redirect to HTTPS if not on localhost
 */
function enforceHTTPS() {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
}

// Auto-run on page load
document.addEventListener('DOMContentLoaded', enforceHTTPS);
