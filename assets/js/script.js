let isLoggedIn = false;
let currentPage = 'home';
let currentDashboardTab = 'main';

function showPage(pageId) {
    console.log('🔄 showPage called with pageId:', pageId);
    console.log('📍 Current page before change:', currentPage);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    console.log('✅ All pages hidden');
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('✅ Target page shown:', pageId);
    } else {
        console.error('❌ Target page not found:', pageId);
    }
    
    // Show the top navigation bar for non-dashboard pages
    if (pageId !== 'dashboard') {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Don't force display: flex - let CSS handle it naturally
            // Just ensure it's visible (remove any 'none' that might have been set)
            if (navbar.style.display === 'none') {
                navbar.style.display = '';
                console.log('✅ Navbar visibility restored for page:', pageId);
            } else {
                console.log('✅ Navbar already visible for page:', pageId);
            }
        } else {
            console.error('❌ Navbar not found');
        }
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    console.log('🔗 Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
        console.log('✅ Active nav link updated:', event.target.textContent);
    } else {
        console.warn('⚠️ No event target found for navigation update');
    }
    
    currentPage = pageId;
    console.log('📍 Current page updated to:', currentPage);
    
    // Force navigation layout refresh
    forceNavigationLayoutRefresh();
    
    // Log page dimensions and navbar state
    setTimeout(() => {
        const activePage = document.querySelector('.page.active');
        const navbar = document.querySelector('.navbar');
        if (activePage && navbar) {
            console.log('📏 Active page dimensions:', {
                width: activePage.offsetWidth,
                height: activePage.offsetHeight,
                scrollWidth: activePage.scrollWidth,
                scrollHeight: activePage.scrollHeight
            });
            console.log('🧭 Navbar state:', {
                display: navbar.style.display,
                width: navbar.offsetWidth,
                height: navbar.offsetHeight,
                computedStyle: window.getComputedStyle(navbar).display
            });
            
            // Log navbar container and nav-links dimensions
            const navContainer = document.querySelector('.nav-container');
            const navLinks = document.querySelector('.nav-links');
            if (navContainer && navLinks) {
                console.log('📐 Nav container dimensions:', {
                    width: navContainer.offsetWidth,
                    height: navContainer.offsetHeight,
                    computedStyle: window.getComputedStyle(navContainer).display,
                    justifyContent: window.getComputedStyle(navContainer).justifyContent
                });
                console.log('🔗 Nav links dimensions:', {
                    width: navLinks.offsetWidth,
                    height: navLinks.offsetHeight,
                    computedStyle: window.getComputedStyle(navLinks).display,
                    gap: window.getComputedStyle(navLinks).gap
                });
            }
            
            // Force a layout recalculation
            navbar.offsetHeight; // Trigger reflow
            console.log('🔄 Layout recalculation triggered');
        }
    }, 100);
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
    console.log('🔄 showDashboard called');
    console.log('🔐 Login status:', isLoggedIn);
    
    if (!isLoggedIn) {
        console.log('❌ User not logged in, showing login modal');
        showLogin();
        return;
    }
    
    console.log('✅ User is logged in, proceeding to dashboard');
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    console.log('✅ All pages hidden');
    
    // Show dashboard
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        dashboard.classList.add('active');
        console.log('✅ Dashboard shown');
    } else {
        console.error('❌ Dashboard element not found');
    }
    
    // Hide the top navigation bar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
        console.log('✅ Navbar hidden');
    } else {
        console.error('❌ Navbar not found');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    console.log('✅ Navigation links updated');
    
    // Log dashboard and navbar state
    setTimeout(() => {
        if (dashboard && navbar) {
            console.log('📏 Dashboard dimensions:', {
                width: dashboard.offsetWidth,
                height: dashboard.offsetHeight,
                scrollWidth: dashboard.scrollWidth,
                scrollHeight: dashboard.scrollHeight
            });
            console.log('🧭 Navbar state after hiding:', {
                display: navbar.style.display,
                computedStyle: window.getComputedStyle(navbar).display,
                width: navbar.offsetWidth,
                height: navbar.offsetHeight
            });
        }
    }, 100);
}

function showDashboardSection(sectionId) {
    // Hide all dashboard sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId + '-section').classList.add('active');
    
    // Update sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Store initial state for comparison
let initialNavState = {};

function captureInitialNavState() {
    console.log('📸 Capturing initial navigation state...');
    
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    const loginBtn = document.querySelector('.login-btn');
    
    if (navbar && navContainer && navLinks && logo && loginBtn) {
        initialNavState = {
            navbar: {
                width: navbar.offsetWidth,
                height: navbar.offsetHeight,
                display: window.getComputedStyle(navbar).display
            },
            navContainer: {
                width: navContainer.offsetWidth,
                height: navContainer.offsetHeight,
                justifyContent: window.getComputedStyle(navContainer).justifyContent
            },
            navLinks: {
                width: navLinks.offsetWidth,
                height: navLinks.offsetHeight,
                gap: window.getComputedStyle(navLinks).gap
            },
            logo: {
                width: logo.offsetWidth,
                height: logo.offsetHeight,
                margin: window.getComputedStyle(logo).margin
            },
            loginBtn: {
                width: loginBtn.offsetWidth,
                height: loginBtn.offsetHeight,
                margin: window.getComputedStyle(loginBtn).margin
            }
        };
        console.log('✅ Initial navigation state captured:', initialNavState);
    }
}

function compareWithInitialState() {
    if (Object.keys(initialNavState).length === 0) {
        console.log('⚠️ No initial state to compare with');
        return;
    }
    
    console.log('🔍 === COMPARING CURRENT STATE WITH INITIAL STATE ===');
    
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    const loginBtn = document.querySelector('.login-btn');
    
    if (navbar && navContainer && navLinks && logo && loginBtn) {
        const currentState = {
            navbar: {
                width: navbar.offsetWidth,
                height: navbar.offsetHeight,
                display: window.getComputedStyle(navbar).display
            },
            navContainer: {
                width: navContainer.offsetWidth,
                height: navContainer.offsetHeight,
                justifyContent: window.getComputedStyle(navContainer).justifyContent
            },
            navLinks: {
                width: navLinks.offsetWidth,
                height: navLinks.offsetHeight,
                gap: window.getComputedStyle(navLinks).gap
            },
            logo: {
                width: logo.offsetWidth,
                height: logo.offsetHeight,
                margin: window.getComputedStyle(logo).margin
            },
            loginBtn: {
                width: loginBtn.offsetWidth,
                height: loginBtn.offsetHeight,
                margin: window.getComputedStyle(loginBtn).margin
            }
        };
        
        // Compare and highlight differences
        Object.keys(currentState).forEach(key => {
            const initial = initialNavState[key];
            const current = currentState[key];
            
            Object.keys(current).forEach(prop => {
                if (initial[prop] !== current[prop]) {
                    console.log(`🚨 ${key}.${prop} CHANGED:`, {
                        from: initial[prop],
                        to: current[prop],
                        difference: typeof current[prop] === 'number' ? 
                            current[prop] - initial[prop] : 'N/A'
                    });
                }
            });
        });
        
        console.log('✅ === STATE COMPARISON COMPLETE ===');
    }
}

function forceNavigationLayoutRefresh() {
    console.log('🔄 Force refreshing navigation layout...');
    
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbar && navContainer && navLinks) {
        // Force layout recalculation
        navbar.offsetHeight;
        navContainer.offsetHeight;
        navLinks.offsetHeight;
        
        // DON'T override the natural CSS display properties
        // Let the CSS handle the display values naturally
        // Only ensure the container and nav-links maintain flex (which they should from CSS)
        navContainer.style.display = 'flex';
        navLinks.style.display = 'flex';
        
        // Force CSS recalculation
        window.getComputedStyle(navbar).display;
        window.getComputedStyle(navContainer).justifyContent;
        window.getComputedStyle(navLinks).gap;
        
        console.log('✅ Navigation layout refreshed (preserving natural navbar display)');
        
        // Compare with initial state after refresh
        compareWithInitialState();
    } else {
        console.warn('⚠️ Some navigation elements not found for layout refresh');
    }
}

function logout() {
    console.log('🔄 logout called');
    
    isLoggedIn = false;
    console.log('✅ Login status set to false');
    
    // Show the top navigation bar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'flex';
        console.log('✅ Navbar displayed again');
    } else {
        console.error('❌ Navbar not found during logout');
    }
    
    showPage('home');
    
    // Reset login button
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = showLogin;
        console.log('✅ Login button reset');
    } else {
        console.error('❌ Login button not found');
    }
    
    console.log('✅ Logout completed successfully');
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

// Leaderboard system variables
let currentCategory = 1;
let currentLeaderboardPage = 1;
const studentsPerPage = 10;
let leaderboardData = {};

// Mock data for leaderboard (100 students across 5 categories)
function generateMockData() {
    const schools = [
        'SMK Taman Desa', 'SMK Bandar Baru', 'SMK Johor Bahru', 'SMK Kota Bharu', 'SMK Ipoh',
        'SMK Kuantan', 'SMK Alor Setar', 'SMK Melaka', 'SMK Seremban', 'SMK Shah Alam',
        'SMK Petaling Jaya', 'SMK Subang Jaya', 'SMK Klang', 'SMK Port Dickson', 'SMK Nilai'
    ];
    
    const states = [
        'Kuala Lumpur', 'Selangor', 'Johor', 'Kelantan', 'Perak', 'Pahang', 'Kedah', 'Melaka',
        'Negeri Sembilan', 'Terengganu', 'Perlis', 'Sabah', 'Sarawak', 'Putrajaya', 'Labuan'
    ];
    
    const categories = ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'];
    
    const names = [
        'Ahmad Faiz', 'Siti Nurhaliza', 'Muhammad Iqbal', 'Nur Aisyah', 'Haikal Zafran',
        'Fatimah Zahra', 'Zulkifli Rahman', 'Maryam Sofea', 'Omar Ali', 'Khadijah',
        'Hassan Rahman', 'Zainab Yusuf', 'Aminah Binti Ali', 'Muhammad Irfan', 'Siti Mariam',
        'Zul Hafiz', 'Nurul Ain', 'Ahmad Rosli', 'Fatimah Binti', 'Muhammad Zain',
        'Nurul Huda', 'Ahmad Zulkarnain', 'Siti Fatimah', 'Muhammad Amin', 'Nurul Izzah',
        'Ahmad Firdaus', 'Siti Aisyah', 'Muhammad Hafiz', 'Nurul Ain', 'Ahmad Syafiq',
        'Siti Nurul', 'Muhammad Aziz', 'Nurul Huda', 'Ahmad Fahmi', 'Siti Mariam',
        'Muhammad Irfan', 'Nurul Ain', 'Ahmad Zain', 'Siti Fatimah', 'Muhammad Amin',
        'Nurul Izzah', 'Ahmad Firdaus', 'Siti Aisyah', 'Muhammad Hafiz', 'Nurul Ain',
        'Ahmad Syafiq', 'Siti Nurul', 'Muhammad Aziz', 'Nurul Huda', 'Ahmad Fahmi',
        'Siti Mariam', 'Muhammad Irfan', 'Nurul Ain', 'Ahmad Zain', 'Siti Fatimah',
        'Muhammad Amin', 'Nurul Izzah', 'Ahmad Firdaus', 'Siti Aisyah', 'Muhammad Hafiz',
        'Nurul Ain', 'Ahmad Syafiq', 'Siti Nurul', 'Muhammad Aziz', 'Nurul Huda',
        'Ahmad Fahmi', 'Siti Mariam', 'Muhammad Irfan', 'Nurul Ain', 'Ahmad Zain',
        'Siti Fatimah', 'Muhammad Amin', 'Nurul Izzah', 'Ahmad Firdaus', 'Siti Aisyah',
        'Muhammad Hafiz', 'Nurul Ain', 'Ahmad Syafiq', 'Siti Nurul', 'Muhammad Aziz',
        'Nurul Huda', 'Ahmad Fahmi', 'Siti Mariam', 'Muhammad Irfan', 'Nurul Ain',
        'Ahmad Zain', 'Siti Fatimah', 'Muhammad Amin', 'Nurul Izzah', 'Ahmad Firdaus',
        'Siti Aisyah', 'Muhammad Hafiz', 'Nurul Ain', 'Ahmad Syafiq', 'Siti Nurul',
        'Muhammad Aziz', 'Nurul Huda', 'Ahmad Fahmi', 'Siti Mariam', 'Muhammad Irfan',
        'Nurul Ain', 'Ahmad Zain', 'Siti Fatimah', 'Muhammad Amin', 'Nurul Izzah'
    ];
    
    // Generate data for each category
    for (let cat = 1; cat <= 5; cat++) {
        leaderboardData[cat] = [];
        
        for (let i = 0; i < 100; i++) {
            const score = Math.floor(Math.random() * 50000) + 50000; // Random score between 50,000-100,000
            leaderboardData[cat].push({
                rank: i + 1,
                name: names[i % names.length],
                school: schools[Math.floor(Math.random() * schools.length)],
                state: states[Math.floor(Math.random() * states.length)],
                category: categories[cat - 1],
                score: score
            });
        }
        
        // Sort by score (highest first)
        leaderboardData[cat].sort((a, b) => b.score - a.score);
        
        // Update ranks after sorting
        leaderboardData[cat].forEach((student, index) => {
            student.rank = index + 1;
        });
    }
}

// Category selection function
function selectCategory(category) {
    currentCategory = category;
    currentLeaderboardPage = 1;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Refresh leaderboard
    displayLeaderboard();
}

// Display leaderboard data
function displayLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    const startIndex = (currentLeaderboardPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentData = leaderboardData[currentCategory].slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    currentData.forEach((student, index) => {
        const row = document.createElement('tr');
        
        let rankDisplay = student.rank;
        if (student.rank === 1) rankDisplay = '🥇 1';
        else if (student.rank === 2) rankDisplay = '🥈 2';
        else if (student.rank === 3) rankDisplay = '🥉 3';
        
        row.innerHTML = `
            <td class="rank">${rankDisplay}</td>
            <td>${student.name}</td>
            <td>${student.school}</td>
            <td>${student.state}</td>
            <td>${student.category}</td>
            <td>${student.score.toLocaleString()}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(leaderboardData[currentCategory].length / studentsPerPage);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    prevBtn.disabled = currentLeaderboardPage === 1;
    nextBtn.disabled = currentLeaderboardPage === totalPages;
    
    pageInfo.textContent = `Page ${currentLeaderboardPage} of ${totalPages}`;
}

// Navigation functions
function previousPage() {
    if (currentLeaderboardPage > 1) {
        currentLeaderboardPage--;
        displayLeaderboard();
    }
}

function nextPage() {
    const totalPages = Math.ceil(leaderboardData[currentCategory].length / studentsPerPage);
    if (currentLeaderboardPage < totalPages) {
        currentLeaderboardPage++;
        displayLeaderboard();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting initialization...');
    
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

    // Initialize leaderboard
    generateMockData();
    displayLeaderboard();

    console.log('My UTQH Platform initialized successfully!');
    
    // Capture initial state after everything is loaded
    setTimeout(() => {
        console.log('🔍 === FRESH PAGE LOAD - INITIAL STATE ANALYSIS ===');
        
        // Check home page state
        const homePage = document.getElementById('home');
        if (homePage) {
            console.log('🏠 Home page state:', {
                isActive: homePage.classList.contains('active'),
                display: window.getComputedStyle(homePage).display,
                width: homePage.offsetWidth,
                height: homePage.offsetHeight
            });
        }
        
        // Check navbar state
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            console.log('🧭 Navbar initial state:', {
                display: navbar.style.display,
                computedDisplay: window.getComputedStyle(navbar).display,
                width: navbar.offsetWidth,
                height: navbar.offsetHeight,
                background: window.getComputedStyle(navbar).background,
                position: window.getComputedStyle(navbar).position
            });
        }
        
        // Check navigation container
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            console.log('📦 Nav container initial state:', {
                width: navContainer.offsetWidth,
                height: navContainer.offsetHeight,
                display: window.getComputedStyle(navContainer).display,
                justifyContent: window.getComputedStyle(navContainer).justifyContent,
                alignItems: window.getComputedStyle(navContainer).alignItems,
                padding: window.getComputedStyle(navContainer).padding,
                margin: window.getComputedStyle(navContainer).margin
            });
        }
        
        // Check logo
        const logo = document.querySelector('.logo');
        if (logo) {
            console.log('🎨 Logo initial state:', {
                width: logo.offsetWidth,
                height: logo.offsetHeight,
                display: window.getComputedStyle(logo).display,
                margin: window.getComputedStyle(logo).margin,
                flexShrink: window.getComputedStyle(logo).flexShrink,
                position: window.getComputedStyle(logo).position
            });
        }
        
        // Check navigation links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            console.log('🔗 Nav links initial state:', {
                width: navLinks.offsetWidth,
                height: navLinks.offsetHeight,
                display: window.getComputedStyle(navLinks).display,
                gap: window.getComputedStyle(navLinks).gap,
                justifyContent: window.getComputedStyle(navLinks).justifyContent,
                alignItems: window.getComputedStyle(navLinks).alignItems,
                margin: window.getComputedStyle(navLinks).margin,
                padding: window.getComputedStyle(navLinks).padding
            });
            
            // Check individual nav link items
            const navLinkItems = navLinks.querySelectorAll('a');
            console.log('📋 Individual nav link items:', navLinkItems.length);
            navLinkItems.forEach((link, index) => {
                console.log(`  Link ${index + 1} (${link.textContent}):`, {
                    width: link.offsetWidth,
                    height: link.offsetHeight,
                    margin: window.getComputedStyle(link).margin,
                    padding: window.getComputedStyle(link).padding,
                    display: window.getComputedStyle(link).display
                });
            });
        }
        
        // Check login button
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            console.log('🔐 Login button initial state:', {
                width: loginBtn.offsetWidth,
                height: loginBtn.offsetHeight,
                display: window.getComputedStyle(loginBtn).display,
                margin: window.getComputedStyle(loginBtn).margin,
                padding: window.getComputedStyle(loginBtn).padding,
                flexShrink: window.getComputedStyle(loginBtn).flexShrink
            });
        }
        
        // Check viewport and body
        console.log('📱 Viewport and body state:', {
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            bodyWidth: document.body.offsetWidth,
            bodyHeight: document.body.offsetHeight,
            scrollWidth: document.body.scrollWidth,
            scrollHeight: document.body.scrollHeight
        });
        
        console.log('✅ === INITIAL STATE ANALYSIS COMPLETE ===');
        
        // Capture initial navigation state for comparison
        captureInitialNavState();
    }, 500); // Wait 500ms for all styles to be applied
});
