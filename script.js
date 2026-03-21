const contactForm = document.getElementById("contactForm");
const resultText = document.getElementById("contactResult");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    resultText.textContent = "Please fill in all fields.";
    resultText.style.color = "crimson";
    return;
  }

  try {
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Unable to send message");
    }

    resultText.textContent = "Message sent successfully! Thank you.";
    resultText.style.color = "green";
    contactForm.reset();
  } catch (err) {
    console.error(err);
    resultText.textContent =
      "Could not send message. Opening mail client as fallback.";
    resultText.style.color = "orange";

    const mailto = `mailto:collinskainga2004@gmail.com?subject=${encodeURIComponent("Contact from Portfolio: " + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
    window.location.href = mailto;
  }
});

// Sidebar toggle
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("sidebar-active");
});

// Close sidebar when clicking a link
document.querySelectorAll(".nav-item").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    mainContent.classList.remove("sidebar-active");
    // Set active class
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));
    link.classList.add("active");
  });
});
