import os
import subprocess
import json

# Configuration
DATA_DIR = "data"
BINDING = "topic-data"

def sync_to_local():
    for root, dirs, files in os.walk(DATA_DIR):
        for file in files:
            if file.endswith(".json") and file != "subjects.json":
                # Get the subject (folder) and topic (file name)
                subject = os.path.basename(root)
                topic = file.replace(".json", "")
                
                # Construct the KV key
                key = f"topic:{subject}:{topic}"
                file_path = os.path.join(root, file)
                
                print(f"Syncing {key} to local KV...")
                
                # Run the wrangler command to put data into local storage
                # We use --path to avoid shell quoting issues
                cmd = [
                    "npx", "wrangler", "kv", "key", "put",
                    "--binding", BINDING,
                    key,
                    "--path", file_path,
                    "--local",
                    "--preview", "false"
                ]
                
                subprocess.run(cmd, shell=True)

if __name__ == "__main__":
    sync_to_local()
    print("\n✅ All data synced to local Wrangler state!")