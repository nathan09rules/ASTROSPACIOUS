import os
import json
import requests

ACCOUNT_ID = input("Cloudflare Account ID: ").strip()
NAMESPACE_ID = input("KV Namespace ID: ").strip()
API_TOKEN = input("Cloudflare API Token: ").strip()

BASE_DIR = "./data"

URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/bulk"

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

batch = []

for root, _, files in os.walk(BASE_DIR):
    for file in files:
        if not file.endswith(".json"):
            continue

        path = os.path.join(root, file)

        with open(path, "r", encoding="utf-8") as f:
            value = f.read()  # raw JSON string

        # build key: topic:dir:file
        rel = os.path.relpath(path, BASE_DIR)
        key = "topic:" + rel.replace(os.sep, ":").replace(".json", "")

        batch.append({
            "key": key,
            "value": value
        })

        # Cloudflare bulk limit = 10k entries
        if len(batch) == 1000:
            r = requests.put(URL, headers=headers, json=batch)
            r.raise_for_status()
            batch.clear()

# final flush
if batch:
    r = requests.put(URL, headers=headers, json=batch)
    r.raise_for_status()

print("KV upload complete.")
