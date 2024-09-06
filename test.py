import requests

# URL of your API endpoint
url = 'localhost:5000/api/v1/project'

# Form data (text fields)
data = {
    'title': 'My Project Title',
    'description': 'This is the description of my project.',
    'category': 'Website',
    'yearOfProject': '2024',
    'Link': 'https://example.com'
}

# File uploads (binary data for thumbnail and multiple images)
files = {
    'thumbnail': ('thumbnail.jpg', open('bill1.jpeg', 'rb'), 'image/jpeg'),
}

# Make the POST request
response = requests.post(url, data=data, files=files)

# Check the response
if response.status_code == 201:
    print('Project created successfully:', response.json())
else:
    print('Failed to create project:', response.status_code, response.text)
