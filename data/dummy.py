import json
import os

with open("C:/Users/Nathan/Documents/programing/PROJECTS/Astro/public/data/subjects.json", "r", encoding="utf-8") as f:
    subjects = json.load(f)

BASE_DIR = "./data"
os.makedirs(BASE_DIR, exist_ok=True)

TEMPLATE = {
    "sections": [
        {
            "id": "",
            "title": "",
            "content": "The content you are looking for does not exist. Please check the URL or return to the homepage."
        }
    ]
}

for sub in subjects:
    for topic in sub.get("subtopics", []):
        path = os.path.join(BASE_DIR, f"{sub["id"]}/{topic}.json")

        # skip if file already exists
        if os.path.exists(path):
            continue

        data = TEMPLATE.copy()
        data["sections"] = [data["sections"][0].copy()]
        data["sections"][0]["id"] = topic
        data["sections"][0]["title"] = topic

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
