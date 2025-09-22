(function () {
  emailjs.init({
    publicKey: "PeGEvHJJZ3x8FWrs3" // 
  });
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields before submitting.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      return;
    }

    emailjs.send("service_c93qbxq", "template_612hqm6", {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    })
    .then(() => {
      contactForm.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <i class="fas fa-check-circle" style="font-size: 3rem; color: green; margin-bottom: 20px;"></i>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you, ${name}. We've received your message and will get back to you soon.</p>
          <button class="submit-btn" style="margin-top: 20px;" onclick="location.reload()">Send Another Message</button>
        </div>
      `;
    })
    .catch((error) => {
      alert("Oops! Something went wrong.\n" + JSON.stringify(error));
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
  });
}

    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbot = document.getElementById("chatbot");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    // Toggle chatbot open/close
    chatbotBtn.addEventListener("click", () => {
      chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";

      if (!chatbot.dataset.opened) {
        addMessage("👋 Hi! I’m Sketchno AI. I’m here to help, ask me about our website!", "bot"
);
        chatbot.dataset.opened = "true";
      }
    });

    // Add messages
    function addMessage(text, sender) {
      const msg = document.createElement("div");
      msg.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
      msg.textContent = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Bot reply logic
    function botReply(userMsg) {
      let reply = "Oops! iam  still under construction.";

      // let reply = " Oops! I can only provide info about this website., bot";

      if (userMsg.includes("hello") || userMsg.includes("hi") || userMsg.includes("hy")) {
        reply = "Hello sir! How can I assist you today?";
      } else if (userMsg.includes("time")) {
        reply = "⏰ Current time: " + new Date().toLocaleTimeString();
      } else if (userMsg.includes("date")) {
        reply = "📅 Today's date: " + new Date().toLocaleDateString();
      } else if (userMsg.includes("your name")) {
        reply = "I’m skechno ai, your virtual assistant .";
      }

      setTimeout(() => addMessage(reply, "bot"), 1000);
    }

    // Send message
    function sendMessage() {
      const text = chatInput.value.trim();
      if (text) {
        addMessage(text, "user");
        botReply(text.toLowerCase());
        chatInput.value = "";
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", e => {
      if (e.key === "Enter") sendMessage();
    });
