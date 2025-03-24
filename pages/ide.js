// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '// Start coding here...',
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        tabSize: 4,
        insertSpaces: true
    });
});

// Language selection
document.getElementById('languageSelect').addEventListener('change', function(e) {
    const language = e.target.value;
    monaco.editor.setModelLanguage(window.editor.getModel(), language);
});

// File controls
document.getElementById('newFile').addEventListener('click', () => {
    window.editor.setValue('// Start coding here...');
});

document.getElementById('saveFile').addEventListener('click', () => {
    const content = window.editor.getValue();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt';
    a.click();
    window.URL.revokeObjectURL(url);
});

document.getElementById('loadFile').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.py,.js,.html,.css,.c';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            window.editor.setValue(event.target.result);
        };
        reader.readAsText(file);
    };
    input.click();
});

// Code execution
async function executeCode(code, language) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    try {
        switch (language) {
            case 'python':
                // Using Pyodide for Python execution
                const pyodide = await loadPyodide();
                const result = await pyodide.runPythonAsync(code);
                output.innerHTML = result;
                break;

            case 'javascript':
                // Direct JavaScript execution
                const result = eval(code);
                output.innerHTML = result;
                break;

            case 'html':
                // HTML preview
                const iframe = document.createElement('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '300px';
                iframe.style.border = 'none';
                output.appendChild(iframe);
                iframe.contentDocument.write(code);
                iframe.contentDocument.close();
                break;

            case 'css':
                // CSS preview
                const style = document.createElement('style');
                style.textContent = code;
                document.head.appendChild(style);
                output.innerHTML = 'CSS applied to preview';
                break;

            case 'c':
                // Using WebAssembly for C execution
                // This would require additional setup with Emscripten
                output.innerHTML = 'C code execution requires server-side compilation';
                break;
        }
    } catch (error) {
        output.innerHTML = `Error: ${error.message}`;
    }
}

// Test cases
const testCases = {
    python: [
        {
            name: 'Test 1',
            input: 'def add(a, b): return a + b',
            test: 'assert add(2, 3) == 5',
            expected: true
        },
        {
            name: 'Test 2',
            input: 'def multiply(a, b): return a * b',
            test: 'assert multiply(2, 3) == 6',
            expected: true
        }
    ],
    javascript: [
        {
            name: 'Test 1',
            input: 'function add(a, b) { return a + b; }',
            test: 'add(2, 3) === 5',
            expected: true
        }
    ]
};

function runTests() {
    const language = document.getElementById('languageSelect').value;
    const code = window.editor.getValue();
    const testContainer = document.getElementById('testCases');
    testContainer.innerHTML = '';

    const tests = testCases[language] || [];
    let passedTests = 0;

    tests.forEach(test => {
        const testElement = document.createElement('div');
        testElement.className = 'test-case';
        
        try {
            // Execute the code and test
            const fullCode = `${code}\n${test.test}`;
            const result = eval(fullCode);
            
            if (result === test.expected) {
                testElement.classList.add('passed');
                testElement.textContent = `${test.name}: Passed`;
                passedTests++;
            } else {
                testElement.classList.add('failed');
                testElement.textContent = `${test.name}: Failed`;
            }
        } catch (error) {
            testElement.classList.add('failed');
            testElement.textContent = `${test.name}: Error - ${error.message}`;
        }
        
        testContainer.appendChild(testElement);
    });

    // Update grade results
    const gradeResults = document.getElementById('gradeResults');
    const percentage = (passedTests / tests.length) * 100;
    gradeResults.innerHTML = `Test Results: ${passedTests}/${tests.length} passed (${percentage}%)`;
}

document.getElementById('runTests').addEventListener('click', runTests);

// Grading system
document.getElementById('submitGrade').addEventListener('click', () => {
    const grade = document.getElementById('gradeInput').value;
    if (grade >= 0 && grade <= 100) {
        const gradeResults = document.getElementById('gradeResults');
        gradeResults.innerHTML += `<br>Manual Grade: ${grade}%`;
        
        // Here you would typically send the grade to your backend
        // For demo purposes, we'll just store it in localStorage
        const grades = JSON.parse(localStorage.getItem('grades') || '[]');
        grades.push({
            timestamp: new Date().toISOString(),
            grade: grade,
            code: window.editor.getValue()
        });
        localStorage.setItem('grades', JSON.stringify(grades));
    }
});

// Load Pyodide for Python execution
async function loadPyodide() {
    if (!window.pyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
        window.pyodide = await loadPyodide();
    }
    return window.pyodide;
}

// Auto-save functionality
let autoSaveInterval;
window.editor.onDidChangeModelContent(() => {
    clearTimeout(autoSaveInterval);
    autoSaveInterval = setTimeout(() => {
        const content = window.editor.getValue();
        localStorage.setItem('autoSave', content);
    }, 1000);
});

// Load auto-saved content
const autoSavedContent = localStorage.getItem('autoSave');
if (autoSavedContent) {
    window.editor.setValue(autoSavedContent);
}

// Socket.IO connection
const socket = io(process.env.BACKEND_URL || 'http://localhost:5000');

// Authentication state
let currentUser = null;
let currentClass = null;
let currentAssignment = null;

// Initialize calendar
const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
    },
    themeSystem: 'standard',
    eventClick: handleAssignmentClick,
    events: fetchAssignments
});

calendar.render();

// Authentication functions
async function login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            updateAuthUI();
            loadUserData();
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        showError('Login failed: ' + error.message);
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        currentUser = null;
        updateAuthUI();
        clearUserData();
    } catch (error) {
        showError('Logout failed: ' + error.message);
    }
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        
        // Show/hide teacher controls
        const teacherControls = document.getElementById('teacherControls');
        teacherControls.style.display = currentUser.role === 'teacher' ? 'block' : 'none';
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

// Class and Assignment functions
async function loadUserData() {
    if (!currentUser) return;
    
    try {
        const response = await fetch('/api/classes/user');
        const classes = await response.json();
        updateClassInfo(classes);
        calendar.refetchEvents();
    } catch (error) {
        showError('Failed to load user data: ' + error.message);
    }
}

async function fetchAssignments(info, successCallback, failureCallback) {
    try {
        const response = await fetch('/api/assignments/upcoming');
        const assignments = await response.json();
        
        const events = assignments.map(assignment => ({
            id: assignment._id,
            title: assignment.title,
            start: new Date(assignment.dueDate),
            end: new Date(assignment.dueDate),
            extendedProps: assignment
        }));
        
        successCallback(events);
    } catch (error) {
        failureCallback(error);
    }
}

function handleAssignmentClick(info) {
    currentAssignment = info.event.extendedProps;
    showAssignmentModal();
}

function showAssignmentModal() {
    const modal = document.getElementById('assignmentModal');
    const details = document.getElementById('assignmentDetails');
    
    details.innerHTML = `
        <h3>${currentAssignment.title}</h3>
        <p>${currentAssignment.description}</p>
        <p><strong>Due Date:</strong> ${new Date(currentAssignment.dueDate).toLocaleString()}</p>
        <p><strong>Language:</strong> ${currentAssignment.language}</p>
        <p><strong>Points:</strong> ${currentAssignment.maxPoints}</p>
    `;
    
    modal.style.display = 'block';
}

// Submission handling
async function submitAssignment() {
    if (!currentAssignment) return;
    
    try {
        const code = window.editor.getValue();
        const response = await fetch('/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                assignmentId: currentAssignment._id,
                content: code,
                language: currentAssignment.language
            })
        });
        
        if (response.ok) {
            showSuccess('Assignment submitted successfully');
            calendar.refetchEvents();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        showError('Failed to submit assignment: ' + error.message);
    }
}

// Grading functions
async function submitGrade() {
    if (!currentAssignment || currentUser.role !== 'teacher') return;
    
    const grade = document.getElementById('gradeInput').value;
    const feedback = document.getElementById('feedbackInput').value;
    
    try {
        const response = await fetch('/api/submissions/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                assignmentId: currentAssignment._id,
                grade,
                feedback
            })
        });
        
        if (response.ok) {
            showSuccess('Grade submitted successfully');
            updateGradeResults();
        } else {
            throw new Error('Grading failed');
        }
    } catch (error) {
        showError('Failed to submit grade: ' + error.message);
    }
}

// UI Helper functions
function showError(message) {
    const output = document.getElementById('output');
    output.innerHTML = `<div class="error-message">${message}</div>`;
}

function showSuccess(message) {
    const output = document.getElementById('output');
    output.innerHTML = `<div class="success-message">${message}</div>`;
}

// Event Listeners
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('submitAssignment').addEventListener('click', submitAssignment);
document.getElementById('submitGrade').addEventListener('click', submitGrade);
document.getElementById('startAssignment').addEventListener('click', () => {
    document.getElementById('assignmentModal').style.display = 'none';
    window.editor.setValue(currentAssignment.template || '');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('assignmentModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for existing session
    fetch('/api/auth/me')
        .then(response => response.json())
        .then(user => {
            if (user) {
                currentUser = user;
                updateAuthUI();
                loadUserData();
            }
        })
        .catch(() => {
            // No active session
        });
}); 