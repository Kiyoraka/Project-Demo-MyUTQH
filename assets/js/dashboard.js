// Dashboard JavaScript - Clean and Professional
document.addEventListener('DOMContentLoaded', function() {
    console.log('My UTQH Dashboard initialized successfully!');
    
    // Initialize dashboard
    initializeDashboard();
});

function initializeDashboard() {
    // Show overview section by default
    showDashboardSection('overview');
    
    // Add event listeners for sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            sidebarItems.forEach(si => si.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

function showDashboardSection(sectionName) {
    // Hide all dashboard sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activate the corresponding sidebar item
    const targetSidebarItem = document.querySelector(`[onclick="showDashboardSection('${sectionName}')"]`);
    if (targetSidebarItem) {
        targetSidebarItem.classList.add('active');
    }
    
    // Log the section change
    console.log(`Switched to ${sectionName} section`);
}

function logout() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Redirect to main page
        window.location.href = 'index.html';
        console.log('User logged out successfully');
    }
}

// Enhanced dashboard functionality
function addStudent() {
    alert('Add Student functionality - To be implemented');
    console.log('Add Student button clicked');
}

function inviteTeacher() {
    alert('Invite Teacher functionality - To be implemented');
    console.log('Invite Teacher button clicked');
}

function generateReport() {
    alert('Generate Report functionality - To be implemented');
    console.log('Generate Report button clicked');
}

function sendNotification() {
    alert('Send Notification functionality - To be implemented');
    console.log('Send Notification button clicked');
}

function viewAllStudents() {
    alert('View All Students functionality - To be implemented');
    console.log('View All Students button clicked');
}

function viewAllTeachers() {
    alert('View All Teachers functionality - To be implemented');
    console.log('View All Teachers button clicked');
}

function viewAllSchools() {
    alert('View All Schools functionality - To be implemented');
    console.log('View All Schools button clicked');
}

// Add click event listeners to action buttons
document.addEventListener('DOMContentLoaded', function() {
    // Quick Actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.querySelector('span:last-child').textContent;
            switch(actionText) {
                case 'Add Student':
                    addStudent();
                    break;
                case 'Invite Teacher':
                    inviteTeacher();
                    break;
                case 'Generate Report':
                    generateReport();
                    break;
                case 'Send Notification':
                    sendNotification();
                    break;
            }
        });
    });
    
    // View All buttons
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.dashboard-card').querySelector('h3').textContent;
            switch(cardTitle) {
                case 'Recent Student Registrations':
                    viewAllStudents();
                    break;
                case 'Teacher Performance':
                    viewAllTeachers();
                    break;
                case 'Top Performing Schools':
                    viewAllSchools();
                    break;
            }
        });
    });
    
    // Student action buttons
    const studentActionButtons = document.querySelectorAll('.action-icon-btn');
    studentActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            const studentName = this.closest('.student-item').querySelector('.student-name').textContent;
            
            if (action === '👁️') {
                alert(`View details for ${studentName} - To be implemented`);
                console.log(`View student: ${studentName}`);
            } else if (action === '✏️') {
                alert(`Edit ${studentName} - To be implemented`);
                console.log(`Edit student: ${studentName}`);
            }
        });
    });
});

// Performance animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.performance-fill, .chart-fill, .progress-fill, .revenue-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
});

// Smooth scrolling for dashboard sections
function smoothScrollToSection(sectionName) {
    const section = document.getElementById(sectionName + '-section');
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced sidebar navigation with smooth transitions
function enhanceSidebarNavigation() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize enhanced navigation
document.addEventListener('DOMContentLoaded', function() {
    enhanceSidebarNavigation();
});

// Dashboard statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .mini-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / 50;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (counter.textContent.includes('RM')) {
                            counter.textContent = 'RM ' + Math.floor(current).toLocaleString();
                        } else if (counter.textContent.includes('%')) {
                            counter.textContent = Math.floor(current) + '%';
                        } else {
                            counter.textContent = Math.floor(current).toLocaleString();
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (counter.textContent.includes('RM')) {
                            counter.textContent = 'RM ' + target.toLocaleString();
                        } else if (counter.textContent.includes('%')) {
                            counter.textContent = target + '%';
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animations
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
});

// Export functions for global access
window.showDashboardSection = showDashboardSection;
window.logout = logout;
window.addStudent = addStudent;
window.inviteTeacher = inviteTeacher;
window.generateReport = generateReport;
window.sendNotification = sendNotification;
