<?php
session_start();
header('Content-Type: application/json');

// Configuration
$config = [
    'upload_dir' => '../uploads/',
    'allowed_image_types' => ['image/jpeg', 'image/png', 'image/gif'],
    'max_file_size' => 5242880 // 5MB
];

// Database configuration (you'll need to set these up)
$db_config = [
    'host' => 'localhost',
    'username' => 'your_username',
    'password' => 'your_password',
    'database' => 'daily_group'
];

// Check authentication for all requests except login
if ($_SERVER['REQUEST_URI'] !== '/login' && !isset($_SESSION['admin_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Handle different API endpoints
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'create_article':
        handleCreateArticle();
        break;
    case 'update_article':
        handleUpdateArticle();
        break;
    case 'delete_article':
        handleDeleteArticle();
        break;
    case 'upload_image':
        handleImageUpload();
        break;
    case 'update_slider':
        handleUpdateSlider();
        break;
    case 'update_settings':
        handleUpdateSettings();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

function handleLogin() {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // In production, use proper password hashing and database storage
    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

function handleCreateArticle() {
    $title = $_POST['title'] ?? '';
    $content = $_POST['content'] ?? '';
    $department = $_POST['department'] ?? '';
    
    // Validate input
    if (empty($title) || empty($content) || empty($department)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }

    // Handle image upload if present
    $image_path = '';
    if (isset($_FILES['image'])) {
        $image_path = handleImageUpload();
    }

    // Save to database (implementation needed)
    // saveArticle($title, $content, $department, $image_path);

    echo json_encode(['success' => true]);
}

function handleImageUpload() {
    global $config;
    
    if (!isset($_FILES['image'])) {
        throw new Exception('No image uploaded');
    }

    $file = $_FILES['image'];
    
    // Validate file type
    if (!in_array($file['type'], $config['allowed_image_types'])) {
        throw new Exception('Invalid file type');
    }

    // Validate file size
    if ($file['size'] > $config['max_file_size']) {
        throw new Exception('File too large');
    }

    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '.' . $extension;
    $filepath = $config['upload_dir'] . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        throw new Exception('Failed to save file');
    }

    return $filepath;
}

function handleUpdateSlider() {
    $slides = $_POST['slides'] ?? [];
    
    // Save slider configuration (implementation needed)
    // saveSliderConfig($slides);

    echo json_encode(['success' => true]);
}

function handleUpdateSettings() {
    $settings = $_POST['settings'] ?? [];
    
    // Save settings (implementation needed)
    // saveSettings($settings);

    echo json_encode(['success' => true]);
}