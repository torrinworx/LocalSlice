import os
import sys
import subprocess
from dotenv import load_dotenv
from urllib.parse import urlparse

def run():
    # Load environment variables
    load_dotenv()

    # Get the ENV variable
    env = os.getenv("ENV")

    # Get the BACKEND_URL variable
    backend_url = os.getenv("BACKEND_URL")
    if not backend_url:
        print("Error: BACKEND_URL is not set.")
        return

    parsed_url = urlparse(backend_url)
    host = parsed_url.hostname
    port = parsed_url.port

    if not host or not port:
        print("Error: Invalid BACKEND_URL.")
        return

    command = []
    print(os.getcwd())

    try:
        base_path = sys._MEIPASS  # Set by PyInstaller
    except Exception:
        base_path = os.path.abspath(".")

    uvicorn_main = os.path.join(base_path, "main:app")

    if env == "development":
        command = [
            "uvicorn",
            uvicorn_main,
            "--host", str(host),
            "--port", str(port),
            "--reload"
        ]
    elif env == "production":
        command = [
            "uvicorn",
            uvicorn_main,
            "--host", str(host),
            "--port", str(port)
        ]
    else:
        print("Error: Unknown ENV value. Set it to either 'development' or 'production'.")
        return

    print(f"Executing command: {command}")
    subprocess.run(command)


if __name__ == "__main__":
    run()
