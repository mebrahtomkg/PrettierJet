import os
import subprocess
import shutil
import platform   
import threading  
       
    
service_process = None


def find_node_executable():
    """Finds the Node.js executable in a cross-platform manner."""
    # First, try to find Node.js in the system's PATH
    node_binary = shutil.which("node")
    if node_binary: 
        return node_binary    

    # If not found, check known default paths based on OS
    possible_paths = []
    if platform.system() == "Windows":
        # Common Windows installation paths
        possible_paths.append(os.path.join(os.environ.get("PROGRAMFILES", "C:\\Program Files"), "nodejs", "node.exe"))
        possible_paths.append(os.path.join(os.environ.get("LOCALAPPDATA", os.path.join(os.environ["USERPROFILE"], "AppData", "Local")), "Programs", "nodejs", "node.exe"))
    elif platform.system() == "Darwin":  # macOS
        possible_paths.append("/usr/local/bin/node")
        possible_paths.append("/usr/bin/node")
        possible_paths.append("/opt/homebrew/bin/node")  # For Homebrew installations
    else:  # Linux
        possible_paths.append("/usr/local/bin/node")
        possible_paths.append("/usr/bin/node")
        possible_paths.append("/opt/node/bin/node")
        # Check for nvm installations
        nvm_path = os.path.join(os.environ.get("HOME", ""), ".nvm", "node")
        if os.path.exists(nvm_path):
            possible_paths.append(nvm_path)

    # Check each possible path
    for path in possible_paths:
        if os.path.exists(path):
            return path

    # If still not found, return None
    return None


def capture_subprocess_output(pipe, prefix):
    """Capture output from subprocess and print to Sublime console"""
    for line in iter(pipe.readline, ''):
        print(f"[Prettier {prefix}] {line.strip()}")
    pipe.close() 



def start_service():
    global service_process            

    if service_process is not None:
        print("[PrettierJet] Service is already running.")
        return

    node_path = find_node_executable()
    if not node_path:
        print("[PrettierJet] Node.js not found. Please install Node.js and ensure it's in the system PATH.")
        return

    prettier_jet_service_path = os.path.join(os.path.dirname(__file__), "prettier-jet-service")

    try:
        service_process = subprocess.Popen(
            [node_path, prettier_jet_service_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1
        )

        # Start threads to capture output
        threading.Thread(
            target=capture_subprocess_output,
            args=(service_process.stdout, "STDOUT"),
            daemon=True
        ).start()
            
        threading.Thread(
            target=capture_subprocess_output,
            args=(service_process.stderr, "STDERR"),
            daemon=True
        ).start()

        print("[PrettierJet] Service started successfully.")
    except Exception as e:
        print("[PrettierJet] Failed to start service: {}".format(str(e)))
        service_process = None       



def stop_service():
    global service_process
    if service_process:
        try:
            service_process.terminate()
            service_process = None
            print("[PrettierJet] Service stopped successfully.")
        except Exception as e: 
            print(f"[PrettierJet] Error stopping service: {str(e)}")
    else:
        print("[PrettierJet] Service is not running.")
    

      
 
def plugin_loaded():
    start_service()  


       
def plugin_unloaded():        
    stop_service()           
                