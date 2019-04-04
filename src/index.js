(function scopeWrapper(auth) {
    auth.hasValidToken(function onValid() {
        router.launchConsole();
    });

    let signInButton = document.getElementById('index_sign_in_button');
    signInButton.addEventListener('click', function(event) {
        router.launchSignIn();
    });
}(cognitoAuth));
