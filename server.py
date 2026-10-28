#!/usr/bin/env python3
"""
Lightweight Zero-Dependency HTTP & API Server for Taiwan Crime Rate Dashboard
Serves dashboard and JSON REST API endpoints on http://localhost:8000
"""

import http.server
import json
import os
import socketserver
import sys
import webbrowser

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class CrimeDashboardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        # API Endpoints
        if self.path == "/api/robbery-stats":
            self.send_json_file(os.path.join(BASE_DIR, "data", "taiwan_robbery_2015_2025.json"))
        elif self.path == "/api/macro-stats":
            self.send_json_file(os.path.join(BASE_DIR, "data", "taiwan_crime_macro_2015_2025.json"))
        elif self.path == "/api/summary":
            self.send_json_file(os.path.join(BASE_DIR, "data", "analysis_summary.json"))
        else:
            # Fall back to standard static file serving
            super().do_GET()

    def send_json_file(self, filepath):
        if not os.path.exists(filepath):
            self.send_error(404, "Data file not found")
            return
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(content.encode("utf-8"))

def start_server():
    os.chdir(BASE_DIR)
    handler = CrimeDashboardHandler
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            print("=" * 65)
            print("TAIWAN CRIME RATE ANALYTICS DASHBOARD (2015-2025)")
            print("=" * 65)
            print(f"Server is running at: http://localhost:{PORT}")
            print(f"Data API available at:")
            print(f"  * http://localhost:{PORT}/api/robbery-stats")
            print(f"  * http://localhost:{PORT}/api/macro-stats")
            print(f"  * http://localhost:{PORT}/api/summary")
            print("=" * 65)
            print("Press Ctrl+C to stop the server.")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer shutting down gracefully.")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    start_server()
