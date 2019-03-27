(function scopeWrapper() {
    function launchSignIn(eventObj) {
        window.location.href = "sign_in.html";
    }

    function launchChangePassword(eventObj) {
        window.location.href = "change_password.html";
    }

    let signInButton = document.getElementById('index_sign_in_button');
    signInButton.addEventListener('click', launchSignIn);

    let changePasswordButton = document.getElementById('index_change_password_button');
    changePasswordButton.addEventListener('click', launchChangePassword);
}());
