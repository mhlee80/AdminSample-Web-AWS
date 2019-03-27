(function scopeWrapper(auth) {
    let signInForm = document.getElementById('sign_in_form');
    signInForm.addEventListener('submit', signIn);

    function signIn(event) {
        event.preventDefault();

        let email = document.getElementById('sign_in_email_input').value;
        let password = document.getElementById('sign_in_password_input').value;


        auth.signIn(email, password,
            function onSuccess() {
                alert('success');
            },
            function onFailure(err) {
                alert(`failure: ${err}`);
            },
            function mfaRequired(codeDeliveryDetails) {
                alert(codeDeliveryDetails)
            },
            function newPasswordRequired(userAttributes, requiredAttributes) {
                window.location.href = "change_password.html";
            });
    }
}(cognitoAuth));
