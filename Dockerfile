FROM python:3.9-slim
WORKDIR /app

# Copy requirements from backend folder
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy all backend code
COPY backend/ .

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]