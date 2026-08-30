// Mobile menu

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


// Contact form validation

document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const formMessage =
            document.getElementById("formMessage");


        if (name === "" || email === "" || message === "") {

            formMessage.textContent =
                "Please fill in all fields.";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email.";

            return;
        }


        formMessage.textContent =
            "Message submitted successfully!";

        document
            .getElementById("contactForm")
            .reset();
    });