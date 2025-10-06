from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

responses = {
    "🏢 Facilities": "Our campus includes modern classrooms, high-tech labs, and student lounges.",
    "🏗️ Infrastructure": "We have state-of-the-art buildings and sustainable infrastructure with playarea , workshop and badminton court.",
    "📚 Library": "The library is stocked with over 10,000 academic and research books and E-library is also availabe .",
    "🍽️ Canteen": "Canteen offers hygienic, affordable meals and snacks.",
    "🏀 Playground": "We have playgrounds for cricket, football, badminton, volleyball and more.",
    "🎓 Available Courses": (
        "The following programs are available:\n"
        "• B.Tech-CSE\n"
        "• B.Tech-Mechanical\n"
        "• B.Tech-Chemical\n"
        "• B.Tech-IT\n"
        "• B.Tech-Electronics\n"
        "• B.Sc-IT\n"
        "• BCA\n"
        "• B.Pharm\n"
        "• B.Sc-Chemistry\n"
        "• B.Sc-Bioscience"
    ),
    "📋 Eligibility": "Eligibility varies by program. Please check the course page.",
    "📘 Syllabus": "Each course syllabus is available in the academic section of our site and ERP system.",
    "⏳ Duration": 
    "Duration of those programs are:\n"
        "B.Tech-CSE: 4 years\n"
        "B.Tech-Mechanical: 4 years\n"
        "B.Tech-Chemical: 4 years\n"
        "B.Tech-IT: 4 years\n"
        "B.Tech-Electronics: 4 years\n"
        "B.Sc-IT: 3 years\n"
        "BCA: 3 years\n"
        "B.Pharm: 4 years\n"
        "B.Sc-Chemistry: 3 years\n"
        "B.Sc-Bioscience: 3 years",
    "👨‍🏫 Faculty": "We have experienced faculty with PhDs and industry exposure.",
    "💵 Tuition Fees": "Tuition fees vary by course. Visit our fees page for full details.",
    "💳 Payment Methods": "We accept payment via UPI, card, and net banking.",
    "🎓 Scholarships Available": "Merit-based and need-based scholarships are available.",
    "🎭 College Fests": "Annual cultural and tech fests with large student participation.",
    "🏆 Sports Events": "Inter-college tournaments in cricket, kabaddi, football, and more.",
    "🛠️ Workshops": "Hands-on training and guest lectures every semester.",
    "🎤 Guest Lectures": "Delivered by top professionals and alumni every month.",
    "📈 Placement Records": "Placement rate of 90% with top recruiters like TCS, Infosys.",
    "🏢 Recruiter List": "Includes Microsoft, Deloitte, Wipro, Amazon, and more.",
    "📝 Internship Opportunities": "Mandatory internships every year through our placement cell.",
    "🏛️ Departments": "School of Engineering (SOE) , School of Science (SOS) and School of Pharma (SOP)",
    "⏰ Office Hours": "Office hours are from 9 AM to 5 PM, Monday to Saturday.",
    "📞 Helpline Numbers": "Call 7949049900 / 6359102727 or email contact@indrashiluniversity.edu.in",
    "🗓️ Exam Schedules": "All exam schedules are published one month before exams.",
    "📊 Grading System": "10-point CGPA system with internal and external weightage.",
    "📢 Results Announcement": "Results are published offline and notified via ERP System.",
    "🛏️ Room Availability": "shared rooms are available for boys and girls.",
    "📜 Hostel Rules": "Strict in-time rules, ID checks, and cleanliness protocols apply.",
    "💰 Hostel Fees": "Hostel fees are INR 78,000 annually including mess.",
    "🧼 Facilities": "Wi-Fi, laundry, Furnitures, security, and power backup."
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    message = data.get('message', '')
    reply = responses.get(message, "Sorry! I don't have information on that yet.")
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True)