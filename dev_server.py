#!/usr/bin/env python3
"""
Simple HTTP Server with Live Reload for Development
Run this script in the same directory as your handbook.html file
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    Handler = MyHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Server running at http://localhost:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"🌐 Open http://localhost:{PORT}/handbook.html in your browser")
            print(f"⚡ Press Ctrl+C to stop the server")
            print(f"\n💡 TIP: Install 'Live Server' extension in VS Code for auto-reload!")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Try a different port.")
        else:
            raise

if __name__ == "__main__":
    start_server()
