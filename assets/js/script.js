let isLoggedIn = false;
let currentPage = 'home';
let currentDashboardTab = 'main';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentPage = pageId;
}

function showLogin() {
    document.getElementById('loginModal').classList.add('active');
}

function hideLogin() {
    document.getElementById('loginModal').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === 'admin@gmail.com' && password === 'admin123') {
        isLoggedIn = true;
        hideLogin();
        showDashboard();
        
        // Update login button
        document.querySelector('.login-btn').textContent = 'Dashboard';
        document.querySelector('.login-btn').onclick = showDashboard;
        
        alert('Login successful! Welcome to the admin dashboard.');
    } else {
        alert('Invalid credentials. Please use:\nEmail: admin@gmail.com\nPassword: admin123');
    }
}

function showDashboard() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show dashboard
    document.getElementById('dashboard').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
}

function showDashboardTab(tabId) {
    // Hide all dashboard content
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected tab
    document.getElementById(tabId + '-dashboard').style.display = 'block';
    
    // Update tab buttons
    document.querySelectorAll('.dashboard-nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentDashboardTab = tabId;
}

function logout() {
    isLoggedIn = false;
    showPage('home');
    
    // Reset login button
    document.querySelector('.login-btn').textContent = 'Login';
    document.querySelector('.login-btn').onclick = showLogin;
    
    alert('Logged out successfully!');
}

function toggleStudents(teacherId) {
    const studentList = document.getElementById(teacherId);
    studentList.classList.toggle('active');
    
    const button = event.target;
    if (studentList.classList.contains('active')) {
        button.textContent = 'Hide Students';
    } else {
        button.textContent = 'View Students';
    }
}

// Subscription system functions
function calculatePrice() {
    const studentCount = parseInt(document.getElementById('studentCount').value);
    const totalPrice = studentCount * 1; // RM1 per student
    document.querySelector('.total-price').textContent = `Total: RM ${totalPrice}/month`;
}

function subscribePlan() {
    const studentCount = parseInt(document.getElementById('studentCount').value);
    const totalPrice = studentCount * 1;
    
    if (studentCount < 1) {
        alert('Please enter a valid number of students (minimum 1)');
        return;
    }
    
    if (studentCount > 1000) {
        alert('Maximum 1000 students allowed per teacher account');
        return;
    }
    
    // Show subscription confirmation
    const confirmed = confirm(`Confirm subscription for ${studentCount} students at RM ${totalPrice}/month?`);
    
    if (confirmed) {
        // Here you would typically integrate with a payment gateway
        alert(`Subscription successful! You will be charged RM ${totalPrice}/month for ${studentCount} students.\n\nFeatures included:\n✅ Teacher Account\n✅ Own Account Management\n✅ Student Progress Tracking\n✅ Interactive AR Learning\n✅ Educational Games\n✅ Leaderboard System\n✅ Monthly Reports\n✅ Email Support\n✅ Custom Challenges\n✅ Real-time Analytics`);
        
        // Reset form
        document.getElementById('studentCount').value = 25;
        calculatePrice();
    }
}

// Student management functions
function addStudent() {
    const studentName = prompt('Enter student name:');
    if (studentName && studentName.trim()) {
        // Here you would typically save to a database
        alert(`Student "${studentName}" added successfully!`);
    }
}

function removeStudent(studentId) {
    const confirmed = confirm('Are you sure you want to remove this student?');
    if (confirmed) {
        // Here you would typically remove from database
        alert('Student removed successfully!');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add some interactive animations
    document.querySelectorAll('.feature-card, .stat-card, .package-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Close modal when clicking outside
    document.getElementById('loginModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideLogin();
        }
    });

    // Add navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(59, 130, 246, 0.18)';
        } else {
            navbar.style.background = 'rgba(59, 130, 246, 0.12)';
        }
    });

    console.log('My UTQH Platform initialized successfully!');
});
