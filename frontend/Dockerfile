# Frontend Dockerfile
FROM node:16 as build

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY backend/ .
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
