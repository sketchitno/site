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
