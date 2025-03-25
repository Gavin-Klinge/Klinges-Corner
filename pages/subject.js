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

// Get current subject from page title
const currentSubject = document.title.split(' - ')[0].toLowerCase();

// Subject-specific content data
const subjectContent = {
    'mathematics': {
        'popular': [
            {
                id: 4,
                title: 'Linear Algebra',
                image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500',
                description: 'Understand matrices, vectors, and linear transformations.'
            },
            {
                id: 5,
                title: 'Geometry Mastery',
                image: 'https://images.unsplash.com/photo-1582289545106-efecf907f21e?w=500',
                description: 'From basic shapes to complex geometric proofs.'
            }
        ],
        'algebra & calculus': [
            {
                id: 1,
                title: 'Calculus Basics',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
                description: 'Master the fundamentals of calculus.'
            },
            {
                id: 16,
                title: 'Advanced Algebra',
                image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500',
                description: 'Complex algebraic concepts and problem-solving.'
            }
        ],
        'geometry & trigonometry': [
            {
                id: 7,
                title: 'Trigonometry',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
                description: 'Master sine, cosine, and trigonometric functions.'
            },
            {
                id: 17,
                title: 'Advanced Geometry',
                image: 'https://images.unsplash.com/photo-1582289545106-efecf907f21e?w=500',
                description: 'Advanced geometric concepts and proofs.'
            }
        ]
    },
    'science': {
        'popular': [
            {
                id: 9,
                title: 'Chemistry 101',
                image: 'https://images.unsplash.com/photo-1603126957883-239d6bf0d3c7?w=500',
                description: 'Introduction to atomic structure and chemical bonds.'
            },
            {
                id: 10,
                title: 'Physics in Action',
                image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500',
                description: 'Real-world applications of physics principles.'
            }
        ],
        'physics & chemistry': [
            {
                id: 2,
                title: 'Physics Fundamentals',
                image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500',
                description: 'Explore the basic principles of physics and mechanics.'
            },
            {
                id: 18,
                title: 'Advanced Chemistry',
                image: 'https://images.unsplash.com/photo-1603126957883-239d6bf0d3c7?w=500',
                description: 'Advanced chemical reactions and organic chemistry.'
            }
        ],
        'biology & environmental science': [
            {
                id: 8,
                title: 'Biology Essentials',
                image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500',
                description: 'Explore the fundamentals of life sciences.'
            },
            {
                id: 11,
                title: 'Environmental Science',
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
                description: 'Understanding our planet and ecosystems.'
            }
        ]
    },
    'programming': {
        'popular': [
            {
                id: 12,
                title: 'Python for Beginners',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
                description: 'Start your programming journey with Python.'
            },
            {
                id: 13,
                title: 'Web Development',
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
                description: 'Build modern websites with HTML, CSS, and JavaScript.'
            }
        ],
        'web development': [
            {
                id: 13,
                title: 'Web Development',
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
                description: 'Build modern websites with HTML, CSS, and JavaScript.'
            },
            {
                id: 19,
                title: 'Frontend Frameworks',
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
                description: 'Master React, Vue, and modern frontend development.'
            }
        ],
        'python & data science': [
            {
                id: 12,
                title: 'Python for Beginners',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
                description: 'Start your programming journey with Python.'
            },
            {
                id: 15,
                title: 'Machine Learning',
                image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500',
                description: 'Introduction to AI and machine learning algorithms.'
            }
        ]
    }
};

// Load subject-specific content
function loadSubjectContent() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        const slider = section.querySelector('.content-slider');
        const items = subjectContent[currentSubject][title] || [];
        
        items.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.className = 'content-item';
            contentItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content-item-info">
                    <h3 class="content-item-title">${item.title}</h3>
                    <p class="content-item-description">${item.description}</p>
                </div>
            `;
            
            contentItem.addEventListener('click', () => {
                window.location.href = `content.html?id=${item.id}`;
            });
            
            slider.appendChild(contentItem);
        });
    });
}

// Initialize sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.content-row');
    
    sliders.forEach(slider => {
        const contentSlider = slider.querySelector('.content-slider');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                contentSlider.scrollBy({
                    left: -contentSlider.offsetWidth,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                contentSlider.scrollBy({
                    left: contentSlider.offsetWidth,
                    behavior: 'smooth'
                });
            });
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSubjectContent();
    initializeSliders();
}); 