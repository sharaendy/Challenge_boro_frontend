install: #установка зависимостей
					npm ci

run: #запустить приложение
					parcel index.html

build: #сборка 
					parcel build

lint: #проверка линтером (airbnb)
					npx eslint ./index.js

