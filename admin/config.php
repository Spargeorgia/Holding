<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');  // Change this to your database username
define('DB_PASS', 'your_password');  // Change this to your database password
define('DB_NAME', 'daily_group');

// File upload settings
define('UPLOAD_DIR', '../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/gif']);

// API Settings
define('API_TOKEN_SECRET', 'your-secret-key-here'); // Change this to a secure random string
?>