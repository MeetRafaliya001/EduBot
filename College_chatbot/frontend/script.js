const chatBody = document.getElementById('chatBody');
const chatContainer = document.getElementById('chatContainer');

function toggleChat() {
  chatContainer.classList.toggle('active');
  const toggleBtn = document.getElementById('chatToggle');
  toggleBtn.textContent = chatContainer.classList.contains('active') ? '✖' : '💬';
}

function addUserMessage(text) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('chatbot-message', 'user-message');
  userMessage.textContent = text;
  chatBody.appendChild(userMessage);
  scrollChatToBottom();
}

function addBotMessage(text) {
  const botMessage = document.createElement('div');
  botMessage.classList.add('chatbot-message', 'bot-message');
  botMessage.textContent = text;
  chatBody.appendChild(botMessage);
  scrollChatToBottom();
}


const subOptions = {
  "Campus Related Enquiry": ["🏢 Facilities", "🏗️ Infrastructure", "📚 Library", "🍽️ Canteen", "🏀 Playground"],
  "Courses & Programs Related Enquiry": ["🎓 Available Courses", "📋 Eligibility", "📘 Syllabus", "⏳ Duration", "👨‍🏫 Faculty"],
  "Fee Structure & Scholarships Related Enquiry": ["💵 Tuition Fees", "💳 Payment Methods", "🎓 Scholarships Available"],
  "Events & Activities Related Enquiry": ["🎭 College Fests", "🏆 Sports Events", "🛠️ Workshops", "🎤 Guest Lectures"],
  "Placements & Internships Related Enquiry": ["📈 Placement Records", "🏢 Recruiter List", "📝 Internship Opportunities"],
  "Contact Information Related Enquiry": ["🏛️ Departments", "⏰ Office Hours", "📞 Helpline Numbers"],
  "Exams & Results Related Enquiry": ["🗓️ Exam Schedules", "📊 Grading System", "📢 Results Announcement"],
  "Hostel & Mess Related Enquiry": ["🛏️ Room Availability", "📜 Hostel Rules", "💰 Hostel Fees", "🧼 Facilities"]
};

let currentCategory = null; 

function sendMessage(optionText) {
  addUserMessage(optionText);
  showTypingAnimation();


  if (subOptions[optionText]) {
    currentCategory = optionText; 
    setTimeout(() => {
      removeTypingAnimation();
      displaySubOptions(subOptions[optionText]);
    }, 1000);
    return;
  }


  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: optionText })
  })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        removeTypingAnimation();
        addBotMessage(data.response);

        if (currentCategory && subOptions[currentCategory]) {
          displaySubOptions(subOptions[currentCategory]);
        }
      }, 1000);
    })
    .catch(() => {
      removeTypingAnimation();
      addBotMessage("⚠️ Sorry! Something went wrong.");
    });
}

function displaySubOptions(options) {
  const subOptionWrapper = document.createElement("div");
  subOptionWrapper.className = "chatbot-sub-options-wrapper";

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option;
    btn.onclick = () => sendMessage(option);
    subOptionWrapper.appendChild(btn);
  });

  chatBody.appendChild(subOptionWrapper);
  scrollChatToBottom();
}

function handleUserInput() {
  const inputBox = document.getElementById('userInput');
  const userText = inputBox.value.trim();
  if (userText === "") return;

  addUserMessage(userText);
  inputBox.value = "";
  showTypingAnimation();

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        removeTypingAnimation();
        addBotMessage(data.response);

        if (currentCategory && subOptions[currentCategory]) {
          displaySubOptions(subOptions[currentCategory]);
        }
      }, 1000);
    })
    .catch(() => {
      removeTypingAnimation();
      addBotMessage("⚠️ Sorry! Something went wrong.");
    });
}

function showTypingAnimation() {
  const typing = document.createElement("div");
  typing.className = "chatbot-message bot-message typing";
  typing.id = "typing";
  typing.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
  chatBody.appendChild(typing);
  scrollChatToBottom();
}

function removeTypingAnimation() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function scrollChatToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}
// Listen for Enter key on input
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleUserInput();
  }
});
