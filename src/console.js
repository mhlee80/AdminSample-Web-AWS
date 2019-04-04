(function scopeWrapper(auth) {
    auth.hasValidToken(null, function onInvalid() {
        router.launchSignIn();
    });

    let signOutButton = document.getElementById('console_sign_out_button');
    signOutButton.addEventListener('click', function () {
        auth.signOut();
        router.launchIndex();
    });

    let changePasswordButton = document.getElementById('console_change_password_button');
    changePasswordButton.addEventListener('click', function() {
        router.launchChangePassword();
    });
}(cognitoAuth));