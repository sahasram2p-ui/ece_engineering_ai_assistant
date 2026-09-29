from flask import Flask, render_template, request, jsonify
from google import genai
from config import GEMINI_API_KEY, GEMINI_MODEL, SYSTEM_PROMPT

app = Flask(__name__)
client = genai.Client(api_key=GEMINI_API_KEY)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json() or {}
        message = (data.get("message") or "").strip()
        if not message:
            return jsonify({"success": False, "error": "Please enter a question."}), 400

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=f"{SYSTEM_PROMPT}\n\nUser Question:\n{message}"
        )
        return jsonify({"success": True, "reply": response.text or "No response generated."})
    except Exception as e:
        print("Error:", e)
        return jsonify({"success": False, "error": "Something went wrong. Check your API key, model name, and internet connection."}), 500

if __name__ == "__main__":
    app.run(debug=True)
