
# Potato Leaf Disease Detection

A Django-based web application that allows users to upload images of potato leaves and detect diseases using a trained machine learning model.

---

## Features

- Upload potato leaf images for disease detection.
- Shows predictions with relevant information.
- User-friendly interface with Django templates.
- Media and static files properly managed.

---

## Project Structure

```
PotatoLeafDiseaseDetection/
│
├── admins/                 # Admin-related templates or logic
├── assets/                 # Static files (CSS, JS, images)
├── media/                  # Uploaded images
├── users/                  # User-related app
├── manage.py               # Django management script
├── db.sqlite3              # SQLite database
├── requirement.txt         # Project dependencies
├── runtime.txt             # Runtime configuration (Heroku etc.)
└── procofile               # Process file for deployment
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AKHAYA9/PotatoLeafDiseaseDetection.git
cd PotatoLeafDiseaseDetection
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

- **Windows:**
```bash
venv\Scriptsctivate
```
- **Linux/Mac:**
```bash
source venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirement.txt
```

---

## Usage

1. Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

2. Run the server:

```bash
python manage.py runserver
```

3. Open your browser and go to:

```
http://127.0.0.1:8000/
```

4. Upload a potato leaf image to get disease detection results.

---

## Deployment

- This project can be deployed on platforms like **Heroku**.
- Include a `Procfile` and `runtime.txt` for configuration.
- Use `gunicorn` as the web server.

Example Procfile:

```
web: gunicorn PotatoLeafDiseaseDetection.wsgi:application
```

---

## Dependencies

- Django==4.2
- TensorFlow==2.17
- Pillow
- Numpy
- Gunicorn

Install all dependencies via:

```bash
pip install -r requirement.txt
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

This project is open-source. Feel free to use and modify it.

---

## Author

Akhaya Kumar Dash  
[GitHub Profile](https://github.com/AKHAYA9)
