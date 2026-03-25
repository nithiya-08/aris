/**
 * Aadhaar Display Module for Worker Dashboard
 * Handles Aadhaar card preview, modal display, and identity verification
 */

// Add Aadhaar display section after page loads
document.addEventListener('DOMContentLoaded', function() {
    const aadhaarElement = localStorage.getItem('workerAadhaar');
    const aadhaarImage = localStorage.getItem('workerAadhaarImage');
    
    if (aadhaarElement && aadhaarImage) {
        // Add Identity Document Section after Basic Information
        addIdentityDocumentSection(aadhaarElement, aadhaarImage);
    }
});

/**
 * Add Identity Document section to the dashboard
 */
function addIdentityDocumentSection(aadhaar, aadhaarImage) {
    const passportCard = document.querySelector('.passport-card');
    if (!passportCard) return;
    
    // Find the last section or passport-header and insert after it
    const sections = passportCard.querySelectorAll('.passport-section');
    const insertAfter = sections[0] || passportCard.querySelector('.passport-header');
    
    if (!insertAfter) return;
    
    const identitySection = document.createElement('div');
    identitySection.className = 'identity-section passport-section';
    identitySection.innerHTML = `
        <div>
            <div class="identity-section-header">
                <div class="identity-lock-icon">🔒</div>
                <div class="identity-section-title">Identity Document</div>
            </div>
            
            <div class="identity-document-display">
                <div class="aadhaar-preview-card">
                    <div class="aadhaar-image-container" style="position: relative; overflow: hidden;">
                        <img src="${aadhaarImage}" alt="Aadhaar Card" oncontextmenu="return false" ondragstart="return false" style="max-width: 100%; height: auto;">
                        <div class="watermark">VERIFIED</div>
                    </div>
                    <div class="aadhaar-preview-label">Aadhaar Card On File</div>
                </div>
                
                <div class="identity-badge">Verified Identity</div>
                
                <div class="aadhaar-number-display">
                    Aadhaar: XXXX XXXX ${aadhaar.slice(-4)}
                </div>
                
                <button class="view-card-btn" onclick="openAadhaarModal()">View Full Card</button>
            </div>
        </div>
    `;
    
    // Insert after the first section
    if (insertAfter.nextSibling) {
        passportCard.insertBefore(identitySection, insertAfter.nextSibling.nextSibling);
    } else {
        passportCard.appendChild(identitySection);
    }
    
    // Create modal for full card view
    createAadhaarModal(aadhaarImage);
}

/**
 * Create Aadhaar card modal for full view
 */
function createAadhaarModal(aadhaarImage) {
    if (document.getElementById('aadhaarCardModal')) return; // Already exists
    
    const modal = document.createElement('div');
    modal.id = 'aadhaarCardModal';
    modal.className = 'card-modal';
    modal.innerHTML = `
        <div class="card-modal-content">
            <button class="card-modal-close-btn" onclick="closeAadhaarModal()">&times;</button>
            <div class="card-modal-image-container">
                <img src="${aadhaarImage}" alt="Aadhaar Card Full View" oncontextmenu="return false" ondragstart="return false" style="width: 100%; height: auto;">
                <div class="watermark" style="font-size: 3rem; top: 45%;">FOR SKILLBRIDGE USE ONLY</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAadhaarModal();
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAadhaarModal();
        }
    });
}

/**
 * Open Aadhaar card modal
 */
function openAadhaarModal() {
    const modal = document.getElementById('aadhaarCardModal');
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * Close Aadhaar card modal
 */
function closeAadhaarModal() {
    const modal = document.getElementById('aadhaarCardModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Prevent context menu on Aadhaar images
document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.aadhaar-image-container') || e.target.closest('[alt*="Aadhaar"]')) {
        e.preventDefault();
        return false;
    }
}, true);

// Prevent drag on Aadhaar images
document.addEventListener('dragstart', function(e) {
    if (e.target.closest('.aadhaar-image-container') || e.target.closest('[alt*="Aadhaar"]')) {
        e.preventDefault();
        return false;
    }
}, true);
