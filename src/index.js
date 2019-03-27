(function scopeWrapper() {
    let signInButton = document.getElementById('index_sign_in_button');
    signInButton.addEventListener('click', router.launchSignIn);

    let changePasswordButton = document.getElementById('index_change_password_button');
    changePasswordButton.addEventListener('click', router.launchChangePassword);
}());
