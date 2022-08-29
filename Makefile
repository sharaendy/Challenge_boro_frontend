install:
					npm ci

run: 
					parcel src/index.html

publish: 
					parcel build src/index.html --no-minify