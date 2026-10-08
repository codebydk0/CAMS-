/* =========================================================
   LOGIN / REGISTER SECTIONS
========================================================= */

const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");


const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");



/* =========================================================
   LOGIN ROLE
========================================================= */

const loginRoles =
    document.querySelectorAll(".login-role");


let loginRole = "Student";


loginRoles.forEach(button => {

    button.addEventListener("click", () => {

        loginRoles.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        loginRole =
            button.dataset.loginRole;

    });

});



/* =========================================================
   SWITCH LOGIN → REGISTER
========================================================= */

showRegister.addEventListener(
    "click",
    () => {

        loginSection.classList.add("hidden");

        registerSection.classList.remove("hidden");

    }
);



/* =========================================================
   SWITCH REGISTER → LOGIN
========================================================= */

showLogin.addEventListener(
    "click",
    () => {

        registerSection.classList.add("hidden");

        loginSection.classList.remove("hidden");

    }
);



/* =========================================================
   REGISTER ROLE DROPDOWN
========================================================= */

const roleSelect =
    document.getElementById("roleSelect");

const roleSelectButton =
    document.getElementById("roleSelectButton");

const roleDropdown =
    document.getElementById("roleDropdown");

const selectedRoleText =
    document.getElementById("selectedRoleText");

const roleOptions =
    document.querySelectorAll(".role-option");


let registerRole = "";



/* Open / close dropdown */

roleSelectButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        roleSelect.classList.toggle("open");

    }
);



/* Select role */

roleOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            registerRole =
                option.dataset.role;


            selectedRoleText.textContent =
                registerRole;


            selectedRoleText.style.color =
                "#172033";


            roleSelect.classList.remove(
                "open"
            );


            console.log(
                "Registration role:",
                registerRole
            );

        }
    );

});



/* Close dropdown when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (!roleSelect.contains(event.target)) {

            roleSelect.classList.remove(
                "open"
            );

        }

    }
);



/* =========================================================
   PASSWORD EYE FUNCTION
========================================================= */

function togglePassword(
    input,
    button
) {

    if (input.type === "password") {

        input.type = "text";


        button.innerHTML =
            '<i class="bi bi-eye-slash"></i>';

    }

    else {

        input.type = "password";


        button.innerHTML =
            '<i class="bi bi-eye"></i>';

    }

}



/* Login password */

document
    .getElementById("loginEye")
    .addEventListener(
        "click",
        function () {

            togglePassword(
                document.getElementById(
                    "loginPassword"
                ),
                this
            );

        }
    );



/* Register password */

document
    .getElementById("registerEye")
    .addEventListener(
        "click",
        function () {

            togglePassword(
                document.getElementById(
                    "registerPassword"
                ),
                this
            );

        }
    );



/* Confirm password */

document
    .getElementById("confirmEye")
    .addEventListener(
        "click",
        function () {

            togglePassword(
                document.getElementById(
                    "confirmPassword"
                ),
                this
            );

        }
    );



/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const user =
            document.getElementById(
                "loginUser"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const userError =
            document.getElementById(
                "loginUserError"
            );


        const passwordError =
            document.getElementById(
                "loginPasswordError"
            );


        const message =
            document.getElementById(
                "loginMessage"
            );


        userError.textContent = "";

        passwordError.textContent = "";

        message.className = "message";

        message.textContent = "";


        let valid = true;


        if (user === "") {

            userError.textContent =
                "Please enter your email or user ID.";

            valid = false;

        }


        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        }

        else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        if (!valid) {

            return;

        }


        /*
        ===============================================
        DEMO LOGIN

        Later connect this to your backend API.
        ===============================================
        */


        message.className =
            "message success";


        message.textContent =
            `${loginRole} login successful!`;


        console.log({

            role: loginRole,

            user: user

        });

    }
);



/* =========================================================
   FORGOT PASSWORD
========================================================= */

document
    .getElementById("forgotPassword")
    .addEventListener(
        "click",
        event => {

            event.preventDefault();


            const message =
                document.getElementById(
                    "loginMessage"
                );


            message.className =
                "message success";


            message.textContent =
                "Password recovery will be available soon.";

        }
    );



/* =========================================================
   OTP
========================================================= */

let generatedOTP = null;

let otpVerified = false;



/* =========================================================
   SEND OTP
========================================================= */

document
    .getElementById("sendOtp")
    .addEventListener(
        "click",
        () => {


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const error =
                document.getElementById(
                    "registerEmailError"
                );


            error.textContent = "";


            if (email === "") {

                error.textContent =
                    "Please enter your email.";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                error.textContent =
                    "Please enter a valid email.";

                return;

            }


            /*
            ==================================================
            DEMO OTP

            Real OTP should be generated and sent by
            your backend/email service.
            ==================================================
            */


            generatedOTP ="123456";
               


            otpVerified = false;


            console.log(
                "DEMO OTP:",
                generatedOTP
            );


            document.getElementById(
                "otpStatus"
            ).textContent =
                "OTP sent successfully. Check the console for demo OTP.";


            const button =
                document.getElementById(
                    "sendOtp"
                );


            button.disabled = true;

            button.textContent =
                "Sent";


            setTimeout(
                () => {

                    button.disabled = false;

                    button.textContent =
                        "Resend OTP";

                },
                30000
            );

        }
    );



/* =========================================================
   VERIFY OTP
========================================================= */

document
    .getElementById("verifyOtp")
    .addEventListener(
        "click",
        () => {


            const enteredOTP =
                document.getElementById(
                    "otp"
                ).value.trim();


            const error =
                document.getElementById(
                    "otpError"
                );


            const status =
                document.getElementById(
                    "otpStatus"
                );


            error.textContent = "";


            if (generatedOTP === null) {

                error.textContent =
                    "Please send OTP first.";

                return;

            }


            if (enteredOTP === "") {

                error.textContent =
                    "Please enter the OTP.";

                return;

            }


            if (enteredOTP !== generatedOTP) {

                error.textContent =
                    "Invalid OTP.";

                otpVerified = false;

                return;

            }


            otpVerified = true;


            status.textContent =
                "✓ Email verified successfully.";


            status.style.color =
                "#198754";


            const button =
                document.getElementById(
                    "verifyOtp"
                );


            button.textContent =
                "Verified";


            button.disabled = true;

        }
    );



/* =========================================================
   REGISTER
========================================================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const roleError =
                document.getElementById(
                    "registerRoleError"
                );


            const nameError =
                document.getElementById(
                    "registerNameError"
                );


            const emailError =
                document.getElementById(
                    "registerEmailError"
                );


            const otpError =
                document.getElementById(
                    "otpError"
                );


            const passwordError =
                document.getElementById(
                    "registerPasswordError"
                );


            const confirmError =
                document.getElementById(
                    "confirmPasswordError"
                );


            roleError.textContent = "";

            nameError.textContent = "";

            emailError.textContent = "";

            otpError.textContent = "";

            passwordError.textContent = "";

            confirmError.textContent = "";


            let valid = true;



            /* Role */

            if (registerRole === "") {

                roleError.textContent =
                    "Please select a role.";

                valid = false;

            }



            /* Name */

            if (name === "") {

                nameError.textContent =
                    "Please enter your full name.";

                valid = false;

            }



            /* Email */

            if (email === "") {

                emailError.textContent =
                    "Please enter your email.";

                valid = false;

            }



            /* OTP */

            if (!otpVerified) {

                otpError.textContent =
                    "Please verify your email first.";

                valid = false;

            }



            /* Password */

            if (password === "") {

                passwordError.textContent =
                    "Please create a password.";

                valid = false;

            }

            else if (password.length < 6) {

                passwordError.textContent =
                    "Password must contain at least 6 characters.";

                valid = false;

            }



            /* Confirm */

            if (confirmPassword === "") {

                confirmError.textContent =
                    "Please confirm your password.";

                valid = false;

            }

            else if (
                password !== confirmPassword
            ) {

                confirmError.textContent =
                    "Passwords do not match.";

                valid = false;

            }



            if (!valid) {

                return;

            }



            /* =============================================
               ROLE-SPECIFIC RESULT
            ============================================== */

            const message =
                document.getElementById(
                    "registerMessage"
                );


            message.className =
                "message success";


            if (registerRole === "Student") {

                message.textContent =
                    "Student account created successfully.";

            }

            else if (registerRole === "Faculty") {

                message.textContent =
                    "Faculty registration submitted for approval.";

            }

            else if (registerRole === "Admin") {

                message.textContent =
                    "Admin access request submitted for authorization.";

            }


            console.log({

                name: name,

                email: email,

                role: registerRole,

                otpVerified: otpVerified

            });

        }
    );