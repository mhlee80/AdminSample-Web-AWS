(function scopeWrapper(auth) {
    let changePasswordForm = document.getElementById('change_password_form');
    changePasswordForm.addEventListener('submit', changePassword);

    function changePassword(event) {
        event.preventDefault();

        let email = document.getElementById('change_password_email_input').value;
        let originPassword = document.getElementById('change_password_origin_password_input').value;
        let newPassword = document.getElementById('change_password_new_password_input').value;

        auth.changePassword(email, originPassword, newPassword,
            function onSuccess() {
                router.launchSignIn();
            },
            function onFailure(err) {
                alert(`failure: ${err}`);
            });
    }
}(cognitoAuth));
