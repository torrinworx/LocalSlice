import os
import sys
import json
import socket
import uvicorn
from dotenv import load_dotenv
from urllib.parse import urlparse

# Ensure the right path is on sys.path
if getattr(sys, 'frozen', False):
    # we are running in a bundle
    bundle_dir = sys._MEIPASS
else:
    # we are running in a normal Python environment
    bundle_dir = os.path.dirname(os.path.abspath(__file__))

sys.path.append(bundle_dir)

# Now you can import your app code
from backend.main import app

def find_available_port(start_port):
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            result = sock.connect_ex(('localhost', port))
            if result != 0:  # Port is available
                return port
            port += 1

def write_port_to_config(port):
    config_data = {"backend_port": port}
    # Get the directory where run.exe is located
    exe_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
    # Build the path to the .config file
    config_path = os.path.join(exe_dir, '.config')
    # Write the .config file
    with open(config_path, 'w') as file:
        json.dump(config_data, file)

def run():
    # Load environment variables
    load_dotenv()

    # Get the environment variable
    env = os.getenv("NODE_ENV")

    # Determine host and port based on environment
    if env == "development":
        backend_url = os.getenv("BACKEND_URL")
        parsed_url = urlparse(backend_url)
        host = parsed_url.hostname
        port = parsed_url.port
    else:
        host = '0.0.0.0'
        port = find_available_port(int(os.getenv("DEFAULT_PORT", 8000)))
        write_port_to_config(port)

    reload = env == "development"

    print(f"Executing uvicorn with host={host}, port={port}, reload={reload}")
    uvicorn.run(app, host=host, port=port, reload=reload)

if __name__ == "__main__":
    run()
