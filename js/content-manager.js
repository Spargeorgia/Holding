// Content Management System
let siteContent = null;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        siteContent = await response.json();
        
        // Update news section
        updateNewsSection();
        
        // Update slider
        updateSlider();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Update news section with content
function updateNewsSection() {
    if (!siteContent || !siteContent.articles) return;
    
    // Update news cards
    const newsContainer = document.querySelector('#news .section');
    if (newsContainer) {
        const newsCardsHtml = siteContent.articles
            .map(article => createNewsCard(article))
            .join('');
        
        // Find the position after the slider to insert news cards
        const slider = newsContainer.querySelector('.image-slider');
        if (slider) {
            slider.insertAdjacentHTML('afterend', newsCardsHtml);
        }
    }
}

// Create HTML for news card
function createNewsCard(article) {
    return `
        <div class="card" data-department="${article.department}" onclick="showArticle('${article.id}')">
            <div class="card-image" style="background-image: url('${article.image}')"></div>
            <div class="card-content">
                <div class="card-title">${article.title}</div>
                <div class="card-date">${article.date}</div>
                <div class="card-description">${article.description}</div>
            </div>
            <div class="card-arrow">›</div>
        </div>
    `;
}

// Update slider with content
function updateSlider() {
    if (!siteContent || !siteContent.slider) return;
    
    const sliderContainer = document.getElementById('sliderContainer');
    if (sliderContainer) {
        const slidesHtml = siteContent.slider
            .map(slide => `<div class="slide">${slide.title}</div>`)
            .join('');
        
        sliderContainer.innerHTML = slidesHtml;
        
        // Update dots
        const dotsContainer = document.querySelector('.slider-dots');
        if (dotsContainer) {
            const dotsHtml = siteContent.slider
                .map((_, index) => `
                    <span class="dot${index === 0 ? ' active' : ''}" onclick="goToSlide(${index})"></span>
                `)
                .join('');
            
            dotsContainer.innerHTML = dotsHtml;
        }
    }
}

// Function to show article content
function showArticle(articleId) {
    if (!siteContent || !siteContent.articles) return;
    
    const article = siteContent.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const articleView = document.getElementById('news-article-view');
    if (!articleView) return;
    
    // Update article content
    articleView.innerHTML = `
        <div class="section-header">
            <button class="back-button" onclick="closeNewsArticle()">← სიახლეებში დაბრუნება</button>
        </div>
        <div class="article-content" id="${article.id}">
            <div class="article-hero-image" style="background-image: url('${article.image}')"></div>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span class="article-date">${article.date}</span>
                <span class="article-department">${getDepartmentName(article.department)}</span>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
        </div>
    `;
    
    // Show article view
    articleView.style.display = 'block';
    
    // Hide news cards
    const newsCards = document.querySelectorAll('.card');
    newsCards.forEach(card => card.style.display = 'none');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Helper function to get department name in Georgian
function getDepartmentName(department) {
    const departments = {
        'marketing': 'მარკეტინგი',
        'retail': 'საცალო ვაჭრობა',
        'operations': 'ოპერაციები',
        'finance': 'ფინანსები'
    };
    return departments[department] || department;
}

// Close article view
function closeNewsArticle() {
    const articleView = document.getElementById('news-article-view');
    if (articleView) {
        articleView.style.display = 'none';
    }
    
    // Show news cards
    const newsCards = document.querySelectorAll('.card');
    newsCards.forEach(card => card.style.display = 'block');
}