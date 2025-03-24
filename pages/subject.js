// Subject page specific functionality

// Assignment submission handling
document.querySelectorAll('.submit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const assignment = this.closest('.assignment-card');
        const assignmentName = assignment.querySelector('h3').textContent;
        showSubmissionModal(assignmentName);
    });
});

// Assignment details view handling
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const assignment = this.closest('.assignment-card');
        const assignmentName = assignment.querySelector('h3').textContent;
        showDetailsModal(assignmentName);
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        // Here you would typically send the form data to your backend
        showNotification('Message sent successfully!');
        this.reset();
    });
}

// Resource card hover effect
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Modal functionality
function showSubmissionModal(assignmentName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Submit ${assignmentName}</h2>
            <form class="submission-form">
                <div class="form-group">
                    <label for="file">Upload File</label>
                    <input type="file" id="file" required>
                </div>
                <div class="form-group">
                    <label for="comments">Comments</label>
                    <textarea id="comments" rows="4"></textarea>
                </div>
                <button type="submit">Submit Assignment</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.remove();
        }
    };

    // Form submission handling
    const form = modal.querySelector('.submission-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically handle the file upload and submission
        showNotification('Assignment submitted successfully!');
        modal.remove();
    });
}

function showDetailsModal(assignmentName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${assignmentName} Details</h2>
            <div class="assignment-details">
                <h3>Description</h3>
                <p>Detailed description of the assignment goes here...</p>
                
                <h3>Requirements</h3>
                <ul>
                    <li>Requirement 1</li>
                    <li>Requirement 2</li>
                    <li>Requirement 3</li>
                </ul>

                <h3>Grading Criteria</h3>
                <ul>
                    <li>Criterion 1: 30%</li>
                    <li>Criterion 2: 40%</li>
                    <li>Criterion 3: 30%</li>
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.remove();
        }
    };
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: flex;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .modal-content {
        background-color: var(--netflix-dark-grey);
        margin: 15% auto;
        padding: 2rem;
        border-radius: 8px;
        width: 80%;
        max-width: 500px;
        position: relative;
    }

    .close {
        color: var(--netflix-light-grey);
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }

    .close:hover {
        color: var(--netflix-red);
    }

    .submission-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form-group label {
        color: var(--netflix-white);
    }

    .form-group input,
    .form-group textarea {
        padding: 0.8rem;
        border: none;
        border-radius: 4px;
        background-color: var(--netflix-black);
        color: var(--netflix-white);
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--netflix-red);
        color: var(--netflix-white);
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style); 