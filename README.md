# ECE Engineering AI Assistant

ECE-only AI chatbot using Flask and Gemini `gemini-3.1-flash-lite`.

## Structure
app.py
config.py
requirements.txt
.env
.gitignore
README.md
templates/index.html
static/style.css
static/script.js

## Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

Add your Gemini API key to `.env`, then:

python app.py

Open http://127.0.0.1:5000

Examples:
- What is a transistor?
- Explain AM and FM.
- Explain 8051 architecture.
- What is a flip-flop?
- Give an ECE mini project idea.
- Write Arduino code for an ultrasonic sensor.

Unrelated questions are refused.
