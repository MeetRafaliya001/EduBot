
def get_bot_response(user_input):
    user_input = user_input.lower()

    if "admission" in user_input:
        return "Admissions are open! Visit our admissions page for details."
    elif "fees" in user_input:
        return "Our fee structure depends on your course. Please check the official site."
    elif "placement" in user_input:
        return "We have 90%+ placement success with top companies like TCS and Infosys."
    elif "hostel" in user_input:
        return "Yes, hostels are available for students with all basic facilities."
    else:
        return "Sorry, I’m not sure about that. Can you please rephrase?"
