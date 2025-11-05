<?php
require_once 'config.php';

class Database {
    private $conn;
    private static $instance = null;

    private function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                DB_USER,
                DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}

// Initialize tables if they don't exist
function initDatabase() {
    $db = Database::getInstance()->getConnection();
    
    // Articles table
    $db->exec("CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT,
        image_url VARCHAR(255),
        department VARCHAR(100),
        date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
        date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");

    // Slider table
    $db->exec("CREATE TABLE IF NOT EXISTS slider_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        order_num INT DEFAULT 0
    )");

    // Settings table
    $db->exec("CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(50) NOT NULL UNIQUE,
        setting_value TEXT,
        date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");
}

// Initialize database tables
initDatabase();
?>