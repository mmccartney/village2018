#!/usr/bin/python

import traceback
import BaseHTTPServer
import SocketServer
import json

PORT = 8000

STATE = { "/": { "player": 'A', "gameBoard": {} } }

class Handler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        json.dump(STATE[self.path], self.wfile)

    def do_POST(self):
        try:
            data = self.rfile.read(int(self.headers['Content-Length']))
            obj = json.loads(data)
            self.send_response(200)
            self.end_headers()
            STATE[self.path] = obj
        except:
            traceback.print_exc()
            self.send_response(500)
            self.end_headers()

httpd = BaseHTTPServer.HTTPServer(("", PORT), Handler)
httpd.serve_forever()
