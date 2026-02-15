# Frontend build stage
FROM node:16 as build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM python:3.9-slim
WORKDIR /app

# Copy only requirements.txt first (for better Docker caching)
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of backend files
COPY backend/ .

# Copy frontend build files to backend static folder (if needed)
COPY --from=build /app/build ./static

# Expose port
EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
