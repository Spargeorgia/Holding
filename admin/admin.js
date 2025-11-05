// Admin Panel JavaScript

// Load existing content when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadExistingContent();
});

// Function to load all existing content
async function loadExistingContent() {
    try {
        const response = await fetch('../data/content.json');
        const data = await response.json();
        
        // Load articles
        if (document.getElementById('articles-list')) {
            displayArticles(data.articles);
        }
        
        // Load slider content
        if (document.getElementById('slides-list')) {
            displaySlides(data.slider);
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Display existing articles in admin panel
function displayArticles(articles) {
    const articlesList = document.getElementById('articles-list');
    if (!articlesList || !articles) return;
    
    let html = '';
    
    articles.forEach(article => {
        html += `
            <div class="card article-card" data-id="${article.id}">
                <div class="article-preview">
                    <img src="../${article.image}" alt="${article.title}" style="max-width: 200px; height: auto; margin-right: 20px;">
                    <div class="article-content">
                        <div class="article-header">
                            <h3>${article.title}</h3>
                            <div class="article-meta">
                                <span class="date">${article.date}</span>
                                <span class="department">${article.department || ''}</span>
                            </div>
                        </div>
                        <div class="article-description">
                            ${article.description ? article.description.substring(0, 150) + '...' : ''}
                        </div>
                    </div>
                </div>
                <div class="article-actions">
                    <button class="button edit-button" onclick="editArticle('${article.id}')">რედაქტირება</button>
                    <button class="button delete-button" onclick="deleteArticle('${article.id}')">წაშლა</button>
                </div>
            </div>
        `;
    });
    
    // Add "New Article" button at the top
    html = `
        <div class="action-bar">
            <button class="button primary-button" onclick="showNewArticleForm()">ახალი სიახლის დამატება</button>
        </div>
    ` + html;
    
    articlesList.innerHTML = html;
}

// Show edit form for existing article
function editArticle(articleId) {
    fetch('../data/content.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles.find(a => a.id === articleId);
            if (article) {
                showArticleForm(article);
            }
        });
}

// Show form for new or existing article
function showArticleForm(article = null) {
    const isEdit = article !== null;
    const formHtml = `
        <div class="modal">
            <div class="modal-content">
                <h3>${isEdit ? 'სიახლის რედაქტირება' : 'ახალი სიახლის დამატება'}</h3>
                <form id="articleForm" onsubmit="saveArticle(event, ${isEdit ? `'${article.id}'` : 'null'})">
                    <div class="form-group">
                        <label>სათაური</label>
                        <input type="text" name="title" value="${isEdit ? article.title : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>თარიღი</label>
                        <input type="text" name="date" value="${isEdit ? article.date : getCurrentDate()}" required>
                    </div>
                    <div class="form-group">
                        <label>დეპარტამენტი</label>
                        <select name="department" required>
                            <option value="marketing" ${isEdit && article.department === 'marketing' ? 'selected' : ''}>მარკეტინგი</option>
                            <option value="retail" ${isEdit && article.department === 'retail' ? 'selected' : ''}>საცალო ვაჭრობა</option>
                            <option value="operations" ${isEdit && article.department === 'operations' ? 'selected' : ''}>ოპერაციები</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>მოკლე აღწერა</label>
                        <textarea name="description" required>${isEdit ? article.description : ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>სრული ტექსტი</label>
                        <textarea name="content" required>${isEdit ? article.content : ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>სურათი</label>
                        <input type="text" name="image" value="${isEdit ? article.image : 'https://placehold.co/600x400/png'}" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="button primary-button">${isEdit ? 'განახლება' : 'დამატება'}</button>
                        <button type="button" class="button" onclick="closeModal()">გაუქმება</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
}

// Save article (new or edited)
async function saveArticle(event, articleId = null) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const articleData = Object.fromEntries(formData.entries());
    
    // Generate ID for new articles
    if (!articleId) {
        articleId = generateArticleId(articleData.title);
    }
    
    try {
        const response = await fetch('../data/content.json');
        const data = await response.json();
        
        if (articleId) {
            // Update existing article
            const index = data.articles.findIndex(a => a.id === articleId);
            if (index !== -1) {
                data.articles[index] = { ...articleData, id: articleId };
            }
        } else {
            // Add new article
            data.articles.unshift({ ...articleData, id: generateArticleId(articleData.title) });
        }
        
        // Save updated content
        await saveContent(data);
        
        // Refresh display
        displayArticles(data.articles);
        closeModal();
        
        // Update main site content
        updateMainSite();
    } catch (error) {
        console.error('Error saving article:', error);
        alert('შეცდომა სიახლის შენახვისას');
    }
}

// Helper functions
function generateArticleId(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}

function getCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = getGeorgianMonth(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

function getGeorgianMonth(monthIndex) {
    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
    return months[monthIndex];
}

async function saveContent(data) {
    try {
        const response = await fetch('../data/content.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data, null, 4)
        });
        
        if (!response.ok) {
            throw new Error('Error saving content');
        }
    } catch (error) {
        console.error('Error saving content:', error);
        throw error;
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Function to update main site content
function updateMainSite() {
    // Reload main page content
    if (window.opener) {
        window.opener.location.reload();
    }
}