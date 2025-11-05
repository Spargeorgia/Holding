// Daily GROUP JavaScript

// Tab Navigation
function showTab(tabName, element) {
    // Hide all content
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show news section for მთავარი tab
    if (element && element.textContent === 'მთავარი') {
        document.getElementById('news').classList.add('active');
        element.classList.add('active');
        return;
    }
    
    // Show selected content for other tabs
    document.getElementById(tabName).classList.add('active');
    
    // Mark tab as active
    if (element) {
        element.classList.add('active');
    }
}

// Image Slider
let currentSlide = 0;
let sliderContainer;
let dots;

function initSlider() {
    sliderContainer = document.getElementById('sliderContainer');
    dots = document.querySelectorAll('.dot');
}

function goToSlide(index) {
    if (!sliderContainer || !dots) return;
    
    currentSlide = index;
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Event Toggle
function toggleEvents(type, element) {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const futureEvents = document.getElementById('futureEvents');
    const pastEvents = document.getElementById('pastEvents');
    
    if (!futureEvents || !pastEvents) return;
    
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'future') {
        futureEvents.style.display = 'block';
        pastEvents.style.display = 'none';
        if (element) element.classList.add('active');
    } else {
        futureEvents.style.display = 'none';
        pastEvents.style.display = 'block';
        if (element) element.classList.add('active');
    }
}

// Bottom Navigation
function showSection(section, element) {
    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    }
    
    // Hide all content
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Show appropriate content based on section
    if (section === 'handbook') {
        const overview = document.getElementById('overview');
        if (overview) overview.classList.add('active');
        // Reset tab to Overview when entering handbook section
        const overviewTab = document.querySelector('.tab[onclick*="overview"]');
        if (overviewTab) {
            showTab('overview', overviewTab);
        }
    } else if (section === 'news') {
        const news = document.getElementById('news');
        if (news) news.classList.add('active');
    } else if (section === 'events') {
        const events = document.getElementById('events');
        if (events) events.classList.add('active');
    } else if (section === 'settings') {
        const settings = document.getElementById('settings');
        if (settings) settings.classList.add('active');
        tabsElement.style.display = 'none';
        headerTitle.textContent = 'Settings';
    }
}

// Handbook Department Section Handler
function showHandbookSection(department) {
    const overviewContent = document.querySelector('.org-list');
    const departmentContent = document.getElementById('department-content');
    const departmentTitle = document.getElementById('department-title');
    
    if (department === 'overview') {
        // Show the departments list
        overviewContent.style.display = 'flex';
        departmentContent.style.display = 'none';
    } else {
        // Show the department content
        overviewContent.style.display = 'none';
        departmentContent.style.display = 'block';
        
        // Update department title
        const departmentName = department.charAt(0).toUpperCase() + department.slice(1);
        departmentTitle.textContent = `${departmentName} Department`;
        
        // Hide all department news sections
        const allNews = document.querySelectorAll('.handbook-news');
        allNews.forEach(news => news.classList.remove('active'));
        
        // Show selected department news
        const selectedNews = document.querySelector(`.handbook-news[data-department="${department}"]`);
        if (selectedNews) {
            selectedNews.classList.add('active');
        }
    }
}

// Article View Functions
function showArticle(articleId) {
    // Hide the department news list
    const departmentContent = document.getElementById('department-content');
    const articleView = document.getElementById('article-view');
    
    if (departmentContent && articleView) {
        departmentContent.style.display = 'none';
        articleView.style.display = 'block';
        
        // Hide all articles first
        const articles = document.querySelectorAll('.article-content');
        articles.forEach(article => article.classList.remove('active'));
        
        // Show the selected article
        const selectedArticle = document.getElementById(articleId);
        if (selectedArticle) {
            selectedArticle.classList.add('active');
        }
    }
}

function closeArticle() {
    // Hide article view and show department content
    const departmentContent = document.getElementById('department-content');
    const articleView = document.getElementById('article-view');
    
    if (departmentContent && articleView) {
        departmentContent.style.display = 'block';
        articleView.style.display = 'none';
    }
}

// News Article View Functions
function closeNewsArticle() {
    const newsSection = document.getElementById('news');
    const articleView = document.getElementById('news-article-view');
    
    if (newsSection && articleView) {
        // Show all news cards
        const newsCards = newsSection.querySelectorAll('.card');
        newsCards.forEach(card => card.style.display = 'flex');
        
        // Hide the article view
        articleView.style.display = 'none';
    }
}

function showArticle(articleId) {
    // First, find the article in both news and handbook sections
    const selectedArticle = document.getElementById(articleId);
    if (!selectedArticle) return; // Exit if article not found

    // Determine which section we're in
    const newsSection = document.getElementById('news');
    const newsArticleView = document.getElementById('news-article-view');
    const handbookSection = document.getElementById('overview');
    const handbookArticleView = document.getElementById('article-view');
    const departmentContent = document.getElementById('department-content');

    // If article is in news section
    if (selectedArticle.closest('#news-article-view')) {
        // Hide all news cards
        const newsCards = newsSection.querySelectorAll('.card');
        newsCards.forEach(card => card.style.display = 'none');
        
        // Show news article view
        newsArticleView.style.display = 'block';
        
        // Hide all articles and show selected one
        const articles = newsArticleView.querySelectorAll('.article-content');
        articles.forEach(article => article.classList.remove('active'));
        selectedArticle.classList.add('active');
    } 
    // If article is in handbook section
    else if (selectedArticle.closest('#article-view')) {
        // Hide department content
        if (departmentContent) {
            departmentContent.style.display = 'none';
        }
        
        // Show handbook article view
        handbookArticleView.style.display = 'block';
        
        // Hide all articles and show selected one
        const articles = handbookArticleView.querySelectorAll('.article-content');
        articles.forEach(article => article.classList.remove('active'));
        selectedArticle.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function changePassword() {
    console.log('Change password');
    alert('Password change feature would open here');
}

function viewTerms() {
    console.log('View terms');
    alert('Terms and conditions would be displayed here');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('Logging out...');
        alert('Logout successful');
        // Implement logout logic here
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Set initial state to News section
    const newsNavItem = document.querySelector('.nav-item[onclick*="news"]');
    if (newsNavItem) {
        showSection('news', newsNavItem);
    }
    
    // Start auto-slide after initialization
    setInterval(() => {
        if (sliderContainer && dots && dots.length > 0) {
            currentSlide = (currentSlide + 1) % 3;
            goToSlide(currentSlide);
        }
    }, 5000);
});
