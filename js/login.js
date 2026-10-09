const API = "http://localhost:5000/api/auth";

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

const modal = document.getElementById("forgotModal");
const resetForm = document.getElementById("resetForm");
const resetBtn = document.getElementById("resetBtn");
const resetMessage = document.getElementById("resetMessage");

let resetStep = 1;


/* =========================
   MESSAGE HELPER
========================= */

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = "message show " + type;
}

function clearMessage(element) {
    element.textContent = "";
    element.className = "message";
}


/* =========================
   SHOW / HIDE PASSWORD
========================= */

document.getElementById("togglePassword")
    .addEventListener("click", function () {

        const password = document.getElementById("password");

        const visible = password.type === "password";

        password.type = visible ? "text" : "password";

        this.setAttribute(
            "aria-label",
            visible ? "Hide password" : "Show password"
        );

        this.setAttribute("aria-pressed", String(visible));

        document.getElementById("eyeIcon").innerHTML = visible
            ? `
                <path d="M3 3l18 18"/>
                <path d="M10.6 10.6a2 2 0 002.8 2.8"/>
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c6.4 0 10 7 10 7a15.5 15.5 0 01-3.1 3.9"/>
                <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.2 0 2.3-.3 3.3-.7"/>
            `
            : `
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                <circle cx="12" cy="12" r="3"/>
            `;
    });


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearMessage(loginMessage);

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    loginBtn.disabled = true;
    loginBtn.textContent = "Please wait...";

    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify({
                email,
                password,
                role
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed.");
        }

        if (!data.user || data.user.role !== role) {
            throw new Error(
                "Selected role does not match your account."
            );
        }

        if (data.mustChangePassword) {
            window.location.href = "change-password.html";
            return;
        }

        const dashboardPages = {
            Student: "student-dashboard.html",
            Faculty: "faculty-dashboard.html",
            Admin: "admin-dashboard.html"
        };

        const dashboard = dashboardPages[data.user.role];

        if (!dashboard) {
            throw new Error("Invalid account role.");
        }

        window.location.href = dashboard;

    } catch (error) {

        showMessage(
            loginMessage,
            error.message === "Failed to fetch"
                ? "Cannot connect to CAMS server. Please try again."
                : error.message,
            "error"
        );

    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    }
});


/* =========================
   OPEN / CLOSE MODAL
========================= */

document.getElementById("forgotLink")
    .addEventListener("click", function (event) {

        event.preventDefault();

        document.getElementById("resetEmail").value =
            document.getElementById("email").value.trim();

        modal.classList.add("active");

        clearMessage(resetMessage);
    });


function closeModal() {
    modal.classList.remove("active");
}

document.getElementById("closeModal").onclick = closeModal;

document.getElementById("backToLogin").onclick = closeModal;

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


/* =========================
   FORGOT PASSWORD STEPS
========================= */

function setResetStep(step) {
    resetStep = step;

    document.getElementById("otpGroup").hidden = step < 2;

    document.getElementById("newPasswordGroup").hidden = step < 3;

    document.getElementById("confirmPasswordGroup").hidden = step < 3;

    document.getElementById("resetEmail").readOnly = step > 1;

    document.getElementById("otp").required = step === 2;

    document.getElementById("newPassword").required = step === 3;

    document.getElementById("confirmPassword").required = step === 3;

    document.getElementById("resetDescription").textContent =
        step === 1
            ? "Enter your registered college email to receive a password reset OTP."
            : step === 2
            ? "Enter the OTP sent to your college email."
            : "Enter and confirm your new password.";

    resetBtn.textContent =
        step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password";
}


/* =========================
   FORGOT PASSWORD API
========================= */

resetForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearMessage(resetMessage);

    const email = document.getElementById("resetEmail").value.trim();

    let endpoint;
    let body;

    if (resetStep === 1) {

        endpoint = "/forgot-password/send-otp";

        body = { email };

    } else if (resetStep === 2) {

        endpoint = "/forgot-password/verify-otp";

        body = {
            email,
            otp: document.getElementById("otp").value.trim()
        };

    } else {

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (newPassword.length < 8) {
            showMessage(
                resetMessage,
                "Password must be at least 8 characters.",
                "error"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage(
                resetMessage,
                "Passwords do not match.",
                "error"
            );
            return;
        }

        endpoint = "/forgot-password/reset";

        body = {
            email,
            newPassword
        };
    }

    resetBtn.disabled = true;
    resetBtn.textContent = "Please wait...";

    try {
        const response = await fetch(API + endpoint, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed.");
        }

        if (resetStep === 1) {

            setResetStep(2);

            showMessage(
                resetMessage,
                data.message || "Check your college email for the OTP.",
                "success"
            );

        } else if (resetStep === 2) {

            setResetStep(3);

            showMessage(
                resetMessage,
                "OTP verified. Set your new password.",
                "success"
            );

        } else {

            showMessage(
                resetMessage,
                "Password reset successfully. You can now log in.",
                "success"
            );

            resetBtn.textContent = "Password Updated";

            setTimeout(function () {

                resetForm.reset();

                setResetStep(1);

                document.getElementById("resetEmail").readOnly = false;

                closeModal();

                clearMessage(resetMessage);

                resetBtn.disabled = false;

            }, 1500);

            return;
        }

    } catch (error) {

        showMessage(
            resetMessage,
            error.message === "Failed to fetch"
                ? "Cannot connect to CAMS server."
                : error.message,
            "error"
        );

    } finally {

        if (resetBtn.textContent !== "Password Updated") {
            resetBtn.disabled = false;

            resetBtn.textContent =
                resetStep === 1
                    ? "Send OTP"
                    : resetStep === 2
                    ? "Verify OTP"
                    : "Reset Password";
        }
    }
});
