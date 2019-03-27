(function scopeWrapper(auth) {
    auth.hasValidToken(function onValid() {
        router.launchConsole();
    });

    let signInForm = document.getElementById('sign_in_form');
    signInForm.addEventListener('submit', signIn);

    function signIn(event) {
        event.preventDefault();

        let email = document.getElementById('sign_in_email_input').value;
        let password = document.getElementById('sign_in_password_input').value;

        auth.signIn(email, password,
            function onSuccess() {
                router.launchConsole();
            },
            function onFailure(err) {
                alert(`failure: ${err}`);
            },
            function mfaRequired(codeDeliveryDetails) {
                alert(codeDeliveryDetails);
            },
            function newPasswordRequired(userAttributes, requiredAttributes) {
                router.launchChangePassword();
            });
    }
}(cognitoAuth));
