// Sample course data (replace with your actual data/API)
const courseData = {
    1: {
        title: 'Calculus Basics',
        duration: 12,
        difficulty: 'Intermediate',
        category: 'Mathematics',
        description: 'Master the fundamentals of calculus, from limits and derivatives to integrals and applications.',
        image: '../assets/calculus.jpg',
        chapters: [
            {
                title: 'Introduction to Limits',
                duration: '45 min',
                description: 'Understanding the concept of limits and their importance in calculus.'
            },
            {
                title: 'Derivatives and Rates of Change',
                duration: '1 hour',
                description: 'Learn how derivatives represent rates of change and their applications.'
            },
            // Add more chapters
        ]
    },
    // Add more courses
};

// Get course ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get('id'));

// Load course content
function loadCourseContent() {
    const course = courseData[courseId];
    
    if (!course) {
        window.location.href = '../index.html';
        return;
    }

    // Update page title
    document.title = `${course.title} - Klinge's Corner`;

    // Update content information
    document.getElementById('contentTitle').textContent = course.title;
    document.getElementById('contentDuration').textContent = course.duration;
    document.getElementById('contentDifficulty').textContent = course.difficulty;
    document.getElementById('contentCategory').textContent = course.category;
    document.getElementById('contentDescription').textContent = course.description;
    document.getElementById('contentImage').src = course.image;

    // Load chapters
    const chaptersList = document.getElementById('chaptersList');
    chaptersList.innerHTML = '';

    course.chapters.forEach((chapter, index) => {
        const chapterElement = document.createElement('div');
        chapterElement.className = 'chapter-item';
        chapterElement.innerHTML = `
            <div class="chapter-header">
                <h3 class="chapter-title">${index + 1}. ${chapter.title}</h3>
                <span class="chapter-duration">${chapter.duration}</span>
            </div>
            <p class="chapter-description">${chapter.description}</p>
        `;

        chapterElement.addEventListener('click', () => {
            // Handle chapter selection/navigation
            console.log(`Selected chapter: ${chapter.title}`);
        });

        chaptersList.appendChild(chapterElement);
    });

    // Load related content
    loadRelatedContent(course.category);
}

// Load related courses
function loadRelatedContent(category) {
    const relatedContent = document.getElementById('relatedContent');
    const relatedCourses = Object.entries(courseData)
        .filter(([id, course]) => course.category === category && parseInt(id) !== courseId)
        .map(([id, course]) => ({id, ...course}));

    relatedContent.innerHTML = '';

    relatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'content-item';
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
        `;

        courseElement.addEventListener('click', () => {
            window.location.href = `content.html?id=${course.id}`;
        });

        relatedContent.appendChild(courseElement);
    });
}

// Course actions
document.getElementById('startCourseBtn').addEventListener('click', () => {
    // Handle course start action
    console.log('Starting course...');
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        this.title = 'Saved';
    } else {
        icon.classList.replace('fas', 'far');
        this.title = 'Save for Later';
    }
});

// Initialize content
document.addEventListener('DOMContentLoaded', loadCourseContent); 