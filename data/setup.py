#ask for cloudflare acount id and KV namespace id

#make code that cycles through the directory
for dir in data directory:
    for file in dir:
        if file ends with .json:
            open and read file
            content = file data dump raw json

            #set up cloudflare KV
            put content into KV key is "topic:dir:file"


